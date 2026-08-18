# Programação Web I - Introdução a APIs e Serviços Web no PHP

## 1. O que este guia ensina

Até este ponto do curso, você aprendeu como o JavaScript manipula a interface no navegador e como o PHP executa instruções, funções e manipula arrays no servidor. Agora, vamos unir esses dois lados por meio do conceito mais importante da web moderna: as **APIs (Application Programming Interfaces)**.

Nesta seção, você utilizará o conhecimento de **arrays no PHP** para estruturar respostas em formato **JSON** e transformar seus scripts em serviços de **backend**: aplicações que recebem requisições, processam dados e devolvem respostas padronizadas.

Ao final deste guia, você deve conseguir:

- explicar o que é uma API e como funciona a arquitetura cliente-servidor;
- compreender a anatomia de uma mensagem HTTP, distinguindo **cabeçalhos (*headers*)** de **corpo (*body*)**;
- compreender os fundamentos práticos do padrão REST (recursos e verbos HTTP);
- identificar os diferentes tipos de clientes HTTP existentes na web (navegador, JavaScript com `fetch()`, utilitários de terminal e ferramentas de desenvolvimento);
- estruturar respostas padronizadas em JSON com `header()` e `json_encode()`;
- emitir códigos de status HTTP semânticos com `http_response_code()`;
- identificar a intenção da requisição por meio de `$_SERVER['REQUEST_METHOD']`;
- receber dados no PHP através dos três principais canais de entrada:
  - parâmetros de URL com `$_GET`;
  - dados de formulário (`application/x-www-form-urlencoded` e `multipart/form-data`) com `$_POST`;
  - cargas de dados JSON com `php://input` e `json_decode()`;
- validar entradas de forma defensiva e emitir mensagens de erro claras quando dados obrigatórios estiverem ausentes;
- utilizar o **Bruno** com arquivos **YAML** (`.yaml`) como ferramenta prática de testes e depuração das suas APIs.

---

## 2. O que é uma API e a arquitetura Cliente-Servidor

Em uma aplicação web tradicional antiga, o servidor gerava todo o código HTML da página a cada clique e entregava a tela pronta para o navegador. Esse modelo aumentava o tráfego de rede e amarrava o backend a uma única interface.

Na arquitetura moderna, separamos claramente as responsabilidades:

```text
┌───────────────────────────┐                 ┌───────────────────────────┐
│     CLIENTE (Frontend)    │                 │     SERVIDOR (Backend)    │
│                           │                 │                           │
│  - Navegador / JavaScript │   Requisição    │  - Script PHP (API)       │
│  - Aplicativo Mobile      │ ──────────────> │  - Valida dados           │
│  - Extensão VS Code       │  (GET/POST...)  │  - Consulta regras/banco  │
│                           │                 │                           │
│  Renderiza a interface    │    Resposta     │  Devolve dados puros      │
│  e reage a eventos do DOM │ <────────────── │  em formato JSON          │
└───────────────────────────┘     (JSON)      └───────────────────────────┘
```

- **Cliente (Frontend ou Consumidor):** cuida da apresentação visual ou do consumo dos dados. Pode ser um site, um aplicativo de celular, um totem de autoatendimento ou outro servidor.
- **Servidor (Backend / API em PHP):** cuida da segurança, das regras de cálculo, do acesso a bancos de dados e da validação de dados.
- **JSON:** é o idioma comum e universal entre eles — um formato leve de texto que qualquer linguagem ou plataforma consegue ler e escrever.

Uma **API (Interface de Programação de Aplicações)** funciona como o cardápio e o garçom de um restaurante: o cliente faz um pedido formal e a cozinha (servidor) devolve exatamente o prato solicitado (dados em JSON), sem que o cliente precise saber como a cozinha foi montada por dentro.

---

## 3. Anatomia de uma mensagem HTTP: Cabeçalhos (*Headers*) e Corpo (*Body*)

Toda comunicação na web acontece por meio de mensagens HTTP trocadas entre o cliente e o servidor. Para entender como uma API funciona, imagine uma **carta dentro de um envelope**:

```text
┌───────────────────────────────────────────────────────────┐
│ ENVELOPE = CABEÇALHOS (Headers / Metadados)               │
│ - Para quem é a mensagem (URL/Host)                       │
│ - Formato do conteúdo (Content-Type: application/json)    │
│ - Idioma, tamanho, data, cookies, etc.                    │
├───────────────────────────────────────────────────────────┤
│ CONTEÚDO DA CARTA = CORPO (Body / Carga Útil)             │
│                                                           │
│ {                                                         │
│   "nome": "Ana Souza",                                    │
│   "turma": "2AT"                                          │
│ }                                                         │
└───────────────────────────────────────────────────────────┘
```

### O que são os Cabeçalhos (*Headers*)?
Os cabeçalhos são **instruções técnicas e metadados** que descrevem a mensagem antes que o conteúdo principal seja lido. Eles funcionam em pares `Nome-Do-Cabecalho: Valor`.

Existem dois tipos de cabeçalhos:

#### 1. Cabeçalhos da Requisição (O Cliente fala para o Servidor):
- `Accept: application/json`: *"Olá servidor, estou esperando que você me responda em formato JSON."*
- `Content-Type: application/json`: *"Atenção servidor, os dados que estou te enviando no corpo da mensagem estão formatados em JSON."*
- `User-Agent`: identifica qual programa fez a requisição.

#### 2. Cabeçalhos da Resposta (O Servidor PHP fala para o Cliente):
- `Content-Type: application/json`: *"Atenção cliente, o texto que estou entregando no corpo é um JSON."*
- `Date`: data e hora em que a resposta foi gerada pelo servidor.
- `Status (Código HTTP)`: o resultado formal da operação (ex.: `200 OK` ou `400 Bad Request`).

### O que é o Corpo (*Body*)?
O corpo é a **carga útil de dados reais** (*payload*) transmitida. Em requisições `GET` simples de consulta, o corpo normalmente vai vazio. Em requisições `POST` de cadastro, o corpo contém os dados enviados (em texto JSON ou codificação de formulário).

---

## 4. O básico do REST (sem complicação)

O padrão **REST (Representational State Transfer)** é um conjunto de boas práticas para projetar serviços web utilizando a própria estrutura do protocolo HTTP.

Para criar APIs organizadas, você só precisa dominar dois conceitos essenciais:

### 4.1. Recursos (Identificados pela URL)
Um **recurso** é a entidade ou informação que a API disponibiliza. Em vez de criar nomes de ações na URL (como `buscarAlunos.php` ou `deletarAluno.php`), usamos substantivos que representam o dado:

- `/alunos.php` (representa a coleção de alunos)
- `/produtos.php` (representa a coleção de produtos)
- `/relatorio.php` (representa o recurso de relatório)

### 4.2. Verbos HTTP (A intenção da ação)
O verbo (ou método) HTTP indica **o que** o cliente deseja fazer com aquele recurso:

| Verbo HTTP | Ação pretendida | O que faz no PHP |
| :--- | :--- | :--- |
| **`GET`** | **Ler / Consultar** | Busca dados e entrega uma resposta sem alterar nada no servidor. |
| **`POST`** | **Criar / Inserir** | Recebe dados novos e cria um novo registro ou processa uma ação. |
| **`PUT`** ou **`PATCH`** | **Atualizar / Alterar** | Substitui ou atualiza dados de um registro existente. |
| **`DELETE`** | **Remover / Excluir** | Apaga um registro existente. |

---

## 5. O ecossistema de Clientes HTTP

Um **cliente HTTP** é qualquer software capaz de abrir uma conexão de rede, enviar uma mensagem de requisição formatada e aguardar a resposta do servidor. Uma API bem projetada não sabe e não se importa com quem é o cliente: ela apenas responde requisições válidas.

Na prática do desenvolvimento web, encontramos quatro grandes grupos de clientes:

1. **Navegadores Web:** disparam requisições `GET` ao digitar um endereço ou clicar em links comuns.
2. **JavaScript no Frontend (`fetch` / `axios`):** executa dentro de páginas web e consome APIs em segundo plano para atualizar o DOM sem recarregar a tela.
3. **Utilitários de Linha de Comando (`curl`, `httpie`):** ferramentas de terminal usadas para inspeção rápida e automação em servidores.
4. **Clientes de Desenvolvimento e Testes de API (Bruno, Postman, Insomnia):** interfaces especializadas para desenvolvedores criarem, organizarem e depurarem requisições antes ou durante a construção do frontend.

---

## 6. Testando APIs na prática: Ferramentas de desenvolvimento

Durante a construção do backend, precisamos testar nossos endpoints enviando diferentes parâmetros, corpos de requisição (`JSON` ou formulários) e verbos HTTP (`GET`, `POST`, `DELETE`), sem depender de um frontend pronto.

Para os exercícios desta disciplina, utilizaremos o **Bruno**:

- É uma ferramenta **open-source**, leve e que funciona como extensão integrada ao VS Code.
- Não exige criação de conta na nuvem nem sincronização em servidores de terceiros.
- Salva todas as requisições em **arquivos locais abertos no formato YAML (`.yaml`)**, que ficam salvos diretamente na pasta do exercício e versionados no Git junto com seu código PHP.

```text
meu-projeto/
├── api.php           (Seu script PHP backend)
└── collection/
    └── buscar.yaml   (Arquivo de requisição salvo em formato aberto YAML)
```

### Exemplo de requisições descritas em YAML:

**Requisição `GET` com parâmetros de URL:**
```yaml
name: Consultar Alunos
type: http
seq: 1

request:
  method: GET
  url: http://localhost:8080/alunos.php?turma=2AT
  headers:
    Accept: application/json
```

**Requisição `POST` com corpo JSON:**
```yaml
name: Cadastrar Aluno
type: http
seq: 2

request:
  method: POST
  url: http://localhost:8080/alunos.php
  headers:
    Content-Type: application/json
  body:
    type: json
    data:
      nome: Ana Souza
      turma: 2AT
```

---

## 7. Retornando respostas em JSON com PHP

Para transformar um script PHP em um endpoint de API que entrega JSON, seguimos três passos fundamentais:

```php
<?php

// 1. Define o cabeçalho avisando ao cliente que o corpo da resposta é JSON
header("Content-Type: application/json");

// 2. Monta os dados que serão devolvidos
$resposta = [
    "status" => "OK",
    "mensagem" => "API funcionando!",
    "horario" => date("d-m-Y H:i:s")
];

// 3. Serializa o array em formato de texto JSON e imprime na saída
echo json_encode($resposta);
```

### Por que a função `header()` é indispensável?
Sem o comando `header("Content-Type: application/json")`, o servidor PHP envia o cabeçalho padrão `text/html`. Isso faz o cliente achar que recebeu uma página web comum, desativando recursos como interpretação de dados, coloração de sintaxe e decodificação automática.

---

## 8. O contrato padrão de resposta da disciplina

Para que qualquer cliente (seja o JavaScript no frontend ou uma ferramenta de teste) consiga conversar de maneira previsível com as nossas APIs, adotamos uma estrutura de envelope consistente em todas as respostas:

### Resposta de Sucesso:
```json
{
  "status": "OK",
  "result": {
    "id": 42,
    "nome": "Ana Souza",
    "curso": "Técnico em Informática"
  },
  "message": "Registro localizado com sucesso"
}
```

### Resposta de Erro:
```json
{
  "status": "error",
  "result": null,
  "message": "Parâmetro obrigatório 'matricula' não foi informado."
}
```

---

## 9. Códigos de status HTTP com `http_response_code()`

Além do corpo JSON, todo servidor HTTP deve informar um **código de status numérico** no cabeçalho da resposta. Esse código indica formalmente se a operação deu certo ou qual foi a categoria da falha.

No PHP, definimos o código com a função `http_response_code($codigo)`:

```php
// Define o status HTTP como 400 (Requisição Inválida)
http_response_code(400);

echo json_encode([
    "status" => "error",
    "message" => "Dados incompletos"
]);
```

### Os códigos de status fundamentais:

| Código | Significado | Quando usar no seu PHP |
| :--- | :--- | :--- |
| **`200 OK`** | Sucesso padrão | Consulta realizada com sucesso ou atualização concluída. |
| **`201 Created`** | Criado com sucesso | Um novo registro foi cadastrado com sucesso via `POST`. |
| **`400 Bad Request`** | Requisição inválida | O cliente esqueceu um campo obrigatório ou enviou dados inválidos. |
| **`401 Unauthorized`** | Não autorizado | O cliente não forneceu credenciais válidas. |
| **`403 Forbidden`** | Proibido | O cliente não tem permissão para acessar o recurso. |
| **`404 Not Found`** | Não encontrado | O ID ou recurso solicitado não existe no sistema. |
| **`500 Internal Server Error`** | Erro interno | Ocorreu uma falha inesperada no servidor (ex.: erro de conexão ou sintaxe). |

---

## 10. Identificando o método da requisição no PHP

Para que um script PHP saiba qual verbo HTTP foi disparado pelo cliente, consultamos a variável superglobal `$_SERVER['REQUEST_METHOD']`:

```php
<?php

header("Content-Type: application/json");

$metodo = $_SERVER["REQUEST_METHOD"];

if ($metodo === "GET") {
    http_response_code(200);
    echo json_encode(["status" => "OK", "mensagem" => "Você realizou uma leitura (GET)"]);
    exit;
}

if ($metodo === "POST") {
    http_response_code(201);
    echo json_encode(["status" => "OK", "mensagem" => "Você enviou novos dados (POST)"]);
    exit;
}

// Se não for nenhum dos métodos aceitos pelo endpoint:
http_response_code(405);
echo json_encode([
    "status" => "error",
    "message" => "Método $metodo não permitido neste endpoint."
]);
```

---

## 11. Recebendo dados no PHP (Os 3 Canais de Entrada)

Um cliente pode enviar dados para a API de três formas principais. O PHP oferece um canal nativo específico para cada uma delas:

```text
1. Parâmetros de URL (Query String)       ───>  $_GET
2. Formulários (urlencoded / multipart)   ───>  $_POST
3. Carga de dados JSON no corpo           ───>  php://input + json_decode()
```

Vamos analisar cada um deles em detalhes.

---

## 12. Canal 1: Dados via URL com `$_GET`

Usado em requisições do tipo **`GET`** para filtros, buscas, ordenações e identificadores. Os dados trafegam anexados na própria URL após o caractere `?` no formato chave=valor:

```text
GET http://localhost:8080/calculadora.php?operacao=somar&a=10&b=5
```

### Lendo no PHP:

```php
<?php

header("Content-Type: application/json");

// Leitura com validação defensiva usando ??
$operacao = $_GET["operacao"] ?? null;
$valorA = $_GET["a"] ?? null;
$valorB = $_GET["b"] ?? null;

if ($operacao === null || $valorA === null || $valorB === null) {
    http_response_code(400);
    echo json_encode([
        "status" => "error",
        "message" => "Informe os parâmetros 'operacao', 'a' e 'b' na URL."
    ]);
    exit;
}

$resultado = null;
if ($operacao === "somar") {
    $resultado = (float)$valorA + (float)$valorB;
}

http_response_code(200);
echo json_encode([
    "status" => "OK",
    "result" => [
        "operacao" => $operacao,
        "a" => (float)$valorA,
        "b" => (float)$valorB,
        "resultado" => $resultado
    ]
]);
```

---

## 13. Canal 2: Dados de Formulário com `$_POST`

Quando um formulário tradicional HTML é enviado ou quando o cliente envia dados usando `application/x-www-form-urlencoded` ou `multipart/form-data` (objeto `FormData` do JavaScript), os dados trafegam protegidos dentro do **corpo da requisição**.

O PHP popula automaticamente a superglobal **`$_POST`**:

```php
<?php

header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    echo json_encode(["status" => "error", "message" => "Método não permitido. Use POST."]);
    exit;
}

$nome = trim($_POST["nome"] ?? "");
$email = trim($_POST["email"] ?? "");

if ($nome === "" || $email === "") {
    http_response_code(400);
    echo json_encode([
        "status" => "error",
        "message" => "Os campos 'nome' e 'email' são obrigatórios via formulário."
    ]);
    exit;
}

http_response_code(201);
echo json_encode([
    "status" => "OK",
    "result" => [
        "nome" => $nome,
        "email" => $email,
        "cadastrado_em" => date("d/m/Y H:i:s")
    ],
    "message" => "Estudante cadastrado com sucesso!"
]);
```

---

## 14. Canal 3: Carga de Dados JSON no corpo (`php://input`)

Em aplicações modernas (como clientes frontend em JavaScript, aplicativos móveis e testes de API), os dados frequentemente são enviados no corpo da requisição com o cabeçalho `Content-Type: application/json`.

> [!IMPORTANT]
> O PHP **não** preenche a variável `$_POST` quando recebe JSON puro no corpo. Para ler um payload JSON, você deve ler o fluxo de entrada bruto do PHP com `file_get_contents("php://input")` e decodificá-lo com `json_decode()`:

```php
<?php

header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    echo json_encode(["status" => "error", "message" => "Método não permitido."]);
    exit;
}

// 1. Lê o texto bruto que veio no corpo da requisição
$corpoRequisicao = file_get_contents("php://input");

// 2. Decodifica o texto JSON para um array associativo do PHP (segundo parâmetro true)
$dados = json_decode($corpoRequisicao, true);

// 3. Verifica se o JSON era válido
if (!is_array($dados)) {
    http_response_code(400);
    echo json_encode([
        "status" => "error",
        "message" => "O corpo da requisição não contém um JSON válido."
    ]);
    exit;
}

// 4. Lê e valida os campos desejados
$titulo = trim($dados["titulo"] ?? "");
$prioridade = $dados["prioridade"] ?? "normal";

if ($titulo === "") {
    http_response_code(400);
    echo json_encode([
        "status" => "error",
        "message" => "O campo 'titulo' é obrigatório no JSON."
    ]);
    exit;
}

http_response_code(201);
echo json_encode([
    "status" => "OK",
    "result" => [
        "titulo" => $titulo,
        "prioridade" => $prioridade,
        "status" => "pendente"
    ],
    "message" => "Tarefa criada a partir de payload JSON!"
]);
```

---

## 15. Comparativo dos 3 Canais de Entrada

| Formato | Como o cliente envia | Cabeçalho `Content-Type` do cliente | Como o PHP lê |
| :--- | :--- | :--- | :--- |
| **Query String** | Parâmetros na URL (`?a=1&b=2`) | *(Sem cabeçalho no corpo)* | `$_GET["campo"]` |
| **Formulário / FormData** | Dados codificados no corpo | `application/x-www-form-urlencoded` ou `multipart/form-data` | `$_POST["campo"]` |
| **JSON Puro** | Texto JSON no corpo | `application/json` | `json_decode(file_get_contents("php://input"), true)` |

---

## 16. Validação defensiva e respostas de erro estruturadas

Uma API profissional nunca deixa o interpretador disparar erros fatais ou avisos desformatados para o cliente. Toda validação deve resultar em uma resposta JSON controlada com o código HTTP apropriado.

### Padrão recomendado de validação:

```php
<?php

header("Content-Type: application/json");

$erros = [];

$nome = trim($_GET["nome"] ?? "");
$idade = $_GET["idade"] ?? null;

if ($nome === "") {
    $erros[] = "O campo 'nome' não pode ficar em branco.";
}

if ($idade === null || !is_numeric($idade) || (int)$idade <= 0) {
    $erros[] = "O campo 'idade' deve ser um número inteiro positivo.";
}

// Se houver qualquer inconsistência, encerra com erro 400
if (!empty($erros)) {
    http_response_code(400);
    echo json_encode([
        "status" => "error",
        "erros" => $erros,
        "message" => "Falha de validação nos dados recebidos."
    ]);
    exit;
}

// Se passou por todas as validações, prossegue com sucesso
http_response_code(200);
echo json_encode([
    "status" => "OK",
    "result" => [
        "nome" => $nome,
        "idade" => (int)$idade,
        "maior_de_idade" => (int)$idade >= 18
    ]
]);
```

---

## 17. Erros comuns no desenvolvimento de APIs em PHP

- **Esquecer o cabeçalho `Content-Type: application/json`:** o cliente interpretará a resposta como texto simples (`text/html`), dificultando a leitura automática.
- **Deixar comandos `echo` ou espaços antes do `json_encode()`:** imprimir mensagens soltas, avisos de erro ou tags HTML antes do JSON corrompe a sintaxe e faz o cliente rejeitar a resposta com erro de *JSON parse*.
- **Tentar ler JSON do corpo usando `$_POST`:** a superglobal `$_POST` só funciona para dados de formulário tradicional (`urlencoded` ou `multipart`). Para JSON, use sempre `php://input`.
- **Esquecer `http_response_code()` nos erros:** responder com `{ "status": "error" }`, mas manter o código HTTP como `200 OK`, confunde ferramentas de teste e clientes automáticos.
- **Esquecer `exit` após emitir uma resposta de erro:** o script continuará executando as linhas seguintes e poderá imprimir um segundo bloco de dados acidentalmente.

---

## 18. Boas práticas para APIs em PHP

1. **Mantenha os arquivos de backend limpos:** não abra e feche blocos `<?php ?>` misturados com HTML. Se o arquivo é uma API, ele deve conter exclusivamente código PHP.
2. **Adote um contrato uniforme:** use sempre os mesmos nomes de chaves (`status`, `result`, `message`) em todos os endpoints do projeto.
3. **Valide os dados antes de processar:** trate campos vazios, tipos errados e dados ausentes logo no início do script com retorno antecipado (`exit`).
4. **Organize seus testes:** salve as requisições em arquivos `.yaml` dentro da pasta do exercício para que qualquer pessoa consiga testar sua API rapidamente.
5. **Use os verbos HTTP corretos:** use `GET` apenas para leituras e `POST` para operações que criam ou processam dados no servidor.

---

## 19. Resumo final

- Uma API web é um serviço de backend que recebe requisições HTTP e entrega dados puros (normalmente em JSON), atendendo a **qualquer cliente** de forma agnóstica.
- Em toda mensagem HTTP, os **cabeçalhos (*headers*)** contêm metadados técnicos (como o `Content-Type` e o código de status), enquanto o **corpo (*body*)** carrega os dados reais.
- O padrão REST utiliza substantivos para nomear recursos (`/alunos.php`) e verbos HTTP para expressar ações (`GET`, `POST`, `PUT`, `DELETE`).
- O **Bruno** é a nossa ferramenta de testes na disciplina, executando requisições salvas em arquivos locais no formato **YAML** (`.yaml`).
- O PHP sinaliza que está entregando JSON com `header("Content-Type: application/json")` e serializa dados com `json_encode()`.
- O código de status (`http_response_code()`) informa formalmente se a requisição resultou em sucesso (`200`/`201`) ou falha (`400`/`404`/`405`).
- Os dados chegam ao PHP por três canais bem definidos: `$_GET` (parâmetros de URL), `$_POST` (formulários) e `file_get_contents("php://input")` (cargas JSON).

---
marp: true
theme: ifsul
header: ' '
footer: 'Instituto Federal Sul-rio-grandense | Campus Charqueadas'
---

<!-- _class: lead -->

# Programação Web I
## Introdução a APIs e Serviços Web no PHP

Prof. Pablo Werlang
pablowerlang@ifsul.edu.br

---

# APIs e Serviços Web
## O novo papel do PHP no servidor

<div class="grid grid-cols-2 gap-6">
<div>

- O PHP deixa de misturar lógica com tags HTML
- Assume o papel de **serviço de backend**
- Recebe requisições e processa regras de negócio
- Devolve dados puros em formato **JSON**

</div>
<div class="media mx-auto">

```text
┌────────────────┐
│    Cliente     │
│ (Navegador/App/│
│  JS / Testes)  │
└───────┬────────┘
        │ HTTP (GET/POST...)
        ▼
┌────────────────┐
│   API em PHP   │ ──► JSON
└────────────────┘
```

</div>
</div>

---

# APIs e Serviços Web
## Arquitetura Cliente-Servidor

<div class="grid grid-cols-2 gap-6">
<div>

**Qualquer Cliente**

- Cuida da interface ou do consumo
- Dispara eventos e requisições
- Exemplos:
  - Navegador Web
  - Frontend JS com `fetch()`
  - Aplicativo Mobile
  - Ferramenta de Testes

</div>
<div>

**Servidor (Backend / API)**

- Cuida da segurança e regras
- Acessa banco de dados e arquivos
- Valida entradas de forma defensiva
- Devolve respostas padronizadas em JSON

</div>
</div>

---

# APIs e Serviços Web
## O que é uma API?

- **API** = *Application Programming Interface*
- É a ponte de comunicação entre o cliente e o servidor
- Uma API bem projetada **atende a qualquer cliente** de forma agnóstica

<div class="media mx-auto mt-4">

> **Analogia do Restaurante:**
> O cliente faz o pedido no cardápio $\rightarrow$ o garçom (API) leva até a cozinha $\rightarrow$ a cozinha (PHP) prepara o prato e entrega exatamente o que foi pedido (JSON).

</div>

---

# APIs e Serviços Web
## Anatomia HTTP: Envelope e Carta

Toda mensagem na web é dividida em duas partes essenciais:

<div class="grid grid-cols-2 gap-6">
<div>

**Cabeçalhos (*Headers*) = O Envelope**

- Instruções técnicas e metadados
- Formato do conteúdo (`Content-Type`)
- Código de status (`200`, `400`, `404`)
- Data, tamanho e identificação

</div>
<div>

**Corpo (*Body*) = A Carta**

- A carga real de dados (*payload*)
- O texto JSON retornado
- Ou os dados enviados por formulário
- Pode ir vazio em requisições `GET`

</div>
</div>

---

# APIs e Serviços Web
## O básico do REST: Recursos na URL

- Um **recurso** representa a entidade manipulada
- Usamos **substantivos** para nomear as rotas

<div class="grid grid-cols-2 gap-6">
<div>

**Abordagem Antiga (com verbos) ❌**

- `/buscarEstudantes.php`
- `/salvarEstudante.php`
- `/excluirEstudante.php`

</div>
<div>

**Abordagem REST (com recursos) ✅**

- `/estudantes` (com `GET`)
- `/estudantes` (com `POST`)
- `/estudantes` (com `DELETE`)

</div>
</div>

---

# APIs e Serviços Web
## O básico do REST: Verbos HTTP

O verbo HTTP indica a **intenção** da ação:

| Verbo | Intenção | O que o PHP faz |
| :--- | :--- | :--- |
| **`GET`** | Ler / Consultar | Busca dados sem alterar o servidor |
| **`POST`** | Criar / Inserir | Recebe dados novos e salva no sistema |
| **`PUT`** | Atualizar | Altera informações de um registro existente |
| **`DELETE`** | Excluir | Remove um registro do sistema |

---

# APIs e Serviços Web
## O ecossistema de Clientes HTTP

1. **Navegadores Web:** consultas diretas `GET` na barra de endereços
2. **JavaScript no Frontend (`fetch`):** atualiza o DOM em segundo plano
3. **Linha de Comando (`curl`):** inspeção rápida no terminal
4. **Clientes de Teste (Bruno, Postman):** simulam qualquer requisição no desenvolvimento

---

# APIs e Serviços Web
## Testando APIs no desenvolvimento

- Como testar o backend antes de criar o frontend?
- Usamos o **Bruno** (extensão leve e open-source no VS Code)
- Salva requisições em **arquivos locais YAML (`.yaml`)**
- Fica versionado no Git junto com seus scripts PHP!

```text
meu-projeto/
├── api.php
└── collection/
    ├── buscar.yaml
    └── cadastrar.yaml
```

---

# APIs e Serviços Web
## Requisições de teste em YAML

<div class="grid grid-cols-2 gap-6">
<div>

**Consulta GET (`buscar.yaml`)**

```yaml
name: Consultar Alunos
type: http
seq: 1

request:
  method: GET
  url: http://localhost:8080/alunos.php?turma=2AT
```

</div>
<div>

**Cadastro POST (`cadastrar.yaml`)**

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
```

</div>
</div>

---

# APIs e Serviços Web
## Retornando JSON com PHP

Três passos para transformar o PHP em uma API:

```php
<?php
// 1. Avisa o cliente que a resposta é JSON
header("Content-Type: application/json");

// 2. Monta os dados em array/variável
$resposta = [
    "status" => "OK",
    "mensagem" => "API funcionando com sucesso!"
];

// 3. Serializa e imprime na saída
echo json_encode($resposta);
```

**Sem `header()`, o cliente pode tratar o retorno como página HTML comum.**

---

# APIs e Serviços Web
## O contrato padrão da disciplina

Adotamos um envelope consistente em todas as respostas:

<div class="grid grid-cols-2 gap-6">
<div>

**Sucesso (`status: "OK"`)**

```json
{
  "status": "OK",
  "result": {
    "id": 42,
    "nome": "Ana Souza"
  },
  "message": "Encontrado com sucesso"
}
```

</div>
<div>

**Erro (`status: "error"`)**

```json
{
  "status": "error",
  "result": null,
  "message": "Matrícula não informada"
}
```

</div>
</div>

---

# APIs e Serviços Web
## Códigos de status com `http_response_code()`

O código numérico formaliza o resultado no cabeçalho HTTP:

```php
http_response_code(400); // 400 Bad Request

echo json_encode([
    "status" => "error",
    "message" => "Parâmetros ausentes."
]);
```

- **`200 OK`**: consulta ou operação realizada com sucesso
- **`201 Created`**: novo registro cadastrado com sucesso
- **`400 Bad Request`**: dados obrigatórios ausentes ou inválidos
- **`401 Unauthorized`**: usuário não autenticado
- **`403 Forbidden`**: usuário não autorizado a acessar o recurso
- **`404 Not Found`**: recurso ou item não encontrado
- **`500 Internal Server Error`**: erro inesperado no backend

---

# APIs e Serviços Web
## Identificando o método no PHP

Consulte `$_SERVER['REQUEST_METHOD']` para saber qual verbo foi disparado:

```php
<?php
header("Content-Type: application/json");

$metodo = $_SERVER["REQUEST_METHOD"];

if ($metodo === "GET") {
    http_response_code(200);
    echo json_encode(["status" => "OK", "mensagem" => "Leitura realizada"]);
    exit;
}

if ($metodo === "POST") {
    http_response_code(201);
    echo json_encode(["status" => "OK", "mensagem" => "Cadastro realizado"]);
    exit;
}
```

---

# APIs e Serviços Web
## Os 3 Canais de Entrada no PHP

Como os dados chegam ao backend a partir de qualquer cliente:

<div class="grid grid-cols-3 gap-4">
<div>

**1. URL (`$_GET`)**
- Parâmetros na query string
- `?nome=Ana&turma=2AT`
- Buscas, filtros e listagens

</div>
<div>

**2. Formulário (`$_POST`)**
- Dados codificados no corpo
- Formulários HTML ou `FormData`
- Cadastros e envios

</div>
<div>

**3. JSON (`php://input`)**
- Objeto JSON no corpo
- Cargas de SPAs e APIs
- Leitura com `json_decode()`

</div>
</div>

---

# APIs e Serviços Web
## Canal 1: Dados via URL com `$_GET`

Requisição: `GET /calculadora.php?operacao=somar&a=10&b=5`

```php
<?php
header("Content-Type: application/json");

$operacao = $_GET["operacao"] ?? null;
$a = $_GET["a"] ?? null;
$b = $_GET["b"] ?? null;

if ($operacao === null || $a === null || $b === null) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Informe operacao, a e b"]);
    exit;
}

$resultado = ($operacao === "somar") ? (float)$a + (float)$b : null;

echo json_encode(["status" => "OK", "resultado" => $resultado]);
```

---

# APIs e Serviços Web
## Canal 2: Formulários com `$_POST`

Dados enviados via formulário tradicional ou `FormData`:

```php
<?php
header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    echo json_encode(["status" => "error", "message" => "Use POST"]);
    exit;
}

$nome = trim($_POST["nome"] ?? "");
$email = trim($_POST["email"] ?? "");

if ($nome === "" || $email === "") {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Campos obrigatórios"]);
    exit;
}

http_response_code(201);
echo json_encode(["status" => "OK", "result" => ["nome" => $nome, "email" => $email]]);
```

---

# APIs e Serviços Web
## Canal 3: Carga JSON com `php://input`

O PHP **não** preenche `$_POST` quando recebe JSON puro:

```php
<?php
header("Content-Type: application/json");

// 1. Lê o fluxo bruto do corpo
$corpo = file_get_contents("php://input");

// 2. Decodifica para array associativo do PHP
$dados = json_decode($corpo, true);

if (!is_array($dados) || empty($dados["titulo"])) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "JSON inválido ou sem título"]);
    exit;
}

http_response_code(201);
echo json_encode(["status" => "OK", "titulo" => $dados["titulo"]]);
```

---

# APIs e Serviços Web
## Resumo dos 3 formatos de entrada

| Formato | Como o cliente envia | Cabeçalho do Cliente | Como o PHP lê |
| :--- | :--- | :--- | :--- |
| **Query String** | URL (`?a=1&b=2`) | *(Sem cabeçalho no corpo)* | `$_GET["campo"]` |
| **Formulário** | Corpo codificado | `application/x-www-form-urlencoded` | `$_POST["campo"]` |
| **JSON Puro** | Texto JSON no corpo | `application/json` | `json_decode(file_get_contents("php://input"), true)` |

---

# APIs e Serviços Web
## Validação defensiva no backend

Sempre valide os dados antes de prosseguir com a lógica:

```php
$erros = [];
$nome = trim($_GET["nome"] ?? "");
$idade = $_GET["idade"] ?? null;

if ($nome === "") $erros[] = "Nome é obrigatório";
if ($idade === null || !is_numeric($idade)) $erros[] = "Idade inválida";

if (!empty($erros)) {
    http_response_code(400);
    echo json_encode(["status" => "error", "erros" => $erros]);
    exit; // Importante: interrompe a execução!
}
```

---

# APIs e Serviços Web
## Erros mais comuns

- **Esquecer `header("Content-Type: application/json")`**
- **Deixar `echo` soltos ou tags HTML antes do `json_encode()`** $\rightarrow$ corrompe o JSON!
- **Tentar ler JSON usando `$_POST`** $\rightarrow$ use `php://input`
- **Esquecer `http_response_code()` nos erros**
- **Esquecer de colocar `exit` após responder com erro**

---

<!-- _class: divider -->

# Hora de Praticar

---

# APIs e Serviços Web
## Prática: Criando e testando endpoints

- Configurar a extensão do Bruno no VS Code
- Criar requisições em arquivos `.yaml`
- Testar endpoints com parâmetros `$_GET`
- Testar endpoints que recebem `POST` e payloads JSON
- Inspecionar códigos de status e respostas JSON

---

# APIs e Serviços Web
## O que precisa ficar

1. **O backend entrega dados (JSON) para qualquer cliente de forma agnóstica**
2. **REST usa recursos na URL e verbos HTTP como intenção**
3. **Cabeçalhos (*headers*) carregam metadados; o corpo (*body*) carrega os dados**
4. **O PHP recebe dados por 3 canais: `$_GET`, `$_POST` e `php://input`**
5. **Usamos o Bruno com arquivos YAML para testar nossos endpoints na prática**

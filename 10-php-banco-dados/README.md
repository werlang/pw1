# Programação Web I - Banco de Dados com PHP e PDO

## 1. O que este guia ensina

Esta seção conecta o PHP a um banco de dados relacional (MySQL). O objetivo é utilizar o PDO (**PHP Data Objects**) para abrir a conexão com segurança, executar comandos SQL utilizando consultas preparadas (*prepared statements*) e devolver respostas previsíveis e estruturadas em formato JSON para o front-end.

Ao final deste guia, você deve conseguir:

- explicar o papel de tabelas, linhas, colunas, chaves primárias e estrangeiras em um banco relacional;
- criar uma conexão PDO com opções adequadas de tratamento de erros e formatação;
- separar o arquivo de conexão dos endpoints da API;
- proteger credenciais sensíveis utilizando variáveis de ambiente (`getenv()`, `.env` e `.gitignore`);
- compreender o perigo do SQL Injection e por que consultas preparadas são obrigatórias;
- executar comandos `INSERT`, `SELECT`, `UPDATE` e `DELETE` com parâmetros posicionais (`?`) ou nomeados (`:nome`);
- diferenciar a leitura de uma única linha (`fetch()`) da leitura de múltiplas linhas (`fetchAll()`);
- recuperar o identificador de um registro recém-criado com `lastInsertId()`;
- verificar a quantidade de linhas afetadas por uma operação com `rowCount()`;
- armazenar senhas com hash criptográfico seguro (`password_hash()`) e conferir credenciais no login (`password_verify()`);
- tratar exceções (`PDOException`) e erros de unicidade sem vazar informações internas do servidor;
- aplicar o conceito de transação (*tudo ou nada*) para operações interdependentes;
- paginar consultas grandes com `LIMIT` e `OFFSET`;
- estruturar endpoints de API claros seguindo o padrão CRUD.

---

## 2. Da requisição até o banco

Quando uma aplicação web precisa salvar ou consultar informações persistentes, o fluxo percorre seis etapas bem delimitadas:

```text
[Navegador / HTML]
       │
       ▼ (1. Interação do usuário)
[JavaScript / fetch()]
       │
       ▼ (2. Requisição HTTP com JSON ou FormData)
[Endpoint PHP]
       │
       ▼ (3. Validação de dados e preparação do SQL com PDO)
[Banco de Dados MySQL]
       │
       ▼ (4. Execução do SQL com dados isolados; retorna linhas ou status)
[Endpoint PHP]
       │
       ▼ (5. Organização dos dados e emissão de código HTTP)
[JavaScript / fetch()]
       │
       ▼ (6. Resposta JSON recebida; atualização cirúrgica do DOM)
[Interface do Usuário]
```

1. **O usuário interage com o documento HTML:** preenche um formulário ou clica em uma ação da tela.
2. **O JavaScript envia a requisição:** intercepta o evento, empacota os dados e dispara um `fetch()` para o servidor.
3. **O PHP valida os dados:** lê os parâmetros recebidos (`$_POST`, `$_GET` ou corpo JSON) e verifica as regras básicas.
4. **O PDO prepara o SQL e separa os valores:** o comando SQL é enviado ao MySQL antes dos dados, garantindo proteção contra injeções maliciosas.
5. **O banco executa a operação:** o MySQL processa a instrução e devolve as linhas encontradas ou a contagem de registros afetados.
6. **O PHP responde em JSON com status HTTP:** organiza o resultado (ou mensagem de erro) e encerra a resposta para que o front-end atualize a tela.

> **Regra de arquitetura:** O navegador **nunca** se conecta diretamente ao banco de dados MySQL. O PHP é o único responsável por conversar com o banco. Usuário, senha e comandos SQL residem no servidor; para o navegador trafegam unicamente requisições HTTP e respostas JSON.

---

## 3. Conceitos relacionais básicos

Para modelar informações no MySQL, pense em uma planilha onde cada aba representa um assunto específico:

- **Banco de dados (*database*):** conjunto organizado de tabelas e estruturas que pertencem a um mesmo sistema.
- **Tabela (*table*):** coleção de registros sobre um único assunto, como `users` ou `produtos`.
- **Linha ou registro (*row*):** uma ocorrência concreta de dados dentro da tabela (por exemplo, a conta da aluna Ana Souza).
- **Coluna ou campo (*column*):** uma propriedade que toda linha possui (por exemplo, `name`, `email`, `created_at`).
- **Chave primária (*primary key*):** uma coluna com valor único (normalmente `id` inteiro com auto incremento) que identifica cada registro sem qualquer ambiguidade.
- **Chave estrangeira (*foreign key*):** uma coluna que armazena o `id` de um registro em outra tabela, estabelecendo um relacionamento entre elas.
- **Restrição (*constraint*):** regra obrigatória aplicada pelo próprio banco de dados, como `NOT NULL` (campo obrigatório) ou `UNIQUE` (valor que não pode se repetir na tabela).

Exemplo de estrutura em SQL:

```sql
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);
```

As validações realizadas no código PHP melhoram a experiência do usuário com mensagens claras. As restrições definidas no banco de dados garantem a integridade física e a consistência dos dados, mesmo que o código da aplicação falhe.

---

## 4. O que é PDO

**PDO** significa **PHP Data Objects**. É uma extensão nativa do PHP que fornece uma interface orientada a objetos consistente para interagir com bancos de dados relacionais (como MySQL, PostgreSQL, SQLite e MariaDB).

Principais vantagens do PDO:

- **Abstração de acesso:** o código de conexão e execução mantém praticamente a mesma sintaxe independentemente do banco relacional utilizado.
- **Consultas preparadas nativas:** separa a estrutura do comando SQL dos valores recebidos, bloqueando ataques de SQL Injection.
- **Tratamento moderno de falhas:** converte erros de banco em exceções da classe `PDOException`, evitando que erros passem despercebidos ou falhem em silêncio.
- **Flexibilidade na leitura:** permite obter resultados como arrays associativos, arrays numéricos ou objetos.
- **Suporte a transações:** permite coordenar múltiplas instruções em um bloco atômico seguro.

> **Atenção:** O PDO gerencia a comunicação e o envio de comandos, mas **não substitui** o conhecimento da linguagem SQL. Você ainda escreve os comandos `SELECT`, `INSERT`, `UPDATE` e `DELETE`.

---

## 5. Abrindo a conexão

Para criar uma conexão com o banco de dados MySQL, instanciamos a classe `PDO` informando três elementos: a string de conexão (chamada de **DSN**), o usuário do banco e a respectiva senha:

```php
<?php

$user = "root";
$password = "senha-do-ambiente";
$host = "localhost";
$dbname = "aula";

$options = [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION, // Lança exceção em caso de erro
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC // Retorna arrays associativos
];

$conn = new PDO(
    "mysql:host=$host;dbname=$dbname;charset=utf8mb4",
    $user,
    $password,
    $options
);
```

### O que compõe a string DSN (*Data Source Name*)?

- `mysql:` define o driver do banco a ser utilizado.
- `host=localhost`: indica o endereço do servidor de banco. Ao rodar nativamente no computador do desenvolvedor, usa-se `localhost`. Dentro de ambientes Docker ou containers, o host costuma ser o **nome do serviço**, como `mysql`.
- `dbname=aula`: seleciona o nome da base de dados com a qual a aplicação vai operar.
- `charset=utf8mb4`: instrui a conexão a utilizar o conjunto de caracteres UTF-8 completo, garantindo suporte correto a acentuação em português e caracteres especiais.

### Opções fundamentais de configuração:

1. `PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION`: por padrão antigo, o PDO podia falhar silenciosamente ou apenas definir códigos de aviso. Configurar para lançar exceções garante que qualquer erro de SQL interrompa o fluxo e possa ser capturado com `try...catch`.
2. `PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC`: faz com que as consultas devolvam arrays associativos indexados pelos nomes das colunas da tabela (ex.: `$linha["name"]`), em vez de arrays misturados com números e nomes.

---

## 6. Protegendo informações sensíveis e separando a conexão

### 1. Separe a conexão em um arquivo único (`connection.php`)

Nunca repita o bloco `new PDO(...)` em cada endpoint da sua aplicação. Centralize a criação da variável `$conn` em um arquivo dedicado:

```text
api/
├── connection.php
└── index.php
```

Em cada endpoint da API, basta incluir a conexão com uma única linha no topo:

```php
<?php

require __DIR__ . "/connection.php";
// A partir daqui, a variável $conn já está conectada e pronta para uso.
```

### 2. O risco de senhas no código e o uso de variáveis de ambiente

Deixar a senha do banco de dados escrita diretamente em texto puro dentro do arquivo `connection.php`, mesmo que o arquivo não seja acessível pelo navegador, é uma falha grave de segurança. Se o projeto for enviado para um repositório no GitHub ou compartilhado com colegas, as credenciais de acesso ficarão expostas a qualquer pessoa.

A prática profissional consiste em carregar credenciais a partir de **variáveis de ambiente**:

- **No código PHP (`connection.php`):** lê a senha do ambiente com a função `getenv()`:

```php
$user = getenv("DB_USER") ?: "root";
$password = getenv("DB_PASSWORD") ?: "senha-padrao";
$host = getenv("DB_HOST") ?: "mysql";
$dbname = getenv("DB_NAME") ?: "aula";
```

- **No arquivo `.env` (na raiz do projeto):** armazena as credenciais locais reais sem expô-las no código-fonte:

```text
DB_USER=root
DB_PASSWORD=senha-do-ambiente
DB_HOST=mysql
DB_NAME=aula
```

- **No arquivo `.gitignore`:** impede que o arquivo `.env` seja versionado e enviado ao repositório Git:

```text
.env
```

Dessa forma, cada programador ou servidor de produção mantém seu próprio arquivo `.env` com senhas seguras, sem que nenhum segredo viaje para o controle de versão.

---

## 7. SQL Injection: quando dado vira comando

O **SQL Injection** ocorre quando dados fornecidos pelo usuário são concatenados diretamente na string do comando SQL, permitindo que caracteres maliciosos alterem a estrutura lógica da instrução executada pelo banco.

Veja este exemplo vulnerável de cadastro:

```php
// ❌ NUNCA FAÇA ISSO: valor inserido diretamente por interpolação de string!
$sql = "INSERT INTO users (name, email) VALUES ('$name', '$email')";
```

Se um usuário preencher normalmente `name: Bob` e `email: bob@email.com`, o comando funciona:

```sql
INSERT INTO users (name, email) VALUES ('Bob', 'bob@email.com');
```

Agora veja o que acontece se um invasor enviar os seguintes valores no formulário:
- **name:** `Bob`
- **email:** `'); DROP TABLE users; --`

O PHP substitui a variável e monta a seguinte string SQL para envio:

```sql
INSERT INTO users (name, email) VALUES ('Bob', ''); DROP TABLE users; --');
```

Observe o desastre:
1. As aspas simples e o parêntese fecham antecipadamente a cláusula de inserção (`'');`).
2. O ponto e vírgula encerra o comando original e inicia um novo comando arbitrário: `DROP TABLE users;`.
3. Os dois traços (`--`) transformam todo o restante da linha original em um comentário, evitando erros de sintaxe.
4. Ao executar essa linha, a tabela inteira de usuários é apagada do banco!

> **Lição essencial:** Não tente resolver esse problema com funções de substituição de texto ou validações manuais de formato. A única defesa definitiva e correta contra SQL Injection é o uso de **consultas preparadas**.

---

## 8. Consultas preparadas: SQL e dados viajam separados

Nas **consultas preparadas (*prepared statements*)**, o ciclo de comunicação com o banco é dividido em duas etapas rigorosamente isoladas:

1. **Envio da estrutura:** o PHP envia apenas o esqueleto do comando SQL para o banco, utilizando **marcadores de posição** no lugar dos dados reais. O banco compila o comando, valida a sintaxe e prepara o plano de execução.
2. **Envio dos dados:** o PHP chama o método `execute()`, enviando os valores separadamente.

Como a estrutura do SQL já foi compilada pelo banco na primeira etapa, qualquer caractere especial enviado depois (como aspas, ponto e vírgula ou palavras-chave) é interpretado estritamente como **dado textual puro**, e nunca como código executável.

Existem duas formas de declarar marcadores em consultas preparadas:

### 1. Marcadores posicionais (`?`)

Utilizam o caractere `?` como espaço reservado. No método `execute()`, você passa um array sequencial com os valores:

```php
$sql = "INSERT INTO users (name, email) VALUES (?, ?)";

$stmt = $conn->prepare($sql);
$stmt->execute([$name, $email]);
```

- O primeiro valor do array (`$name`) preenche o primeiro `?`.
- O segundo valor (`$email`) preenche o segundo `?`.
- **Regra:** a **ordem** dos itens no array deve corresponder rigorosamente à ordem dos pontos de interrogação no SQL.

### 2. Marcadores nomeados (`:nome`)

Utilizam rótulos identificados pelo prefixo `:` no comando SQL. No método `execute()`, você passa um array associativo onde as chaves correspondem aos nomes dos marcadores:

```php
$sql = "INSERT INTO users (name, email) VALUES (:name, :email)";

$stmt = $conn->prepare($sql);
$stmt->execute([
    "name" => $name,
    "email" => $email
]);
```

- No SQL, usamos `:name` e `:email`.
- No `execute()`, associamos cada marcador ao seu respectivo valor.
- **Vantagem:** a ordem dos elementos no array associativo não interfere no funcionamento, facilitando a leitura e a manutenção em comandos com muitos campos.

---

## 9. Marcadores posicionais vs. Marcadores nomeados: comparativo

| Característica | Marcadores Posicionais (`?`) | Marcadores Nomeados (`:nome`) |
| :--- | :--- | :--- |
| **Sintaxe no SQL** | `VALUES (?, ?)` | `VALUES (:name, :email)` |
| **Array no `execute()`** | Array indexado: `[$val1, $val2]` | Array associativo: `["name" => $val1, ...]` |
| **Importância da ordem** | **Crítica**: a ordem dos valores deve ser idêntica | **Irrelevante**: o casamento ocorre pelo nome da chave |
| **Legibilidade em comandos longos** | Baixa quando há muitas colunas | Alta; cada dado está explicitamente rotulado |
| **Uso mais indicado** | Comandos curtos (`WHERE id = ?`) | Comandos com múltiplos campos (`INSERT`, `UPDATE`) |

---

## 10. Leitura com `SELECT`: `fetch()` ou `fetchAll()`?

Quando executamos uma consulta `SELECT`, o banco de dados encontra os registros correspondentes e os mantém disponíveis em um cursor de resultados. No PHP, precisamos escolher como ler essas linhas.

```text
┌──────────────────────────────────────┐
│           CURSOR DE LINHAS           │
│  [ Linha 1: id=1, name="Ana" ]       │
│  [ Linha 2: id=2, name="Bob" ]       │
│  [ Linha 3: id=3, name="Carlos" ]    │
└──────────────────────────────────────┘
        │                      │
        ▼                      ▼
  fetch() (uma por vez)    fetchAll() (todas juntas)
```

### Leitura de uma única linha com `fetch()`

O método `fetch()` consome e retorna uma única linha por vez como array associativo. Quando não há mais linhas a serem lidas, ele retorna `false`.

É a escolha ideal para buscas por identificador único ou login por e-mail:

```php
$stmt = $conn->prepare("SELECT id, name, email FROM users WHERE id = ?");
$stmt->execute([$id]);
$user = $stmt->fetch();

// Se o id não existir no banco, $user será false:
if (!$user) {
    http_response_code(404);

    echo json_encode([
        "error" => true,
        "message" => "Usuário não encontrado."
    ]);

    exit;
}

echo json_encode([
    "user" => $user
]);
```

### Leitura de múltiplas linhas com `fetchAll()`

O método `fetchAll()` carrega todas as linhas retornadas pela consulta de uma só vez para dentro de um array do PHP:

```php
$stmt = $conn->prepare("SELECT id, name, email FROM users ORDER BY name LIMIT 20");
$stmt->execute();
$users = $stmt->fetchAll();

echo json_encode([
    "users" => $users
]);
```

> **Aviso de segurança e desempenho:**
> 1. `fetchAll()` guarda todo o resultado na memória RAM do PHP. Para coleções com centenas ou milhares de linhas, utilize sempre **paginação com `LIMIT` e `OFFSET`**.
> 2. **Nunca faça `SELECT *` em endpoints de usuários.** O caractere curinga `*` trará também a coluna `password`. Se esse array for convertido em JSON com `echo json_encode($users)`, os hashes das senhas de todos os usuários serão vazados publicamente na resposta da API! Liste explicitamente apenas as colunas que a interface precisa exibir.

---

## 11. Inserção com `INSERT` e recuperação do identificador gerado

Ao inserir um novo registro no banco, o comando SQL não retorna as colunas criadas por padrão. Para saber qual número de `id` foi atribuído automaticamente pelo banco, utilizamos o método `lastInsertId()` da própria conexão `$conn`:

```php
$sql = "INSERT INTO users (name, email, password)
        VALUES (:name, :email, :password)";

$stmt = $conn->prepare($sql);
$stmt->execute([
    "name" => $name,
    "email" => $email,
    "password" => $hash
]);

// Recupera o ID gerado pelo campo AUTO_INCREMENT:
$novoId = $conn->lastInsertId();

// Resposta semântica de criação bem-sucedida:
http_response_code(201);

echo json_encode([
    "id" => (int)$novoId,
    "name" => $name,
    "email" => $email,
    "message" => "Usuário cadastrado com sucesso."
]);
```

- `lastInsertId()` devolve o identificador gerado na última operação de inserção executada por aquela conexão.
- Em APIs RESTful bem projetadas, requisições de criação bem-sucedidas respondem com o status HTTP `201 Created`.
- Note que devolvemos o `id`, `name` e `email`, mas **nunca o hash da senha**.

---

## 12. Atualização com `UPDATE`

Comandos de atualização alteram registros já existentes a partir de uma condição estipulada na cláusula `WHERE`:

```php
$sql = "UPDATE users SET name = :name WHERE id = :id";

$stmt = $conn->prepare($sql);
$stmt->execute([
    "name" => $name,
    "id" => $id
]);

echo json_encode([
    "id" => (int)$id,
    "message" => "Nome atualizado com sucesso."
]);
```

Antes de executar qualquer operação de atualização em uma aplicação real, confira:
1. se o identificador recebido é numérico e válido;
2. se os novos dados satisfazem as regras de validação;
3. se o usuário autenticado na sessão tem permissão para alterar aquele recurso específico.

---

## 13. Exclusão com `DELETE` e verificação com `rowCount()`

A exclusão é uma operação destrutiva permanente. Para saber se o registro de fato existia e foi removido pelo banco, inspecionamos o retorno do método `rowCount()`:

```php
$stmt = $conn->prepare("DELETE FROM users WHERE id = ?");
$stmt->execute([$id]);

// rowCount() devolve a quantidade de linhas afetadas:
if ($stmt->rowCount() === 0) {
    http_response_code(404);

    echo json_encode([
        "error" => true,
        "message" => "Registro não encontrado para exclusão."
    ]);

    exit;
}

echo json_encode([
    "id" => (int)$id,
    "message" => "Usuário removido com sucesso."
]);
```

- O método `rowCount()` devolve quantas linhas foram modificadas ou removidas por comandos `INSERT`, `UPDATE` ou `DELETE`.
- Se `rowCount() === 0` em um `DELETE`, significa que nenhum registro possuía aquele `id`, permitindo responder adequadamente com o status HTTP `404 Not Found`.

> **Atenção:** Não utilize `rowCount()` para contar quantas linhas foram retornadas em uma consulta `SELECT`. Nem todos os drivers de banco implementam essa contagem de forma portável; para saber o total de linhas em consultas, utilize `COUNT(*)` no SQL ou `count($array)` no PHP após `fetchAll()`.

---

## 14. O padrão CRUD

O termo **CRUD** sintetiza as quatro operações fundamentais de persistência em qualquer sistema de dados:

| Operação | SQL | Verbo HTTP | Objetivo pedagógico |
| :--- | :--- | :--- | :--- |
| **Create** (Criar) | `INSERT` | `POST` | Cadastrar um novo recurso e devolver seu identificador (`201 Created`). |
| **Read** (Ler/Consultar) | `SELECT` | `GET` | Consultar uma lista de recursos ou os detalhes de um item específico (`200 OK`). |
| **Update** (Atualizar) | `UPDATE` | `PUT` ou `PATCH` | Modificar as propriedades de um registro existente. |
| **Delete** (Excluir) | `DELETE` | `DELETE` | Remover permanentemente um registro do banco de dados. |

Em endpoints de API, mantenha cada arquivo responsável por uma operação explícita e faça o método HTTP coincidir com a intenção da operação.

---

## 15. Senhas no banco: hash no cadastro e conferência no login

### 1. No cadastro: nunca salve a senha em texto puro

Senhas nunca devem ser salvas como texto legível no banco de dados. Se o banco sofrer um vazamento, todas as contas dos usuários ficariam imediatamente comprometidas.

No PHP moderno, utilizamos a função nativa `password_hash()`:

```php
// Gera um hash criptográfico seguro com salt aleatório embutido:
$hash = password_hash($senha, PASSWORD_DEFAULT);

$stmt = $conn->prepare(
    "INSERT INTO users (name, email, password)
     VALUES (:name, :email, :password)"
);

$stmt->execute([
    "name" => $name,
    "email" => $email,
    "password" => $hash
]);
```

- `password_hash()` utiliza internamente o algoritmo Bcrypt (ou Argon2), gerando uma string criptográfica resistente a ataques de força bruta.
- A coluna da tabela no MySQL deve possuir espaço suficiente para armazenar o hash: declare sempre `VARCHAR(255)`.

### 2. No login: confere e-mail e senha sem vazar segredos

Para verificar se a senha digitada pelo usuário confere com o hash armazenado, consultamos o usuário pelo e-mail e usamos a função `password_verify()`:

```php
$stmt = $conn->prepare("SELECT id, name, email, password FROM users WHERE email = ?");
$stmt->execute([$email]);
$user = $stmt->fetch();

// Se o usuário não existe OU se a senha digitada não bate com o hash:
if (!$user || !password_verify($senhaDigitada, $user["password"])) {
    http_response_code(401);

    echo json_encode([
        "error" => true,
        "message" => "Credenciais inválidas."
    ]);

    exit;
}

// Login bem-sucedido:
echo json_encode([
    "message" => "Login realizado com sucesso.",
    "user" => [
        "id" => $user["id"],
        "name" => $user["name"],
        "email" => $user["email"]
    ]
]);
```

> **Boas práticas de autenticação:** Observe que a mensagem de erro é genérica: *"Credenciais inválidas"*, com código `401 Unauthorized`. Nunca informe separadamente se o e-mail não foi encontrado ou se a senha estava errada; mensagens específicas permitem que invasores descubram quais e-mails estão cadastrados no seu sistema (*user enumeration*).

---

## 16. Tratamento de exceções com `PDOException`

Quando o modo de erro está configurado como `PDO::ERRMODE_EXCEPTION`, qualquer falha na sintaxe do comando, queda de conexão ou violação de integridade dispara um objeto da classe `PDOException`.

Essas exceções devem ser capturadas com `try...catch`:

```php
header("Content-Type: application/json; charset=utf-8");

try {
    $stmt = $conn->prepare("DELETE FROM users WHERE id = ?");
    $stmt->execute([$id]);

    echo json_encode([
        "id" => (int)$id,
        "message" => "Operação realizada com sucesso."
    ]);
} catch (PDOException $error) {
    // 1. Grava o detalhe técnico nos logs internos do servidor:
    error_log($error->getMessage());

    // 2. Responde ao cliente com status 500 e mensagem amigável:
    http_response_code(500);

    echo json_encode([
        "error" => true,
        "message" => "Não foi possível concluir a operação no momento."
    ]);
}
```

O erro técnico detalhado deve ficar restrito ao arquivo de log do servidor. **Nunca devolva ao cliente:**
- a senha ou usuário do banco de dados;
- a string DSN;
- os nomes e estruturas internas das tabelas e comandos SQL;
- o rastreamento da pilha (*stack trace*) ou o objeto `$error` bruto.

---

## 17. Tratamento de conflitos esperados (Código 23000 / HTTP 409)

Erros de banco de dados nem sempre representam falhas técnicas do sistema. Quando tentamos inserir um e-mail que já existe em uma coluna marcada como `UNIQUE`, o MySQL bloqueia a inserção e emite o código de erro de integridade **`23000`**.

Esse conflito deve ser capturado no PHP e transformado em uma resposta semântica com o status HTTP `409 Conflict`:

```php
try {
    $stmt->execute([
        "name" => $name,
        "email" => $email,
        "password" => $hash
    ]);
} catch (PDOException $error) {
    // Código 23000: violação de restrição de integridade (ex: chave única duplicada)
    if ($error->getCode() === "23000") {
        http_response_code(409);

        echo json_encode([
            "error" => true,
            "message" => "Este e-mail já está cadastrado no sistema."
        ]);

        exit;
    }

    // Se for outro erro imprevisto, relança a exceção para o catch geral:
    throw $error;
}
```

> **Atenção:** Nunca retire a restrição `UNIQUE` da tabela do banco apenas para evitar lidar com o erro no código. A restrição é o que garante que nunca haverá contas duplicadas.

---

## 18. Transações: garantia de consistência (tudo ou nada)

Uma **transação** agrupa uma série de operações SQL em uma única unidade atômica de trabalho. Ou todas as operações funcionam e são confirmadas juntas, ou nenhuma delas tem efeito no banco de dados.

Considere um fluxo clássico de e-commerce com três etapas:

```php
try {
    // Inicia a transação:
    $conn->beginTransaction();

    // 1. Registra a compra no histórico:
    $stmtHistorico->execute([$clienteId, $total]);

    // 2. Atualiza e subtrai o estoque do produto:
    $stmtEstoque->execute([$quantidade, $produtoId]);

    // 3. Cria o pedido oficial do cliente:
    $stmtPedido->execute([$clienteId, $enderecoId]);

    // Todas as etapas deram certo: confirma as alterações no banco!
    $conn->commit();

    echo json_encode(["message" => "Pedido confirmado com sucesso."]);
} catch (Throwable $error) {
    // Se qualquer etapa falhar, desfaz TUDO o que foi feito até aqui:
    if ($conn->inTransaction()) {
        $conn->rollBack();
    }

    error_log($error->getMessage());
    http_response_code(500);

    echo json_encode([
        "error" => true,
        "message" => "Falha no processamento do pedido."
    ]);
}
```

- `beginTransaction()`: inicia o monitoramento da transação. As alterações ficam em estado temporário.
- `commit()`: grava permanentemente todas as alterações realizadas desde o início do bloco.
- `rollBack()`: cancela e desfaz imediatamente todas as alterações pendentes se qualquer exceção acontecer no meio do caminho.

Use transações sempre que o sistema executar operações dependentes entre si, onde o fracasso de uma etapa deixaria os dados em um estado incompleto ou corrompido.

---

## 19. Paginação de listas com `LIMIT` e `OFFSET`

Tabelas reais acumulam milhares de registros. Carregar todas as linhas de uma vez causa lentidão, estouro de memória e consumo desnecessário de tráfego de rede.

A solução consiste em paginar os dados utilizando as cláusulas `LIMIT` e `OFFSET` do SQL:

```sql
SELECT id, name, email
FROM users
ORDER BY id
LIMIT 20 OFFSET 40;
```

- `LIMIT 20`: devolve no máximo 20 registros.
- `OFFSET 40`: pula os primeiros 40 registros (correspondendo à página 3).

No PHP, calcule o deslocamento (*offset*) matematicamente a partir da página solicitada via `$_GET`:

```php
$porPagina = 20;
$pagina = max(1, (int)($_GET["page"] ?? 1));
$offset = ($pagina - 1) * $porPagina;

$sql = "SELECT id, name, email FROM users ORDER BY id LIMIT $porPagina OFFSET $offset";
$stmt = $conn->prepare($sql);
$stmt->execute();
$usuarios = $stmt->fetchAll();
```

---

## 20. Organização mínima dos arquivos da API

Uma estrutura de diretórios simples, limpa e modular recomendada para o aprendizado:

```text
api/
├── connection.php   # Abre a conexão PDO e expõe $conn
├── getusers.php     # Valida parâmetros GET e executa SELECT
└── insertuser.php   # Valida dados POST e executa INSERT
```

- Cada arquivo possui uma responsabilidade única e bem definida.
- Nenhum endpoint de API deve emitir código HTML; a saída deve ser exclusivamente JSON com o cabeçalho `Content-Type: application/json; charset=utf-8`.

---

## 21. Relação com os exemplos e práticas do repositório

O repositório disponibiliza exemplos funcionais focados em demonstrar cada padrão de forma isolada:

### Exemplo local da seção: Inserção de Usuário
- **Pasta:** [`api-db-insert/`](./api-db-insert/)
- **O que observar:**
  - Exemplo autocontido da própria seção que implementa uma API de inserção com PDO e marcadores nomeados;
  - `connection.php`: centraliza a conexão PDO com tratamento de erros;
  - `index.php`: recebe `$_POST["name"]` e `$_POST["email"]`, executa a função didática `insert_user($name, $email)` utilizando `$conn->prepare()`, `$stmt->execute()` e `$conn->lastInsertId()`, devolvendo uma resposta JSON com o novo ID e os dados criados;
  - `collection/`: inclui a coleção de teste para o cliente Bruno / OpenCollection (`collection/insere usuario.yml`), permitindo disparar requisições `POST` com facilidade.

### Exemplos de referência complementares

#### 1. Consulta simples por ID
- **Pasta:** [`exemplos/ex10.1/`](../exemplos/ex10.1/)
- **O que observar:** Leitura de parâmetro GET, consulta preparada com marcador `?`, consumo com `fetch()` e resposta em JSON com tratamento de 404.

#### 2. Consulta e inserção com `lastInsertId()`
- **Pasta:** [`exemplos/ex10.2/`](../exemplos/ex10.2/)
- **O que observar:** Uso de parâmetros posicionais e nomeados, captura do novo ID com `$conn->lastInsertId()` e resposta estruturada. *(Nota didática: esse exemplo foca na mecânica do `INSERT`; em código real, utilize senhas com hash).*

#### 3. Cadastro seguro com hash
- **Pasta:** [`exemplos/ex10.3/`](../exemplos/ex10.3/)
- **O que observar:** Integração completa entre formulário HTML, coleta via `FormData`, envio assíncrono com `fetch()`, tratamento com `password_hash()` no PHP e inserção no banco.

#### 4. Comparativo de segurança contra SQL Injection
- **Pastas:** [`exemplos/ex10.4/`](../exemplos/ex10.4/) (vulnerável) e [`exemplos/ex10.5/`](../exemplos/ex10.5/) (seguro)
- **O que observar:** O exemplo `ex10.4` demonstra a falha de interpolação direta para fins de estudo; o `ex10.5` mostra a correção idêntica utilizando consultas preparadas. Nunca copie o padrão do `ex10.4` em seus projetos.

---

## 22. Exercícios propostos

Os exercícios propostos para esta seção foram planejados para trabalhar diferentes responsabilidades do banco de dados, divididos em dois blocos temáticos:

### Grupo 1: Consistência, Estado e Regras de Negócio

1. [**Fila de Manutenção**](./fila-manutencao/README.md):  
   *Situação:* Dois técnicos disputam o atendimento do mesmo chamado no sistema escolar.  
   *Desafio:* A transição de estado só pode avançar (`aberto → em_atendimento → concluído`) e o retorno de `rowCount()` denuncia quem tentou assumir um chamado que já havia sido modificado por outro técnico.

2. [**Reserva de Laboratórios**](./reserva-laboratorios/README.md):  
   *Situação:* A secretaria agenda o uso de salas de informática e não pode permitir colisões.  
   *Desafio:* O código detecta sobreposições de horários e a operação inteira é executada de forma atômica dentro de uma transação PDO (`beginTransaction`, `commit` e `rollBack`).

3. [**Ranking de Leitura**](./ranking-leitura/README.md):  
   *Situação:* A biblioteca do campus calcula a lista dos maiores leitores do mês.  
   *Desafio:* Agregar totais com `JOIN` e `GROUP BY` diretamente no banco MySQL, calculando a classificação sem precisar trazer todos os registros para serem somados na memória do PHP.

### Grupo 2: Consulta, Filtros e Contrato de API

4. [**Inventário de Equipamentos**](./inventario-equipamentos/README.md):  
   *Situação:* O patrimônio da instituição cresce e a consulta precisa continuar rápida e responsiva.  
   *Desafio:* CRUD completo com filtros por categoria, restrição `UNIQUE` no número de tombamento, desativação lógica de registros e paginação via `LIMIT` e `OFFSET`.

5. [**API de Sinalização de Salas**](./api-sinalizacao/README.md):  
   *Situação:* Painel de avisos na porta dos laboratórios com ciclo de publicação.  
   *Desafio:* Cada aviso possui estados (`rascunho`, `publicado`, `encerrado`); o método HTTP define a operação e as regras de negócio validam o que ainda pode ser modificado com contratos JSON estritos.

---

## 23. Erros comuns (para você não cometer!)

- **Usar `localhost` dentro de containers Docker:** se o PHP roda em um container e o MySQL em outro, `localhost` aponta para o próprio container do PHP. Use o nome do serviço (ex.: `mysql`).
- **Esquecer o `charset=utf8mb4` no DSN:** acentos e caracteres em português são gravados de forma corrompida no banco de dados.
- **Interpolar variáveis de usuário diretamente na string SQL:** cria uma vulnerabilidade crítica de SQL Injection. Use sempre consultas preparadas.
- **Inverter a ordem dos valores em marcadores posicionais (`?`):** o dado do e-mail pode acabar gravado no campo do nome e vice-versa.
- **Escrever uma chave diferente do marcador nomeado:** usar `:nome` no SQL e `"name"` no array do `execute()` causará erro de parâmetro não encontrado.
- **Fazer `SELECT *` em endpoints de usuário:** expõe acidentalmente a coluna `password` com o hash no JSON de resposta.
- **Carregar listas infinitas com `fetchAll()`:** consome toda a memória do servidor ao ler tabelas grandes. Use `LIMIT` e paginação.
- **Devolver a exceção técnica completa para o cliente:** expõe senhas, tabelas e comandos SQL internos. O erro detalhado deve ir para o log do servidor (`error_log()`).
- **Confiar apenas na validação do PHP e ignorar restrições do banco:** validação do PHP melhora a mensagem, mas restrições como `NOT NULL` e `UNIQUE` no MySQL garantem que o banco nunca seja corrompido.
- **Executar `UPDATE` ou `DELETE` sem cláusula `WHERE`:** altera ou apaga todas as linhas da tabela de uma só vez.
- **Misturar HTML e código de conexão no mesmo endpoint JSON:** corrompe a formatação da resposta esperada pelo front-end.

---

## 24. Boas práticas consolidadas

- **Sempre utilize consultas preparadas** em qualquer instrução SQL que envolva valores dinâmicos.
- **Centralize a conexão** em um arquivo `connection.php` reutilizável e configure `ERRMODE_EXCEPTION`.
- **Proteja senhas com variáveis de ambiente** utilizando `getenv()`, arquivo `.env` e adicionando `.env` ao `.gitignore`.
- **Armazene senhas exclusivamente como hash** gerado por `password_hash()`, reservando colunas `VARCHAR(255)`.
- **Responda com códigos de status HTTP semânticos:** `200` (leitura/atualização com sucesso), `201` (novo registro criado), `400` (parâmetros inválidos), `401` (falha de autenticação), `404` (recurso inexistente), `409` (conflito de unicidade) e `500` (falha interna).
- **Inspecione `rowCount()`** para confirmar se operações de atualização ou exclusão realmente afetaram algum registro.
- **Adote transações** quando duas ou mais operações de banco precisarem funcionar de maneira conjunta e atômica.
- **Selecione apenas as colunas necessárias** nas consultas `SELECT`, mantendo a resposta enxuta e protegendo dados confidenciais.

---

## 25. Resumo final

Os conceitos fundamentais desta seção que você deve levar para a prática são:

1. **O PHP é o intermediário seguro:** o front-end nunca se comunica diretamente com o MySQL; toda operação passa pelo PHP, que valida dados, aplica regras de negócio e devolve JSON.
2. **Consultas preparadas separam código de dados:** o SQL é compilado primeiro no banco e os valores viajam isolados, eliminando os riscos de SQL Injection.
3. **Marcadores posicionais vs. nomeados:** marcadores posicionais (`?`) dependem estritamente da ordem dos dados; marcadores nomeados (`:nome`) associam os valores por chave associativa e aumentam a legibilidade.
4. **Leitura cirúrgica com `fetch()` e controlada com `fetchAll()`:** use `fetch()` para obter uma única linha e `fetchAll()` para carregar coleções delimitadas com `LIMIT`.
5. **Autenticação segura:** senhas são protegidas com algoritmos de hash criptográfico no cadastro (`password_hash`) e validadas no login com `password_verify`, sem revelar segredos em mensagens de erro.
6. **Robustez e integridade:** erros técnicos vão para o log do servidor, violações de integridade são tratadas sem expor o banco, e transações garantem consistência atômica nas operações críticas.

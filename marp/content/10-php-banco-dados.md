---
marp: true
theme: ifsul
header: ' '
footer: 'Instituto Federal Sul-rio-grandense | Campus Charqueadas'
---

<!-- _class: lead -->

# Programação Web I
## Banco de Dados com PHP e PDO

Prof. Pablo Werlang
pablowerlang@ifsul.edu.br

---

# Banco de Dados com PHP
## Da requisição até a tabela

<div class="grid grid-cols-2 gap-6">
<div>

1. O usuário interage com o documento HTML
2. O JavaScript envia a requisição
3. O PHP valida os dados
4. O PDO prepara o SQL e separa os valores
5. O banco executa e devolve linhas
6. O PHP responde JSON com status HTTP

</div>
<div class="media flex h-full items-center justify-end">

<img class="h-full" src="../../marp/assets/10-fluxo-web.png" alt="Desenvolvedor PHP opera máquina ligada a servidor, transformando dados brutos em pacotes JSON enviados para rota de API na nuvem." />

</div>
</div>

---

# Banco de Dados
## Por que só o PHP conversa com o banco?

- O navegador é o computador do usuário: tudo lá fica visível
- Usuário e senha do banco não podem viajar para o navegador
- O SQL fica no servidor, dentro do endpoint PHP
- O navegador recebe apenas o JSON de resposta

Quem guarda segredo não expõe credencial.

---

# Banco de Dados
## Vocabulário básico

- **Tabela:** planilha de um só assunto, como `users`
- **Linha:** um registro, como a Ana Souza
- **Coluna:** uma propriedade, como `email`
- **Chave primária:** o `id` que identifica cada linha
- **Chave estrangeira:** o `id` que liga uma tabela à outra
- **Restrições:** regras que o banco aplica, como `NOT NULL`

---

# Banco de Dados
## Uma tabela também possui regras

```sql
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL,
    password VARCHAR(255) NOT NULL
);
```

---

<!-- _class: divider -->

# Conexão com PDO

---

# PDO
## Uma interface para bancos relacionais

- PDO significa **PHP Data Objects**
- Abre a conexão e executa SQL com o mesmo jeito em vários bancos
- Separa o comando dos valores com consultas preparadas
- Avisa falhas com exceções em vez de falhar em silêncio
- Lê uma linha com `fetch()` ou várias com `fetchAll()`

PDO não substitui o conhecimento de SQL.

---

# PDO
## Abrindo a conexão

```php
$user = "root";
$password = "senha-do-ambiente";
$host = "localhost";
$dbname = "aula";
$options = [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION, // lança exceção em erro
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC // retorna array associativo
];
$conn = new PDO( // abre a conexão
    "mysql:host=$host;dbname=$dbname;charset=utf8mb4",
    $user, $password, $options
);
```

`host=localhost` funciona no seu computador, mas não dentro de containers.

---

# PDO
## O que existe no DSN?

- `mysql:` seleciona o driver
- `host=localhost` aponta para o servidor local
- `dbname=aula` seleciona o banco
- `charset=utf8mb4` preserva os caracteres

Dentro de containers, o host costuma ser o nome do serviço — por exemplo, `mysql`.

---

# PDO
## Protegendo informações sensíveis

### Senha do servidor de banco deixada no `connection.php`, mesmo que o arquivo não seja público, é um risco de segurança.

- `getenv()` lê a variável de ambiente no container

```php
$password = getenv("DB_PASSWORD"); // pega a senha de variável de ambiente
```

<div class="grid grid-cols-2 gap-6">
<div>

- Arquivo `.env` contém a senha e não vai para o Git

```
DB_PASSWORD=senha-do-ambiente
```

</div>
<div>

- Arquivo `.gitignore` impede que o `.env` seja enviado para o repositório

```
.env
```

</div>
</div>



---

# PDO
## Separe a conexão

```php
<?php
// Todo endpoint começa assim:
require __DIR__ . "/connection.php";
// A partir daqui, $conn já existe.
```

- `connection.php` abre o banco uma vez e cria `$conn`
- Cada endpoint PHP só precisa do `require` para ter acesso ao banco

---

<!-- _class: divider -->

# Consultas Preparadas

---

# PDO
## SQL Injection: quando dado vira comando

<div class="grid grid-cols-2">
<div>

**Usuário envia**
- name: `Bob`
- email: `'); DROP TABLE users; --`

</div>
<div>

**API recebe**

- `$name`: `Bob`
- `$email`: `'); DROP TABLE users; --`

</div>
</div>

<div>

**SQL injetado**

```php
$sql = "INSERT INTO users (name, email) VALUES ('$name', '$email')";
$sql = "INSERT INTO users (name, email) VALUES ('Bob', ''); DROP TABLE users; --')";
```

</div>

- O valor entra diretamente no SQL
- Uma entrada maliciosa pode mudar a consulta

---

# PDO
## SQL e dados viajam separados

Consultas preparadas são o padrão para qualquer valor variável.

### Posicional

```php
$sql = "INSERT INTO users (name, email) VALUES (?, ?)";
$stmt = $conn->prepare($sql);
$stmt->execute([$name, $email]);
```

- O SQL é enviado primeiro, com `?` no lugar dos valores
- O banco prepara o comando e espera os valores
- O `execute()` envia os valores, que não podem alterar o SQL

---

# PDO
## SQL e dados viajam separados

### Nomeado

```php
$sql = "INSERT INTO users (name, email) VALUES (:name, :email)";
$stmt = $conn->prepare($sql);
$stmt->execute([
    "name" => $name,
    "email" => $email
]);
```

- Ao invés de `?`, o SQL usa `:name` e `:email`
- O `execute()` envia um array associativo com os valores

---

<!-- _class: divider -->

# CRUD

---

# Banco de Dados
## Quatro operações fundamentais

| Ação | SQL | Objetivo |
| :--- | :--- | :--- |
| Create | `INSERT` | criar |
| Read | `SELECT` | consultar |
| Update | `UPDATE` | atualizar |
| Delete | `DELETE` | remover |

O método HTTP e a autorização devem combinar com a ação.

---

# PDO
## `fetch()` ou `fetchAll()`?

**Quando fazemos `SELECT`, linhas são retornadas do banco de dados**

- Precisamos de uma forma de ler essas linhas no PHP

<div class="grid grid-cols-2 gap-6">
<div>

**`fetch()`**

- Lê uma linha
- Retorna `false` quando termina
- Bom para busca por ID

</div>
<div>

**`fetchAll()`**

- Carrega todas as linhas
- Retorna um array
- Bom para listas pequenas

</div>
</div>

---

# PDO
## Uma linha com `fetch()`

```php
$stmt = $conn->prepare("SELECT id, name, email FROM users WHERE id = ?");
$stmt->execute([$id]);
$user = $stmt->fetch();

if (!$user) {
    http_response_code(404);
    echo json_encode(["error" => true,
        "message" => "Usuário não encontrado"]);
    exit;
}
```

Sem próxima linha, `fetch()` devolve `false`.

---

# PDO
## Várias linhas com `fetchAll()`

```php
$stmt = $conn->prepare(
    "SELECT id, name, email FROM users ORDER BY id LIMIT 20"
);
$stmt->execute();
$users = $stmt->fetchAll();

echo json_encode(["users" => $users]);
```

Peça só as colunas que a tela usa — nunca o `password`.

---

# PDO
## Criando com `INSERT`

```php
$sql = "INSERT INTO users (name, email, password)
        VALUES (:name, :email, :password)";

$stmt = $conn->prepare($sql);
$stmt->execute([
    "name" => $name,
    "email" => $email,
    "password" => $hash
]);
```

---

# PDO
## Recuperando o novo identificador

```php
$novoId = $conn->lastInsertId();

http_response_code(201);
echo json_encode([
    "id" => (int)$novoId,
    "message" => "Usuário cadastrado com sucesso"
]);
```

- `lastInsertId()` devolve o `id` da última linha criada

---

# PDO
## Atualizar com `UPDATE`

```php
$stmt = $conn->prepare(
    "UPDATE users SET name = :name WHERE id = :id"
);
$stmt->execute(["name" => $name, "id" => $id]);

echo json_encode([
    "id" => (int)$id,
    "message" => "Nome atualizado"
]);
```

Antes de executar: o `id` é válido e o usuário pode mexer nesse registro?

---

# PDO
## Excluir com `DELETE`

```php
$stmt = $conn->prepare("DELETE FROM users WHERE id = ?");
$stmt->execute([$id]);

if ($stmt->rowCount() === 0) {
    http_response_code(404);
    echo json_encode(["error" => true,
        "message" => "Nada para excluir"]);
    exit;
}
```

- `rowCount()` devolve quantas linhas foram afetadas pelo comando.

---

# Banco de Dados
## Senha se guarda como hash

### No cadastro, nunca salve a senha pura

```php
$hash = password_hash($senha, PASSWORD_DEFAULT);

$stmt = $conn->prepare(
    "INSERT INTO users (name, email, password)
     VALUES (:name, :email, :password)"
);
$stmt->execute(["name" => $name, "email" => $email, "password" => $hash]);
```

- `password_hash()` cria um hash seguro da senha
- A coluna precisa de espaço: `VARCHAR(255)`.

---

# Banco de Dados
## Login confere e-mail e senha

```php
if (!$user || !password_verify($senhaDigitada, $user["password"])) {
    http_response_code(401);
    echo json_encode([
        "error" => true,
        "message" => "Credenciais inválidas"
    ]);
    exit;
}
```

A mensagem não conta se o erro foi no e-mail ou na senha.

---

<!-- _class: divider -->

# Falhas e Consistência

---

# PDO
## Exceção técnica não vai para o cliente

```php
try {
    $stmt->execute([$id]);
    echo json_encode(["id" => (int)$id,
        "message" => "Operação concluída"]);
} catch (PDOException $error) {
    error_log($error->getMessage());
    http_response_code(500);
    echo json_encode(["error" => true,
        "message" => "Falha na operação"]);
}
```

O detalhe fica no log do servidor, não no JSON.

---

# PDO
## Transação: tudo ou nada

```php
try {
    $conn->beginTransaction();
    // 1. Registra uma compra no histórico
    // 2. Atualiza o estoque do produto
    // 3. Cria o pedido do cliente
    $conn->commit();
} catch (Throwable $error) {
    if ($conn->inTransaction()) $conn->rollBack();
    throw $error;
}
```

Use quando uma falha no meio deixaria dados pela metade.

---

# Banco de Dados
## Listas precisam de limite

```sql
SELECT id, name, email
FROM users
ORDER BY id
LIMIT 20 OFFSET 40
```

- `LIMIT`: quantos registros
- `OFFSET`: quantos serão pulados
- Paginação evita carregar tudo em memória

---

# PDO
## Organização mínima

```text
api/
├── connection.php
├── getusers.php
└── insertuser.php
```

- Conexão abre o acesso ao banco
- Cada endpoint possui uma operação clara

---

<!-- _class: divider -->

# Hora de Praticar

---

# PDO
## Veja o básico funcionando

- `exemplos/ex10.1/`: busca por `id` com `fetch()` e JSON
- `exemplos/ex10.2/`: `fetch()` na leitura e `lastInsertId()` na criação
- `exemplos/ex10.3/`: `INSERT` com `password_hash()`
- Repare: leitura valida o `id` e responde 404 quando não acha

---

# PDO
## Compare seguro e inseguro

- `exemplos/ex10.4/`: monta o SQL colando o valor com aspas — vulnerável
- `exemplos/ex10.5/`: mesmo cadastro com `prepare()` + `execute()` — seguro
- Identifique onde o dado digitado vira parte do comando
- Não copie o padrão do `ex10.4` no seu projeto

---

# Banco de Dados
## Exercícios: consistência

- **Fila de Manutenção:** dois técnicos disputam o mesmo chamado; só vale `aberto → em_atendimento → concluído` e o `rowCount()` denuncia quem chegou depois.
  `10-php-banco-dados/fila-manutencao/`
- **Reserva de Laboratórios:** a secretaria tenta encaixar uma aula; o código detecta sobreposição de horário e só confirma dentro de transação.
  `10-php-banco-dados/reserva-laboratorios/`
- **Ranking de Leitura:** a biblioteca quer o top leitores do mês sem trazer tudo para o PHP; `JOIN` + `GROUP BY` somam no banco, incluindo quem leu zero.
  `10-php-banco-dados/ranking-leitura/`

---

# Banco de Dados
## Exercícios: consulta e contrato

- **Inventário de Equipamentos:** o patrimônio cresce e a lista precisa continuar rápida; CRUD com filtros, `UNIQUE` no patrimônio, desativação lógica e `LIMIT`/`OFFSET`.
  `10-php-banco-dados/inventario-equipamentos/`
- **Sinalização de Salas:** cada aviso na porta tem estado (`rascunho`, `publicado`, `encerrado`); o método HTTP diz a operação e o estado diz o que ainda pode mudar.
  `10-php-banco-dados/api-sinalizacao/`

Cada proposta usa o banco para uma responsabilidade diferente.

---

# PDO
## Erros comuns

- Usar `localhost` entre containers
- Interpolar entrada no SQL
- Trocar a ordem dos `?`
- Carregar listas sem limite
- Devolver hash ou exceção completa
- Alterar registros sem autorização

---

# Banco de Dados com PHP
## O que precisa ficar

- PDO conecta o PHP ao banco; o navegador recebe só JSON
- Consultas preparadas separam SQL de dados e evitam SQL Injection
- `fetch()` lê uma linha; `fetchAll()` lê várias com `LIMIT`
- Senhas entram como hash e login não conta segredo
- E-mail duplicado vira 409; erro técnico vai para o log
- Validação, autorização e restrições do banco trabalham juntas

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

<div class="grid grid-cols-2 gap-6 h-full">
<div>

1. PHP valida os dados
2. PDO prepara o SQL
3. O banco executa
4. PHP organiza o resultado
5. O endpoint devolve JSON

</div>
<div class="media mx-auto">
    <img class="placeholder" alt="Prompt de IA: dados passando por uma catraca segura antes de entrar em um banco de dados organizado, metáfora didática para PDO e consultas preparadas">
</div>
</div>

---

# Banco de Dados
## Vocabulário básico

- **Tabela:** coleção de registros
- **Linha:** uma ocorrência, como um usuário
- **Coluna:** uma propriedade, como `email`
- **Chave primária:** identifica cada linha
- **Chave estrangeira:** cria relações
- **Restrição:** protege a consistência

---

# Banco de Dados
## Uma tabela também possui regras

```sql
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);
```

PHP orienta o usuário; o banco protege os dados.

---

<!-- _class: divider -->

# Conexão com PDO

---

# PDO
## Uma interface para bancos relacionais

- PDO significa **PHP Data Objects**
- Abre conexões e executa SQL
- Suporta consultas preparadas
- Pode lançar exceções
- Oferece diferentes modos de leitura

PDO não substitui o conhecimento de SQL.

---

# PDO
## Abrindo a conexão

```php
$options = [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
];
$conn = new PDO(
    "mysql:host=mysql;dbname=aula;charset=utf8mb4",
    $user,
    $password,
    $options
);
```

---

# PDO
## O que existe no DSN?

- `mysql:` seleciona o driver
- `host=mysql` aponta para o serviço Docker
- `dbname=aula` seleciona o banco
- `charset=utf8mb4` preserva os caracteres

Dentro de containers, o host costuma ser o nome do serviço — não `localhost`.

---

# PDO
## Separe a conexão

```php
<?php

require __DIR__ . "/connection.php";
```

- `connection.php` cria `$conn`
- Endpoints reaproveitam a configuração
- Credenciais não entram na resposta
- Configuração real não deve ser publicada

---

<!-- _class: divider -->

# Consultas Preparadas

---

# PDO
## SQL Injection: quando dado vira comando

```php
// Não faça isso:
$sql = "SELECT * FROM users
        WHERE email = '$email'";
```

- O valor entra diretamente no SQL
- Uma entrada maliciosa pode mudar a consulta
- Validar formato não substitui preparar a consulta

---

# PDO
## SQL e dados viajam separados

```php
$sql = "SELECT * FROM users WHERE email = ?";
$stmt = $conn->prepare($sql);
$stmt->execute([$email]);
$user = $stmt->fetch();
```

Consultas preparadas são o padrão para qualquer valor variável.

---

# PDO
## Posicional ou nomeado?

<div class="grid grid-cols-2 gap-6">
<div>

**Posicional**

```php
$sql = "SELECT * FROM users
        WHERE email = ?";
$stmt->execute([$email]);
```

A ordem precisa coincidir.

</div>
<div>

**Nomeado**

```php
$sql = "UPDATE users SET name = :name
        WHERE id = :id";
$stmt->execute([
    "name" => $name,
    "id" => $id
]);
```

</div>
</div>

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
$stmt = $conn->prepare(
    "SELECT id, name, email FROM users WHERE id = ?"
);
$stmt->execute([$id]);
$user = $stmt->fetch();

if (!$user) {
    http_response_code(404);
}
```

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
    "status" => "OK",
    "result" => ["id" => $novoId]
]);
```

Não devolva senha nem hash na resposta.

---

# PDO
## Atualizar e excluir pedem autorização

```php
$stmt = $conn->prepare(
    "DELETE FROM users WHERE id = ?"
);
$stmt->execute([$id]);
```

Antes de executar:

- O identificador é válido?
- O registro existe?
- O usuário pode alterar esse registro?

---

# Banco de Dados
## Senha entra como hash

```php
$hash = password_hash($senha, PASSWORD_DEFAULT);

if (!$user ||
    !password_verify($senhaInformada, $user["password"])) {
    http_response_code(401);
    exit;
}
```

Mensagens de login não precisam revelar se o e-mail existe.

---

<!-- _class: divider -->

# Falhas e Consistência

---

# PDO
## Exceção técnica não vai para o cliente

```php
try {
    $stmt->execute([$id]);
    echo json_encode(["status" => "OK"]);
} catch (PDOException $error) {
    http_response_code(500);
    echo json_encode([
        "status" => "error",
        "message" => "Falha na operação"
    ]);
}
```

Detalhes ficam no log do servidor.

---

# PDO
## Transação: tudo ou nada

```php
try {
    $conn->beginTransaction();
    $stmtPedido->execute([$userId]);
    $stmtItem->execute([$produtoId]);
    $conn->commit();
} catch (Throwable $error) {
    $conn->rollBack();
}
```

Use quando operações dependem umas das outras.

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
- Endpoint JSON não mistura HTML da interface

---

<!-- _class: divider -->

# Hora de Praticar

---

# PDO
## Compare seguro e inseguro

- `exemplos/ex10.4/`: interpolação direta no SQL
- `exemplos/ex10.5/`: consulta preparada
- Identifique onde o dado vira comando
- Não copie o padrão vulnerável

---

# Banco de Dados
## Exercícios: consistência

- **Fila de Manutenção:** transição válida e conflito concorrente  
  `10-php-banco-dados/fila-manutencao/`
- **Reserva de Laboratórios:** sobreposição e transação  
  `10-php-banco-dados/reserva-laboratorios/`
- **Ranking de Leitura:** relações, agregação e registros sem atividade  
  `10-php-banco-dados/ranking-leitura/`

---

# Banco de Dados
## Exercícios: consulta e contrato

- **Inventário de Equipamentos:** CRUD, filtros e paginação no SQL  
  `10-php-banco-dados/inventario-equipamentos/`
- **Sinalização de Salas:** métodos HTTP, estados e contrato JSON  
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

- PDO conecta PHP ao banco
- Consultas preparadas separam SQL de dados
- CRUD organiza as operações principais
- `fetch()` lê uma linha; `fetchAll()` lê várias
- Senhas são armazenadas como hash
- Validação, autorização e restrições trabalham juntas

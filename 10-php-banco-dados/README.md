# Programação Web I - Banco de Dados com PHP e PDO

## 1. O que este guia ensina

Esta seção conecta o PHP a um banco de dados relacional. O foco é usar PDO para abrir a conexão, executar comandos SQL com consultas preparadas e devolver respostas previsíveis ao front-end.

Ao final deste guia, você deve conseguir:

- explicar o papel de tabelas, linhas, colunas, chaves primárias e estrangeiras;
- criar uma conexão PDO com opções adequadas;
- separar a conexão dos endpoints;
- executar `SELECT`, `INSERT`, `UPDATE` e `DELETE`;
- usar *prepared statements* com parâmetros posicionais ou nomeados;
- diferenciar `fetch()` de `fetchAll()`;
- obter o identificador de um registro inserido;
- tratar exceções sem expor informações sensíveis;
- armazenar senhas com hash;
- devolver resultados e erros em JSON;
- reconhecer riscos de SQL Injection.

## 2. Da requisição até o banco

Fluxo comum:

1. JavaScript envia uma requisição ao endpoint PHP;
2. PHP lê e valida os dados;
3. PHP prepara um comando SQL;
4. os valores são enviados separadamente ao banco;
5. o banco executa a operação;
6. PHP organiza o resultado;
7. o endpoint devolve JSON e um status HTTP.

O navegador não deve se conectar diretamente ao MySQL. Credenciais e comandos de banco ficam no servidor.

## 3. Conceitos relacionais básicos

- **banco de dados:** conjunto organizado de estruturas;
- **tabela:** coleção de registros do mesmo tipo;
- **linha ou registro:** uma ocorrência, como um usuário;
- **coluna ou campo:** uma propriedade, como `email`;
- **chave primária:** identifica cada linha de forma única;
- **chave estrangeira:** relaciona uma tabela a outra;
- **restrição:** regra aplicada pelo banco, como `NOT NULL` ou `UNIQUE`.

Exemplo:

```sql
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);
```

As validações do PHP melhoram a resposta ao usuário. As restrições do banco protegem a consistência dos dados.

## 4. O que é PDO

PDO significa **PHP Data Objects**. É uma interface orientada a objetos para acesso a bancos relacionais.

Vantagens:

- API consistente para conexão e consultas;
- suporte a consultas preparadas;
- tratamento de falhas com exceções;
- diferentes modos de leitura dos resultados;
- suporte a transações.

PDO não elimina a necessidade de conhecer SQL.

## 5. Abrindo a conexão

```php
<?php

$host = "mysql";
$database = "aula";
$user = "root";
$password = "senha-do-ambiente";

$options = [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES => false
];

$conn = new PDO(
    "mysql:host=$host;dbname=$database;charset=utf8mb4",
    $user,
    $password,
    $options
);
```

Partes importantes:

- `mysql:` seleciona o driver;
- `host` identifica o serviço do banco;
- `dbname` seleciona o banco;
- `charset=utf8mb4` permite armazenar o conjunto completo de caracteres UTF-8;
- `ERRMODE_EXCEPTION` transforma erros em exceções;
- `FETCH_ASSOC` devolve linhas com chaves iguais aos nomes das colunas.

Em Docker Compose, o host costuma ser o nome do serviço MySQL, não `localhost`.

## 6. Configuração fora do endpoint

A conexão pode ficar em `connection.php`:

```php
<?php

require __DIR__ . "/config.php";

$conn = new PDO($dsn, $user, $password, $options);
```

No endpoint:

```php
<?php

require "connection.php";
```

Credenciais reais não devem ser publicadas no repositório nem devolvidas em respostas JSON. Em projetos reais, use variáveis de ambiente ou um arquivo de configuração não versionado.

## 7. Por que consultas preparadas são obrigatórias

Este código é inseguro:

```php
$sql = "SELECT * FROM users WHERE email = '$email'";
```

O valor recebido passa a fazer parte do comando SQL. Um usuário mal-intencionado pode alterar a lógica da consulta: isso é **SQL Injection**.

Na consulta preparada, SQL e dados são enviados separadamente:

```php
$sql = "SELECT * FROM users WHERE email = ?";
$stmt = $conn->prepare($sql);
$stmt->execute([$email]);
```

Consultas preparadas devem ser usadas mesmo quando o valor parece numérico ou já foi validado.

## 8. Marcadores posicionais

Marcadores `?` dependem da ordem.

```php
$sql = "SELECT * FROM products WHERE category_id = ? AND price <= ?";
$stmt = $conn->prepare($sql);
$stmt->execute([$categoryId, $precoMaximo]);
```

O primeiro valor corresponde ao primeiro `?`.

## 9. Marcadores nomeados

Marcadores nomeados deixam comandos maiores mais legíveis.

```php
$sql = "
    UPDATE products
    SET name = :name, price = :price
    WHERE id = :id
";

$stmt = $conn->prepare($sql);
$stmt->execute([
    "name" => $nome,
    "price" => $preco,
    "id" => $id
]);
```

Use nomes coerentes entre SQL e array de parâmetros.

## 10. Leitura com `SELECT`

### Uma linha com `fetch()`

```php
$stmt = $conn->prepare("SELECT id, name, email FROM users WHERE id = ?");
$stmt->execute([$id]);
$user = $stmt->fetch();

if (!$user) {
    http_response_code(404);

    echo json_encode([
        "error" => true,
        "message" => "Usuário não encontrado."
    ]);

    exit;
}
```

Quando não há próxima linha, `fetch()` retorna `false`.

### Várias linhas com `fetchAll()`

```php
$stmt = $conn->prepare("SELECT id, name, email FROM users ORDER BY name");
$stmt->execute();
$users = $stmt->fetchAll();
```

`fetchAll()` carrega todo o resultado em memória. Para listas muito grandes, use paginação ou leia uma linha por vez.

## 11. Inserção com `INSERT`

```php
$sql = "
    INSERT INTO users (name, email, password)
    VALUES (:name, :email, :password)
";

$stmt = $conn->prepare($sql);
$stmt->execute([
    "name" => $nome,
    "email" => $email,
    "password" => $hash
]);

$novoId = $conn->lastInsertId();
```

`lastInsertId()` devolve o identificador gerado pela conexão para um campo `AUTO_INCREMENT`.

Uma resposta de criação pode usar HTTP 201:

```php
http_response_code(201);

echo json_encode([
    "id" => (int)$novoId,
    "name" => $nome,
    "email" => $email,
    "message" => "Usuário cadastrado com sucesso."
]);
```

Não devolva o hash da senha.

## 12. Atualização com `UPDATE`

```php
$sql = "UPDATE users SET name = :name WHERE id = :id";
$stmt = $conn->prepare($sql);
$stmt->execute([
    "name" => $nome,
    "id" => $id
]);
```

Antes de atualizar:

- valide o identificador;
- valide os novos valores;
- confirme que o registro existe quando a interface precisa distinguir os casos;
- confirme que o usuário autenticado possui autorização para alterar aquele registro.

Autenticação responde “quem é o usuário”. Autorização responde “o que ele pode fazer”.

## 13. Exclusão com `DELETE`

```php
$stmt = $conn->prepare("DELETE FROM users WHERE id = ?");
$stmt->execute([$id]);
```

Excluir é uma operação destrutiva. O endpoint deve validar o alvo e a autorização antes de executar.

`rowCount()` pode indicar quantas linhas foram afetadas por `INSERT`, `UPDATE` ou `DELETE`:

```php
if ($stmt->rowCount() === 0) {
    // Nenhuma linha foi removida.
}
```

Não use `rowCount()` como contagem portátil de linhas de um `SELECT`.

## 14. CRUD

CRUD resume quatro operações:

| Operação | SQL | Objetivo |
| --- | --- | --- |
| Create | `INSERT` | criar |
| Read | `SELECT` | consultar |
| Update | `UPDATE` | atualizar |
| Delete | `DELETE` | remover |

Um endpoint simples pode escolher a operação pelo método HTTP. Se uma aplicação usar um campo `action`, mantenha a escolha explícita, validada e coerente com o contrato documentado.

## 15. Senhas no banco

Cadastro:

```php
$hash = password_hash($senha, PASSWORD_DEFAULT);
```

Login:

```php
if (!$user || !password_verify($senhaInformada, $user["password"])) {
    http_response_code(401);

    echo json_encode([
        "error" => true,
        "message" => "Credenciais inválidas."
    ]);

    exit;
}
```

Use uma coluna ampla, como `VARCHAR(255)`, porque o tamanho do hash pode variar.

Mensagens de login normalmente não devem revelar separadamente se o e-mail existe.

## 16. Tratamento de exceções

```php
header("Content-Type: application/json; charset=utf-8");

try {
    $stmt = $conn->prepare("DELETE FROM users WHERE id = ?");
    $stmt->execute([$id]);

    echo json_encode([
        "id" => (int)$id,
        "message" => "Usuário removido com sucesso."
    ]);
} catch (PDOException $error) {
    http_response_code(500);

    echo json_encode([
        "error" => true,
        "message" => "Não foi possível concluir a operação."
    ]);
}
```

O erro técnico deve ir para o log do servidor. Não devolva:

- senha do banco;
- DSN;
- comando SQL interno;
- rastreamento da exceção;
- objeto `$error` completo.

## 17. Conflitos esperados

Um e-mail com restrição `UNIQUE` pode gerar conflito ao tentar cadastrar uma duplicata.

O endpoint pode responder com HTTP 409 e uma mensagem apropriada. A identificação do tipo exato de erro depende do banco e do código retornado pela exceção.

Não remova a restrição do banco apenas para evitar tratar o conflito.

## 18. Transações

Uma transação agrupa operações que precisam funcionar juntas.

```php
try {
    $conn->beginTransaction();

    $stmtPedido->execute([$userId]);
    $pedidoId = $conn->lastInsertId();

    $stmtItem->execute([$pedidoId, $productId, $quantidade]);

    $conn->commit();
} catch (Throwable $error) {
    if ($conn->inTransaction()) {
        $conn->rollBack();
    }

    throw $error;
}
```

Use transação quando uma falha no meio deixaria os dados incompletos. Um cadastro simples em uma única tabela normalmente não precisa dela.

## 19. Paginação

Listas crescem. Em vez de devolver todas as linhas:

```sql
SELECT id, name, email
FROM users
ORDER BY id
LIMIT 20 OFFSET 40
```

`LIMIT` define quantos registros serão devolvidos; `OFFSET` define quantos serão pulados.

Valores usados em paginação devem ser convertidos e limitados antes de compor a consulta. Nem todo driver aceita parâmetros em todas as posições de `LIMIT` da mesma forma.

## 20. Organização mínima dos arquivos

Uma separação didática possível:

```text
api/
├── connection.php
├── getusers.php
└── insertuser.php
```

- `connection.php`: abre a conexão;
- endpoint de leitura: valida parâmetros e executa `SELECT`;
- endpoint de escrita: valida corpo e executa `INSERT`.

Não coloque HTML de interface dentro de um endpoint que foi definido para responder JSON.

## 21. Relação com os exemplos do repositório

### Consulta de usuário

Pasta: [`exemplos/ex10.1`](../exemplos/ex10.1/)

Mostra conexão, parâmetro GET, consulta preparada, `fetch()` e JSON.

### Consulta e inserção

Pasta: [`exemplos/ex10.2`](../exemplos/ex10.2/)

Mostra configuração de PDO, parâmetros posicionais e nomeados, `fetch()` e `lastInsertId()`.

### Cadastro com hash

Pasta: [`exemplos/ex10.3`](../exemplos/ex10.3/)

Combina `FormData`, `INSERT` preparado e `password_hash()`.

### Comparação sobre SQL Injection

Pastas:

- [`exemplos/ex10.4`](../exemplos/ex10.4/)
- [`exemplos/ex10.5`](../exemplos/ex10.5/)

O primeiro contém interpolação direta de valores no SQL e serve para reconhecer o risco. O segundo usa consultas preparadas. Não copie o padrão vulnerável.

## 22. Exercícios propostos

- [Fila de Manutenção](./fila-manutencao/README.md): aplica transições válidas e detecta atualização concorrente.
- [Reserva de Laboratórios](./reserva-laboratorios/README.md): verifica intervalos e confirma uma reserva dentro de transação.
- [Ranking de Leitura](./ranking-leitura/README.md): produz um relatório agregado com relações e estudantes sem atividade.
- [Inventário de Equipamentos](./inventario-equipamentos/README.md): combina CRUD, filtros, desativação e paginação no SQL.
- [API de Sinalização de Salas](./api-sinalizacao/README.md): associa métodos HTTP, transições e contrato JSON.

## 23. Erros comuns

- usar `localhost` dentro de um container quando o banco está em outro serviço;
- esquecer o `charset`;
- interpolar entrada do usuário no SQL;
- inverter a ordem dos valores em marcadores posicionais;
- escrever uma chave diferente do marcador nomeado;
- usar `fetchAll()` para uma lista sem limite;
- devolver senha ou hash na resposta;
- expor a exceção completa em JSON;
- confiar apenas na validação do PHP e esquecer restrições do banco;
- atualizar ou excluir sem verificar autorização;
- misturar conexão, HTML e várias operações em um arquivo difícil de explicar.

## 24. Boas práticas

- use consultas preparadas em toda entrada variável;
- valide dados antes do SQL;
- mantenha restrições importantes também no banco;
- selecione apenas as colunas necessárias;
- nunca devolva hashes de senha;
- use exceções e registre detalhes no servidor;
- devolva mensagens públicas sem dados internos;
- limite listas grandes;
- use transações somente quando operações dependem umas das outras;
- mantenha a conexão em um arquivo reutilizável.

## 25. Resumo final

Os pontos centrais desta seção são:

- PDO conecta PHP a bancos relacionais;
- o DSN define driver, host, banco e charset;
- consultas preparadas separam SQL de dados e evitam SQL Injection;
- `fetch()` lê uma linha e `fetchAll()` carrega várias;
- CRUD corresponde a `INSERT`, `SELECT`, `UPDATE` e `DELETE`;
- `lastInsertId()` recupera o identificador criado;
- senhas são armazenadas como hash;
- exceções técnicas vão para logs, não para o cliente;
- validação, autorização e restrições do banco trabalham juntas.

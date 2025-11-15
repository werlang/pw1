# Feira de Trocas Comunitária

Sistema web para gerenciar trocas de itens entre membros de uma comunidade. Os moradores podem cadastrar itens que desejam trocar, visualizar ofertas de outros usuários, filtrar por categoria e status, e atualizar informações dos seus próprios itens.

## Objetivo

Implementar o backend (PHP) de um sistema de feira de trocas comunitária. O sistema deve permitir login de usuários, listagem com filtros, inserção e atualização de itens.

**Todo o frontend já está implementado e funcionando.** Sua responsabilidade é apenas implementar os arquivos PHP na pasta `api/`.

O dump do banco de dados está disponível no arquivo `api/database.sql`.

Todas as questões envolvem manipulação de dados com PHP, uso de PDO para consultas SQL, tratamento de sessões e retorno de JSON. **NENHUMA questão envolve manipulação do frontend, HTML, CSS ou JavaScript.**

## Como Rodar o Projeto

### 1. Importar o Banco de Dados

Importe o arquivo `api/database.sql` no MySQL:

```bash
mysql -u root -p < api/database.sql
```

Ou use o phpMyAdmin para importar o arquivo.

### 2. Configurar Conexão com Banco

Edite o arquivo `api/connection.php` com suas credenciais:

```php
$host = "localhost";        // ou "mysql" se usando Docker
$user = "root";
$password = "";             // sua senha do MySQL
$database = "community_swap";
$port = 3306;
```

### 3. Acessar o Sistema

Abra no navegador:
- **Com Docker do repositório:** `http://localhost/challenges/community-swap/public/login/`
- **Com servidor local:** `http://localhost/[caminho]/login/`

## Questões

Este exercício contém 4 questões principais e 1 questão bônus:

- **Questão 1:** [Login de Usuários](api/auth/README-login.md)
- **Questão 2:** [Listagem de Itens com Filtros](api/items/README-list.md)
- **Questão 3:** [Adicionar Item](api/items/README-add.md)
- **Questão 4:** [Atualizar Item](api/items/README-update.md)
- **Questão Bônus:** [Remover Item](api/items/README-delete.md)

Cada questão possui um arquivo README na pasta correspondente com instruções detalhadas sobre o que deve ser implementado.

## Estrutura do Banco de Dados

O banco `community_swap` possui três tabelas principais:

### Tabela `users`
Armazena os usuários do sistema.

- `id`: Identificador único do usuário (INT, PRIMARY KEY, AUTO_INCREMENT)
- `name`: Nome completo do usuário (VARCHAR 100)
- `email`: Email do usuário, usado para login (VARCHAR 150, UNIQUE)
- `password`: Senha hasheada com bcrypt (VARCHAR 255)

**Nota:** Todas as senhas de teste são `asdf1234`. Use `password_verify()` para validação.

### Tabela `categories`
Categorias de itens.

- `id`: Identificador único da categoria (INT, PRIMARY KEY, AUTO_INCREMENT)
- `name`: Nome da categoria (VARCHAR 80)

**Categorias disponíveis:**
1. Livros
2. Eletrônicos
3. Roupas e Acessórios
4. Jogos e Brinquedos
5. Móveis e Decoração
6. Esportes e Lazer

### Tabela `items`
Itens disponíveis para troca.

- `id`: Identificador único do item (INT, PRIMARY KEY, AUTO_INCREMENT)
- `title`: Título do item (VARCHAR 150)
- `description`: Descrição detalhada (TEXT)
- `category_id`: ID da categoria (INT, FOREIGN KEY → categories.id)
- `owner_id`: ID do usuário dono do item (INT, FOREIGN KEY → users.id)
- `suggested_value`: Valor sugerido em reais (DECIMAL 10,2)
- `status`: Status da troca (ENUM: `open`, `pending`, `closed`)
- `created_at`: Data de criação (DATETIME, DEFAULT CURRENT_TIMESTAMP)

## Padrão de Resposta das APIs

Todas as APIs devem retornar JSON no formato padronizado:

### Em caso de sucesso:
```json
{
    "message": "Mensagem descritiva do sucesso",
    "data": {
        // dados específicos da operação
    }
}
```

### Em caso de erro:
```json
{
    "error": true,
    "message": "Mensagem descritiva do erro"
}
```

**Importante:** 
- Use `header('Content-Type: application/json');` antes de retornar JSON
- Sempre use `echo json_encode($array);` para retornar dados
- Não use status codes HTTP especializados, apenas os arrays `$_GET` e `$_POST`

## Sessões

O sistema utiliza sessões PHP para manter o usuário logado.

### Como usar sessões:

```php
session_start(); // SEMPRE no início do arquivo

// Armazenar dados
$_SESSION['user_id'] = $user['id'];
$_SESSION['user_name'] = $user['name'];

// Verificar se está logado
if (!isset($_SESSION['user_id'])) {
    echo json_encode(['error' => true, 'message' => 'Usuário não autenticado']);
    exit;
}

// Destruir sessão (logout)
session_unset();
session_destroy();
```

## Usuários de Teste

Use estas credenciais para testar o sistema:

| Nome | Email | Senha |
|------|-------|-------|
| Ana Costa | ana@email.com | asdf1234 |
| Carlos Lima | carlos@email.com | asdf1234 |
| Beatriz Silva | beatriz@email.com | asdf1234 |

## Arquivos a Implementar

Você deve criar os seguintes arquivos PHP (apenas backend):

```
api/
├── connection.php (já fornecido, apenas configurar)
├── auth/
│   ├── login.php
│   └── logout.php
└── items/
    ├── list.php
    ├── add.php
    ├── update.php
    └── delete.php (bônus)
```

## Funcionalidades do Sistema

### 1. Autenticação
- Login com email e senha
- Validação de credenciais com `password_verify()`
- Armazenamento de dados do usuário na sessão
- Logout (destruir sessão)

### 2. Listagem de Itens
- Exibir todos os itens com informações completas
- Filtrar por categoria (via `$_GET['category']`)
- Filtrar por status: open, pending, closed (via `$_GET['status']`)
- Buscar por texto em título e descrição (via `$_GET['q']`)
- Ordenar por data de criação (mais recentes primeiro)

### 3. Adicionar Item
- Validar campos obrigatórios: title, description, category_id, suggested_value
- Validar se a categoria existe
- Associar item ao usuário logado (owner_id)
- Definir status padrão como 'open' se não fornecido
- Retornar dados completos do item criado (com JOIN)

### 4. Atualizar Item
- Verificar se o usuário está logado
- Verificar se o item existe
- Verificar se o usuário é o dono do item
- Atualizar todos os campos: title, description, category_id, suggested_value, status
- Retornar dados completos do item atualizado

### 5. Remover Item (Bônus)
- Verificar autenticação e permissão (usuário deve ser o dono)
- Executar DELETE no banco
- Retornar mensagem de sucesso

## Conceitos Importantes

### PDO e Prepared Statements

```php
// Incluir conexão
require_once '../connection.php';

// Query com parâmetros
$stmt = $conn->prepare("SELECT * FROM items WHERE id = :id");
$stmt->execute(['id' => $id]);
$item = $stmt->fetch();

// INSERT e obter ID inserido
$stmt = $conn->prepare("INSERT INTO items (title, ...) VALUES (:title, ...)");
$stmt->execute(['title' => $title, ...]);
$lastId = $conn->lastInsertId();
```

### Filtros Dinâmicos

```php
$query = "SELECT * FROM items WHERE 1=1";
$params = [];

if (!empty($_GET['status'])) {
    $query .= " AND status = :status";
    $params['status'] = $_GET['status'];
}

if (!empty($_GET['q'])) {
    $query .= " AND (title LIKE :search OR description LIKE :search)";
    $params['search'] = '%' . $_GET['q'] . '%';
}

$stmt = $conn->prepare($query);
$stmt->execute($params);
```

### JOINs para Dados Completos

```php
$query = "
    SELECT 
        i.*,
        c.name as category_name,
        u.name as owner_name
    FROM items i
    INNER JOIN categories c ON i.category_id = c.id
    INNER JOIN users u ON i.owner_id = u.id
    WHERE i.id = :id
";
```

### Validação de Dados

```php
// Campos obrigatórios
if (empty($_POST['title']) || empty($_POST['description'])) {
    echo json_encode(['error' => true, 'message' => 'Campos obrigatórios não preenchidos']);
    exit;
}

// Validar categoria existe
$stmt = $conn->prepare("SELECT id FROM categories WHERE id = :id");
$stmt->execute(['id' => $category_id]);
if (!$stmt->fetch()) {
    echo json_encode(['error' => true, 'message' => 'Categoria inválida']);
    exit;
}

// Verificar permissão
$stmt = $conn->prepare("SELECT owner_id FROM items WHERE id = :id");
$stmt->execute(['id' => $id]);
$item = $stmt->fetch();

if ($item['owner_id'] != $_SESSION['user_id']) {
    echo json_encode(['error' => true, 'message' => 'Você não tem permissão']);
    exit;
}
```

## Dicas

1. **Sempre use `session_start()`** no início de arquivos que precisam de autenticação
2. **Sempre use prepared statements** para prevenir SQL injection
3. **Valide todos os dados** antes de inserir/atualizar no banco
4. **Use JOINs** para retornar dados completos (nomes ao invés de apenas IDs)
5. **Retorne mensagens claras** em português para facilitar debug
6. **Teste cada endpoint** individualmente antes de passar para o próximo

## Fluxo de Teste Recomendado

1. Configure `connection.php` e teste a conexão
2. Implemente `login.php` e teste login com usuários de exemplo
3. Implemente `list.php` e teste listagem sem filtros
4. Teste filtros um por vez: categoria, status, busca por texto
5. Implemente `add.php` e teste criação de novos itens
6. Implemente `update.php` e teste edição de itens próprios
7. Teste tentativa de editar item de outro usuário (deve falhar)
8. Implemente `logout.php` e teste
9. (Bônus) Implemente `delete.php` e teste remoção

## Pontuação

- Questão 1 (Login): 2.5 pontos
- Questão 2 (Listagem): 2.5 pontos
- Questão 3 (Adicionar): 2.5 pontos
- Questão 4 (Atualizar): 2.5 pontos
- **Total:** 10 pontos

**Bônus (Delete):** +0.5 pontos (máximo 10 pontos)

## Estrutura de Arquivos

```
public/
├── api/
│   ├── connection.php          # Conexão PDO (configurar)
│   ├── database.sql            # Dump do banco
│   ├── auth/
│   │   ├── login.php          # [IMPLEMENTAR] Questão 1
│   │   ├── logout.php         # [IMPLEMENTAR] Questão 1
│   │   └── README-*.md        # Instruções
│   └── items/
│       ├── list.php           # [IMPLEMENTAR] Questão 2
│       ├── add.php            # [IMPLEMENTAR] Questão 3
│       ├── update.php         # [IMPLEMENTAR] Questão 4
│       ├── delete.php         # [IMPLEMENTAR] Bônus
│       └── README-*.md        # Instruções
├── components/
│   └── toast.js               # Sistema de notificações (frontend)
├── css/
│   ├── index.css              # Estilos principais (frontend)
│   └── toast.css              # Estilos toast (frontend)
├── login/
│   ├── index.html             # Página de login (frontend)
│   └── script.js              # Lógica de login (frontend)
├── add-item/
│   ├── index.html             # Formulário adicionar (frontend)
│   └── script.js              # Lógica adicionar (frontend)
├── update-item/
│   ├── index.html             # Formulário editar (frontend)
│   └── script.js              # Lógica editar (frontend)
├── index.html                 # Página principal (frontend)
└── script.js                  # Lógica listagem (frontend)
```

## Observações Finais

- Este é um exercício preparatório focado em conceitos básicos de PHP, MySQL e APIs
- O objetivo é praticar CRUD, autenticação simples e uso de PDO
- Mantenha o código limpo, comentado e organizado
- Em caso de dúvidas, consulte os arquivos README de cada questão
- Teste extensivamente cada funcionalidade antes de considerar finalizada

Boa sorte! 🍀

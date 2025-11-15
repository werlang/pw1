# Questão 3 - Adicionar Nova Receita

## Objetivo

Implementar o endpoint que insere novas receitas no banco de dados vinculadas ao usuário autenticado.

## Arquivo a Implementar

`add.php` (nesta pasta: `/api/recipes/`)

## Contexto

A página `/add-recipe/` possui um formulário para criar novas receitas. O frontend envia requisições POST para `/api/recipes/add.php` com os dados da receita.

## Dados Recebidos (POST)

O frontend envia os seguintes campos via `$_POST`:
- `title` (obrigatório): Título da receita
- `description` (obrigatório): Descrição breve da receita
- `ingredients` (obrigatório): Lista de ingredientes (texto)
- `category` (obrigatório): Categoria da receita
- `difficulty` (opcional): Dificuldade (`fácil`, `médio` ou `difícil`)
- `prep_time` (obrigatório): Tempo de preparo em minutos
- `servings` (opcional): Número de porções
- `is_public` (opcional): Visibilidade da receita (1 ou 0)

## Requisitos de Implementação

### 1. Inicia a Sessão e Verifica Autenticação
```php
session_start();
if (!isset($_SESSION['user_id'])) {
    http_response_code(401);
    echo json_encode([
        'error' => true,
        'message' => 'Usuário não autenticado'
    ]);
    exit;
}
```

### 2. Valida os Parâmetros Obrigatórios
```php
if (empty($_POST['title']) || empty($_POST['description']) || 
    empty($_POST['ingredients']) || empty($_POST['category']) || 
    empty($_POST['prep_time'])) {
    http_response_code(400);
    echo json_encode([
        'error' => true,
        'message' => 'Todos os campos obrigatórios devem ser preenchidos'
    ]);
    exit;
}
```

### 3. Obtém os Dados do POST
```php
$user_id = $_SESSION['user_id'];
$title = $_POST['title'];
$description = $_POST['description'];
$ingredients = $_POST['ingredients'];
$category = $_POST['category'];
$prep_time = (int)$_POST['prep_time'];

// Campos opcionais com valores padrão
$difficulty = $_POST['difficulty'] ?? 'médio';
$servings = $_POST['servings'] ?? 4;
$is_public = $_POST['is_public'] ?? 1;
```

### 4. Valida Valores
Verifique se a dificuldade é válida:
```php
$valid_difficulties = ['fácil', 'médio', 'difícil'];
if (!in_array($difficulty, $valid_difficulties)) {
    $difficulty = 'médio';
}
```

### 5. Insere a Receita no Banco
```php
include "../connection.php";

$sql = "INSERT INTO recipes (user_id, title, description, ingredients, category, 
        difficulty, prep_time, servings, is_public) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";

$stmt = $conn->prepare($sql);
$stmt->execute([
    $user_id, $title, $description, $ingredients, $category,
    $difficulty, $prep_time, $servings, $is_public
]);
```

### 6. Verifica o Sucesso e Retorna a Resposta
```php
if ($stmt->rowCount() > 0) {
    $recipe_id = $conn->lastInsertId();
    
    // Busca a receita recém-criada
    $sql = "SELECT * FROM recipes WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->execute([$recipe_id]);
    $recipe = $stmt->fetch();
    
    echo json_encode([
        'message' => 'Receita adicionada com sucesso',
        'recipe' => $recipe
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        'error' => true,
        'message' => 'Erro ao adicionar receita'
    ]);
}
```

## Estrutura da Resposta

### Sucesso
```json
{
    "message": "Receita adicionada com sucesso",
    "recipe": {
        "id": 6,
        "user_id": 1,
        "title": "Bolo de Chocolate",
        "description": "Bolo fofinho e úmido",
        "ingredients": "3 ovos\n2 xícaras de farinha...",
        "category": "Sobremesas",
        "difficulty": "fácil",
        "prep_time": 60,
        "servings": 12,
        "is_public": 1,
        "created_at": "2025-11-15 14:30:00"
    }
}
```

### Erros Possíveis

**Usuário não autenticado:**
```json
{
    "error": true,
    "message": "Usuário não autenticado"
}
```

**Campos obrigatórios não preenchidos:**
```json
{
    "error": true,
    "message": "Todos os campos obrigatórios devem ser preenchidos"
}
```

## Categorias Sugeridas

- Sobremesas
- Pratos Principais
- Massas e Grãos
- Entradas
- Lanches
- Bebidas
- Saladas
- Sopas

## Como Testar

1. Faça login no sistema
2. Na página de receitas, clique em "Nova Receita"
3. Preencha o formulário:
   - **Título:** Brownie de Chocolate
   - **Descrição:** Brownie denso e achocolatado
   - **Ingredientes:** 200g de chocolate meio amargo, 100g de manteiga, 3 ovos, 1 xícara de açúcar, 1/2 xícara de farinha
   - **Categoria:** Sobremesas
   - **Dificuldade:** Fácil
   - **Tempo:** 45 minutos
   - **Porções:** 9
   - **Público:** Sim
4. Clique em "Adicionar Receita"
5. Se implementado corretamente, você verá uma mensagem de sucesso e será redirecionado
6. Verifique se a receita aparece na listagem

## Conceitos Importantes

### lastInsertId()
Após um INSERT bem-sucedido, você pode obter o ID da linha inserida usando:
```php
$id = $conn->lastInsertId();
```

### Valores Padrão
- Se `difficulty` não for enviada ou for inválida, use `'médio'`
- Se `servings` não for enviado, use `4`
- Se `is_public` não for enviado, use `1`

### Validação de ENUM
A coluna `difficulty` no banco é um ENUM. Sempre valide o valor antes de inserir.

## Checklist

- [ ] `session_start()` é chamado
- [ ] Verificação de autenticação
- [ ] Validação dos campos obrigatórios
- [ ] Obtenção do `user_id` da sessão
- [ ] Tratamento de valores padrão para campos opcionais
- [ ] Validação da dificuldade com `in_array()`
- [ ] Conversão de `prep_time` para inteiro
- [ ] INSERT preparado com todos os campos
- [ ] Uso de `lastInsertId()` para obter o ID gerado
- [ ] Busca da receita recém-criada
- [ ] Retorno JSON com estrutura correta
- [ ] Header `Content-Type: application/json`

## Conceitos Avaliados

- ✅ Verificação de sessão
- ✅ Validação de campos obrigatórios
- ✅ INSERT com múltiplos campos
- ✅ Valores padrão para campos opcionais
- ✅ Validação de valores de ENUM
- ✅ Uso de `lastInsertId()`
- ✅ Tratamento de erros

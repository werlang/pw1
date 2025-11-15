# Questão 2 - Listagem de Receitas com Filtros

## Objetivo

Implementar o endpoint que retorna as receitas públicas de todos os usuários, com suporte a filtros por categoria e dificuldade.

## Arquivo a Implementar

`list.php` (nesta pasta: `/api/recipes/`)

## Contexto

A página `/recipes/` exibe uma lista de todas as receitas públicas do sistema. O frontend JavaScript faz requisições GET para `/api/recipes/list.php` para buscar os dados.

## ⚠️ IMPORTANTE

A listagem deve retornar TODAS as receitas públicas (`is_public = 1`) de TODOS os usuários, não apenas as do usuário logado. Isso simula um feed de receitas compartilhadas onde qualquer pessoa pode ver receitas públicas de outros usuários.

## Parâmetros Opcionais (via GET)

- `category`: Filtro opcional para retornar apenas receitas de uma categoria específica
  - Exemplos: `Sobremesas`, `Pratos Principais`, `Massas e Grãos`
  - Se não for informado, retorna todas as receitas públicas

- `difficulty`: Filtro opcional para retornar apenas receitas de uma dificuldade específica
  - Valores possíveis: `fácil`, `médio`, `difícil`
  - Se não for informado, retorna todas as receitas públicas

**Os filtros podem ser combinados:** `/api/recipes/list.php?category=Sobremesas&difficulty=fácil`

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

### 2. Inclui a Conexão
```php
include "../connection.php";
```

### 3. Obtém os Filtros (se existirem)
```php
$category = $_GET['category'] ?? null;
$difficulty = $_GET['difficulty'] ?? null;
```

### 4. Monta a Query Base
A query base deve buscar APENAS receitas públicas e INCLUIR o nome do autor:
```sql
SELECT recipes.*, users.name as author_name 
FROM recipes 
INNER JOIN users ON recipes.user_id = users.id
WHERE recipes.is_public = 1
```

### 5. Adiciona Filtros Dinamicamente

**Se houver filtro de categoria:**
```sql
AND recipes.category = ?
```

**Se houver filtro de dificuldade:**
```sql
AND recipes.difficulty = ?
```

**Importante:** Valide os valores usando `in_array()` antes de adicionar à query:
```php
$valid_difficulties = ['fácil', 'médio', 'difícil'];
if ($difficulty && in_array($difficulty, $valid_difficulties)) {
    // adicionar filtro
}
```

### 6. Ordena e Executa
```sql
ORDER BY recipes.created_at DESC
```

Execute a query preparada com os parâmetros necessários.

### 7. Retorna o Resultado
```json
{
    "message": "Receitas encontradas",
    "recipes": [
        {
            "id": 1,
            "user_id": 1,
            "author_name": "Chef Carolina",
            "title": "Risoto de Funghi",
            "description": "Cremoso risoto italiano...",
            "ingredients": "300g de arroz arbóreo...",
            "category": "Massas e Grãos",
            "difficulty": "médio",
            "prep_time": 45,
            "servings": 4,
            "is_public": 1,
            "created_at": "2025-11-15 10:00:00"
        }
    ]
}
```

## Como Testar

1. Faça login no sistema (`http://localhost/challenges/recipe-manager/public/login/`)
2. Você será redirecionado automaticamente para `/recipes/`
3. A página deve exibir todas as receitas públicas de todos os usuários
4. Teste os filtros:
   - Clique em "Sobremesas" - deve mostrar apenas sobremesas
   - Clique em "Fácil" - deve mostrar apenas receitas fáceis
   - Combine filtros - categoria + dificuldade
5. Verifique no console do navegador (F12) se as requisições estão retornando os dados corretos

## Categorias Disponíveis

- Sobremesas
- Pratos Principais
- Massas e Grãos
- Entradas
- Lanches
- Bebidas

## Checklist

- [ ] `session_start()` é chamado no início
- [ ] Verificação se o usuário está autenticado
- [ ] INNER JOIN entre `recipes` e `users` para obter `author_name`
- [ ] Filtro WHERE `is_public = 1` (sempre presente)
- [ ] Verificação do parâmetro `category` no `$_GET`
- [ ] Verificação do parâmetro `difficulty` no `$_GET`
- [ ] Validação de valores de dificuldade com `in_array()`
- [ ] Query preparada com filtros dinâmicos
- [ ] Ordenação por `created_at DESC`
- [ ] Retorno JSON com estrutura correta incluindo `author_name`
- [ ] Header `Content-Type: application/json`

## Conceitos Avaliados

- ✅ Verificação de sessão
- ✅ JOIN entre tabelas
- ✅ Queries com múltiplos filtros opcionais
- ✅ Prepared statements com parâmetros dinâmicos
- ✅ Validação de valores permitidos
- ✅ Ordenação de resultados

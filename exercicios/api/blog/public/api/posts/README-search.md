# Questão 2 - Busca de Posts

## Objetivo

Implementar um endpoint que busca posts por palavras-chave no título ou conteúdo, incluindo informações do autor.

## Arquivo a Implementar

`search.php` (nesta pasta: `/api/posts/`)

## Contexto

O sistema possui uma página de posts em `/posts/index.html` que permite buscar artigos do blog. Você deve criar este endpoint que:
- Busca posts cujo título OU conteúdo contenham a palavra-chave
- Retorna apenas posts publicados (`is_published = 1`)
- Inclui o nome do autor usando JOIN com a tabela users

## Dados Recebidos (GET)

O frontend envia um parâmetro via URL:
- `query`: Palavra-chave para buscar (ex: `/api/posts/search.php?query=php`)

## Requisitos de Implementação

### 1. Valida a Sessão
- Use `session_start()` e verifique se `$_SESSION["user_id"]` existe
- Se não existir, retorne erro:
```json
{
    "error": true,
    "message": "Usuário não autenticado"
}
```

### 2. Captura o Parâmetro de Busca
- Pegue o valor de `$_GET["query"]`
- Se não foi enviado, retorne todos os posts publicados

### 3. Monta a Query SQL com JOIN
- Use `INNER JOIN` para juntar as tabelas `posts` e `users`
- Filtre por `is_published = 1`
- Se houver query, use `LIKE` para buscar em `title` OU `content`
- Selecione campos do post E o nome do autor

**Exemplo de Query:**
```sql
SELECT 
    posts.*,
    users.name as author_name
FROM posts
INNER JOIN users ON posts.user_id = users.id
WHERE posts.is_published = 1
AND (posts.title LIKE ? OR posts.content LIKE ?)
ORDER BY posts.created_at DESC
```

### 4. Prepara o Valor para LIKE
- Quando usar LIKE, adicione `%` antes e depois: `%palavra%`
- Exemplo: `$searchTerm = "%" . $_GET["query"] . "%";`

### 5. Retorna os Posts
- Execute a query preparada
- Retorne um array JSON com os posts encontrados:
```json
[
    {
        "id": 1,
        "user_id": 1,
        "title": "Introdução ao PHP Moderno",
        "content": "PHP evoluiu muito...",
        "category": "Tecnologia",
        "is_published": 1,
        "created_at": "2025-01-15 10:30:00",
        "author_name": "Ana Silva"
    }
]
```

## Testando

1. Sem query: `/api/posts/search.php` → Retorna todos os posts publicados
2. Com query: `/api/posts/search.php?query=design` → Retorna posts que contenham "design"

## Dicas

1. Use `INNER JOIN users ON posts.user_id = users.id` para pegar o nome do autor
2. O operador LIKE usa `%` como wildcard: `%palavra%` busca em qualquer posição
3. Para buscar em múltiplos campos, use: `WHERE (campo1 LIKE ? OR campo2 LIKE ?)`
4. Não esqueça de adicionar `%` ao valor: `$term = "%" . $_GET["query"] . "%"`
5. Use `ORDER BY created_at DESC` para mostrar posts mais recentes primeiro
6. Sempre filtre `is_published = 1` para mostrar apenas posts publicados

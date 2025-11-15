# Questão 3 - Criar Novo Post

## Objetivo

Implementar o endpoint que permite usuários autenticados criarem novos posts no blog.

## Arquivo a Implementar

`create.php` (nesta pasta: `/api/posts/`)

## Contexto

O sistema possui uma página em `/create-post/index.html` que permite criar novos posts. Você deve criar este endpoint para salvar os posts no banco de dados.

## Dados Recebidos (POST)

O frontend envia os seguintes campos via `$_POST`:
- `title`: Título do post
- `content`: Conteúdo do post
- `category`: Categoria (Tecnologia, Programação, Design, Carreira)

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

### 2. Valida os Campos Obrigatórios
- Verifique se `title`, `content` e `category` foram enviados
- Verifique se nenhum está vazio
- Se algum estiver faltando ou vazio, retorne:
```json
{
    "error": true,
    "message": "Todos os campos são obrigatórios"
}
```

### 3. Insere o Post no Banco
- Prepare uma query INSERT com os campos:
  - `user_id`: ID do usuário da sessão (`$_SESSION["user_id"]`)
  - `title`: Título recebido
  - `content`: Conteúdo recebido
  - `category`: Categoria recebida
  - `is_published`: Inicia como `0` (não publicado)
  - `created_at`: Será preenchido automaticamente pelo banco

**Exemplo de Query:**
```sql
INSERT INTO posts (user_id, title, content, category, is_published)
VALUES (?, ?, ?, ?, 0)
```

### 4. Retorna o ID do Post Criado
- Use `$conn->lastInsertId()` para pegar o ID do post inserido
- Retorne um JSON de sucesso:
```json
{
    "message": "Post criado com sucesso",
    "post_id": 6
}
```

## Categorias Válidas

O sistema aceita as seguintes categorias:
- Tecnologia
- Programação
- Design
- Carreira

## Testando

Envie uma requisição POST para `/api/posts/create.php` com:
```
title: "Meu Primeiro Post"
content: "Este é o conteúdo do meu post sobre PHP..."
category: "Programação"
```

Deve retornar:
```json
{
    "message": "Post criado com sucesso",
    "post_id": 6
}
```

## Dicas

1. Use `$_SESSION["user_id"]` para pegar o ID do usuário logado
2. Use prepared statements para prevenir SQL injection
3. Use `$conn->lastInsertId()` para pegar o ID do registro inserido
4. O campo `is_published` deve sempre ser `0` ao criar (rascunho)
5. Valide se TODOS os campos foram enviados antes de inserir
6. Não esqueça de incluir `../connection.php` e usar `session_start()`

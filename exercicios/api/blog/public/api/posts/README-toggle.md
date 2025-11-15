# Questão 4 - Toggle Publicação de Post

## Objetivo

Implementar o endpoint que alterna o status de publicação de um post entre publicado (1) e rascunho (0).

## Arquivo a Implementar

`toggle-publish.php` (nesta pasta: `/api/posts/`)

## Contexto

O sistema possui uma página em `/edit-post/index.html` que permite alternar o status de publicação de posts. Este endpoint deve:
- Verificar se o post pertence ao usuário logado
- Alternar `is_published` entre 0 e 1
- Retornar o novo status

## Dados Recebidos (POST)

O frontend envia:
- `post_id`: ID do post a ser atualizado

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

### 2. Valida o ID do Post
- Verifique se `post_id` foi enviado via `$_POST`
- Se não foi enviado, retorne:
```json
{
    "error": true,
    "message": "ID do post é obrigatório"
}
```

### 3. Busca o Post e Verifica Propriedade
- Busque o post pelo ID
- Verifique se `user_id` do post é igual ao `$_SESSION["user_id"]`
- Se não pertence ao usuário, retorne:
```json
{
    "error": true,
    "message": "Você não tem permissão para alterar este post"
}
```

### 4. Alterna o Status (Toggle)
- Leia o valor atual de `is_published`
- Calcule o novo valor: `$newStatus = $currentStatus == 0 ? 1 : 0;`
- Ou use: `$newStatus = 1 - $currentStatus;`

### 5. Atualiza o Post
- Execute um UPDATE que muda `is_published` para o novo valor
- Certifique-se de adicionar `WHERE user_id = ?` para segurança

**Exemplo de Query:**
```sql
UPDATE posts 
SET is_published = ? 
WHERE id = ? AND user_id = ?
```

### 6. Retorna o Resultado
- Retorne o novo status:
```json
{
    "message": "Status atualizado com sucesso",
    "is_published": 1
}
```

## Lógica do Toggle

```php
// Busca o valor atual
$current = $post["is_published"]; // 0 ou 1

// Calcula o oposto
$new = $current == 0 ? 1 : 0;
// OU
$new = 1 - $current;

// Atualiza com o novo valor
```

## Testando

1. Crie um post (ficará como `is_published = 0`)
2. Envie POST para `/api/posts/toggle-publish.php` com `post_id=6`
3. Deve retornar `{"is_published": 1}` (publicado)
4. Envie novamente
5. Deve retornar `{"is_published": 0}` (despublicado)

## Segurança

⚠️ **IMPORTANTE:** Sempre adicione `AND user_id = ?` no WHERE para garantir que usuários só podem alterar seus próprios posts!

```sql
-- ❌ ERRADO (qualquer um pode alterar)
UPDATE posts SET is_published = ? WHERE id = ?

-- ✅ CORRETO (só o dono pode alterar)
UPDATE posts SET is_published = ? WHERE id = ? AND user_id = ?
```

## Dicas

1. Use `$_SESSION["user_id"]` para verificar propriedade
2. Busque o post primeiro com SELECT para pegar o valor atual
3. Use operador ternário: `$new = $atual == 0 ? 1 : 0`
4. Sempre valide se o post pertence ao usuário antes de atualizar
5. Retorne o novo status para o frontend saber o estado atual

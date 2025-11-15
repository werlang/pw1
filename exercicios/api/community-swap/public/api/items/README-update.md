# Questão 4 - Atualizar Item

## Objetivo

Implementar o endpoint que atualiza informações de um item existente.

## Arquivo a Implementar

`update.php` (nesta pasta: `/api/items/`)

## Contexto

A página `/update-item/` permite editar informações de um item. O frontend envia requisições POST para `/api/items/update.php` com os novos dados.

### Parâmetros (via POST)

- `id` (obrigatório): ID do item a ser atualizado
- `title` (obrigatório): Novo título do item
- `description` (obrigatório): Nova descrição
- `category_id` (obrigatório): Nova categoria
- `suggested_value` (obrigatório): Novo valor sugerido
- `status` (obrigatório): Novo status (`open`, `pending` ou `closed`)

## Implementação

### 1. Inicia a Sessão e Verifica Autenticação

Use `session_start()` e verifique se o usuário está logado.

### 2. Inclui a Conexão

Inclua o arquivo `connection.php`.

### 3. Valida os Parâmetros Obrigatórios

Verifique se todos os campos foram enviados.

### 4. Verifica Permissão

O usuário só pode atualizar itens que ele mesmo criou. Busque o item e verifique se `owner_id` corresponde ao `user_id` da sessão.

### 5. Valida a Categoria

Verifique se a categoria existe no banco.

### 6. Atualiza o Item

Execute UPDATE com os novos dados.

### 7. Busca o Item Atualizado

Faça uma query com JOIN para retornar os dados completos atualizados.

### 8. Retorna a Resposta

Retorne JSON com mensagem de sucesso e dados atualizados.

## Estrutura da Resposta

### Sucesso
```json
{
    "message": "Item atualizado com sucesso",
    "item": {
        "id": 1,
        "title": "Harry Potter - Coleção Completa (Atualizado)",
        "description": "Coleção dos 7 livros em ótimo estado",
        "category_id": 1,
        "category_name": "Livros",
        "owner_id": 1,
        "owner_name": "Ana Costa",
        "suggested_value": "180.00",
        "status": "pending",
        "created_at": "2025-11-14 10:30:00"
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
    "message": "Todos os campos devem ser preenchidos"
}
```

**Item não encontrado:**
```json
{
    "error": true,
    "message": "Item não encontrado"
}
```

**Sem permissão:**
```json
{
    "error": true,
    "message": "Você não tem permissão para atualizar este item"
}
```

**Categoria inválida:**
```json
{
    "error": true,
    "message": "Categoria inválida"
}
```

## Conceitos Importantes

### Verificar Proprietário
```php
$stmt = $conn->prepare("SELECT owner_id FROM items WHERE id = :id");
$stmt->execute(['id' => $id]);
$item = $stmt->fetch();

if (!$item) {
    // Item não existe
}

if ($item['owner_id'] != $_SESSION['user_id']) {
    // Usuário não é o dono
}
```

### UPDATE com WHERE
```php
$stmt = $conn->prepare("UPDATE items SET title = :title, ... WHERE id = :id");
$stmt->execute([
    'title' => $title,
    // ...
    'id' => $id
]);
```

## Como Testar

1. Faça login no sistema
2. Na listagem, clique no botão "Editar" em um item seu
3. Altere os dados do formulário
4. Clique em "Salvar"
5. Verifique se as alterações aparecem na listagem
6. Tente editar um item de outro usuário (não deve permitir)

## Checklist

- [ ] `session_start()` no início do arquivo
- [ ] Verificar autenticação
- [ ] Incluir `connection.php`
- [ ] Validar todos os campos obrigatórios
- [ ] Buscar item e verificar se existe
- [ ] Verificar se usuário é o dono do item
- [ ] Validar categoria
- [ ] Executar UPDATE
- [ ] Buscar item atualizado com JOIN
- [ ] Retornar JSON com estrutura correta
- [ ] Testar atualização com diferentes campos
- [ ] Testar tentativa de atualizar item de outro usuário

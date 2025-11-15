# Questão 3 - Adicionar Item

## Objetivo

Implementar o endpoint que insere novos itens de troca no banco de dados.

## Arquivo a Implementar

`add.php` (nesta pasta: `/api/items/`)

## Contexto

A página `/add-item/` possui um formulário para cadastrar novos itens para troca. O frontend envia requisições POST para `/api/items/add.php` com os dados do item.

### Parâmetros (via POST)

- `title` (obrigatório): Título do item
- `description` (obrigatório): Descrição detalhada do item
- `category_id` (obrigatório): ID da categoria do item
- `suggested_value` (obrigatório): Valor sugerido para troca
- `status` (opcional): Status inicial (`open`, `pending` ou `closed`)
  - Se não for enviado, use `'open'` como padrão

## Implementação

### 1. Inicia a Sessão e Verifica Autenticação

Use `session_start()` e verifique se o usuário está logado (`$_SESSION['user_id']`).

### 2. Inclui a Conexão

Inclua o arquivo `connection.php` que está na pasta `/api/`.

### 3. Valida os Parâmetros Obrigatórios

Verifique se `title`, `description`, `category_id` e `suggested_value` foram enviados e não estão vazios.

### 4. Obtém os Dados do POST

Capture todos os dados do POST. Para `status`, use `'open'` se não foi enviado ou se o valor for inválido.

### 5. Insere o Item no Banco

Use INSERT com prepared statement. O `owner_id` deve ser o ID do usuário logado (`$_SESSION['user_id']`).

### 6. Busca o Item Inserido com Dados Completos

Após inserir, use `lastInsertId()` para obter o ID do item criado e faça uma query com JOIN para retornar os dados completos (incluindo nome da categoria e dono).

### 7. Retorna a Resposta

Retorne JSON com a mensagem de sucesso e os dados do item criado.

## Estrutura da Resposta

### Sucesso
```json
{
    "message": "Item adicionado com sucesso",
    "item": {
        "id": 13,
        "title": "Livro Clean Code",
        "description": "Livro sobre código limpo, em inglês",
        "category_id": 1,
        "category_name": "Livros",
        "owner_id": 1,
        "owner_name": "Ana Costa",
        "suggested_value": "60.00",
        "status": "open",
        "created_at": "2025-11-15 10:30:00"
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

**Categoria inválida:**
```json
{
    "error": true,
    "message": "Categoria inválida"
}
```

## Conceitos Importantes

### lastInsertId()
Após um INSERT bem-sucedido, você pode obter o ID da linha inserida:
```php
$stmt = $conn->prepare("INSERT INTO items ...");
$stmt->execute($params);
$id = $conn->lastInsertId();
```

### Validar Categoria
Verifique se a categoria existe antes de inserir:
```php
$stmt = $conn->prepare("SELECT id FROM categories WHERE id = :id");
$stmt->execute(['id' => $category_id]);
if (!$stmt->fetch()) {
    // Categoria não existe
}
```

### Valores Padrão
```php
$status = $_POST['status'] ?? 'open';
if (!in_array($status, ['open', 'pending', 'closed'])) {
    $status = 'open';
}
```

## Como Testar

1. Faça login no sistema
2. Clique no botão "Adicionar Item"
3. Preencha o formulário com:
   - Título do item
   - Descrição
   - Categoria
   - Valor sugerido
4. Clique em "Adicionar"
5. Verifique se o item aparece na listagem principal

## Checklist

- [ ] `session_start()` no início do arquivo
- [ ] Verificar autenticação do usuário
- [ ] Incluir `connection.php`
- [ ] Validar todos os campos obrigatórios
- [ ] Validar se a categoria existe
- [ ] Aplicar valor padrão para status
- [ ] Inserir item com `owner_id` do usuário logado
- [ ] Usar `lastInsertId()` para obter ID do item
- [ ] Buscar item completo com JOIN
- [ ] Retornar JSON com estrutura correta
- [ ] Testar inserção com diferentes dados

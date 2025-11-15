# Questão 4 - Atualizar Visibilidade da Receita

## Objetivo

Implementar o endpoint que altera a visibilidade de uma receita entre pública (1) e privada (0), com validação de segurança para garantir que usuários só possam modificar suas próprias receitas.

## Arquivo a Implementar

`update-visibility.php` (nesta pasta: `/api/recipes/`)

## Contexto

Na página "Minhas Receitas" (`/my-recipes/`), o usuário pode visualizar suas próprias receitas e alternar a visibilidade entre pública e privada clicando em um botão. O frontend envia requisições POST para `/api/recipes/update-visibility.php`.

## ⚠️ IMPORTANTE: Lógica de Toggle

O endpoint deve ALTERNAR (toggle) a visibilidade automaticamente. Ou seja:
- Se a receita está pública (1), deve tornar privada (0)
- Se a receita está privada (0), deve tornar pública (1)

Você deve **buscar o valor atual primeiro**, depois **calcular o inverso**, e só então atualizar.

## Dados Recebidos (POST)

O frontend envia os seguintes campos via `$_POST`:
- `id` (obrigatório): ID da receita a ser atualizada

**Nota:** Você NÃO recebe o novo valor de visibilidade. Você deve descobrir o valor atual e invertê-lo automaticamente.

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
if (empty($_POST['id'])) {
    http_response_code(400);
    echo json_encode([
        'error' => true,
        'message' => 'ID da receita é obrigatório'
    ]);
    exit;
}

$recipe_id = (int)$_POST['id'];
$user_id = $_SESSION['user_id'];
```

### 3. Busca a Receita e Verifica Propriedade
```php
include "../connection.php";

$sql = "SELECT is_public FROM recipes WHERE id = ? AND user_id = ?";
$stmt = $conn->prepare($sql);
$stmt->execute([$recipe_id, $user_id]);
$recipe = $stmt->fetch();

if (!$recipe) {
    http_response_code(404);
    echo json_encode([
        'error' => true,
        'message' => 'Receita não encontrada ou você não tem permissão para atualizá-la'
    ]);
    exit;
}
```

**IMPORTANTE:** Note que a query inclui `AND user_id = ?` para garantir que apenas o dono da receita possa atualizá-la.

### 4. Calcula o Novo Valor (Inverso do Atual)
```php
$current_visibility = $recipe['is_public'];
$new_visibility = $current_visibility == 1 ? 0 : 1;
```

OU usando inversão numérica:
```php
$new_visibility = 1 - $recipe['is_public'];
```

### 5. Atualiza a Visibilidade
```php
$sql = "UPDATE recipes SET is_public = ? WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->execute([$new_visibility, $recipe_id]);
```

### 6. Verifica o Sucesso e Retorna
```php
if ($stmt->rowCount() > 0) {
    $status_text = $new_visibility == 1 ? 'pública' : 'privada';
    echo json_encode([
        'message' => "Receita atualizada para $status_text com sucesso",
        'is_public' => $new_visibility
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        'error' => true,
        'message' => 'Erro ao atualizar visibilidade'
    ]);
}
```

## Estrutura da Resposta

### Sucesso
```json
{
    "message": "Receita atualizada para privada com sucesso",
    "is_public": 0
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

**ID não enviado:**
```json
{
    "error": true,
    "message": "ID da receita é obrigatório"
}
```

**Receita não encontrada ou sem permissão:**
```json
{
    "error": true,
    "message": "Receita não encontrada ou você não tem permissão para atualizá-la"
}
```

## Como Testar

### Teste Básico
1. Faça login no sistema
2. Vá para "Minhas Receitas"
3. Você verá suas receitas com botões de visibilidade
4. Clique em "Tornar Privada" em uma receita pública
5. Você deve ver uma mensagem de sucesso
6. O botão deve mudar para "Tornar Pública"
7. Clique novamente para tornar pública novamente

### Teste de Segurança
1. Abra o console do navegador (F12)
2. Tente enviar uma requisição para atualizar uma receita de outro usuário:
```javascript
fetch('../api/recipes/update-visibility.php', {
    method: 'POST',
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    body: 'id=1' // ID de receita de outro usuário
})
```
3. Deve retornar erro 404 com mensagem de sem permissão

## Checklist

- [ ] `session_start()` é chamado
- [ ] Verificação de autenticação
- [ ] Validação do parâmetro `id`
- [ ] SELECT para buscar valor atual de `is_public`
- [ ] Verificação de propriedade (`user_id` na query)
- [ ] Cálculo do novo valor (inverso do atual)
- [ ] UPDATE com o novo valor calculado
- [ ] Verificação de `rowCount()` para sucesso
- [ ] Retorno JSON com novo valor de `is_public`
- [ ] Mensagens de erro apropriadas
- [ ] Header `Content-Type: application/json`

## Conceitos Avaliados

- ✅ Verificação de sessão
- ✅ Lógica de alternância (toggle)
- ✅ SELECT antes de UPDATE
- ✅ Validação de propriedade (segurança)
- ✅ Operadores ternários ou aritméticos para inversão
- ✅ Prepared statements
- ✅ Tratamento de erros

## Segurança

⚠️ **IMPORTANTE**: Nunca permita que um usuário atualize receitas de outros usuários. Sempre verifique:
1. A receita existe
2. O `user_id` da receita corresponde ao `user_id` da sessão
3. Use `AND user_id = ?` na query de SELECT

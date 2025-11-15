# Questão 4 - Renovar Aluguel com Extensão de Prazo

## Objetivo

Implementar um endpoint que permite renovar um aluguel ativo, estendendo automaticamente a data de devolução.

## Arquivo a Implementar

`update.php` (nesta pasta: `/api/rentals/`)

## Contexto

Na listagem de aluguéis, cada item possui um botão "Atualizar Status" que leva para `/update-rental/?id=X`. Esta página envia requisições POST para `/api/rentals/update.php`.

Há duas operações possíveis:
1. Alterar o status do aluguel
2. Renovar o aluguel (estender prazo)

## Dados Recebidos (POST)

O frontend envia os seguintes campos via `$_POST`:
- `id` (obrigatório): ID do aluguel a ser atualizado
- `action` (obrigatório): Ação a realizar (`change_status` ou `renew`)
- `status` (obrigatório se action=change_status): Novo status (`active`, `returned` ou `overdue`)
- `extend_days` (obrigatório se action=renew): Dias para estender (7, 14 ou 21)

## Implementação

### 1. Inicia a Sessão e Verifica Autenticação
- Use `session_start()` no início
- Verifique se `$_SESSION['user_id']` existe
- Se não existir, retorne erro de não autenticado

### 2. Valida os Parâmetros Obrigatórios
Verifique se `id` e `action` foram enviados. Se não:
```json
{
    "error": true,
    "message": "ID e ação são obrigatórios"
}
```

### 3. Valida o Parâmetro `action`
Apenas `change_status` e `renew` são válidos. Se inválido:
```json
{
    "error": true,
    "message": "Ação inválida. Use: change_status ou renew"
}
```

### 4. Busca o Aluguel e Verifica Propriedade
- Busque o aluguel pelo ID usando prepared statement
- **IMPORTANTE:** Verifique se o `user_id` do aluguel corresponde ao `user_id` da sessão
- Se o aluguel não existir ou não pertencer ao usuário:
```json
{
    "error": true,
    "message": "Aluguel não encontrado ou você não tem permissão para atualizá-lo"
}
```

### 5A. Se action = "change_status"

- Valide que `status` foi enviado e é válido (`active`, `returned`, `overdue`)
- Atualize apenas o campo `status`
- Retorne:
```json
{
    "message": "Status do aluguel atualizado com sucesso"
}
```

### 5B. Se action = "renew"

**NOVA FUNCIONALIDADE:**

1. **Valide que o aluguel está ativo:**
   ```php
   if ($rental['status'] !== 'active') {
       // Erro: só pode renovar aluguéis ativos
   }
   ```

2. **Valide extend_days:**
   - Deve ser 7, 14 ou 21
   - Se inválido, retorne erro

3. **Calcule a nova due_date:**
   ```php
   $current_due_date = $rental['due_date'];
   $new_due_date = date('Y-m-d', strtotime("$current_due_date +$extend_days days"));
   ```

4. **Atualize a due_date no banco:**
   ```sql
   UPDATE rentals SET due_date = ? WHERE id = ? AND user_id = ?
   ```

5. **Retorne:**
   ```json
   {
       "message": "Aluguel renovado com sucesso",
       "new_due_date": "2025-12-05"
   }
   ```

## Estrutura da Resposta

### Sucesso
```json
{
    "message": "Status do aluguel atualizado com sucesso"
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

**Parâmetros obrigatórios não enviados:**
```json
{
    "error": true,
    "message": "ID e ação são obrigatórios"
}
```

**Ação inválida:**
```json
{
    "error": true,
    "message": "Ação inválida. Use: change_status ou renew"
}
```

**Status inválido (se action=change_status):**
```json
{
    "error": true,
    "message": "Status inválido. Use: active, returned ou overdue"
}
```

**Tentativa de renovar aluguel não ativo:**
```json
{
    "error": true,
    "message": "Apenas aluguéis ativos podem ser renovados"
}
```

**Dias de extensão inválidos:**
```json
{
    "error": true,
    "message": "Dias de extensão inválidos. Use: 7, 14 ou 21"
}
```

**Aluguel não encontrado ou sem permissão:**
```json
{
    "error": true,
    "message": "Aluguel não encontrado ou você não tem permissão para atualizá-lo"
}
```

## Como Testar

### Teste Básico
1. Faça login no sistema
2. Vá para a lista de aluguéis (`/rentals/`)
3. Clique em "Atualizar Status" em um aluguel
4. Altere o status e clique em "Atualizar"
5. Verifique se a mudança aparece na lista

### Teste de Segurança
1. Tente acessar `/update-rental/?id=X` com um ID que não pertence ao seu usuário
2. Tente atualizar - deve retornar erro de permissão
3. Tente enviar um status inválido como `deleted` - deve retornar erro

## Conceitos de Segurança

### Validação de Propriedade
É fundamental verificar se o aluguel pertence ao usuário antes de permitir a atualização:
```php
// Buscar e verificar
$stmt = $conn->prepare("SELECT * FROM rentals WHERE id = ? AND user_id = ?");
$stmt->execute([$id, $user_id]);
$rental = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$rental) {
    // Não encontrado ou não pertence ao usuário
}
```

### Update Seguro
Sempre inclua o `user_id` no WHERE do UPDATE:
```php
UPDATE rentals SET status = ? WHERE id = ? AND user_id = ?
```

## Checklist

- [ ] `session_start()` e verificação de autenticação
- [ ] Inclusão do arquivo `connection.php`
- [ ] Validação de campos obrigatórios (`id` e `action`)
- [ ] Validação do valor de `action`
- [ ] Busca do aluguel com verificação de propriedade
- [ ] **SE action = change_status:**
  - [ ] Validar status enviado
  - [ ] Atualizar campo status
  - [ ] Retornar mensagem de sucesso
- [ ] **SE action = renew:**
  - [ ] Verificar se status é 'active'
  - [ ] Validar extend_days (7, 14 ou 21)
  - [ ] Calcular nova due_date usando strtotime
  - [ ] Atualizar due_date no banco
  - [ ] Retornar mensagem com nova data
- [ ] Retorno JSON com estrutura correta
- [ ] Tratamento de todos os casos de erro

## Exemplo de Cálculo de Data

```php
// Pegar due_date atual do aluguel
$current_due = '2025-11-20';
$extend = 14; // dias

// Calcular nova data
$new_due = date('Y-m-d', strtotime("$current_due +$extend days"));
// Resultado: '2025-12-04'
```

## Segurança

⚠️ **IMPORTANTE**: Sempre verifique:
1. O usuário está autenticado (`$_SESSION["user_id"]`)
2. O aluguel existe
3. O aluguel pertence ao usuário logado (`user_id` no WHERE)
4. Para renovação: o aluguel deve estar com status `active`

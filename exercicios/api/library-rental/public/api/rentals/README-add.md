# Questão 3 - Registrar Novo Aluguel com Validações

## Objetivo

Implementar o endpoint que registra novos aluguéis de livros com validações de negócio e cálculo automático de datas.

## Arquivo a Implementar

`add.php` (nesta pasta: `/api/rentals/`)

## Contexto

A página `/add-rental/` possui um formulário para registrar novos aluguéis de livros. O frontend envia requisições POST para `/api/rentals/add.php` com os dados do aluguel.

## Dados Recebidos (POST)

O frontend envia os seguintes campos via `$_POST`:
- `book_title` (obrigatório): Título do livro
- `author` (obrigatório): Nome do autor
- `isbn` (obrigatório): Código ISBN do livro (formato: XXX-XXXXXXXXXX)
- `genre` (obrigatório): Gênero literário
- `loan_days` (obrigatório): Número de dias de empréstimo (7, 14 ou 21)
- `status` (opcional): Status inicial (`active`, `returned` ou `overdue`)

## Implementação

### 1. Inicia a Sessão e Verifica Autenticação
- Use `session_start()` no início
- Verifique se `$_SESSION['user_id']` existe
- Se não existir, retorne erro de não autenticado

### 2. Valida os Parâmetros Obrigatórios
Verifique se todos os campos obrigatórios foram enviados. Se algum estiver faltando:
```json
{
    "error": true,
    "message": "Todos os campos obrigatórios devem ser preenchidos"
}
```

### 3. Valida o ISBN

Valide o formato do ISBN:
- Deve ter exatamente 13 caracteres (incluindo hífens)
- Formato válido: `XXX-XXXXXXXXXX` (3 dígitos + hífen + 10 caracteres)
- Use expressão regular: `/^\d{3}-\d{10}$/`
- Use a função `preg_match()` para validação:
```php
if (!preg_match('/^\d{3}-\d{10}$/', $isbn)) {
    // ISBN inválido
}
```

Se inválido, retorne:
```json
{
    "error": true,
    "message": "ISBN inválido. Use o formato: XXX-XXXXXXXXXX"
}
```

### 4. Valida os Dias de Empréstimo

O campo `loan_days` deve ser um dos valores: `7`, `14` ou `21`.

Se inválido, retorne:
```json
{
    "error": true,
    "message": "Dias de empréstimo inválidos. Use: 7, 14 ou 21"
}
```

### 5. Calcula as Datas Automaticamente

```php
$rental_date = date('Y-m-d'); // Data de hoje
$due_date = date('Y-m-d', strtotime("+$loan_days days")); // Data atual + loan_days
```

### 6. Obtém os Dados do POST
- Capture todos os campos do `$_POST`
- Se `status` não foi enviado ou é inválido, use `'active'` como padrão
- Valores válidos para status: `active`, `returned`, `overdue`

### 7. Insere o Aluguel no Banco
- Use prepared statement para inserir os dados
- Inclua o `user_id` da sessão
- Use as datas calculadas (`$rental_date` e `$due_date`)
- Use `lastInsertId()` para obter o ID gerado

### 8. Busca o Aluguel Inserido e Retorna
Após inserir, busque o registro completo usando o ID gerado e retorne-o.

## Estrutura da Resposta

### Sucesso
```json
{
    "message": "Aluguel registrado com sucesso",
    "rental": {
        "id": 7,
        "user_id": 1,
        "book_title": "Harry Potter e a Pedra Filosofal",
        "author": "J.K. Rowling",
        "isbn": "978-8532530787",
        "genre": "Fantasia",
        "rental_date": "2025-11-15",
        "due_date": "2025-11-29",
        "status": "active",
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

**ISBN inválido:**
```json
{
    "error": true,
    "message": "ISBN inválido. Use o formato: XXX-XXXXXXXXXX"
}
```

**Dias de empréstimo inválidos:**
```json
{
    "error": true,
    "message": "Dias de empréstimo inválidos. Use: 7, 14 ou 21"
}
```

## Conceitos Importantes

### lastInsertId()
Após um INSERT bem-sucedido, você pode obter o ID da linha inserida usando:
```php
$id = $conn->lastInsertId();
```

### Valores Padrão
- Se `status` não for enviado ou for inválido, use `'active'`

### Validação de Datas
As datas devem estar no formato `YYYY-MM-DD` (formato SQL).

## Como Testar

1. Faça login no sistema
2. Acesse `http://localhost/challenges/library-rental/public/add-rental/`
3. Preencha o formulário com os dados de um livro
4. Clique em "Registrar Aluguel"
5. Verifique se o aluguel aparece na lista em `/rentals/`

## Checklist

- [ ] `session_start()` e verificação de autenticação
- [ ] Inclusão do arquivo `connection.php`
- [ ] Validação de todos os campos obrigatórios
- [ ] Validação do formato ISBN com regex
- [ ] Validação dos dias de empréstimo (7, 14 ou 21)
- [ ] Cálculo automático de `rental_date` (hoje)
- [ ] Cálculo automático de `due_date` (hoje + loan_days)
- [ ] Tratamento de valor padrão para `status`
- [ ] Query preparada com todos os campos
- [ ] Uso de `lastInsertId()` para obter o ID
- [ ] Busca do registro completo após inserção
- [ ] Retorno JSON com estrutura correta

## Funções Úteis

**Validar ISBN com Regex:**
```php
if (!preg_match('/^\d{3}-\d{10}$/', $isbn)) {
    // ISBN inválido
}
```

**Validar loan_days:**
```php
if (!in_array($loan_days, ['7', '14', '21'])) {
    // Dias inválidos
}
```

**Calcular datas:**
```php
$rental_date = date('Y-m-d');
$due_date = date('Y-m-d', strtotime("+$loan_days days"));
```

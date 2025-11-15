# Questão 1 - Login de Usuários

## Objetivo

Implementar o endpoint de autenticação que valida credenciais de usuários e gerencia sessões PHP.

## Arquivo a Implementar

`login.php` (nesta pasta: `/api/auth/`)

## Contexto

O sistema possui uma página de login em `/login/index.html` que envia requisições POST para `/api/auth/login.php`. Você deve criar este endpoint para autenticar usuários no sistema.

## Dados Recebidos (POST)

O frontend envia os seguintes campos via `$_POST`:
- `email`: Email do usuário
- `password`: Senha do usuário

## Requisitos de Implementação

### 1. Inicia a Sessão

Use `session_start()` no início do arquivo.

### 2. Valida os Parâmetros
- Verifique se `email` e `password` foram enviados via `$_POST`
- Se não foram enviados, retorne um erro:
```json
{
    "error": true,
    "message": "Email e senha são obrigatórios"
}
```

### 3. Busca o Usuário no Banco de Dados
- Use PDO para preparar uma query que busca um usuário pelo email
- Execute a query com o email recebido
- Capture o resultado em uma variável

**Dica:** Não esqueça de incluir o arquivo de conexão:
```php
include "../connection.php";
```

### 4. Valida as Credenciais
- Verifique se o usuário foi encontrado
- Verifique se a senha está correta (as senhas no banco estão em hash bcrypt - use `password_verify()`)
- Se as credenciais estiverem incorretas, retorne:
```json
{
    "error": true,
    "message": "Email ou senha inválidos"
}
```

### 5. Cria a Sessão
- Armazene o ID do usuário na sessão: `$_SESSION["user_id"] = $user["id"]`
- Armazene o nome do usuário na sessão: `$_SESSION["user_name"] = $user["name"]`

### 6. Retorna os Dados do Usuário
- Retorne um JSON com os dados do usuário (sem o password):
```json
{
    "id": 1,
    "name": "Ana Silva",
    "email": "ana@email.com",
    "bio": "Desenvolvedora Full Stack apaixonada por tecnologia"
}
```

## Exemplo de Uso da Senha Hash

As senhas no banco estão criptografadas com bcrypt. Para verificar:
```php
if (password_verify($senha_digitada, $senha_do_banco)) {
    // Senha correta
}
```

## Testando

Usuários disponíveis para teste:
- **Email:** ana@email.com | **Senha:** blog2025
- **Email:** carlos@email.com | **Senha:** blog2025  
- **Email:** beatriz@email.com | **Senha:** blog2025

## Dicas

1. Use `$_POST` para receber os dados do formulário
2. Use prepared statements com PDO para prevenir SQL injection
3. Sempre use `password_verify()` para validar senhas em hash
4. Não retorne o campo `password` na resposta JSON
5. Lembre-se de iniciar a sessão com `session_start()` antes de usar `$_SESSION`

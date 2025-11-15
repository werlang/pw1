# Questão 1 - Login de Usuários

## Objetivo

Implementar o endpoint de autenticação que valida credenciais de usuários da biblioteca e gerencia sessões PHP.

## Arquivo a Implementar

`login.php` (nesta pasta: `/api/auth/`)

## Contexto

O sistema possui uma página de login em `/login/index.html` que envia requisições POST para `/api/auth/login.php`. Você deve criar este endpoint para autenticar usuários no sistema de biblioteca.

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
    "message": "Email ou senha incorretos"
}
```

### 5. Armazena na Sessão
Se o login for bem-sucedido, armazene o ID do usuário na sessão:
```php
$_SESSION['user_id'] = $user['id'];
```

### 6. Retorna Sucesso
Retorne os dados do usuário (sem a senha):
```json
{
    "message": "Login realizado com sucesso",
    "user": {
        "id": 1,
        "name": "Ana Silva",
        "email": "ana@biblioteca.com",
        "membership_type": "premium"
    }
}
```

## Como Testar

1. Acesse `/login/` no navegador
2. Use as credenciais de teste:
   - **Email:** ana@biblioteca.com
   - **Senha:** asdf1234
3. Clique em "Entrar"
4. Se implementado corretamente, você será redirecionado para `/rentals/`
5. Teste também com credenciais inválidas para verificar as mensagens de erro

## Checklist

- [ ] `session_start()` no início do arquivo
- [ ] Inclusão do arquivo `connection.php`
- [ ] Validação de campos obrigatórios
- [ ] Query PDO preparada para buscar usuário por email
- [ ] Uso de `password_verify()` para validar senha
- [ ] Armazenamento do `user_id` na sessão
- [ ] Retorno JSON correto com estrutura definida
- [ ] Headers JSON configurados corretamente

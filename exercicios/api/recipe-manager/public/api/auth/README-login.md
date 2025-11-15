# Questão 1 - Login de Usuários

## Objetivo

Implementar o endpoint de autenticação que valida credenciais de usuários e gerencia sessões PHP.

## Arquivo a Implementar

`login.php` (nesta pasta: `/api/auth/`)

## Contexto

O sistema possui uma página de login em `/login/index.html` que envia requisições POST para `/api/auth/login.php`. Você deve criar este endpoint para autenticar usuários no sistema de receitas.

## Dados Recebidos (POST)

O frontend envia os seguintes campos via `$_POST`:
- `email`: Email do usuário
- `password`: Senha do usuário

## Requisitos de Implementação

### 1. Inicia a Sessão
```php
session_start();
```

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

**SQL Sugerido:**
```sql
SELECT * FROM users WHERE email = ?
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

**Exemplo de validação:**
```php
if (!$user || !password_verify($password, $user['password'])) {
    // erro
}
```

### 5. Armazena na Sessão
Se o login for bem-sucedido, armazene o ID e o nome do usuário na sessão:
```php
$_SESSION['user_id'] = $user['id'];
$_SESSION['user_name'] = $user['name'];
```

### 6. Retorna Sucesso
Retorne os dados do usuário (sem a senha):
```json
{
    "message": "Login realizado com sucesso",
    "user": {
        "id": 1,
        "name": "Chef Carolina",
        "email": "carolina@chef.com",
        "favorite_cuisine": "Italiana"
    }
}
```

## Como Testar

1. Acesse `http://localhost/challenges/recipe-manager/public/login/` no navegador
2. Use as credenciais de teste:
   - **Email:** carolina@chef.com
   - **Senha:** receita123
3. Clique em "Entrar"
4. Se implementado corretamente, você será redirecionado para `/recipes/`
5. Teste também com credenciais inválidas para verificar as mensagens de erro

## Outros Usuários para Teste

| Nome | Email | Senha | Culinária Favorita |
|------|-------|-------|--------------------|
| Chef Carolina | carolina@chef.com | receita123 | Italiana |
| Marcos Ferreira | marcos@email.com | receita123 | Brasileira |
| Juliana Costa | juliana@email.com | receita123 | Asiática |

## Checklist

- [ ] `session_start()` é chamado no início do arquivo
- [ ] Validação de parâmetros `email` e `password`
- [ ] Consulta ao banco de dados usando PDO preparado
- [ ] Validação das credenciais (usuário existe e senha correta)
- [ ] Armazenamento do `user_id` e `user_name` na sessão
- [ ] Retorno JSON com a estrutura correta
- [ ] Mensagens de erro apropriadas para cada caso
- [ ] Header `Content-Type: application/json`

## Conceitos Avaliados

- ✅ Uso de sessões PHP
- ✅ Preparação de queries com PDO
- ✅ Validação de senha hash com `password_verify()`
- ✅ Tratamento de erros
- ✅ Retorno de JSON estruturado

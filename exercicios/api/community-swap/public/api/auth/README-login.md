# Questão 1 - Login de Usuários

## Objetivo

Implementar o endpoint de autenticação que valida o email e senha do usuário e inicia uma sessão.

## Arquivo a Implementar

`login.php` (nesta pasta: `/api/auth/`)

## Contexto

A página `/login/` possui um formulário de login. O frontend envia requisições POST para `/api/auth/login.php` com email e senha.

### Parâmetros (via POST)

- `email` (obrigatório): Email do usuário
- `password` (obrigatório): Senha do usuário

## Implementação

### 1. Inicia a Sessão

Use `session_start()` no início do arquivo.

### 2. Inclui a Conexão

Inclua o arquivo `connection.php` que está na pasta `/api/`.

### 3. Valida os Parâmetros Obrigatórios

Verifique se `email` e `password` foram enviados via POST. Se algum estiver vazio, retorne erro.

### 4. Busca o Usuário no Banco

Faça uma query para buscar o usuário pelo email fornecido.

### 5. Valida a Senha

Use `password_verify()` para verificar se a senha fornecida corresponde ao hash armazenado no banco.

**Importante:** As senhas no banco estão hasheadas com `password_hash()`. A senha de teste para todos os usuários é `asdf1234`.

### 6. Armazena as Informações na Sessão

Se o login for bem-sucedido, armazene na sessão:
- `$_SESSION['user_id']` - ID do usuário
- `$_SESSION['user_name']` - Nome do usuário
- `$_SESSION['user_email']` - Email do usuário

### 7. Retorna a Resposta

Retorne JSON com a mensagem de sucesso ou erro.

## Estrutura da Resposta

### Sucesso
```json
{
    "message": "Login realizado com sucesso",
    "user": {
        "id": 1,
        "name": "Ana Costa",
        "email": "ana@email.com"
    }
}
```

### Erros Possíveis

**Campos não preenchidos:**
```json
{
    "error": true,
    "message": "Email e senha são obrigatórios"
}
```

**Usuário não encontrado ou senha incorreta:**
```json
{
    "error": true,
    "message": "Email ou senha inválidos"
}
```

## Como Testar

1. Acesse `http://localhost/login/`
2. Use um dos emails de teste:
   - ana@email.com
   - carlos@email.com
   - beatriz@email.com
3. Senha para todos: `asdf1234`
4. Ao fazer login com sucesso, você será redirecionado para a página principal (`/`)

## Conceitos Importantes

### password_verify()
```php
$senha_correta = password_verify($senha_digitada, $hash_do_banco);
```

### Sessões PHP
```php
session_start(); // Sempre no início do arquivo
$_SESSION['chave'] = 'valor'; // Armazenar dados
$valor = $_SESSION['chave']; // Recuperar dados
```

### Header JSON
```php
header('Content-Type: application/json');
echo json_encode($array);
```

## Checklist

- [ ] `session_start()` no início do arquivo
- [ ] Incluir `connection.php`
- [ ] Validar campos obrigatórios
- [ ] Buscar usuário no banco pelo email
- [ ] Usar `password_verify()` para validar senha
- [ ] Armazenar dados do usuário na sessão
- [ ] Retornar JSON com estrutura correta
- [ ] Testar login com usuários de exemplo

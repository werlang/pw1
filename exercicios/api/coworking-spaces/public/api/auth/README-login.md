# Questão 1 - Login de Usuários

## Objetivo
Implementar autenticação de usuários no sistema de reservas de coworking.

## ⚠️ O QUE VOCÊ DEVE FAZER

Abra o arquivo `login.php` (nesta mesma pasta) e implemente a lógica de autenticação seguindo os comentários guia já presentes no arquivo.

## Arquivo
`api/auth/login.php`

## Método HTTP
POST

## Parâmetros Recebidos via `$_POST`

| Parâmetro | Tipo   | Obrigatório | Descrição              |
|-----------|--------|-------------|------------------------|
| email     | string | Sim         | Email do usuário       |
| password  | string | Sim         | Senha do usuário       |

## Lógica a Implementar

1. Iniciar a sessão com `session_start()`
2. Validar se `email` e `password` foram enviados
3. Buscar o usuário no banco pela coluna `email`
4. Se o usuário não existir, retornar erro
5. Validar a senha usando `password_verify($password, $hash_do_banco)`
6. Se a senha estiver incorreta, retornar erro
7. Salvar na sessão: `$_SESSION['user_id']` e `$_SESSION['user_name']`
8. Retornar sucesso com o nome do usuário

## Exemplo de Uso

### Request
```http
POST /api/auth/login.php
Content-Type: application/x-www-form-urlencoded

email=marina@startup.tech&password=cowork2025
```

### Response - Sucesso
```json
{
    "message": "Login realizado com sucesso",
    "data": {
        "name": "Marina Silva"
    }
}
```

### Response - Email não encontrado
```json
{
    "error": true,
    "message": "Email não encontrado"
}
```

### Response - Senha incorreta
```json
{
    "error": true,
    "message": "Senha incorreta"
}
```

### Response - Campos vazios
```json
{
    "error": true,
    "message": "Email e senha são obrigatórios"
}
```

## Validações Necessárias

✅ Verificar se `email` e `password` não estão vazios  
✅ Buscar usuário com prepared statement  
✅ Usar `password_verify()` para validar senha  
✅ Criar sessão apenas após validação bem-sucedida  
✅ Retornar JSON sempre com `header('Content-Type: application/json')`

## Conceitos Avaliados

- Uso de `session_start()` e `$_SESSION`
- Consulta com PDO e prepared statements
- Validação de senha com hash bcrypt
- Tratamento de erros e retorno estruturado em JSON
- Validação de campos obrigatórios

## Dicas

- O hash da senha no banco foi criado com `password_hash('cowork2025', PASSWORD_BCRYPT)`
- Sempre retorne JSON usando `echo json_encode($array)`
- Use `PDO::FETCH_ASSOC` para buscar o usuário
- Não retorne a senha no JSON de resposta
- Teste seu código fazendo login em `http://localhost/challenges/coworking-spaces/public/login/`

## Como Testar

1. Abra `login/index.html` no navegador
2. Use um dos emails de teste com a senha `cowork2025`
3. Se funcionar, você será redirecionado para a página de salas
4. Se houver erro, verifique o console do navegador (F12) para ver a mensagem retornada

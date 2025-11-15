# Questão 1 - Login GreenPulse

## Objetivo
Implementar o endpoint responsável por autenticar gestores e técnicos da plataforma GreenPulse e iniciar a sessão.

## Arquivo
`/api/auth/login.php`

## Dados Recebidos (POST)
- `email`: Email do usuário
- `password`: Senha do usuário

Exemplo: `email=lara@greenpulse.com&password=green@2025`

## Requisitos
1. **Entrada**:
   - Use `$_POST['email']` e `$_POST['password']`.
   - Valide se ambos foram enviados.
2. **Consulta**:
   - Busque o usuário por email usando prepared statement.
   - Compare a senha com `password_verify`.
3. **Sessão**:
   - Chame `session_start()` antes de tudo.
   - Em caso de sucesso salve em `$_SESSION`:
     - `user_id`, `user_name`, `user_role`.
4. **Retorno**:
   - Sucesso:
     ```json
     {
       "message": "Login realizado",
       "data": {
         "id": 1,
         "name": "Lara Monteiro",
         "role": "manager"
       }
     }
     ```
   - Erro:
     ```json
     {
       "error": true,
       "message": "Credenciais inválidas"
     }
     ```

## Observações
- Utilize `require_once '../connection.php';`
- Nunca exponha o hash da senha.
- Não compare senha diretamente com o valor enviado.

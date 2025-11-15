<?php
// TODO: Implementar login de usuários

// 1. Iniciar sessão com session_start()

// 2. Definir header para retornar JSON

// 3. Incluir o arquivo de conexão com o banco

// 4. Validar se email e password foram enviados via POST
//    - Se não: retornar erro "Email e senha são obrigatórios"

// 5. Buscar usuário no banco pela coluna email
//    - Use prepared statement: SELECT id, name, email, password FROM users WHERE email = ?

// 6. Verificar se o usuário foi encontrado
//    - Se não: retornar erro "Email não encontrado"

// 7. Validar a senha usando password_verify($password, $hash_do_banco)
//    - Se incorreta: retornar erro "Senha incorreta"

// 8. Salvar dados na sessão:
//    - $_SESSION['user_id'] = id do usuário
//    - $_SESSION['user_name'] = nome do usuário

// 9. Retornar sucesso em JSON:
//    - message: "Login realizado com sucesso"
//    - data: { name: nome do usuário }

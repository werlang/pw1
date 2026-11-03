<?php
header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    header("Allow: POST");
    echo json_encode([
        "error" => true,
        "message" => "Use POST para fazer login",
    ]);
    exit;
}

require __DIR__ . "/../connection.php";

if (empty($_POST["email"]) || empty($_POST["password"])) {
    http_response_code(400);
    echo json_encode([
        "error" => true,
        "message" => "E-mail e senha são obrigatórios",
    ]);
    exit;
}

$email = $_POST["email"];
$password = $_POST["password"];

try {
    $sql = "SELECT id, name, email, password FROM users WHERE email = ?";

    $stmt = $conn->prepare($sql);
    $stmt->execute([ $email ]);
    $user = $stmt->fetch();

    // A mesma mensagem para e-mail inexistente e senha errada
    // evita revelar quais e-mails estão cadastrados.
    if (!$user || !password_verify($password, $user["password"])) {
        http_response_code(401);
        echo json_encode([
            "error" => true,
            "message" => "Usuário ou senha inválida",
        ]);
        exit;
    }

    session_start();
    session_regenerate_id(true); // troca o id antigo para evitar sessão fixada

    $_SESSION["user"] = [
        "id" => $user["id"],
        "name" => $user["name"],
        "email" => $user["email"],
    ];

    echo json_encode([
        "message" => "Usuário logado com sucesso",
    ]);
}
catch (PDOException $error) {
    http_response_code(500);
    echo json_encode([
        "error" => true,
        "message" => "Erro ao executar a consulta",
    ]);
}

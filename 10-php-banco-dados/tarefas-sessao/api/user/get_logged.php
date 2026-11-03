<?php
header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] !== "GET") {
    http_response_code(405);
    header("Allow: GET");
    echo json_encode([
        "error" => true,
        "message" => "Use GET para consultar o usuário logado",
    ]);
    exit;
}

require __DIR__ . "/../connection.php";

session_start();

// Sem sessão não existe usuário logado para devolver.
if (!isset($_SESSION["user"])) {
    http_response_code(401);
    echo json_encode([
        "error" => true,
        "logged" => false,
        "message" => "Você não está logado",
    ]);
    exit;
}

$userId = $_SESSION["user"]["id"];

try {
    // A sessão guarda o id; os dados atuais do usuário vêm do banco.
    $sql = "SELECT id, name, email FROM users WHERE id = ?";

    $stmt = $conn->prepare($sql);
    $stmt->execute([ $userId ]);
    $user = $stmt->fetch();

    if (!$user) {
        http_response_code(404);
        echo json_encode([
            "error" => true,
            "message" => "Usuário não encontrado",
        ]);
        exit;
    }

    echo json_encode([
        "message" => "Usuário logado",
        "user" => $user,
    ]);
}
catch (PDOException $error) {
    http_response_code(500);
    echo json_encode([
        "error" => true,
        "message" => "Erro ao executar a consulta",
    ]);
}

<?php
// Incluído por index.php quando o método é GET.
header("Content-Type: application/json");

require __DIR__ . "/../connection.php";

session_start();

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
    // Cada usuário vê apenas as próprias tarefas.
    $sql = "SELECT id, description FROM tasks WHERE user_id = ?";

    $stmt = $conn->prepare($sql);
    $stmt->execute([ $userId ]);

    $tasks = $stmt->fetchAll();

    echo json_encode([
        "message" => "Tarefas encontradas",
        "tasks" => $tasks,
    ]);
}
catch (PDOException $error) {
    http_response_code(500);
    echo json_encode([
        "error" => true,
        "message" => "Erro ao executar a consulta",
    ]);
}

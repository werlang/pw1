<?php
// Incluído por index.php quando o método é POST.
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

if (empty($_POST["task"])) {
    http_response_code(400);
    echo json_encode([
        "error" => true,
        "message" => "Escreva a tarefa antes de enviar",
    ]);
    exit;
}

$userId = $_SESSION["user"]["id"];
$task = $_POST["task"];

try {
    // A tarefa sempre nasce ligada ao usuário que está na sessão.
    $sql = "INSERT INTO tasks (user_id, description) VALUES (?, ?)";

    $stmt = $conn->prepare($sql);
    $stmt->execute([ $userId, $task ]);

    http_response_code(201);
    echo json_encode([
        "message" => "Tarefa inserida",
    ]);
}
catch (PDOException $error) {
    http_response_code(500);
    echo json_encode([
        "error" => true,
        "message" => "Erro ao executar a consulta",
    ]);
}

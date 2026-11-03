<?php
// Incluído por index.php quando o método é GET.
header("Content-Type: application/json");

require __DIR__ . "/../connection.php";

try {
    // Lista simples, sem filtros, só para demonstrar o SELECT.
    $sql = "SELECT name, email FROM users";

    $stmt = $conn->prepare($sql);
    $stmt->execute();

    $users = $stmt->fetchAll();

    echo json_encode([
        "message" => "Usuários encontrados",
        "users" => $users,
    ]);
}
catch (PDOException $error) {
    http_response_code(500);
    echo json_encode([
        "error" => true,
        "message" => "Erro ao executar a consulta",
    ]);
}

<?php

// O .env fica na raiz do projeto, um nível acima da pasta api/.
$envPath = __DIR__ . "/../.env";

if (!file_exists($envPath)) {
    http_response_code(500);
    header("Content-Type: application/json");
    echo json_encode([
        "error" => true,
        "message" => "Arquivo .env não encontrado. Copie o .env.example.",
    ]);
    exit;
}

$env = parse_ini_file($envPath);

$host = $env["DB_HOST"];
$user = $env["DB_USER"];
$password = $env["DB_PASSWORD"];
$dbname = $env["DB_NAME"];

$options = [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION, // lança exceção quando o SQL falha
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC, // devolve array associativo
];

try {
    $conn = new PDO(
        "mysql:host=$host;dbname=$dbname;charset=utf8mb4",
        $user,
        $password,
        $options
    );
}
catch (PDOException $error) {
    // Sem conexão não dá para continuar: devolve JSON em vez de uma página de erro.
    http_response_code(500);
    header("Content-Type: application/json");
    echo json_encode([
        "error" => true,
        "message" => "Erro ao conectar no banco de dados",
    ]);
    exit;
}

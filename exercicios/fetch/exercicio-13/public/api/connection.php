<?php

$host = getenv('MYSQL_HOST') ?: 'localhost';
$db = getenv('MYSQL_DATABASE') ?: 'movies_db';
$user = getenv('MYSQL_USER') ?: 'root';
$pass = getenv('MYSQL_ROOT_PASSWORD') ?: '';
$port = getenv('MYSQL_PORT') ?: '3306';

try {
    $conn = new PDO("mysql:host=$host;port=$port;dbname=$db;charset=utf8mb4", $user, $pass);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["error" => true, "message" => "Erro de conexão: " . $e->getMessage()]);
    exit;
}

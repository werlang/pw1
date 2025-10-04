<?php
$host = "mysql";
$user = "root";
$password = "asdf1234";
$database = "students_db";
$port = 3306;
$options = [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION, PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC];
try {
    $conn = new PDO("mysql:host=$host;dbname=$database;port=$port", $user, $password, $options);
} catch (PDOException $e) {
    echo json_encode(["error" => true, "message" => "Erro de conexão"]);
    exit;
}

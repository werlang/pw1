<?php
$user = "root";
$password = "asdf1234";
$host = "mysql";
$database = "aula";

$options = [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
];
$conn = new PDO(
    "mysql:host=$host;dbname=$database;charset=utf8mb4",
    $user, $password, $options
);
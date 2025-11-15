<?php

$host = "localhost";
$user = "root";
$password = "";
$database = "greenpulse";
$port = 3306;
$options = [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
];
$conn = new PDO(
    "mysql:host=$host;dbname=$database;port=$port",
    $user,
    $password,
    $options
);

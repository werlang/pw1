<?php

$env = "local"; // remote || local

$config = json_decode(file_get_contents("config.json"), true);
$host = $config["mysql"]["host_". $env];
$user = $config["mysql"]["user"];
$password = $config["mysql"]["password"];
$database = $config["mysql"]["database"];
$port = $config["mysql"]["port_". $env];
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
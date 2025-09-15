<?php

$name = $_POST["name"];
$email = $_POST["email"];
$password = $_POST["password"];
$confirm = $_POST["confirm"];

// valida email
// https://www.php.net/manual/pt_BR/filter.examples.validation.php
if (!filter_var($_POST["email"], FILTER_VALIDATE_EMAIL)){
    echo json_encode([
        "error" => true,
        "message" => "O E-mail informado não é válido",
    ]);
    exit;
}

if (strlen($password) < 8) {
    echo json_encode([
        "error" => true,
        "message" => "A senha deve possuir pelo menos 8 caracteres",
    ]);
    exit;
}
if ($password != $confirm) {
    echo json_encode([
        "error" => true,
        "message" => "A confirmação de senha não confere",
    ]);
    exit;
}

echo json_encode([
    "message" => "Usuário cadastrado!",
]);
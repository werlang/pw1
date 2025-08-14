<?php

require "connection.php";

header('Content-Type: application/json');

$output = [];

$name = $_POST["name"];
$email = $_POST["email"];
$password = $_POST["password"];

function validate(){
    $response = [];
    $response["error"] = true;

    if (!isset($_POST["name"]) || !isset($_POST["email"]) || !isset($_POST["password"])){
        $response["message"] = "Campos nome, email e senha devem estar presentes.";
        $response["field"] = "name";
    }
    elseif (!$_POST["name"]){
        $response["message"] = "Campo nome deve estar presente.";
        $response["field"] = "name";
    }
    elseif (!$_POST["email"]){
        $response["message"] = "Campo email deve estar presente.";
        $response["field"] = "email";
    }
    // valida email
    // https://www.php.net/manual/pt_BR/filter.examples.validation.php
    elseif (!filter_var($_POST["email"], FILTER_VALIDATE_EMAIL)){
        $response["message"] = "Email inválido.";
        $response["field"] = "email";
    }
    elseif (!$_POST["password"]){
        $response["message"] = "Campo senha deve estar presente.";
        $response["field"] = "password";
    }
    elseif (strlen($_POST["password"]) < 8){
        $response["message"] = "Senha deve possuir no mínimo 8 caracteres.";
        $response["field"] = "password";
    }
    else {
        $response["error"] = false;
    }

    return $response;
}

$output = validate();
if ($output["error"] == true){
    echo json_encode($output);
    exit;
}

$sql = "SELECT * FROM users WHERE email = ?";
$stmt = $conn->prepare($sql);
$stmt->execute([ $email ]);

$user = $stmt->fetch();
if ($user) {
    $output["error"] = true;
    $output["message"] = "Usuário já existe";
    echo json_encode($output);
    exit;
}

$sql = "INSERT INTO users(name, email, password) VALUES (?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->execute([
    $name,
    $email,
    password_hash($password, PASSWORD_DEFAULT)
]);


$output["message"] = "Usuário cadastrado";
$output["user"] = [
    "name" => $name,
    "email" => $email
];

echo json_encode($output);
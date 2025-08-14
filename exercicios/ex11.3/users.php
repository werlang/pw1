<?php

require "connection.php";

header("Content-Type: application/json");

if (isset($_POST["action"])) {
    $action = $_POST["action"];

    if ($action == "insert") {
        $name = $_POST["name"];
        $email = $_POST["email"];
        $password = password_hash($_POST["password"], PASSWORD_DEFAULT);

        $sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
        $stmt = $conn->prepare($sql);
        $stmt->execute([
            $name,
            $email,
            $password
        ]);
    
        echo json_encode([
            "message" => "Usuário inserido"
        ]);
        exit;
    }
    else if ($action == "update") {
        checkAuth();

        $name = $_POST["name"];
        $newpassword = password_hash($_POST["newpassword"], PASSWORD_DEFAULT);
        $sql = "UPDATE users SET name = :name, password = :pass WHERE email = :email";
        $stmt = $conn->prepare($sql);
        $stmt->execute([
            "name" => $name,
            "pass" => $newpassword,
            "email" => $email
        ]);

        echo json_encode([
            "message" => "Usuário atualizado",
            "user" => [
                "name" => $name,
                "email" => $email
            ]
        ]);
        exit;
    }
    else if ($action == "delete") {
        checkAuth();

        $email = $_POST["email"];
        $sql = "DELETE FROM users WHERE email = ?";
        $stmt = $conn->prepare($sql);
        $stmt->execute([ $email ]);

        echo json_encode([
            "message" => "Usuário removido"
        ]);
        exit;
    }

    echo json_encode([
        "message" => "Comando não reconhecido"
    ]);
    exit;
}
else if (isset($_GET["id"])) {
    $id = $_GET["id"];

    $sql = "SELECT id, name, email FROM users WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->execute([ $id ]);

    $user = $stmt->fetch();

    echo json_encode([
        "user" => $user
    ]);
    exit;
}

$sql = "SELECT name, email FROM users";
$stmt = $conn->prepare($sql);
$stmt->execute();

$users = $stmt->fetchAll();

echo json_encode([
    "users" => $users
]);

function checkAuth() {
    global $conn;

    $email = $_POST["email"];
    $password = $_POST["password"];

    $sql = "SELECT * FROM users WHERE email = ?";
    $stmt = $conn->prepare($sql);
    $stmt->execute([ $email ]);

    $user = $stmt->fetch();

    if (!$user) {
        echo json_encode([
            "error" => true,
            "message" => "Usuário não encontrado"
        ]);
        exit;
    }

    if (!password_verify($password, $user["password"])) {
        echo json_encode([
            "error" => true,
            "message" => "Senha não confere"
        ]);
        exit;
    }

    return true;
}
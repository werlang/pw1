<?php

session_start();
include "../connection.php";

if (!isset($_SESSION["user"])) {
    echo json_encode([
        "error" => true,
        "message" => "O usuário não está logado"
    ]);
    exit;
}

if (isset($fileContent)) {
    $_POST["note"] = $fileContent;
}

if (!isset($_POST["note"]) || empty($_POST["note"])) {
    echo json_encode([
        "error" => true,
        "message" => "Insira uma anotação"
    ]);
    exit;
}

$note = $_POST["note"];
$user = $_SESSION["user"];

$sql = "INSERT INTO notes (note, user) VALUES (?, ?);";
$stmt = $conn->prepare($sql);
$stmt->execute([ $note, $user ]);

echo json_encode([
    "message" => "Anotação inserida",
]);


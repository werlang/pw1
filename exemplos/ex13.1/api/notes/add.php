<?php

include "../session.php";
include "../connection.php";

if (!isset($_POST["note"]) || empty($_POST["note"])) {
    echo json_encode([
        "error" => true,
        "message" => "Insira uma anotação"
    ]);
    exit;
}

$note = $_POST["note"];

$sql = "INSERT INTO notes (note, user) VALUES (?, ?);";
$stmt = $conn->prepare($sql);
$stmt->execute([ $note, $loggedUser["id"] ]);

echo json_encode([
    "message" => "Anotação inserida",
]);


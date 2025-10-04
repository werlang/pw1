<?php
include "../connection.php";

if (!isset($_POST["title"]) || !isset($_POST["date"])) {
    echo json_encode(["error" => true, "message" => "Dados inválidos"]);
    exit;
}

$title = trim($_POST["title"]);
$date = $_POST["date"];
$time = isset($_POST["time"]) ? $_POST["time"] : "00:00";
$location = isset($_POST["location"]) ? trim($_POST["location"]) : "";

$stmt = $conn->prepare("INSERT INTO events (title, date, time, location) VALUES (:title, :date, :time, :location)");
$stmt->execute(["title" => $title, "date" => $date, "time" => $time, "location" => $location]);

if ($stmt->rowCount() > 0) {
    echo json_encode([
        "message" => "Evento cadastrado com sucesso",
        "event" => ["id" => $conn->lastInsertId(), "title" => $title, "date" => $date, "time" => $time, "location" => $location]
    ]);
} else {
    echo json_encode(["error" => true, "message" => "Falha ao cadastrar evento"]);
}

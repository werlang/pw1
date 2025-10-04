<?php

include "../connection.php";

if (!isset($_POST["title"]) || !isset($_POST["director"])) {
    echo json_encode(["error" => true, "message" => "Preencha todos os campos obrigatórios"]);
    exit;
}

$title = trim($_POST["title"]);
$director = trim($_POST["director"]);
$year = isset($_POST["year"]) ? (int)$_POST["year"] : 2024;
$genre = isset($_POST["genre"]) ? trim($_POST["genre"]) : "";

if (empty($title) || empty($director)) {
    echo json_encode(["error" => true, "message" => "Título e diretor são obrigatórios"]);
    exit;
}

$stmt = $conn->prepare("INSERT INTO movies (`title`, `director`, `year`, `genre`) VALUES (:title, :director, :year, :genre)");
$stmt->execute([
    "title" => $title,
    "director" => $director,
    "year" => $year,
    "genre" => $genre
]);

if ($stmt->rowCount() > 0) {
    echo json_encode([
        "message" => "Filme adicionado com sucesso!",
        "movie" => [
            "id" => $conn->lastInsertId(),
            "title" => $title,
            "director" => $director,
            "year" => $year,
            "genre" => $genre
        ]
    ]);
} else {
    echo json_encode(["error" => true, "message" => "Falha ao adicionar filme"]);
}

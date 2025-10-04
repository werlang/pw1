<?php

include "../connection.php";

if (!isset($_POST["id"]) || !isset($_POST["rating"]) || !isset($_POST["review"])) {
    echo json_encode(["error" => true, "message" => "Parâmetros inválidos"]);
    exit;
}

$id = (int)$_POST["id"];
$rating = (int)$_POST["rating"];
$review = $_POST["review"];

if ($rating < 1 || $rating > 5) {
    echo json_encode(["error" => true, "message" => "Nota deve ser entre 1 e 5"]);
    exit;
}

$stmt = $conn->prepare("UPDATE movies SET rating = :rating, review = :review WHERE id = :id");
$stmt->execute([
    "id" => $id,
    "rating" => $rating,
    "review" => $review
]);

if ($stmt->rowCount() > 0) {
    // Get updated movie
    $stmt = $conn->prepare("SELECT * FROM movies WHERE id = :id");
    $stmt->execute(["id" => $id]);
    $movie = $stmt->fetch(PDO::FETCH_ASSOC);
    
    echo json_encode([
        "message" => "Avaliação atualizada com sucesso",
        "movie" => $movie
    ]);
} else {
    echo json_encode(["error" => true, "message" => "Filme não encontrado"]);
}

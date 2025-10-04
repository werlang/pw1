<?php

include "../connection.php";

$stmt = $conn->prepare("SELECT * FROM movies ORDER BY rating DESC, title ASC");
$stmt->execute();
$movies = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode([
    "movies" => $movies
]);

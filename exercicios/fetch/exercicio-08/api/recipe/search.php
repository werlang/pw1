<?php
include "../connection.php";

$ingredient = isset($_GET['ingredient']) ? trim($_GET['ingredient']) : '';

if (empty($ingredient)) {
    echo json_encode(["recipes" => []]);
    exit;
}

$stmt = $conn->prepare("SELECT * FROM recipes WHERE ingredients LIKE :ingredient");
$stmt->execute(["ingredient" => "%$ingredient%"]);
echo json_encode(["recipes" => $stmt->fetchAll()]);

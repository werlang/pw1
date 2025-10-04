<?php
include "../connection.php";

if (!isset($_GET["ids"])) {
    echo json_encode(["error" => true, "message" => "IDs não informados"]);
    exit;
}

$ids = explode(",", $_GET["ids"]);
$placeholders = implode(",", array_fill(0, count($ids), "?"));

$stmt = $conn->prepare("UPDATE emails SET is_read = 1 WHERE id IN ($placeholders)");
$stmt->execute($ids);

echo json_encode(["message" => count($ids) . " e-mails marcados como lidos"]);

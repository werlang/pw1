<?php
require "connection.php";

$output = [];
header("Content-Type: application/json");

if (!isset($_GET["user"])){
    $output["status"] = "erro";
    $output["message"] = "Campo user deve estar presente.";
    echo json_encode($output);
    exit;
}

$id = $_GET["user"];
$sql = "SELECT * FROM users WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->execute([$id]);

$output["result"] = $stmt->fetch();
$output["status"] = "OK";

echo json_encode($output);
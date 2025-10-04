<?php
include "../connection.php";
$stmt = $conn->prepare("SELECT * FROM posts ORDER BY created_at DESC");
$stmt->execute();
echo json_encode(["posts" => $stmt->fetchAll()]);

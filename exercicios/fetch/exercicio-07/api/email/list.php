<?php
include "../connection.php";
$stmt = $conn->prepare("SELECT * FROM emails WHERE is_read = 0 ORDER BY date DESC");
$stmt->execute();
echo json_encode(["emails" => $stmt->fetchAll()]);

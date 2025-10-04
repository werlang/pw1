<?php
include "../connection.php";

$stmt = $conn->prepare("SELECT * FROM students ORDER BY name ASC");
$stmt->execute();
$students = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode(["students" => $students]);

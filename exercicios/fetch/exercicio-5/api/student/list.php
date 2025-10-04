<?php
include "../connection.php";

$orderBy = isset($_GET['orderBy']) && in_array($_GET['orderBy'], ['name', 'grade']) ? $_GET['orderBy'] : 'grade';
$order = isset($_GET['order']) && in_array($_GET['order'], ['asc', 'desc']) ? $_GET['order'] : 'desc';

$stmt = $conn->prepare("SELECT * FROM students ORDER BY $orderBy $order");
$stmt->execute();
$students = $stmt->fetchAll();

echo json_encode(["students" => $students]);

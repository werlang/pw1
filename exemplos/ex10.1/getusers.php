<?php
require "connection.php";

$output = [];
$id = $_GET["user"];
$sql = "SELECT * FROM users WHERE id = $id";
$stmt = $conn->query($sql);
$output["result"] = $stmt->fetch();
$output["status"] = "OK";

echo json_encode($output);
<?php
require "connection.php";

$output = [];

if (!isset($_GET["user"])) {
    $output["status"] = "error";
    $output["message"] = "Must inform user id";
}
else {
    $id = $_GET["user"];

    try {
        $sql = "SELECT * FROM users WHERE id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->execute([ $id ]);
        $output["result"] = $stmt->fetch();
        $output["status"] = "OK";
    }
    catch(PDOException $error) {
        echo json_encode([
            "status" => "error",
            "message" => "Failed to get user info.",
            "error" => $error
        ]);
    } 
}

header('Content-Type: application/json');
echo json_encode($output);
<?php

include "../session.php";
include "../connection.php";

if (isset($_GET["id"])) {
    $id = $_GET["id"];
    $sql = "SELECT * FROM notes WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->execute([ $id ]);
}
else {
    $sql = "SELECT * FROM notes";
    $stmt = $conn->prepare($sql);
    $stmt->execute([]);
}

echo json_encode([
    "message" => "Anotações encontradas",
    "notes" => $stmt->fetchAll(),
]);


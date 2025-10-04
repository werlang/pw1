<?php

include "../connection.php";

$search = isset($_GET["search"]) ? $_GET["search"] : "";
$category = isset($_GET["category"]) ? $_GET["category"] : "";

// Build query
$sql = "SELECT * FROM contacts WHERE 1=1";
$params = [];

if ($search) {
    $sql .= " AND (name LIKE :search OR email LIKE :search)";
    $params["search"] = "%$search%";
}

if ($category) {
    $sql .= " AND category = :category";
    $params["category"] = $category;
}

$sql .= " ORDER BY name ASC";

$stmt = $conn->prepare($sql);
$stmt->execute($params);
$contacts = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode([
    "contacts" => $contacts
]);

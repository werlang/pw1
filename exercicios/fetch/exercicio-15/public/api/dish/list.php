<?php
include "../connection.php";

$page = isset($_GET["page"]) ? (int)$_GET["page"] : 1;
$limit = isset($_GET["limit"]) ? (int)$_GET["limit"] : 6;
$category = isset($_GET["category"]) ? $_GET["category"] : "";

$offset = ($page - 1) * $limit;

$sql = "SELECT * FROM dishes WHERE 1=1";
$params = [];

if ($category) {
    $sql .= " AND category = :category";
    $params["category"] = $category;
}

$sql .= " ORDER BY category ASC, name ASC LIMIT :limit OFFSET :offset";

$stmt = $conn->prepare($sql);
foreach ($params as $key => $value) {
    $stmt->bindValue(":$key", $value);
}
$stmt->bindValue(":limit", $limit, PDO::PARAM_INT);
$stmt->bindValue(":offset", $offset, PDO::PARAM_INT);
$stmt->execute();
$dishes = $stmt->fetchAll(PDO::FETCH_ASSOC);

// Get total count
$sqlCount = "SELECT COUNT(*) as total FROM dishes WHERE 1=1";
if ($category) {
    $sqlCount .= " AND category = :category";
}
$stmtCount = $conn->prepare($sqlCount);
if ($category) {
    $stmtCount->bindValue(":category", $category);
}
$stmtCount->execute();
$total = $stmtCount->fetch(PDO::FETCH_ASSOC)["total"];
$totalPages = ceil($total / $limit);

echo json_encode([
    "dishes" => $dishes,
    "pagination" => [
        "page" => $page,
        "limit" => $limit,
        "total" => (int)$total,
        "totalPages" => (int)$totalPages
    ]
]);

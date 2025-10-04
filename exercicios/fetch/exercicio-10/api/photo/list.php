<?php
include "../connection.php";

$page = isset($_GET['page']) ? (int)$_GET['page'] : 1;
$limit = isset($_GET['limit']) ? (int)$_GET['limit'] : 12;
$offset = ($page - 1) * $limit;

$countStmt = $conn->prepare("SELECT COUNT(*) as total FROM photos");
$countStmt->execute();
$total = $countStmt->fetch()['total'];

$stmt = $conn->prepare("SELECT * FROM photos LIMIT :limit OFFSET :offset");
$stmt->bindValue(':limit', $limit, PDO::PARAM_INT);
$stmt->bindValue(':offset', $offset, PDO::PARAM_INT);
$stmt->execute();

echo json_encode([
    "photos" => $stmt->fetchAll(),
    "pagination" => [
        "page" => $page,
        "limit" => $limit,
        "total" => $total,
        "totalPages" => ceil($total / $limit)
    ]
]);

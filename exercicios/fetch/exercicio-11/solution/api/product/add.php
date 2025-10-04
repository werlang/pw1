<?php

include "../connection.php";

if (!isset($_POST["name"]) || !isset($_POST["category"])) {
    echo json_encode(["error" => true, "message" => "Parâmetros inválidos"]);
    exit;
}

$name = $_POST["name"];
$category = $_POST["category"];
$price = isset($_POST["price"]) ? (float)$_POST["price"] : 0.00;
$quantity = isset($_POST["quantity"]) ? (int)$_POST["quantity"] : 0;

if ($price < 0) {
    echo json_encode(["error" => true, "message" => "Preço não pode ser negativo"]);
    exit;
}

if ($quantity < 0) {
    echo json_encode(["error" => true, "message" => "Quantidade não pode ser negativa"]);
    exit;
}

$stmt = $conn->prepare("INSERT INTO products (`name`, `category`, `price`, `quantity`) VALUES (:name, :category, :price, :quantity)");
$stmt->execute([
    "name" => $name,
    "category" => $category,
    "price" => $price,
    "quantity" => $quantity
]);

if ($stmt->rowCount() > 0) {
    echo json_encode([
        "message" => "Produto adicionado com sucesso",
        "product" => [
            "id" => $conn->lastInsertId(),
            "name" => $name,
            "category" => $category,
            "price" => $price,
            "quantity" => $quantity,
        ],
    ]);
} else {
    echo json_encode(["error" => true, "message" => "Falha ao adicionar produto"]);
}

<?php

require "connection.php";

if ( !isset($_POST["nome"]) || empty($_POST["nome"]) ) {
    echo json_encode([
        "status" => "error",
        "message" => "O campo nome é obrigatório",
    ]);
    exit;
}
if ( !isset($_POST["preco"]) || empty($_POST["preco"]) ) {
    echo json_encode([
        "status" => "error",
        "message" => "O campo preço é obrigatório",
    ]);
    exit;
}

$name = $_POST["nome"];
$price = $_POST["preco"];
$categoryId = $_POST["categoria"];
$file = $_FILES["foto"];

if ($file["error"] ==UPLOAD_ERR_INI_SIZE || $file["size"] > 1000000) {
    echo json_encode([
        "message" => "Arquivo excedeu limite de tamanho.",
        "status" => "error",
    ]);
    exit;
}

$extension = strtolower(pathinfo($file["name"], PATHINFO_EXTENSION));
$supported_extensions = ["jpg", "jpeg", "png", "webp"];
// if ($extension != "jpg" && $extension != "png" && $extension != "jpeg" && $extension != "webp") {
if (!in_array($extension, $supported_extensions)) {
    echo json_encode([
        "message" => "Arquivo não é uma imagem válida.",
        "status" => "error",
    ]);
    exit;
}

$fileName = md5(microtime()) . "." . $extension;
if (!move_uploaded_file($file["tmp_name"], "pictures/$fileName")) {
    echo json_encode([
        "message" => "Erro ao enviar arquivo.",
        "status" => "error",
    ]);
    exit;
}

try {
    $sql = "INSERT INTO products (name, category_id, price, picture) VALUES (:name, :catid, :price, :picture)";
    $stmt = $conn->prepare($sql);
    $stmt->execute([
        ":name" => $name,
        ":catid" => $categoryId,
        ":price" => $price,
        ":picture" => $fileName,
    ]);
}
catch(PDOException $error) {
    echo json_encode([
        "message" => "Erro ao inserir produto.",
        "status" => "error",
        "error" => $error,
    ]);
    exit;
}

echo json_encode([
    "message" => "Produto inserido com sucesso.",
    "status" => "success",
]);


<?php

$file = file_get_contents("file.json");
$file = json_decode($file, true);

$item = [];
$item["name"] = $_POST['name'];
$item["address"] = $_POST['address'];
$item["birth"] = $_POST['birth'];
$file[] = $item;

$file = json_encode($file);
file_put_contents("file.json", $file);

echo json_encode([
    "message" => "Pessoa cadastrada com sucesso.",
    "status" => "success"
]);
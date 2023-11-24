<?php
header("Content-Type: application/json");

if (!isset($_GET['busca'])) {
    echo json_encode(getCookie());
    exit;
}

$busca = $_GET['busca'];

$cookie = getCookie();

$cookie['clicks']++;
$cookie["strings"][] = $busca;

setcookie("preferences", json_encode($cookie), time() + 3600 * 24 * 7, "/");

echo json_encode($cookie);

function getCookie() {
    if (!isset($_COOKIE['preferences'])) {
        return [
            "strings" => [],
            "clicks" => 0
        ];
    }
    return json_decode($_COOKIE['preferences'], true);
}
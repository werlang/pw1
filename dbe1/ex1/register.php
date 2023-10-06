<?php

$valor1 = $_GET["v1"];
$valor2 = $_GET["v2"];
$media = ($valor1 + $valor2) / 2;

if ($valor1 > $valor2) {
    $maior = $valor1;
}
if ($valor2 > $valor1) {
    $maior = $valor2;
}

header("Content-type: application/json");
echo json_encode([
    "media" => $media,
    "maior" => $maior
]);


<?php

$file = file_get_contents("file.json");
$file = json_decode($file, true);

echo json_encode([
    "status" => "success",
    "record" => $file
]);
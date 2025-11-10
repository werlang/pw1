<?php

if (!isset($_FILES["note-file"]) || $_FILES["note-file"]["error"] == UPLOAD_ERR_NO_FILE) {
    echo json_encode([
        "error" => true,
        "message" => "Nenhum arquivo foi enviado",
    ]);
    exit;
}

$file = $_FILES["note-file"];

if ( $file["error"] == UPLOAD_ERR_INI_SIZE || $file["size"] > 5000000 ) {
    echo json_encode([
        "error" => true,
        "message" => "Arquivo excedeu limite de tamanho",
    ]);
    exit;
}

if ( pathinfo($file["name"], PATHINFO_EXTENSION) != 'txt' ) {
    echo json_encode([
        "error" => true,
        "message" => "Envie um arquivo .txt",
    ]);
    exit;
}

$targetFile = "upload/". md5(microtime());
$tmpFile = $file["tmp_name"];
if (!move_uploaded_file($tmpFile, $targetFile)) {
    echo json_encode([
        "error" => true,
        "message" => "Erro ao realizar upload",
    ]);
    exit;
}

$_POST["note"] = file_get_contents($targetFile);

include "add.php";



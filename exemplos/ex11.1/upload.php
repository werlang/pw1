<?php

if (isset($_POST["submit"])) {
    echo json_encode([
        "message" => "Escolha um arquivo.",
        "status" => "error"
    ]);
    exit;
}

// check for UPLOAD_ERR_INI_SIZE
if ($_FILES["file-upload"]["error"] == UPLOAD_ERR_INI_SIZE) {
    echo json_encode([
        "message" => "O arquivo enviado excede o limite definido na diretiva upload_max_filesize do php.ini.",
        "status" => "error"
    ]);
    exit;
}

if ($_FILES["file-upload"]["size"] > 5000000) {
    echo json_encode([
        "message" => "O arquivo enviado excede o limite de tamanho de 5MB.",
        "status" => "error"
    ]);
    exit;
}

$file = $_FILES["file-upload"]["name"];
$fileExtension = strtolower(pathinfo($file, PATHINFO_EXTENSION));
    
$allowedFileTypes = ["jpg", "png", "jpeg", "gif"];
if (!in_array($fileExtension, $allowedFileTypes)) {
    echo json_encode([
        "message" => "Apenas arquivos JPG, JPEG, PNG e GIF são permitidos.",
        "status" => "error"
    ]);
    exit;
}

$tmpFile = $_FILES["file-upload"]["tmp_name"];
$targetFile = "upload/". md5(microtime()) . "." . $fileExtension;
if (move_uploaded_file($tmpFile, $targetFile)) {
    echo json_encode([
        "message" => "O arquivo ". basename($file). " foi enviado com sucesso.",
        "status" => "success"
    ]);
} else {
    echo json_encode([
        "message" => "Ocorreu um erro ao enviar o arquivo.",
        "status" => "error"
    ]);
}

?>

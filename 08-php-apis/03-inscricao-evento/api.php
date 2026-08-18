<?php

header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    echo json_encode([
        "status" => "error",
        "result" => null,
        "message" => "Método não permitido. Utilize POST para inscrições."
    ]);
    exit;
}

$nome = trim($_POST["nome"] ?? "");
$email = trim($_POST["email"] ?? "");
$oficina = trim($_POST["oficina"] ?? "");

if ($nome === "" || $email === "" || $oficina === "") {
    http_response_code(400);
    echo json_encode([
        "status" => "error",
        "result" => null,
        "message" => "Todos os campos do formulário ('nome', 'email' e 'oficina') são obrigatórios."
    ]);
    exit;
}

$codigoInscricao = "INS-" . strtoupper(substr(md5($email . $oficina), 0, 8));

http_response_code(201);
echo json_encode([
    "status" => "OK",
    "result" => [
        "codigo" => $codigoInscricao,
        "estudante" => $nome,
        "email" => $email,
        "oficina" => $oficina,
        "confirmado_em" => date("Y-m-d H:i:s")
    ],
    "message" => "Inscrição na oficina realizada com sucesso!"
]);

<?php

// Informa ao navegador que a resposta é estritamente em formato JSON e UTF-8
header("Content-Type: application/json; charset=utf-8");

// 1. Verifica se o método HTTP utilizado foi POST
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    echo json_encode([
        "error" => true,
        "message" => "Método não permitido. Utilize o método POST para registrar ocorrências."
    ]);
    exit;
}

// 2. Coleta e higieniza os dados enviados pelo FormData
$categoria = trim($_POST["categoria"] ?? "");
$local = trim($_POST["local"] ?? "");
$urgencia = trim($_POST["urgencia"] ?? "baixa");
$descricao = trim($_POST["descricao"] ?? "");

// 3. Validação defensiva dos dados
$erros = [];

$categoriasValidas = ["infraestrutura", "equipamento", "limpeza", "eletrica_hidraulica", "outros"];
if ($categoria === "" || !in_array($categoria, $categoriasValidas, true)) {
    $erros[] = "Selecione uma categoria válida para a ocorrência.";
}

if ($local === "") {
    $erros[] = "Informe a localização exata do problema (sala, laboratório ou setor).";
}

if (mb_strlen($descricao, "UTF-8") < 10) {
    $erros[] = "A descrição detalhada deve possuir no mínimo 10 caracteres.";
}

// Se houver qualquer pendência, retorna status 422 (Unprocessable Content)
if (!empty($erros)) {
    http_response_code(422);
    echo json_encode([
        "error" => true,
        "message" => implode(" ", $erros)
    ]);
    exit; // Interrompe a execução imediatamente para não vazar dados
}

// 4. Sucesso: Gera número de protocolo fictício e confirma o cadastro
$numeroAleatorio = str_pad((string) random_int(1000, 9999), 4, "0", STR_PAD_LEFT);
$protocolo = "OC-" . date("Y") . "-" . $numeroAleatorio;

http_response_code(201);
echo json_encode([
    "protocolo" => $protocolo,
    "categoria" => $categoria,
    "local" => $local,
    "urgencia" => $urgencia,
    "horario" => date("d/m/Y H:i:s"),
    "message" => "Ocorrência registrada com sucesso! Seu protocolo é {$protocolo}."
]);
exit;

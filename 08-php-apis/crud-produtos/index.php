<?php
// 1. Avisa o cliente que a resposta é JSON
header("Content-Type: application/json");

// 2. Monta os dados em array/variável
$resposta = [
    "servidor" => "operacional",
    "mensagem" => "API funcionando com sucesso!"
];

// 3. Serializa e imprime na saída
echo json_encode($resposta);
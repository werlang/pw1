<?php
header("Content-Type: application/json");

$metodo = $_SERVER["REQUEST_METHOD"];

function sendResponse($response, $code = 200) {
    http_response_code($code);
    echo json_encode($response);
    exit;
}

include "produtos.php";
$produtos = getProdutos();

function productSearch($id) {
    global $produtos;
    foreach($produtos as $item) {
        if ($item["id"] == $id) {
            return $item;
        }
    }
    return null;
}

if ($metodo === "GET") {
    $categoria = $_GET["categoria"] ?? null;
    $precomin = $_GET["precomin"] ?? 0;
    $precomax = $_GET["precomax"] ?? 999999;
    $id = $_GET["id"] ?? null;

    $filtrados = [];
    foreach($produtos as $item) {
        if (
            $item["id"] == $id ||
            ($item["categoria"] === $categoria &&
            $item["preco"] >= $precomin && $item["preco"] <= $precomax)
        ) {
            $filtrados[] = $item;
        }
    }    

    sendResponse([
        "mensagem" => "Listagem de produtos",
        "produtos" => $filtrados,
    ]);
}

else if ($metodo === "POST") {
    $nome = $_POST["nome"] ?? null;
    $descricao = $_POST["descricao"] ?? "";
    $categoria = $_POST["categoria"] ?? "Outros";
    $preco = (float)($_POST["preco"] ?? 0);

    if (!$nome) {
        sendResponse([
            "erro" => true,
            "mensagem" => "O campo nome é obrigatório",
        ], 400);
    }

    sendResponse([
        "mensagem" => "Produto inserido com sucesso",
        "produto" => [
            "nome" => $nome,
            "descricao" => $descricao,
            "preco" => $preco,
            "categoria" => $categoria,
        ]
    ], 201);
}

else if ($metodo === "PUT") {
    $input = file_get_contents("php://input");
    $dados = json_decode($input, true);

    $pid = $_GET["id"];
    $produto = productSearch($pid);

    if (!$produto) {
        sendResponse([
            "erro" => true,
            "mensagem" => "Produto não encontrado"
        ], 404);
    }

    $atributosPermitidos = [ "nome", "descricao", "preco", "categoria" ];
    foreach($dados as $atributo => $valor) {
        if (in_array($atributo, $atributosPermitidos)) {
            $produto[$atributo] = $valor;
        }
    }

    sendResponse([
        "mensagem" => "Produto alterado",
        "produto" => $produto,
    ]);
}

else if ($metodo === "DELETE") {
    $id = $_GET["id"] ?? null;

    $produto = productSearch($id);
    if (!$produto) {
        sendResponse([
            "erro" => true,
            "mensagem" => "Produto não encontrado"
        ], 404);
    }

    sendResponse([
        "mensagem" => "Produto removido"
    ]);
}

sendResponse([
    "erro" => true,
    "mensagem" => "Ação não identificada",
], 405);
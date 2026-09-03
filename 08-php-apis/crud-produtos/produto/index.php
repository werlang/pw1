<?php
header("Content-Type: application/json");

$metodo = $_SERVER["REQUEST_METHOD"];

include "produtos.php";
$produtos = getProdutos();

function sendResponse($response, $status = 200) {
    http_response_code($status);
    echo json_encode($response);
    exit;
}

function searchProduct($id) {
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
    $precomax = (float)($_GET["precomax"] ?? 99999999);
    $precomin = (float)($_GET["precomin"] ?? 0);
    $id = $_GET["id"] ?? null;

    if ($id) {
        $produto = searchProduct($id);
        if (!$produto) {
            sendResponse([
                "erro" => true,
                "mensagem" => "Produto não encontrado",
            ], 404);
        }
        sendResponse([
            "mensagem" => "Produto encontrado",
            "produto" => $produto,
        ]);
    }

    $filtrados = [];
    foreach($produtos as $item) {
        if (
            ($item["categoria"] === $categoria || !$categoria) &&
            ($item["preco"] >= $precomin && $item["preco"] <= $precomax)
        ) {
            $filtrados[] = $item;
        }
    }

    sendResponse([
        "mensagem" => "Lista de produtos",
        "produtos" => $filtrados,
    ]);
}

else if ($metodo === "POST") {
    // insere produto

    $nome = $_POST["nome"] ?? null;
    $descricao = $_POST["descricao"] ?? "";
    $preco = (float)($_POST["preco"] ?? 0);
    $categoria = $_POST["categoria"] ?? "Outros";

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
    $id = $_GET["id"] ?? null;

    if (!$id) {
        sendResponse([
            "erro" => true,
            "mensagem" => "Informe um produto",
        ], 400);
    }

    $produto = searchProduct($id);
    if (!$produto) {
        sendResponse([
            "erro" => true,
            "mensagem" => "Produto não encontrado",
        ], 404);
    }

    $json = file_get_contents("php://input");
    $dados = json_decode($json, true);

    $camposPermitidos = [ "nome", "descricao", "preco", "categoria" ];
    foreach($dados as $campo => $valor) {
        if (in_array($campo, $camposPermitidos)) {
            $produto[$campo] = $valor;
        }
    }

    sendResponse([
        "mensagem" => "Produto alterado",
        "produto" => $produto,
    ]);
}

else if ($metodo === "DELETE") {
    $id = $_GET["id"] ?? null;

    if (!$id) {
        sendResponse([
            "erro" => true,
            "mensagem" => "Informe um produto",
        ], 400);
    }

    $produto = searchProduct($id);
    if (!$produto) {
        sendResponse([
            "erro" => true,
            "mensagem" => "Produto não encontrado",
        ], 404);
    }

    sendResponse([
        "mensagem" => "Produto removido",
    ]);

}

sendResponse([
    "erro" => true,
    "mensagem" => "Ação não identificada",
], 404);
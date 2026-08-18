<?php

header("Content-Type: application/json");

// Simulação de estoque em memória
$estoque = [
    "TEC-01" => [
        "codigo" => "TEC-01",
        "nome" => "Teclado Mecânico RGB",
        "quantidade" => 15,
        "preco_unitario" => 180.00
    ],
    "MOU-01" => [
        "codigo" => "MOU-01",
        "nome" => "Mouse Óptico Sem Fio",
        "quantidade" => 25,
        "preco_unitario" => 65.00
    ],
    "PEN-01" => [
        "codigo" => "PEN-01",
        "nome" => "Pendrive 64GB USB 3.0",
        "quantidade" => 40,
        "preco_unitario" => 35.00
    ]
];

$metodo = $_SERVER["REQUEST_METHOD"];

switch ($metodo) {
    case "GET":
        $valorTotalEstoque = 0;
        $totalUnidades = 0;

        foreach ($estoque as $item) {
            $valorTotalEstoque += $item["quantidade"] * $item["preco_unitario"];
            $totalUnidades += $item["quantidade"];
        }

        http_response_code(200);
        echo json_encode([
            "status" => "OK",
            "result" => [
                "total_produtos_distintos" => count($estoque),
                "total_unidades_estoque" => $totalUnidades,
                "valor_total_patrimonio" => round($valorTotalEstoque, 2),
                "itens" => array_values($estoque)
            ],
            "message" => "Inventário de estoque listado com sucesso."
        ]);
        break;

    case "POST":
        $corpo = file_get_contents("php://input");
        $dados = json_decode($corpo, true);

        $codigo = strtoupper(trim($dados["codigo"] ?? ""));
        $nome = trim($dados["nome"] ?? "");
        $quantidade = $dados["quantidade"] ?? null;
        $preco = $dados["preco_unitario"] ?? null;

        if ($codigo === "" || $nome === "" || $quantidade === null || $preco === null || !is_numeric($quantidade) || !is_numeric($preco)) {
            http_response_code(400);
            echo json_encode([
                "status" => "error",
                "result" => null,
                "message" => "Informe 'codigo', 'nome', 'quantidade' e 'preco_unitario' válidos no JSON."
            ]);
            exit;
        }

        if (isset($estoque[$codigo])) {
            http_response_code(400);
            echo json_encode([
                "status" => "error",
                "result" => null,
                "message" => "O produto com código '$codigo' já está cadastrado no estoque."
            ]);
            exit;
        }

        $novoItem = [
            "codigo" => $codigo,
            "nome" => $nome,
            "quantidade" => (int)$quantidade,
            "preco_unitario" => (float)$preco
        ];

        http_response_code(201);
        echo json_encode([
            "status" => "OK",
            "result" => $novoItem,
            "message" => "Produto adicionado ao estoque com sucesso!"
        ]);
        break;

    case "DELETE":
        $codigo = strtoupper(trim($_GET["codigo"] ?? ""));

        if ($codigo === "") {
            http_response_code(400);
            echo json_encode([
                "status" => "error",
                "result" => null,
                "message" => "Informe o parâmetro 'codigo' do produto na URL para exclusão."
            ]);
            exit;
        }

        if (!isset($estoque[$codigo])) {
            http_response_code(404);
            echo json_encode([
                "status" => "error",
                "result" => null,
                "message" => "Produto com código '$codigo' não foi encontrado no estoque."
            ]);
            exit;
        }

        $itemRemovido = $estoque[$codigo];
        unset($estoque[$codigo]);

        http_response_code(200);
        echo json_encode([
            "status" => "OK",
            "result" => $itemRemovido,
            "message" => "Produto removido do estoque com sucesso!"
        ]);
        break;

    default:
        http_response_code(405);
        echo json_encode([
            "status" => "error",
            "result" => null,
            "message" => "Método $metodo não permitido. Utilize GET, POST ou DELETE."
        ]);
        break;
}

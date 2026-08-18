<?php

header("Content-Type: application/json");

// Simulação de banco de dados em memória
$tarefas = [
    1 => ["id" => 1, "descricao" => "Estudar cabeçalhos HTTP", "prioridade" => "alta"],
    2 => ["id" => 2, "descricao" => "Instalar extensão do Bruno", "prioridade" => "media"],
    3 => ["id" => 3, "descricao" => "Fazer commit dos arquivos YAML", "prioridade" => "baixa"]
];

$metodo = $_SERVER["REQUEST_METHOD"];

switch ($metodo) {
    case "GET":
        http_response_code(200);
        echo json_encode([
            "status" => "OK",
            "result" => [
                "total" => count($tarefas),
                "itens" => array_values($tarefas)
            ],
            "message" => "Tarefas listadas com sucesso."
        ]);
        break;

    case "POST":
        $corpo = file_get_contents("php://input");
        $dados = json_decode($corpo, true);

        $descricao = trim($dados["descricao"] ?? "");
        $prioridade = $dados["prioridade"] ?? "normal";

        if ($descricao === "") {
            http_response_code(400);
            echo json_encode([
                "status" => "error",
                "result" => null,
                "message" => "O campo 'descricao' é obrigatório no JSON da tarefa."
            ]);
            exit;
        }

        $novoId = count($tarefas) + 1;
        $novaTarefa = [
            "id" => $novoId,
            "descricao" => $descricao,
            "prioridade" => $prioridade
        ];

        http_response_code(201);
        echo json_encode([
            "status" => "OK",
            "result" => $novaTarefa,
            "message" => "Tarefa criada com sucesso!"
        ]);
        break;

    case "DELETE":
        $id = $_GET["id"] ?? null;

        if ($id === null || !is_numeric($id)) {
            http_response_code(400);
            echo json_encode([
                "status" => "error",
                "result" => null,
                "message" => "Informe o parâmetro 'id' numérico da tarefa na URL para exclusão."
            ]);
            exit;
        }

        $idInt = (int)$id;
        if (!isset($tarefas[$idInt])) {
            http_response_code(404);
            echo json_encode([
                "status" => "error",
                "result" => null,
                "message" => "Tarefa com ID $idInt não foi encontrada."
            ]);
            exit;
        }

        $tarefaRemovida = $tarefas[$idInt];
        unset($tarefas[$idInt]);

        http_response_code(200);
        echo json_encode([
            "status" => "OK",
            "result" => $tarefaRemovida,
            "message" => "Tarefa removida com sucesso!"
        ]);
        break;

    default:
        http_response_code(405);
        echo json_encode([
            "status" => "error",
            "result" => null,
            "message" => "Método $metodo não suportado. Utilize GET, POST ou DELETE."
        ]);
        break;
}

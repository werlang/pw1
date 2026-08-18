# Exercício 05: Roteamento de Verbos REST (`GET`, `POST`, `DELETE`)

## Objetivo

A API [`api.php`](./api.php) implementa um endpoint multifuncional que roteia requisições baseado no método HTTP (`$_SERVER["REQUEST_METHOD"]`):
- `GET`: lista todas as tarefas cadastradas (`200 OK`).
- `POST`: adiciona uma nova tarefa enviada em JSON no corpo (`201 Created`).
- `DELETE`: remove uma tarefa informando seu ID na query string `?id=...` (`200 OK` ou `404 Not Found`).
- Qualquer outro verbo (ex.: `PUT`): retorna `405 Method Not Allowed`.

Sua tarefa é **montar a coleção completa no Bruno (em YAML)** contendo as quatro requisições de teste para cobrir todos os fluxos.

---

## O código da API fornecida (`api.php`)

```php
<?php

header("Content-Type: application/json");

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
```

---

## O que você deve construir no Bruno

Crie na pasta `collection/` quatro arquivos:

1. **`listar-tarefas.yaml`:**
   - **Método:** `GET`
   - **URL:** `http://localhost/api.php`
   - **Esperado:** `200 OK` e lista de 3 tarefas.

2. **`adicionar-tarefa.yaml`:**
   - **Método:** `POST`
   - **URL:** `http://localhost/api.php`
   - **Cabeçalho:** `Content-Type: application/json`
   - **Corpo (JSON):** `{ "descricao": "Estudar roteamento de verbos REST", "prioridade": "alta" }`
   - **Esperado:** `201 Created`.

3. **`remover-tarefa.yaml`:**
   - **Método:** `DELETE`
   - **URL:** `http://localhost/api.php?id=2`
   - **Esperado:** `200 OK` com dados da tarefa removida.

4. **`metodo-invalido.yaml`:**
   - **Método:** `PUT`
   - **URL:** `http://localhost/api.php`
   - **Esperado:** `405 Method Not Allowed`.

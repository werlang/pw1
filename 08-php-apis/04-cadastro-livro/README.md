# Exercício 04: Cadastro de Livro via Payload JSON (`php://input`)

## Objetivo

A API [`api.php`](./api.php) recebe dados de cadastro através de uma carga útil no formato `application/json` enviada no corpo da requisição via `POST`.

Sua tarefa é **criar duas requisições no Bruno (em YAML)** para testar:
1. **Envio de JSON com Sucesso (201 Created):** enviando os campos `titulo`, `autor`, `ano` e `paginas`.
2. **Envio de JSON Incompleto (400 Bad Request):** enviando campos em branco ou faltando dados obrigatórios.

---

## O código da API fornecida (`api.php`)

```php
<?php

header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    echo json_encode([
        "status" => "error",
        "result" => null,
        "message" => "Método não permitido. Utilize POST para cadastrar livros."
    ]);
    exit;
}

$corpoRequisicao = file_get_contents("php://input");
$dados = json_decode($corpoRequisicao, true);

if (!is_array($dados)) {
    http_response_code(400);
    echo json_encode([
        "status" => "error",
        "result" => null,
        "message" => "O corpo da requisição deve ser um objeto JSON válido."
    ]);
    exit;
}

$titulo = trim($dados["titulo"] ?? "");
$autor = trim($dados["autor"] ?? "");
$ano = $dados["ano"] ?? null;
$paginas = $dados["paginas"] ?? null;

if ($titulo === "" || $autor === "" || $ano === null || $paginas === null || !is_numeric($paginas)) {
    http_response_code(400);
    echo json_encode([
        "status" => "error",
        "result" => null,
        "message" => "Campos 'titulo', 'autor', 'ano' e 'paginas' são obrigatórios no JSON."
    ]);
    exit;
}

$horasEstimadas = ceil((int)$paginas / 30);

http_response_code(201);
echo json_encode([
    "status" => "OK",
    "result" => [
        "id" => rand(100, 999),
        "titulo" => $titulo,
        "autor" => $autor,
        "ano" => (int)$ano,
        "paginas" => (int)$paginas,
        "estimativa_leitura" => "$horasEstimadas horas"
    ],
    "message" => "Livro cadastrado na biblioteca com sucesso!"
]);
```

---

## O que você deve construir no Bruno

Crie na pasta `collection/` dois arquivos:

1. **`cadastrar-livro.yaml`:**
   - **Método:** `POST`
   - **URL:** `http://localhost/api.php`
   - **Cabeçalho:** `Content-Type: application/json`
   - **Corpo (JSON):**
     ```json
     {
       "titulo": "O Guia do Mochileiro das Galáxias",
       "autor": "Douglas Adams",
       "ano": 1979,
       "paginas": 224
     }
     ```
   - **Esperado:** `201 Created`.

2. **`json-invalido.yaml`:**
   - **Método:** `POST`
   - **URL:** `http://localhost/api.php`
   - **Cabeçalho:** `Content-Type: application/json`
   - **Corpo (JSON):** dados com título vazio.
   - **Esperado:** `400 Bad Request`.

# Exercício 01: Verificação de Status do Servidor (Healthcheck)

## Objetivo

Neste exercício introdutório, o script PHP da API já está pronto e em funcionamento no arquivo [`api.php`](./api.php).

Sua tarefa é **criar a coleção e a requisição no Bruno (em formato YAML)** para consultar o endpoint e inspecionar o status HTTP, os cabeçalhos de resposta e a estrutura do JSON retornado.

---

## O código da API fornecida (`api.php`)

```php
<?php

header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] !== "GET") {
    http_response_code(405);
    echo json_encode([
        "status" => "error",
        "result" => null,
        "message" => "Método não permitido. Utilize GET."
    ]);
    exit;
}

http_response_code(200);
echo json_encode([
    "status" => "OK",
    "result" => [
        "servico" => "API do Campus IFSUL",
        "status_servidor" => "operacional",
        "versao_php" => PHP_VERSION,
        "horario_servidor" => date("Y-m-d H:i:s"),
        "fuso_horario" => date_default_timezone_get()
    ],
    "message" => "Serviço em pleno funcionamento."
]);
```

---

## O que você deve construir no Bruno

Crie na pasta `collection/` o arquivo `status.yaml` descrevendo a requisição:

1. **Método:** `GET`
2. **URL:** `http://localhost/api.php`
3. **Cabeçalho:** `Accept: application/json`

---

## Critérios de Verificação

Ao disparar a requisição no Bruno:
- **Código de Status retornado:** `200 OK`
- **Cabeçalho retornado:** `Content-Type: application/json`
- **Corpo JSON:** objeto contendo `status: "OK"` e o objeto `result` com o status operacional.

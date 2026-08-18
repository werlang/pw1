# Exercício 02: Calculadora de Média via Query String (`$_GET`)

## Objetivo

A API [`api.php`](./api.php) já está implementada e recebe notas através de parâmetros de URL via método `GET`.

Sua tarefa é **criar duas requisições no Bruno (em YAML)** para testar dois cenários distintos:
1. **Cenário de Sucesso (200 OK):** enviando todas as notas válidas na query string.
2. **Cenário de Erro de Validação (400 Bad Request):** omitindo uma das notas obrigatórias.

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

$nota1 = $_GET["nota1"] ?? null;
$nota2 = $_GET["nota2"] ?? null;
$optativa = $_GET["optativa"] ?? null;

if ($nota1 === null || $nota2 === null || !is_numeric($nota1) || !is_numeric($nota2)) {
    http_response_code(400);
    echo json_encode([
        "status" => "error",
        "result" => null,
        "message" => "Informe os parâmetros numéricos obrigatórios 'nota1' e 'nota2' na URL."
    ]);
    exit;
}

$n1 = (float)$nota1;
$n2 = (float)$nota2;

$usouOptativa = false;
if ($optativa !== null && is_numeric($optativa)) {
    $nOpt = (float)$optativa;
    if ($nOpt > $n1 && $n1 <= $n2) {
        $n1 = $nOpt;
        $usouOptativa = true;
    } elseif ($nOpt > $n2 && $n2 < $n1) {
        $n2 = $nOpt;
        $usouOptativa = true;
    }
}

$media = ($n1 + $n2) / 2;
$situacao = ($media >= 6.0) ? "Aprovado" : "Recuperação";

http_response_code(200);
echo json_encode([
    "status" => "OK",
    "result" => [
        "nota1_final" => $n1,
        "nota2_final" => $n2,
        "usou_optativa" => $usouOptativa,
        "media" => round($media, 1),
        "situacao" => $situacao
    ],
    "message" => "Cálculo de média realizado com sucesso."
]);
```

---

## O que você deve construir no Bruno

Crie na pasta `collection/` dois arquivos:

1. **`media-sucesso.yaml`:**
   - **Método:** `GET`
   - **URL:** `http://localhost/api.php?nota1=5.5&nota2=8.0&optativa=7.5`
   - **Esperado:** `200 OK`, `media: 7.8`, `situacao: "Aprovado"`.

2. **`media-erro-parametros.yaml`:**
   - **Método:** `GET`
   - **URL:** `http://localhost/api.php?nota1=7.0` (sem `nota2`)
   - **Esperado:** `400 Bad Request` com mensagem de erro.

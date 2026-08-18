# Exercício 03: Inscrição em Evento via Formulário (`$_POST`)

## Objetivo

A API [`api.php`](./api.php) recebe dados de formulário tradicional codificados como `application/x-www-form-urlencoded` através do método `POST`.

Sua tarefa é **criar duas requisições no Bruno (em YAML)** para testar:
1. **Envio de Formulário com Sucesso (201 Created):** enviando os campos `nome`, `email` e `oficina`.
2. **Método Não Permitido (405 Method Not Allowed):** tentando fazer uma requisição `GET` para um endpoint que aceita exclusivamente `POST`.

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
        "message" => "Método não permitido. Utilize POST para inscrições."
    ]);
    exit;
}

$nome = trim($_POST["nome"] ?? "");
$email = trim($_POST["email"] ?? "");
$oficina = trim($_POST["oficina"] ?? "");

if ($nome === "" || $email === "" || $oficina === "") {
    http_response_code(400);
    echo json_encode([
        "status" => "error",
        "result" => null,
        "message" => "Todos os campos do formulário ('nome', 'email' e 'oficina') são obrigatórios."
    ]);
    exit;
}

$codigoInscricao = "INS-" . strtoupper(substr(md5($email . $oficina), 0, 8));

http_response_code(201);
echo json_encode([
    "status" => "OK",
    "result" => [
        "codigo" => $codigoInscricao,
        "estudante" => $nome,
        "email" => $email,
        "oficina" => $oficina,
        "confirmado_em" => date("Y-m-d H:i:s")
    ],
    "message" => "Inscrição na oficina realizada com sucesso!"
]);
```

---

## O que você deve construir no Bruno

Crie na pasta `collection/` dois arquivos:

1. **`inscricao.yaml`:**
   - **Método:** `POST`
   - **URL:** `http://localhost/api.php`
   - **Cabeçalho:** `Content-Type: application/x-www-form-urlencoded`
   - **Corpo (formUrlEncoded):**
     - `nome`: Carlos Alberto
     - `email`: carlos@ifsul.edu.br
     - `oficina`: Introdução ao Arduino
   - **Esperado:** `201 Created` e confirmação com código.

2. **`metodo-invalido.yaml`:**
   - **Método:** `GET`
   - **URL:** `http://localhost/api.php`
   - **Esperado:** `405 Method Not Allowed`.

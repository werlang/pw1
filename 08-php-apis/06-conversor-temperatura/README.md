# Exercício 06: Conversor de Temperatura a partir de Coleção Bruno

## Objetivo

Neste exercício, a **coleção do Bruno já está fornecida** na pasta [`collection/`](./collection/).

Sua tarefa é **construir o script backend [`api.php`](./api.php)** para atender exatamente às requisições e aos critérios especificados nos arquivos YAML.

---

## Requisições da Coleção Fornecida

1. **`converter-sucesso.yaml`:**
   - Requisição: `GET /api.php?valor=100&origem=C&destino=F`
   - Resposta esperada: `200 OK`, com `resultado: 212.0`.
2. **`origem-invalida.yaml`:**
   - Requisição: `GET /api.php?valor=100&origem=X&destino=C`
   - Resposta esperada: `400 Bad Request` informando que as escalas devem ser `C`, `F` ou `K`.

---

## Regras de Negócio a Implementar no PHP

1. Responder exclusivamente ao método `GET` (retornar `405 Method Not Allowed` para outros verbos).
2. Ler e validar os parâmetros `valor`, `origem` e `destino` via `$_GET`.
3. As escalas aceitas são:
   - `C`: Celsius
   - `F`: Fahrenheit
   - `K`: Kelvin
4. Retornar cabeçalho `Content-Type: application/json` e a resposta estruturada com `{ status: "OK", result: ..., message: ... }`.

---

## Solução de Referência

A solução completa está em [api.php](./api.php). Tente implementar seu código e validar com o Bruno antes de consultá-la.

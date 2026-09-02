# CRUD de Produtos — API em PHP

Uma API simples que faz as 4 operações básicas sobre produtos: **criar, listar, alterar e remover**. Tudo em um único arquivo PHP que responde em JSON.

> **Importante:** os produtos ficam em um array na memória (`produto/produtos.php`). Quando o servidor reinicia, tudo volta ao original. Não há banco de dados nesta etapa.

---

## O que você vai aprender

- O que é CRUD e como o verbo HTTP (`GET`, `POST`, `PUT`, `DELETE`) diz o que fazer.
- Como o PHP descobre o verbo com `$_SERVER["REQUEST_METHOD"]`.
- Os 3 jeitos de receber dados no PHP: `$_GET` (URL), `$_POST` (formulário) e `php://input` (JSON).
- Como devolver JSON com `header("Content-Type: application/json")` + `json_encode()` + `http_response_code()`.
- Como testar uma API com o Bruno usando arquivos YAML.

---

## Arquivos do projeto

| Arquivo | Para que serve |
| :--- | :--- |
| [`index.php`](./index.php) | Teste rápido: `GET /` responde `{"servidor":"operacional"}`. |
| [`produto/index.php`](./produto/index.php) | Onde está todo o CRUD. Decide o que fazer a partir do verbo HTTP. |
| [`produto/produtos.php`](./produto/produtos.php) | Lista fixa com 20 produtos. A função `getProdutos()` devolve o array. |
| [`Teste API/`](./Teste%20API/) | 5 requisições prontas do Bruno para testar sem digitar nada. |

```
crud-produtos/
├── index.php
├── produto/index.php
├── produto/produtos.php
└── Teste API/  → 5 arquivos .yml do Bruno
```

---

## Como a API funciona

Toda requisição segue os mesmos 5 passos em `produto/index.php`:

1. `header("Content-Type: application/json")` — avisa que a resposta é JSON.
2. `$metodo = $_SERVER["REQUEST_METHOD"]` — descobre se é `GET`, `POST`, `PUT` ou `DELETE`.
3. `$produtos = getProdutos()` — carrega os 20 produtos.
4. `if ($metodo === "GET") ... else if ($metodo === "POST") ...` — roteia para o bloco certo.
5. `sendResponse([...], $codigo)` — envia o JSON, define o status HTTP e para o script com `exit`.

```php
function sendResponse($resposta, $codigo = 200) {
    http_response_code($codigo);
    echo json_encode($resposta);
    exit;
}
```

---

## As 4 operações

| Verbo | O que faz | Onde estão os dados | Status |
| :--- | :--- | :--- | :--- |
| `GET /produto/?id=5` | Lista / filtra | URL → `$_GET` | `200` |
| `POST /produto/` | Cria | Formulário → `$_POST` | `201` ou `400` |
| `PUT /produto/?id=1` | Altera | URL + JSON → `$_GET` + `php://input` | `200` ou `404` |
| `DELETE /produto/?id=5` | Remove | URL → `$_GET` | `200` ou `404` |

### GET — listar e filtrar

```
GET /produto/?id=5
GET /produto/?categoria=Papelaria&precomin=5&precomax=10
```

Resposta `200 OK`:

```json
{ "mensagem": "Listagem de produtos", "produtos": [ { "id": 5, "nome": "Apontador Metálico", "preco": 5.5 } ] }
```

> Se você chamar `GET /produto/` sem nenhum parâmetro, a resposta vem vazia (`"produtos": []`). Precisa passar ao menos `?id=` ou `?categoria=`.

### POST — criar

Envia como **formulário** (`multipart/form-data`), não como JSON.

Campos: `nome` (obrigatório), `descricao`, `categoria` (padrão `Outros`), `preco`.

```php
$nome = $_POST["nome"] ?? null;
if (!$nome) {
    sendResponse(["erro" => true, "mensagem" => "O campo nome é obrigatório"], 400);
}
```

Sucesso `201 Created` / Erro `400 Bad Request` se faltar `nome`.

### PUT — alterar

```
PUT /produto/?id=1   +  corpo JSON: { "descricao": "Nova descrição", "preco": 100 }
```

O código só aceita `nome`, `descricao`, `preco` e `categoria`. Se o `id` não existir, devolve `404`.

### DELETE — remover

```
DELETE /produto/?id=5
```

Sucesso `200` com `{"mensagem":"Produto removido"}` ou `404` se não achar o `id`.

Qualquer verbo diferente desses quatro devolve `405 Method Not Allowed`.

---

## Como testar com o Bruno

Abra a pasta `Teste API/` no Bruno e dispare:

| Arquivo | Verbo | Testa o quê |
| :--- | :--- | :--- |
| `index principal.yml` | `GET /` | Se o servidor está no ar |
| `lista produtos.yml` | `GET /produto/?id=5` | Filtro por id |
| `insere produto.yml` | `POST /produto/` | Criar com formulário |
| `altera produto.yml` | `PUT /produto/?id=1` | Alterar com JSON |
| `remover produto.yml` | `DELETE /produto/?id=5` | Remover por id |

Dica: duplique `lista produtos.yml` e habilite `categoria`, `precomin` e `precomax` para testar filtros combinados.

---

## Para praticar

1. Faça o `GET` sem filtro devolver todos os produtos em vez de lista vazia.
2. No `POST`, impeça `preco` negativo ou com letras (devolva `400`).
3. No `PUT` e `DELETE`, valide se `?id=` foi informado antes de buscar — se não, devolva `400`.

---

## Resumo

- Um arquivo (`produto/index.php`) resolve tudo olhando `$_SERVER["REQUEST_METHOD"]`.
- `$_GET` lê da URL, `$_POST` lê formulário e `php://input` lê JSON.
- Toda resposta usa `sendResponse()` para definir o `Content-Type`, o código HTTP e encerrar.
- A coleção em `Teste API/` já cobre os 4 verbos — é só abrir no Bruno e testar.

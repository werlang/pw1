# Exercício 08: Catálogo de Filmes a partir de Coleção Bruno

## Objetivo

Neste exercício, a **coleção do Bruno já está fornecida** na pasta [`collection/`](./collection/).

Sua tarefa é **construir o script backend [`api.php`](./api.php)** que processa uma carga útil JSON recebida no corpo via `php://input`.

---

## Requisições da Coleção Fornecida

1. **`cadastrar-filme.yaml`:**
   - Método: `POST`
   - Cabeçalho: `Content-Type: application/json`
   - Corpo: `{ "titulo": "Interestelar", "genero": "Ficção Científica", "duracao_minutos": 169, "classificacao_etaria": 10 }`
   - Resposta esperada: `201 Created`, com identificação de `formato: "Longa-metragem"` e `indicacao: "+10 anos"`.
2. **`filme-invalido.yaml`:**
   - Método: `POST` com duração negativa (`duracao_minutos: -15`).
   - Resposta esperada: `400 Bad Request`.

---

## Regras de Negócio a Implementar no PHP

1. Responder exclusivamente ao método `POST` (retornar `405 Method Not Allowed` para outros verbos).
2. Ler a carga com `file_get_contents("php://input")` e decodificar com `json_decode(..., true)`.
3. Validar se `titulo` e `genero` não são vazios e se `duracao_minutos` é um número maior que zero.
4. Definir se o formato é `"Longa-metragem"` ($\ge 60\text{ min}$) ou `"Curta-metragem"` ($< 60\text{ min}$).

---

## Solução de Referência

A solução completa está em [api.php](./api.php).

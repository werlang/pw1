# Exercício 10: Controle de Estoque (CRUD Completo REST) a partir de Coleção Bruno

## Objetivo

Neste exercício, a **coleção do Bruno já está fornecida** na pasta [`collection/`](./collection/).

Sua tarefa é **construir o script backend [`api.php`](./api.php)** que implementa um gerenciador completo de inventário com roteamento de múltiplos verbos HTTP e cálculos agregados.

---

## Requisições da Coleção Fornecida

1. **`listar-estoque.yaml`:**
   - Método: `GET`
   - Resposta esperada: `200 OK` com contagem de produtos, total de unidades e cálculo do patrimônio total em estoque.
2. **`adicionar-item.yaml`:**
   - Método: `POST` com JSON (`codigo: "HD-02"`, `nome: "SSD NVMe 1TB"`, `quantidade: 8`, `preco_unitario: 320.00`).
   - Resposta esperada: `201 Created`.
3. **`remover-item.yaml`:**
   - Método: `DELETE /api.php?codigo=PEN-01`.
   - Resposta esperada: `200 OK` com dados do item excluído (ou `404` se não existir).
4. **`metodo-invalido.yaml`:**
   - Método: `PATCH`
   - Resposta esperada: `405 Method Not Allowed`.

---

## Regras de Negócio a Implementar no PHP

1. Roteamento baseado em `$_SERVER["REQUEST_METHOD"]` para `GET`, `POST` e `DELETE`.
2. No `GET`, calcular o somatório financeiro multiplicando quantidade por preço unitário de cada item.
3. No `POST`, validar duplicidade de código antes de inserir.
4. No `DELETE`, validar se o código existe no estoque antes de remover com `unset()`.
5. Em qualquer método não suportado, retornar `405`.

---

## Solução de Referência

A solução completa está em [api.php](./api.php).

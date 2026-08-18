# Exercício 07: Simulador de Mensalidade a partir de Coleção Bruno

## Objetivo

Neste exercício, a **coleção do Bruno já está fornecida** na pasta [`collection/`](./collection/).

Sua tarefa é **construir o script backend [`api.php`](./api.php)** que processa dados de formulário recebidos via `$_POST`.

---

## Requisições da Coleção Fornecida

1. **`simular-sucesso.yaml`:**
   - Método: `POST` (com `application/x-www-form-urlencoded`)
   - Campos: `curso=Informatica`, `turno=noite`, `bolsa_percentual=20`
   - Resposta esperada: `200 OK`, com cálculo correto de mensalidade (`mensalidade_final: 396.00`).
2. **`bolsa-invalida.yaml`:**
   - Método: `POST`
   - Campos: `bolsa_percentual=150`
   - Resposta esperada: `400 Bad Request` informando que a bolsa deve estar entre 0 e 100%.

---

## Tabela de Valores e Regras

- **Valores base por curso:**
  - `Informatica`: R$ 450,00
  - `Mecatronica`: R$ 480,00
  - `Edificacoes`: R$ 420,00
- **Fatores por turno:**
  - `manha`: valor normal (100%)
  - `tarde`: 5% de desconto (95%)
  - `noite`: 10% de adicional (110%)
- **Bolsa:** percentual de desconto aplicado sobre o valor após ajuste do turno.

---

## Solução de Referência

A solução completa está em [api.php](./api.php).

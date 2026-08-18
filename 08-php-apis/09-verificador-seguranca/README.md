# Exercício 09: Verificador de Segurança de Senha a partir de Coleção Bruno

## Objetivo

Neste exercício, a **coleção do Bruno já está fornecida** na pasta [`collection/`](./collection/).

Sua tarefa é **construir o script backend [`api.php`](./api.php)** que recebe credenciais via JSON no corpo da requisição e avalia regras defensivas de segurança.

---

## Requisições da Coleção Fornecida

1. **`senha-forte.yaml`:**
   - Método: `POST`
   - Corpo JSON: `{ "usuario": "aluno_ifsul", "senha": "Pass@2026" }`
   - Resposta esperada: `200 OK`, com `pontuacao: 100`, `nivel: "Forte"` e detalhes dos critérios atendidos.
2. **`senha-fraca.yaml`:**
   - Método: `POST` com senha curta (`"123"`).
   - Resposta esperada: `400 Bad Request`, com diagnóstico dos critérios que falharam.

---

## Regras de Avaliação da Senha

Cada critério atendido vale **25 pontos**:
1. Pelo menos 8 caracteres (`strlen($senha) >= 8`).
2. Pelo menos uma letra maiúscula (`preg_match("/[A-Z]/", $senha)`).
3. Pelo menos um número (`preg_match("/[0-9]/", $senha)`).
4. Pelo menos um caractere especial/símbolo (`preg_match("/[\W_]/", $senha)`).

- **Níveis:**
  - $\ge 75\text{ pontos}$: `"Forte"` (status `200 OK`)
  - $\ge 50\text{ pontos}$: `"Média"` (status `200 OK`)
  - $< 50\text{ pontos}$: `"Fraca"` (status `400 Bad Request`)

---

## Solução de Referência

A solução completa está em [api.php](./api.php).

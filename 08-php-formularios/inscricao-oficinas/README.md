# Exercício: Inscrição em Oficinas

## Objetivo

Validar um formulário POST com campos de naturezas diferentes e devolver todos os erros de uma só vez.

## Requisitos

- receber nome, turma, turno, oficina principal, oficina alternativa e aceite do regulamento;
- validar campos obrigatórios no PHP;
- impedir que oficina principal e alternativa sejam iguais;
- preservar os campos válidos quando houver erro;
- mostrar uma lista de mensagens próxima ao início do formulário;
- depois do sucesso, mostrar um comprovante escapando todo texto informado.

## Conceitos trabalhados

POST, radio, select, checkbox, validação acumulada, campos persistidos e `htmlspecialchars()`.

## Critérios de verificação

- deve ser possível visualizar vários erros simultaneamente;
- o checkbox ausente precisa ser tratado sem aviso do PHP;
- os valores escolhidos não podem desaparecer após uma falha.

# Exercício: Auditoria de Matrículas

## Objetivo

Examinar uma coleção de registros e separar inconsistências que exigem correção. O resultado principal é um relatório de auditoria, não uma tabela de cadastro comum.

## Estrutura de dados

Use um array de estudantes com matrícula, nome, turma, e-mail e situação.

## Requisitos

- localizar matrículas duplicadas;
- identificar campos obrigatórios ausentes;
- separar estudantes ativos sem turma;
- agrupar a quantidade de problemas por tipo;
- gerar uma lista somente com os registros que precisam de revisão;
- mostrar a proporção de registros válidos sobre o total.

## Conceitos trabalhados

Arrays de registros, extração de colunas, contagem de frequências, filtro e construção de um resumo.

## Critérios de verificação

- um registro com dois problemas deve informar os dois motivos;
- a coleção original não deve ser alterada durante a auditoria;
- o resumo precisa ser calculado a partir das inconsistências encontradas.

# Exercício: Ranking de Leitura

## Objetivo

Transformar registros relacionados em um relatório agregado, sem carregar todas as linhas para somar no PHP.

## Dados

Use tabelas `estudantes`, `livros` e `leituras`, com data de conclusão e quantidade de páginas.

## Requisitos

- relacionar as três tabelas com `JOIN`;
- somar livros e páginas por estudante;
- considerar somente leituras concluídas no período escolhido;
- ordenar por páginas e usar quantidade de livros como desempate;
- incluir estudantes sem leitura com totais iguais a zero;
- limitar o ranking e apresentar também o total geral do período.

## Conceitos trabalhados

Chaves estrangeiras, `JOIN`, `LEFT JOIN`, `COUNT`, `SUM`, `GROUP BY`, ordenação e parâmetros de período.

## Critérios de verificação

- a agregação principal deve ocorrer no SQL;
- estudantes sem leitura não podem desaparecer;
- o período deve ser enviado como parâmetro preparado.

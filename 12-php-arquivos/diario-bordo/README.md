# Exercício: Diário de Bordo

## Objetivo

Trabalhar com um arquivo de log acrescentando eventos sem reescrever o histórico existente.

## Requisitos

- receber categoria e mensagem por formulário POST;
- gravar uma linha com data, hora, categoria e mensagem normalizada;
- usar modo de acréscimo e bloqueio exclusivo durante a escrita;
- ler o histórico e apresentar as entradas mais recentes primeiro;
- filtrar a visualização por categoria sem alterar o arquivo;
- informar claramente falhas de abertura, escrita ou leitura.

## Conceitos trabalhados

`fopen()`, modo `a`, `flock()`, `fwrite()`, leitura de linhas e separação entre armazenamento e filtro.

## Critérios de verificação

- uma nova entrada não pode apagar as anteriores;
- quebras de linha na mensagem não podem criar registros falsos;
- filtrar a tela não deve produzir um segundo arquivo.

# Exercício: Importador de Merenda em CSV

## Objetivo

Ler um arquivo tabular, validar linha por linha e produzir um relatório que separe dados aproveitados de dados rejeitados.

## Dados

O CSV deve conter data, alimento, grupo, quantidade e unidade, com cabeçalho obrigatório.

## Requisitos

- abrir o arquivo com caminho baseado em `__DIR__`;
- validar o cabeçalho antes de processar;
- usar `fgetcsv()` com delimitador explícito;
- registrar número e motivo das linhas inválidas;
- somar quantidades por grupo e contar dias atendidos;
- mostrar resumo, registros válidos e rejeições em áreas separadas.

## Conceitos trabalhados

Leitura por ponteiro, CSV, validação por linha, agregação e relatório de importação.

## Critérios de verificação

- uma linha ruim não pode interromper as demais;
- o erro deve apontar a linha original do arquivo;
- trocar a ordem do cabeçalho deve impedir uma interpretação silenciosa.

# Exercício: Lote de Crachás Numerados

## Objetivo

Produzir um lote de crachás para um evento e aplicar marcas visuais calculadas pelo número de cada participante.

## Dados iniciais

Defina o primeiro número, o último número e um prefixo textual para os códigos.

## Requisitos

- gerar todos os crachás com um laço;
- formatar códigos como `PW1-001`, `PW1-002` e assim por diante;
- marcar a cada quinto participante como responsável de grupo;
- alternar uma classe de cor entre números pares e ímpares;
- contar quantos crachás comuns e quantos de responsável foram produzidos;
- mostrar um resumo depois do lote.

## Conceitos trabalhados

Interpolação, `str_pad()`, `for`, operador `%`, contadores e HTML repetitivo.

## Critérios de verificação

- os códigos devem permanecer corretos quando o intervalo mudar;
- a contagem final deve ser calculada durante a geração;
- a classe visual deve vir da regra, não de posições escritas manualmente.

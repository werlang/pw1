# Exercício: Simulação do Reservatório

## Objetivo

Simular o esvaziamento de um reservatório em rodadas sucessivas e registrar como o estado muda até ocorrer uma condição de parada.

## Dados iniciais

Defina capacidade atual, consumo por rodada, limite de segurança e número máximo de rodadas.

## Requisitos

- usar `while` para executar as rodadas enquanto houver água segura e rodadas disponíveis;
- descontar o consumo e incrementar o número da rodada;
- gerar uma linha de relatório para cada estado alcançado;
- impedir que o volume mostrado fique negativo;
- informar se a simulação terminou por limite de segurança ou por limite de rodadas;
- usar `do...while` em uma segunda simulação curta que execute ao menos uma inspeção.

## Conceitos trabalhados

Estado escalar, `while`, `do...while`, condições compostas, acumuladores e condição de parada.

## Critérios de verificação

- nenhuma repetição pode depender de valores copiados manualmente;
- a saída deve revelar a evolução do volume, não apenas o resultado final;
- os dois motivos de encerramento precisam ser testáveis ao mudar os valores iniciais.

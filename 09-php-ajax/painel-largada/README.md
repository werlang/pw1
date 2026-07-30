# Exercício: Painel de Largada

## Objetivo

Controlar a preparação de uma prova escolar com contagem regressiva, chamada de atenção e largada, sem bloquear a interface.

## Requisitos

- representar os estados aguardando atletas, atenção, contagem e largada;
- criar uma função `esperar(ms)` que devolva uma Promise;
- executar o ciclo com `async`/`await`;
- permitir pausar a contagem por ocorrência na pista sem criar um segundo ciclo;
- permitir cancelar e registrar em qual etapa ocorreu o cancelamento;
- mostrar a contagem atual, a orientação aos atletas e o histórico da tentativa.

## Conceitos trabalhados

Promises, `async`/`await`, `setTimeout()`, estado de execução, pausa e cancelamento.

## Critérios de verificação

- cliques repetidos em iniciar não podem abrir duas largadas;
- a interface deve continuar respondendo durante a espera;
- cancelar deve impedir que uma espera antiga dispare a largada depois.

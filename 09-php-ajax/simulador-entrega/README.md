# Exercício: Rastreamento Simulado de Entrega

## Objetivo

Modelar um processo por etapas em que cada avanço é assíncrono e pode falhar ou ser interrompido.

## Requisitos

- manter as etapas pedido recebido, separado, em transporte e entregue;
- simular cada transição com uma Promise e tempo diferente;
- apresentar uma linha do tempo que marque concluído, atual e pendente;
- permitir cancelar antes da entrega;
- provocar uma falha controlada quando o código informado atender a uma regra definida;
- oferecer “tentar novamente” retomando da etapa que falhou.

## Conceitos trabalhados

Encadeamento assíncrono, estado por etapas, rejeição de Promise, `try...catch`, retomada e cancelamento.

## Critérios de verificação

- a tentativa seguinte não pode repetir etapas já concluídas;
- falha e cancelamento devem ser estados diferentes;
- nenhum temporizador antigo pode avançar uma execução reiniciada.

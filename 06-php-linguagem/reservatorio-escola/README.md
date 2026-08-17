# Exercício: Simulação do Reservatório

## Objetivo

Durante uma atividade de manutenção, a escola precisa acompanhar o volume de
água de um reservatório a cada rodada de consumo. Você vai simular esse
esvaziamento e registrar a evolução até que uma condição de parada seja
atingida.

## Solução completa

A resposta completa da versão com `while` está em [index.php](./index.php) e
[style.css](./style.css). Tente resolver o enunciado antes de consultá-la;
depois, compare sua solução com esses arquivos. A extensão com `do...while` é
uma etapa posterior.

## Dados iniciais

Crie variáveis para o volume inicial, o consumo por rodada, o limite de
segurança e o número máximo de rodadas. Use como referência volume inicial
`1000`, consumo de `180` por rodada, limite de segurança `200` e no máximo `5`
rodadas.

## O que você deve construir

Use `while` enquanto o volume estiver acima do limite de segurança e ainda
houver rodadas disponíveis. Em cada rodada, desconte o consumo, avance o
contador e gere uma linha de relatório para o estado alcançado.

O volume mostrado nunca pode ficar negativo. Quando a repetição terminar,
informe se isso aconteceu porque o reservatório chegou ao limite de segurança
ou porque o número máximo de rodadas foi atingido.

## Extensão posterior: `do...while`

Depois de concluir a primeira versão, crie uma segunda inspeção curta usando
`do...while`. Ela deve acontecer pelo menos uma vez, mesmo que o volume inicial
já esteja no limite.

Não substitua o `while` da primeira versão. Para testar a extensão, use volume
inicial `200` ou menor e confirme que a inspeção aparece uma vez.

## Conceitos trabalhados

`while`, condições compostas, contador de rodadas e condição de parada.
`do...while` é uma extensão posterior, não um requisito da primeira versão.

## Critérios de verificação

- nenhuma repetição depende de valores copiados manualmente;
- a saída revela a evolução do volume, não apenas o resultado final;
- os dois motivos de encerramento podem ser testados ao mudar os valores
  iniciais;
- a extensão com `do...while` executa pelo menos uma inspeção quando for
  adicionada.

Com os dados de referência, a simulação termina pelo limite de segurança. Para
testar o outro motivo, mantenha os demais valores e reduza o máximo para `3`
rodadas.

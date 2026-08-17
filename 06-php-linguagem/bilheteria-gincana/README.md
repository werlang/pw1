# Exercício: Bilheteria da Gincana

## Objetivo

Você está atendendo a bilheteria de uma gincana. O preço do ingresso depende
da idade da pessoa, de ela ser estudante, do dia e do horário da compra, além
da quantidade de lugares disponíveis.

Transforme essas regras em decisões PHP claras. A página deve explicar como o
preço foi obtido, e não mostrar apenas o valor final.

## Solução completa

A resposta completa está em [index.php](./index.php) e [style.css](./style.css).
Tente resolver o enunciado antes de consultá-la. Depois, compare sua solução
com esses arquivos.

## Dados iniciais

Use variáveis para a idade, a condição de estudante, o dia da semana, o
horário de entrada, a quantidade de lugares disponíveis e o preço base.
Comece com idade `20`, estudante `true`, dia `sexta`, horário `17`, 10 lugares
e preço base `20`.

## O que você deve construir

Crie uma página que mostre o preço base, os descontos aplicados e o valor
final. Quando não houver lugares, a venda deve ser bloqueada.

Aplique as regras abaixo:

- crianças de até `11` anos entram de graça;
- estudantes ou pessoas com `60` anos ou mais pagam meia-entrada;
- a promoção adicional vale somente na sexta-feira e antes das `18` horas;
- a meia-entrada corresponde a `50%` e a promoção adicional corresponde a
  `10%`.

Para quem não tem gratuidade, aplique primeiro a meia-entrada e depois calcule
os `10%` da promoção sobre o preço que restou. Uma pessoa que entra de graça
não recebe os outros descontos. Use operadores lógicos para combinar as
condições, sem copiar blocos inteiros de decisão.

## Conceitos trabalhados

Booleanos, comparações estritas, operadores lógicos, decisões encadeadas e
cálculo percentual.

## Casos para testar

- idade `10` para conferir a gratuidade;
- idade `60`, estudante `false` e sábado para conferir a meia-entrada sem
  promoção;
- horário `18` para conferir que o limite da promoção não é incluído;
- `0` lugares para bloquear a venda.

Com os dados de referência, o ingresso recebe meia-entrada e promoção, e o
preço final deve ser `9`.

## Critérios de verificação

- gratuidade, meia-entrada, promoção e lotação produzem respostas distintas;
- nenhum desconto é aplicado quando sua condição estiver incompleta;
- a página permite conferir como o preço final foi calculado.

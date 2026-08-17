# Exercício: Calendário de Treinos

## Objetivo

Uma equipe precisa organizar os treinos de um mês em uma grade de calendário.
Em vez de cadastrar cada dia manualmente, gere a grade com laços e calcule a
posição de cada dia a partir dos dados do mês.

## Solução completa

A resposta completa está em [index.php](./index.php) e [style.css](./style.css).
Tente resolver o enunciado antes de consultá-la. Depois, compare sua solução
com esses arquivos.

Na atividade, o domingo vale `0`, a segunda-feira vale `1` e assim por diante.
Esse número representa o dia da semana em que o mês começa.

## Dados iniciais

Crie variáveis para o total de dias do mês, o dia da semana em que o mês
começa e a frequência dos treinos especiais. Use como referência 30 dias,
início em `3` (quarta-feira) e um treino especial a cada `7` dias.

## O que você deve construir

Crie a grade do calendário e gere todos os dias com `for`. Antes do primeiro
dia, coloque as células vazias necessárias para que ele apareça na coluna
correta.

Durante a geração:

- calcule o dia da semana usando o índice e o operador `%`;
- marque os fins de semana com uma classe própria;
- marque como treino especial todo dia cujo número seja múltiplo da frequência
  definida — na configuração inicial, 7, 14, 21 e 28;
- complete a última linha com células vazias quando a quantidade de dias não
  fechar uma semana inteira.

## Conceitos trabalhados

Laço `for`, laços aninhados, resto da divisão, contadores, índices calculados
e geração repetitiva de HTML.

## Critérios de verificação

- não existe uma sequência manual de 28, 30 ou 31 células;
- trocar o início da semana reposiciona todos os dias;
- a estrutura HTML continua válida para meses com tamanhos diferentes;
- fins de semana e treinos especiais são marcados pelas regras calculadas.

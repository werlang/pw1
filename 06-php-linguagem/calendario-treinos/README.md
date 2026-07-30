# Exercício: Calendário de Treinos

## Objetivo

Gerar um calendário mensal sem cadastrar cada dia manualmente. A grade deve nascer de laços e de regras calculadas a partir do número do dia.

## Dados iniciais

Defina o total de dias do mês, o dia da semana em que o mês começa e a frequência dos treinos especiais.

## Requisitos

- criar as células vazias anteriores ao primeiro dia;
- gerar todos os dias com `for`;
- calcular o dia da semana usando o índice e o operador `%`;
- marcar fins de semana com uma classe própria;
- marcar como treino especial cada dia que atender à frequência definida;
- completar a última linha da grade com células vazias quando necessário.

## Conceitos trabalhados

Laço `for`, laços aninhados, resto da divisão, acumuladores e geração repetitiva de HTML.

## Critérios de verificação

- não deve existir uma sequência manual de 28, 30 ou 31 células;
- trocar o início da semana deve reposicionar todos os dias;
- a estrutura HTML final deve continuar válida para meses de tamanhos diferentes.

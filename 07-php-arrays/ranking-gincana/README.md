# Exercício: Apuração da Gincana

## Objetivo

A comissão organizadora da Gincana Integrada do IFSul precisa consolidar as pontuações de quatro equipes após a realização de três etapas de provas. Cada equipe acumulou pontos em cada etapa e pode ter sofrido penalidades por descumprimento de prazos.

O objetivo é escrever um script em PHP que calcule a pontuação líquida de cada equipe, ordene a classificação geral do maior para o menor preservando o nome dos times, trate **empates de forma explícita** e destaque quais equipes atingiram o índice de premiação.

## Solução completa

A resposta completa está em [index.php](./index.php) e [style.css](./style.css). Tente resolver o enunciado antes de consultá-la. Depois, compare sua solução com esses arquivos.

## Dados iniciais

Crie um array associativo contendo o nome das equipes como chaves e, como valores, arrays associativos com a lista de notas das etapas e a penalidade:

```php
$equipes = [
    "Equipe Verde" => [
        "etapas" => [95, 110, 80],
        "penalidade" => 15
    ],
    "Equipe Azul" => [
        "etapas" => [100, 105, 95],
        "penalidade" => 0
    ],
    "Equipe Amarela" => [
        "etapas" => [75, 80, 85],
        "penalidade" => 0
    ],
    "Equipe Vermelha" => [
        "etapas" => [100, 95, 90],
        "penalidade" => 15
    ]
];
```

## O que você deve construir

1. **Cálculo da pontuação consolidada:**
   - Para cada equipe, calcule o total bruto somando as pontuações das etapas (usando `array_sum()` ou um laço).
   - Subtraia a penalidade para obter a pontuação final líquida.
   - Armazene os totais líquidos em um novo array associativo (ex.: `["Equipe Azul" => 300, ...]`).

2. **Ordenação preservando chaves:**
   - Ordene o array de pontuações finais em ordem decrescente utilizando `arsort()`, garantindo que os nomes das equipes continuem associados às suas pontuações.

3. **Tabela de classificação com tratamento de empates:**
   - Ao gerar a tabela HTML, calcule a colocação de forma justa:
     - A equipe de maior pontuação ocupa o `1º` lugar.
     - Se duas ou mais equipes tiverem a mesma pontuação, elas devem exibir a mesma colocação (ex.: ambas como `2º`).
     - A próxima pontuação diferente deve refletir a posição real acumulada (ex.: `1º`, `2º`, `2º`, `4º`).
   - Não utilize simplesmente o número da linha da tabela como posição.

4. **Diferença para a liderança e premiação:**
   - Calcule e exiba a distância em pontos que cada equipe ficou em relação ao líder (`$pontosLider - $pontosEquipe`).
   - Aplique uma classe visual de destaque (ex.: `class="premiada"`) e um rótulo `"Classificada para a final"` apenas para as equipes que alcançarem a pontuação mínima de **250 pontos**.

## Conceitos trabalhados

- Arrays associativos e aninhados.
- Agregação e operações matemáticas em arrays (`array_sum()` e subtrações).
- Ordenação com preservação de chaves (`arsort()`).
- Lógica de classificação com detecção de empates em laços de repetição.
- Exibição condicional de classes e selos em tabelas HTML.

## Critérios de verificação

- Com os dados de teste fornecidos:
  - **Pontuações finais:**
    - `Equipe Azul`: 300 pontos (300 bruto - 0 penalidade) → **1º Lugar** (diferença: 0) — *Classificada*.
    - `Equipe Verde`: 270 pontos (285 bruto - 15 penalidade) → **2º Lugar** (empate, diferença: -30) — *Classificada*.
    - `Equipe Vermelha`: 270 pontos (285 bruto - 15 penalidade) → **2º Lugar** (empate, diferença: -30) — *Classificada*.
    - `Equipe Amarela`: 240 pontos (240 bruto - 0 penalidade) → **4º Lugar** (diferença: -60) — *Não classificada*.
- Alterar as notas ou penalidades no array inicial deve atualizar imediatamente toda a classificação e os empates.

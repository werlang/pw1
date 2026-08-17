# Exercício Introdutório: Verificador de Presença

## Objetivo

Imagine que o professor precise conferir rapidamente se determinados estudantes responderam à chamada e em qual posição da lista eles assinaram a ata de presença.

Nesta atividade introdutória, você vai trabalhar com **funções de busca e validação em arrays**. O objetivo é compreender o funcionamento de `in_array()` e `array_search()`, dando atenção especial à comparação estrita (`!== false`) para não cair na armadilha do índice zero (`0`).

## Conceito central

Pratique a busca de valores com `in_array($valor, $array, true)` e a recuperação do índice com `array_search($valor, $array, true)`, comparando o retorno com `!== false`.

## Solução completa

A resposta completa está em [index.php](./index.php) e [style.css](./style.css). Tente resolver o enunciado antes de consultá-la. Depois, compare sua solução com esses arquivos.

## Dados iniciais

No início do `index.php`, defina a lista de chamada e os nomes a serem consultados:

```php
$chamada = [
    "Ana Souza",
    "Bruno Lima",
    "Carla Dias",
    "Daniel Rocha",
    "Eduarda Ramos"
];

$estudantePresente = "Carla Dias";
$estudantePrimeiro = "Ana Souza";
$estudanteAusente = "Felipe Silva";
```

## O que você deve construir

1. **Busca e verificação de presença:**
   - Verifique se `$estudantePresente` está na lista com `in_array($estudantePresente, $chamada, true)`.
   - Localize o índice de `$estudantePresente` com `array_search($estudantePresente, $chamada, true)`.
   - Verifique se `$estudantePrimeiro` (que está no índice zero) é localizado corretamente usando `!== false`.
   - Verifique o comportamento para `$estudanteAusente` (retorno `false`).
2. **Resumo da chamada:**
   - Exiba a quantidade total de presentes registrados (`count($chamada)`).
   - Calcule a ordem de assinatura de cada estudante encontrado (`$indice + 1`º na lista).
3. **Apresentação em HTML:**
   - Monte um painel com a lista completa de presença numerada.
   - Crie uma seção de "Resultados da Consulta" com cartões individuais para cada um dos três estudantes testados, indicando claramente se a pessoa está "Presente" (com sua respectiva posição na chamada) ou "Ausente".

## Conceitos trabalhados

- Busca booleana com `in_array()`.
- Localização posicional com `array_search()`.
- Comparação estrita `!== false` para evitar que o índice zero seja interpretado como falso.
- Contagem com `count()`.
- Renderização condicional de status no HTML.

## Critérios de verificação

- Com os dados fornecidos:
  - **Total de presentes:** 5 estudantes.
  - **Consulta 1 (`Carla Dias`):** Presente — 3ª posição na ata (índice 2).
  - **Consulta 2 (`Ana Souza`):** Presente — 1ª posição na ata (índice 0, tratado com comparação estrita).
  - **Consulta 3 (`Felipe Silva`):** Ausente — Não localizado na lista.

# Exercício Introdutório: Lista de Materiais do Laboratório

## Objetivo

Imagine que o laboratório de eletrônica e informática do campus precise manter uma lista rápida dos equipamentos disponíveis para a aula prática.

Nesta atividade introdutória, você vai trabalhar com um **array indexado simples**. O objetivo é compreender a criação da lista, a inclusão de novos itens ao final, a contagem de elementos e a exibição ordenada no HTML usando o laço `foreach`.

## Conceito central

Pratique a declaração de arrays com colchetes `[]`, o acesso posicional por índice (`$array[0]`), a adição de elementos com `$array[] = ...` e a contagem com `count()`.

## Solução completa

A resposta completa está em [index.php](./index.php) e [style.css](./style.css). Tente resolver o enunciado antes de consultá-la. Depois, compare sua solução com esses arquivos.

## Dados iniciais

No início do `index.php`, defina um array indexado com quatro equipamentos de laboratório:

```php
$materiais = [
    "Multímetro Digital",
    "Ferro de Solda",
    "Protoboard",
    "Alicate de Corte"
];
```

## O que você deve construir

1. **Adição ao final:** adicione `"Fonte de Bancada"` ao final da lista utilizando a sintaxe de colchetes vazios (`$materiais[] = "Fonte de Bancada";`).
2. **Resumo de posições:**
   - Obtenha a quantidade total de materiais cadastrados com `count($materiais)`.
   - Identifique e armazene em variáveis o **primeiro equipamento** (índice `0`) e o **último equipamento** (índice `count($materiais) - 1`).
3. **Apresentação em HTML:**
   - Monte um painel com cartões destacando o total de itens, o primeiro material da bancada e o último material adicionado.
   - Gere uma lista ordenada `<ol>` percorrendo o array com `foreach ($materiais as $indice => $material)`, exibindo o número do índice e o nome do equipamento formatado com `htmlspecialchars()`.

## Conceitos trabalhados

- Criação de arrays indexados (`[]`).
- Adição de elementos ao final (`$array[] = ...`).
- Acesso por índice numérico (`$array[0]` e cálculo do último índice).
- Contagem de itens com `count()`.
- Iteração com `foreach` capturando índice e valor.

## Critérios de verificação

- Com os dados de partida e a adição solicitada:
  - **Total de materiais:** 5 itens.
  - **Primeiro item:** `"Multímetro Digital"` (índice 0).
  - **Último item:** `"Fonte de Bancada"` (índice 4).
  - A lista gerada deve exibir os 5 materiais na sequência correta sem avisos de índice indefinido.

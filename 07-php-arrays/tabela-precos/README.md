# Exercício Introdutório: Tabela de Preços da Cantina

## Objetivo

Imagine que a cantina do campus precise exibir na tela do refeitório uma tabela com os preços dos lanches e bebidas oferecidos aos estudantes, acompanhada do valor total e do preço médio do cardápio.

Nesta atividade introdutória, você vai trabalhar com um **array multidimensional básico** (um array contendo vários arrays associativos). O objetivo é percorrer essa coleção com `foreach`, extrair os campos de cada produto e renderizar uma tabela HTML limpa, formatando valores monetários com `number_format()` e protegendo textos com `htmlspecialchars()`.

## Conceito central

Pratique a iteração em coleções de registros (`array de arrays associativos`), o cálculo de somatórios/médias acumuladas e a montagem de tabelas `<table>` em PHP.

## Solução completa

A resposta completa está em [index.php](./index.php) e [style.css](./style.css). Tente resolver o enunciado antes de consultá-la. Depois, compare sua solução com esses arquivos.

## Dados iniciais

No início do `index.php`, crie o array multidimensional contendo os produtos da cantina:

```php
$produtos = [
    [
        "codigo" => "LAN-01",
        "nome" => "Sanduíche Natural",
        "categoria" => "Salgados",
        "preco" => 7.50
    ],
    [
        "codigo" => "BEB-02",
        "nome" => "Suco de Laranja 300ml",
        "categoria" => "Bebidas",
        "preco" => 4.00
    ],
    [
        "codigo" => "DOC-03",
        "nome" => "Salada de Frutas",
        "categoria" => "Sobremesas",
        "preco" => 5.00
    ],
    [
        "codigo" => "LAN-04",
        "nome" => "Pão de Queijo",
        "categoria" => "Salgados",
        "preco" => 3.50
    ]
];
```

## O que você deve construir

1. **Cálculos agregados:**
   - Calcule a quantidade total de produtos cadastrados com `count($produtos)`.
   - Some os preços de todos os produtos percorrendo o array ou usando `array_column($produtos, "preco")` com `array_sum()`.
   - Calcule o preço médio dos itens do cardápio (`$somaPrecos / $totalProdutos`).
2. **Tabela HTML:**
   - Estruture uma tabela semântica (`<table>`, `<thead>`, `<tbody>`, `<tfoot>`).
   - No `<tbody>`, percorra os produtos com `foreach` gerando linhas com código, nome, categoria e preço formatado em reais (`R$ X,XX`).
   - No `<tfoot>`, exiba uma linha de resumo consolidando a quantidade total de itens e a soma de todos os preços.
3. **Painel de métricas:**
   - Adicione no topo da página cartões de resumo com a quantidade de itens, a média de preços e o item mais acessível.

## Conceitos trabalhados

- Arrays multidimensionais (array indexado de arrays associativos).
- Laço `foreach` para geração de linhas de tabelas HTML.
- Acumulação e cálculo de média.
- Formatação monetária com `number_format()`.
- Proteção contra injeção de tags com `htmlspecialchars()`.

## Critérios de verificação

- Com os dados de teste fornecidos:
  - **Total de produtos:** 4 itens.
  - **Soma dos preços:** R$ 20,00.
  - **Preço médio:** R$ 5,00.
  - A tabela deve renderizar os 4 produtos com seus respectivos códigos, categorias e preços formatados em padrão brasileiro (`R$ 7,50`, `R$ 4,00`, `R$ 5,00`, `R$ 3,50`).

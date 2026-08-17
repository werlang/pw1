# Exercício: Catálogo de Merenda

## Objetivo

O refeitório estudantil precisa organizar o cardápio e a distribuição dos lanches da semana. A equipe de nutrição precisa cruzar a categoria de cada alimento, a disponibilidade em estoque, as restrições para estudantes com intolerância a lactose e o custo por porção.

Além de apresentar a lista formatada em HTML para consulta dos alunos e servidores, o sistema deve fornecer uma representação estruturada em **JSON** para integração com o aplicativo escolar.

## Solução completa

A resposta completa está em [index.php](./index.php) e [style.css](./style.css). Tente resolver o enunciado antes de consultá-la. Depois, compare sua solução com esses arquivos.

## Dados iniciais

Crie um array com o catálogo inicial de alimentos do refeitório:

```php
$alimentos = [
    [
        "id" => 1,
        "nome" => "Maçã Gala",
        "grupo" => "Frutas",
        "estoque" => 45,
        "sem_lactose" => true,
        "preco" => 1.80
    ],
    [
        "id" => 2,
        "nome" => "Banana Prata",
        "grupo" => "Frutas",
        "estoque" => 0,
        "sem_lactose" => true,
        "preco" => 1.20
    ],
    [
        "id" => 3,
        "nome" => "Iogurte Natural",
        "grupo" => "Laticínios",
        "estoque" => 30,
        "sem_lactose" => false,
        "preco" => 2.50
    ],
    [
        "id" => 4,
        "nome" => "Queijo Minas Frescal",
        "grupo" => "Laticínios",
        "estoque" => 15,
        "sem_lactose" => false,
        "preco" => 3.20
    ],
    [
        "id" => 5,
        "nome" => "Biscoito Integral de Aveia",
        "grupo" => "Cereais",
        "estoque" => 50,
        "sem_lactose" => true,
        "preco" => 2.00
    ],
    [
        "id" => 6,
        "nome" => "Barra de Cereal",
        "grupo" => "Cereais",
        "estoque" => 0,
        "sem_lactose" => true,
        "preco" => 1.90
    ],
    [
        "id" => 7,
        "nome" => "Sanduíche Natural de Frango",
        "grupo" => "Proteínas",
        "estoque" => 20,
        "sem_lactose" => true,
        "preco" => 4.50
    ]
];
```

## O que você deve construir

1. **Filtragem por disponibilidade:**
   - Descarte todos os itens com `"estoque" <= 0`. Todos os cálculos e exibições seguintes devem considerar apenas os alimentos efetivamente disponíveis.

2. **Agrupamento por categoria:**
   - Crie um array associativo em que cada chave seja o nome do grupo alimentício (`"Frutas"`, `"Laticínios"`, `"Cereais"`, `"Proteínas"`) e o valor seja uma lista de todos os itens disponíveis daquele grupo.

3. **Cardápio com restrição a lactose:**
   - Extraia uma lista contendo exclusivamente os alimentos disponíveis com `"sem_lactose" === true`.
   - Exiba essa lista em uma seção de destaque com a indicação dos itens seguros para intolerantes.

4. **Composição e custo de kit equilibrado:**
   - A escola definiu 4 grupos obrigatórios para compor o lanche do dia: `Frutas`, `Laticínios`, `Cereais` e `Proteínas`.
   - Para cada um desses 4 grupos obrigatórios, selecione a opção disponível mais barata e some os valores para calcular o **custo total do kit diário**.
   - Se algum dos grupos obrigatórios não possuir nenhuma opção com estoque, emita um alerta de **grupo desabastecido** e não feche o cálculo do kit.

5. **Apresentação em HTML e exportação em JSON:**
   - Monte a interface HTML com os cartões dos produtos agrupados por categoria, exibindo o preço formatado em reais com `number_format($preco, 2, ',', '.')`.
   - No final da página, inclua uma tag `<pre>` ou bloco de código contendo a serialização JSON da lista de itens sem lactose disponíveis, gerada com `json_encode($itensSemLactose, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE)`.
   - Lembre-se de aplicar `array_values()` na lista filtrada antes do `json_encode()`, para assegurar que a saída seja uma lista JSON pura (`[...]`) e não um objeto indexado (`{...}`).

## Conceitos trabalhados

- Arrays multidimensionais associativos.
- Filtragem e agrupamento dinâmico por propriedades (`$agrupados[$item["grupo"]][] = $item`).
- Seleção de menor valor / mínimo em subconjuntos.
- Formatação monetária em padrão brasileiro (`number_format()`).
- Conversão de arrays em JSON com `json_encode()`, flags de formatação e `array_values()`.

## Critérios de verificação

- Com os dados de teste fornecidos:
  - **Total de itens cadastrados:** 7 | **Disponíveis em estoque:** 5 (Banana Prata e Barra de Cereal são descartadas).
  - **Opções disponíveis sem lactose:** 3 (Maçã Gala, Biscoito Integral e Sanduíche de Frango).
  - **Composição do Kit Diário mais econômico:**
    - Frutas: Maçã Gala (R$ 1,80)
    - Laticínios: Iogurte Natural (R$ 2,50)
    - Cereais: Biscoito Integral (R$ 2,00)
    - Proteínas: Sanduíche de Frango (R$ 4,50)
    - **Custo total do combo:** R$ 10,80.
  - **Validação de cobertura:** todos os 4 grupos obrigatórios estão abastecidos.
  - **Saída JSON:** deve produzir um array JSON válido contendo exatamente os 3 itens sem lactose disponíveis com chaves preservadas e índices contínuos de 0 a 2.

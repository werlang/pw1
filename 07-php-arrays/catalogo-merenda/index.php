<?php

/**
 * Catálogo de alimentos da merenda escolar.
 * Dados de estoque, restrições e custos por porção.
 */
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
        "estoque" => 0, // Sem estoque
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
        "estoque" => 0, // Sem estoque
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

// 1. Filtragem de alimentos disponíveis (estoque maior que zero)
$disponiveis = array_filter($alimentos, fn($item) => $item["estoque"] > 0);

// 2. Agrupamento de itens disponíveis por categoria
$agrupados = [];
foreach ($disponiveis as $item) {
    $agrupados[$item["grupo"]][] = $item;
}

// 3. Filtragem de opções sem lactose (reindexando com array_values para JSON limpo)
$semLactose = array_values(array_filter($disponiveis, fn($item) => $item["sem_lactose"] === true));

// 4. Montagem e custo do kit diário equilibrado
$gruposObrigatorios = ["Frutas", "Laticínios", "Cereais", "Proteínas"];
$itensCombo = [];
$custoTotalCombo = 0;
$gruposDesabastecidos = [];

foreach ($gruposObrigatorios as $grupo) {
    if (empty($agrupados[$grupo])) {
        $gruposDesabastecidos[] = $grupo;
    } else {
        // Encontra o item disponível de menor custo dentro do grupo
        $itensDoGrupo = $agrupados[$grupo];
        usort($itensDoGrupo, fn($a, $b) => $a["preco"] <=> $b["preco"]);
        $maisEconomico = $itensDoGrupo[0];

        $itensCombo[$grupo] = $maisEconomico;
        $custoTotalCombo += $maisEconomico["preco"];
    }
}

// 5. Serialização JSON da lista de itens sem lactose
$jsonSemLactose = json_encode($semLactose, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Catálogo de Merenda Escolar</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <main>
        <header>
            <h1>Catálogo e Planejamento da Merenda</h1>
            <p>Controle nutricional, disponibilidade de estoque e composições de lanches.</p>
        </header>

        <section class="painel-estatisticas" aria-label="Indicadores do refeitório">
            <article class="cartao">
                <h2>Total Cadastrado</h2>
                <strong><?= count($alimentos) ?></strong>
                <span>itens no sistema</span>
            </article>

            <article class="cartao disponiveis">
                <h2>Com Estoque</h2>
                <strong><?= count($disponiveis) ?></strong>
                <span>itens disponíveis</span>
            </article>

            <article class="cartao lactose">
                <h2>Sem Lactose</h2>
                <strong><?= count($semLactose) ?></strong>
                <span>opções seguras</span>
            </article>

            <article class="cartao combo">
                <h2>Combo Diário</h2>
                <strong>R$ <?= number_format($custoTotalCombo, 2, ",", ".") ?></strong>
                <span>4 grupos obrigatórios</span>
            </article>
        </section>

        <?php if (!empty($gruposDesabastecidos)) { ?>
            <section class="alerta-desabastecimento">
                <strong>Alerta:</strong> Os seguintes grupos não possuem opções disponíveis em estoque:
                <strong><?= implode(", ", $gruposDesabastecidos) ?></strong>.
            </section>
        <?php } else { ?>
            <section class="painel-combo">
                <h2>Sugestão de Kit Diário Mais Econômico</h2>
                <div class="grade-combo">
                    <?php foreach ($itensCombo as $grupo => $item) { ?>
                        <div class="item-combo">
                            <span class="grupo-combo"><?= htmlspecialchars($grupo) ?></span>
                            <strong class="nome-combo"><?= htmlspecialchars($item["nome"]) ?></strong>
                            <span class="preco-combo">R$ <?= number_format($item["preco"], 2, ",", ".") ?></span>
                        </div>
                    <?php } ?>
                </div>
            </section>
        <?php } ?>

        <section class="catalogo-categorias">
            <h2>Cardápio por Grupos Alimentares</h2>

            <div class="grade-categorias">
                <?php foreach ($agrupados as $grupo => $itens) { ?>
                    <article class="cartao-categoria">
                        <h3><?= htmlspecialchars($grupo) ?> (<?= count($itens) ?>)</h3>

                        <ul class="lista-alimentos">
                            <?php foreach ($itens as $alimento) { ?>
                                <li class="item-alimento">
                                    <div class="dados-alimento">
                                        <strong><?= htmlspecialchars($alimento["nome"]) ?></strong>
                                        <div class="badges">
                                            <span class="badge estoque">Estoque: <?= $alimento["estoque"] ?></span>
                                            <?php if ($alimento["sem_lactose"]) { ?>
                                                <span class="badge sem-lactose">Sem Lactose</span>
                                            <?php } else { ?>
                                                <span class="badge com-lactose">Contém Lactose</span>
                                            <?php } ?>
                                        </div>
                                    </div>
                                    <span class="preco-alimento">R$ <?= number_format($alimento["preco"], 2, ",", ".") ?></span>
                                </li>
                            <?php } ?>
                        </ul>
                    </article>
                <?php } ?>
            </div>
        </section>

        <section class="exportacao-json">
            <h2>Integração JSON - Opções Sem Lactose</h2>
            <p>Saída estruturada com <code>json_encode()</code> pronta para consumo de APIs:</p>
            <pre><code><?= htmlspecialchars($jsonSemLactose) ?></code></pre>
        </section>
    </main>
</body>
</html>

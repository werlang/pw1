<?php

/**
 * Catálogo de produtos da cantina escolar.
 * Array multidimensional (coleção de arrays associativos).
 */
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

// 1. Cálculos de total e média dos produtos
$totalProdutos = count($produtos);
$somaPrecos = 0;
$produtoMaisBarato = null;

foreach ($produtos as $p) {
    $somaPrecos += $p["preco"];

    if ($produtoMaisBarato === null || $p["preco"] < $produtoMaisBarato["preco"]) {
        $produtoMaisBarato = $p;
    }
}

$precoMedio = $totalProdutos > 0 ? $somaPrecos / $totalProdutos : 0;
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tabela de Preços da Cantina</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <main>
        <header>
            <h1>Cantina do Campus - Tabela de Preços</h1>
            <p>Apresentação de array multidimensional em tabela formatada.</p>
        </header>

        <section class="painel-estatisticas" aria-label="Indicadores do cardápio">
            <article class="cartao">
                <h2>Total de Itens</h2>
                <strong><?= $totalProdutos ?></strong>
                <span>opções disponíveis</span>
            </article>

            <article class="cartao medio">
                <h2>Preço Médio</h2>
                <strong>R$ <?= number_format($precoMedio, 2, ",", ".") ?></strong>
                <span>por produto</span>
            </article>

            <article class="cartao acessivel">
                <h2>Mais Acessível</h2>
                <strong><?= htmlspecialchars($produtoMaisBarato["nome"] ?? "—") ?></strong>
                <span>R$ <?= number_format($produtoMaisBarato["preco"] ?? 0, 2, ",", ".") ?></span>
            </article>
        </section>

        <section class="tabela-container">
            <table>
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Produto</th>
                        <th>Categoria</th>
                        <th class="col-preco">Preço Unitário</th>
                    </tr>
                </thead>
                <tbody>
                    <?php foreach ($produtos as $produto) { ?>
                        <tr>
                            <td><code><?= htmlspecialchars($produto["codigo"]) ?></code></td>
                            <td><strong><?= htmlspecialchars($produto["nome"]) ?></strong></td>
                            <td><span class="badge-cat"><?= htmlspecialchars($produto["categoria"]) ?></span></td>
                            <td class="col-preco">R$ <?= number_format($produto["preco"], 2, ",", ".") ?></td>
                        </tr>
                    <?php } ?>
                </tbody>
                <tfoot>
                    <tr>
                        <td colspan="3"><strong>Total Geral (<?= $totalProdutos ?> itens)</strong></td>
                        <td class="col-preco"><strong>R$ <?= number_format($somaPrecos, 2, ",", ".") ?></strong></td>
                    </tr>
                </tfoot>
            </table>
        </section>
    </main>
</body>
</html>

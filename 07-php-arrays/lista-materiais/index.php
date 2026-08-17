<?php

/**
 * Lista inicial de materiais do laboratório.
 * Array indexado com contagem iniciando em zero.
 */
$materiais = [
    "Multímetro Digital",
    "Ferro de Solda",
    "Protoboard",
    "Alicate de Corte"
];

// 1. Adiciona um novo material no próximo índice numérico disponível
$materiais[] = "Fonte de Bancada";

// 2. Contagem e identificação de posições extremas
$totalMateriais = count($materiais);
$primeiroMaterial = $materiais[0] ?? "Nenhum";
$ultimoIndice = $totalMateriais > 0 ? $totalMateriais - 1 : 0;
$ultimoMaterial = $materiais[$ultimoIndice] ?? "Nenhum";
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lista de Materiais do Laboratório</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <main>
        <header>
            <h1>Materiais do Laboratório</h1>
            <p>Controle de bancada com array indexado simples no PHP.</p>
        </header>

        <section class="painel-resumo" aria-label="Resumo do estoque de bancada">
            <article class="cartao">
                <h2>Total de Itens</h2>
                <strong><?= $totalMateriais ?></strong>
            </article>

            <article class="cartao primeiro">
                <h2>Primeiro Item (Índice 0)</h2>
                <strong><?= htmlspecialchars($primeiroMaterial) ?></strong>
            </article>

            <article class="cartao ultimo">
                <h2>Último Item (Índice <?= $ultimoIndice ?>)</h2>
                <strong><?= htmlspecialchars($ultimoMaterial) ?></strong>
            </article>
        </section>

        <section class="lista-container">
            <h2>Inventário Completo da Bancada</h2>
            <ol class="lista-itens">
                <?php foreach ($materiais as $indice => $material) { ?>
                    <li>
                        <span class="badge-indice">Posição <?= $indice ?></span>
                        <span class="nome-item"><?= htmlspecialchars($material) ?></span>
                    </li>
                <?php } ?>
            </ol>
        </section>
    </main>
</body>
</html>

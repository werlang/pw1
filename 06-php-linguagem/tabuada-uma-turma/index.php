<?php

$numeroTabuada = 7;
$ultimoMultiplicador = 5;
$quantidadeDeLinhas = 0;
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tabuada de <?= $numeroTabuada ?></title>
</head>
<body>
    <main>
        <h1>Tabuada do <?= $numeroTabuada ?></h1>

        <ul>
            <?php for ($multiplicador = 1; $multiplicador <= $ultimoMultiplicador; $multiplicador++): ?>
                <?php
                $resultado = $numeroTabuada * $multiplicador;
                $quantidadeDeLinhas++;
                $marcaDoMultiplicador = "";

                // O resto zero indica que o multiplicador é par.
                if ($multiplicador % 2 === 0) {
                    $marcaDoMultiplicador = " - multiplicador par";
                }
                ?>
                <li>
                    <?= $numeroTabuada ?> x <?= $multiplicador ?> = <?= $resultado ?><?= $marcaDoMultiplicador ?>
                </li>
            <?php endfor; ?>
        </ul>

        <p><strong>Total de linhas:</strong> <?= $quantidadeDeLinhas ?></p>
    </main>
</body>
</html>

<?php

$volumeAtual = 1000;
$volumeInicial = $volumeAtual;
$consumoPorRodada = 180;
$limiteSeguranca = 200;
$maximoDeRodadas = 5;
$rodada = 0;
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Simulação do reservatório</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <main>
        <h1>Simulação do reservatório</h1>

        <section class="dados" aria-label="Dados da simulação">
            <span>Volume inicial</span>
            <strong><?= $volumeInicial ?> L</strong>
            <span>Consumo por rodada</span>
            <strong><?= $consumoPorRodada ?> L</strong>
            <span>Limite de segurança</span>
            <strong><?= $limiteSeguranca ?> L</strong>
            <span>Máximo de rodadas</span>
            <strong><?= $maximoDeRodadas ?></strong>
        </section>

        <table class="historico">
            <caption>Evolução do volume</caption>
            <thead>
                <tr>
                    <th>Rodada</th>
                    <th>Volume restante</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>0</td>
                    <td><?= $volumeAtual ?> L</td>
                </tr>

                <?php while ($volumeAtual > $limiteSeguranca && $rodada < $maximoDeRodadas): ?>
                    <?php
                    $volumeAtual -= $consumoPorRodada;
                    $rodada++;

                    // O volume não pode ficar negativo no relatório.
                    if ($volumeAtual < 0) {
                        $volumeAtual = 0;
                    }
                    ?>
                    <tr>
                        <td><?= $rodada ?></td>
                        <td><?= $volumeAtual ?> L</td>
                    </tr>
                <?php endwhile; ?>
            </tbody>
        </table>

        <?php
        if ($volumeAtual <= $limiteSeguranca) {
            $motivoParada = "A simulação terminou pelo limite de segurança.";
        } else {
            $motivoParada = "A simulação terminou pelo limite de rodadas.";
        }
        ?>
        <p class="motivo"><strong>Motivo da parada:</strong> <?= $motivoParada ?></p>
    </main>
</body>
</html>

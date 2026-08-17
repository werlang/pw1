<?php

$totalDeDias = 30;
$diaDaSemanaInicial = 3; // 0 = domingo, 1 = segunda-feira, ..., 6 = sábado.
$frequenciaTreinosEspeciais = 7;

$celulasAntesDoPrimeiroDia = $diaDaSemanaInicial;
$totalDeCelulas = $celulasAntesDoPrimeiroDia + $totalDeDias;
$quantidadeDeSemanas = (int) ceil($totalDeCelulas / 7);
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Calendário de treinos</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <main>
        <h1>Calendário de treinos</h1>
        <p>Treinos especiais a cada <?= $frequenciaTreinosEspeciais ?> dias.</p>

        <table class="calendario">
            <caption>Calendário com <?= $totalDeDias ?> dias</caption>
            <thead>
                <tr>
                    <th>Domingo</th>
                    <th>Segunda</th>
                    <th>Terça</th>
                    <th>Quarta</th>
                    <th>Quinta</th>
                    <th>Sexta</th>
                    <th>Sábado</th>
                </tr>
            </thead>
            <tbody>
                <?php for ($semana = 0; $semana < $quantidadeDeSemanas; $semana++): ?>
                    <tr>
                        <?php for ($coluna = 0; $coluna < 7; $coluna++): ?>
                            <?php
                            $indiceDaCelula = ($semana * 7) + $coluna;
                            $celulaVazia = $indiceDaCelula < $celulasAntesDoPrimeiroDia
                                || $indiceDaCelula >= $totalDeCelulas;
                            ?>

                            <?php if ($celulaVazia): ?>
                                <td class="vazia" aria-label="Dia vazio"></td>
                            <?php else: ?>
                                <?php
                                $indiceDoDia = $indiceDaCelula - $celulasAntesDoPrimeiroDia;
                                $dia = $indiceDoDia + 1;
                                $diaDaSemana = ($diaDaSemanaInicial + $indiceDoDia) % 7;
                                $classeDia = "dia";
                                $ehTreinoEspecial = false;

                                if ($diaDaSemana === 0 || $diaDaSemana === 6) {
                                    $classeDia .= " fim-de-semana";
                                }

                                if (
                                    $frequenciaTreinosEspeciais > 0
                                    && $dia % $frequenciaTreinosEspeciais === 0
                                ) {
                                    $classeDia .= " treino-especial";
                                    $ehTreinoEspecial = true;
                                }
                                ?>
                                <td class="<?= $classeDia ?>">
                                    <?= $dia ?>
                                    <?php if ($ehTreinoEspecial): ?>
                                        <span>Treino especial</span>
                                    <?php endif; ?>
                                </td>
                            <?php endif; ?>
                        <?php endfor; ?>
                    </tr>
                <?php endfor; ?>
            </tbody>
        </table>
    </main>
</body>
</html>

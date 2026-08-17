<?php

$idade = 20;
$ehEstudante = true;
$diaDaSemana = "sexta";
$horaEntrada = 17;
$lugaresDisponiveis = 10;
$precoBase = 20;

$vendaLiberada = $lugaresDisponiveis > 0;
$tipoIngresso = "";
$precoFinal = 0;
$descontoGratuidade = 0;
$descontoMeiaEntrada = 0;
$descontoPromocional = 0;

if (!$vendaLiberada) {
    $tipoIngresso = "Venda bloqueada";
} elseif ($idade <= 11) {
    $tipoIngresso = "Gratuidade infantil";
    $descontoGratuidade = $precoBase;
} else {
    $tipoIngresso = "Inteira";
    $precoFinal = $precoBase;

    if ($ehEstudante || $idade >= 60) {
        $tipoIngresso = "Meia-entrada";
        $descontoMeiaEntrada = $precoBase * 0.50;
        $precoFinal -= $descontoMeiaEntrada;
    }

    if ($diaDaSemana === "sexta" && $horaEntrada < 18) {
        $descontoPromocional = $precoFinal * 0.10;
        $precoFinal -= $descontoPromocional;
    }
}

$descontoTotal = $descontoGratuidade
    + $descontoMeiaEntrada
    + $descontoPromocional;
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bilheteria da gincana</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <main>
        <h1>Bilheteria da gincana</h1>

        <section class="informacoes" aria-label="Dados da venda">
            <p><strong>Idade:</strong> <?= $idade ?> anos</p>
            <p><strong>Estudante:</strong> <?= $ehEstudante ? "Sim" : "Não" ?></p>
            <p><strong>Dia:</strong> <?= $diaDaSemana ?></p>
            <p><strong>Horário:</strong> <?= $horaEntrada ?>h</p>
            <p><strong>Lugares disponíveis:</strong> <?= $lugaresDisponiveis ?></p>
        </section>

        <section class="precos" aria-label="Cálculo do ingresso">
            <p><strong>Tipo:</strong> <?= $tipoIngresso ?></p>
            <p><strong>Preço base:</strong> R$ <?= number_format($precoBase, 2, ",", ".") ?></p>

            <?php if ($vendaLiberada): ?>
                <?php if ($descontoGratuidade > 0): ?>
                    <p>Gratuidade infantil: - R$ <?= number_format($descontoGratuidade, 2, ",", ".") ?></p>
                <?php endif; ?>

                <?php if ($descontoMeiaEntrada > 0): ?>
                    <p>Meia-entrada: - R$ <?= number_format($descontoMeiaEntrada, 2, ",", ".") ?></p>
                <?php endif; ?>

                <?php if ($descontoPromocional > 0): ?>
                    <p>Promoção de sexta: - R$ <?= number_format($descontoPromocional, 2, ",", ".") ?></p>
                <?php endif; ?>

                <?php if ($descontoTotal === 0): ?>
                    <p>Nenhum desconto aplicado.</p>
                <?php endif; ?>

                <p><strong>Desconto total:</strong> R$ <?= number_format($descontoTotal, 2, ",", ".") ?></p>
                <p class="total"><strong>Valor final:</strong> R$ <?= number_format($precoFinal, 2, ",", ".") ?></p>
            <?php else: ?>
                <p class="bloqueada">Não há lugares disponíveis. A venda foi bloqueada.</p>
            <?php endif; ?>
        </section>
    </main>
</body>
</html>

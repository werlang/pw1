<?php

$primeiroNumero = 1;
$ultimoNumero = 12;
$prefixoCodigo = "PW1";
$quantidadeComuns = 0;
$quantidadeResponsaveis = 0;
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lote de crachás numerados</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <main>
        <h1>Lote de crachás numerados</h1>

        <section class="lote" aria-label="Crachás gerados">
            <?php for ($numero = $primeiroNumero; $numero <= $ultimoNumero; $numero++): ?>
                <?php
                $numeroFormatado = str_pad($numero, 3, "0", STR_PAD_LEFT);
                $codigo = $prefixoCodigo . "-" . $numeroFormatado;
                $ehResponsavel = $numero % 5 === 0;

                if ($ehResponsavel) {
                    $quantidadeResponsaveis++;
                    $classeResponsabilidade = "responsavel";
                    $tipoParticipante = "Responsável de grupo";
                } else {
                    $quantidadeComuns++;
                    $classeResponsabilidade = "";
                    $tipoParticipante = "Participante";
                }

                if ($numero % 2 === 0) {
                    $classeCor = "par";
                } else {
                    $classeCor = "impar";
                }
                ?>
                <article class="cracha <?= $classeCor ?> <?= $classeResponsabilidade ?>">
                    <h2><?= $codigo ?></h2>
                    <p><?= $tipoParticipante ?></p>
                </article>
            <?php endfor; ?>
        </section>

        <section class="resumo" aria-label="Resumo do lote">
            <h2>Resumo</h2>
            <p>Crachás comuns: <?= $quantidadeComuns ?></p>
            <p>Responsáveis de grupo: <?= $quantidadeResponsaveis ?></p>
        </section>
    </main>
</body>
</html>

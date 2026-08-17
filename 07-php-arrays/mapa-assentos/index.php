<?php

/**
 * Mapa de ocupação do auditório para a Mostra Tecnológica.
 * Chave: letra da fileira.
 * Valor: lista indexada com o estado de cada assento ('livre', 'ocupado' ou 'reservado').
 */
$mapaAuditorio = [
    "A" => ["ocupado", "ocupado", "livre", "livre", "ocupado", "livre"],
    "B" => ["reservado", "ocupado", "ocupado", "livre", "reservado", "livre"],
    "C" => ["ocupado", "ocupado", "ocupado", "ocupado", "ocupado", "ocupado"],
    "D" => ["livre", "livre", "livre", "ocupado", "ocupado", "reservado"]
];

// Contadores gerais de assentos
$totalAssentos = 0;
$totalLivres = 0;
$totalOcupados = 0;
$totalReservados = 0;

// Variável para armazenar o primeiro assento livre encontrado
$primeiroAssentoLivre = null;

// Lista de fileiras que estão 100% cheias (sem nenhum assento livre)
$fileirasLotadas = [];

// Processa o mapa calculando as estatísticas e identificando situações especiais
foreach ($mapaAuditorio as $letraFileira => $assentos) {
    $livresNestaFileira = 0;

    foreach ($assentos as $indice => $estado) {
        $totalAssentos++;

        if ($estado === "livre") {
            $totalLivres++;
            $livresNestaFileira++;

            // Guarda o primeiro assento livre se ainda não encontrou nenhum
            if ($primeiroAssentoLivre === null) {
                $numeroCadeira = $indice + 1;
                $primeiroAssentoLivre = "$letraFileira-$numeroCadeira";
            }
        } elseif ($estado === "ocupado") {
            $totalOcupados++;
        } elseif ($estado === "reservado") {
            $totalReservados++;
        }
    }

    // Se a fileira não teve nenhum assento livre, adiciona ao alerta
    if ($livresNestaFileira === 0) {
        $fileirasLotadas[] = $letraFileira;
    }
}

// Calcula a porcentagem de ocupação
$taxaOcupacao = $totalAssentos > 0 ? ($totalOcupados / $totalAssentos) * 100 : 0;
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mapa de Assentos da Mostra</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <main>
        <header>
            <h1>Mapa de Assentos - Mostra Tecnológica</h1>
            <p>Acompanhamento em tempo real da ocupação do auditório.</p>
        </header>

        <?php if (!empty($fileirasLotadas)) { ?>
            <section class="alerta" aria-live="polite">
                <strong>Atenção:</strong>
                A(s) fileira(s) <strong><?= implode(", ", $fileirasLotadas) ?></strong> está(ão) completamente cheia(s)!
            </section>
        <?php } ?>

        <section class="painel-estatisticas" aria-label="Estatísticas de ocupação">
            <article class="cartao">
                <h2>Total de assentos</h2>
                <strong><?= $totalAssentos ?></strong>
            </article>

            <article class="cartao livres">
                <h2>Livres</h2>
                <strong><?= $totalLivres ?></strong>
            </article>

            <article class="cartao ocupados">
                <h2>Ocupados</h2>
                <strong><?= $totalOcupados ?></strong>
            </article>

            <article class="cartao reservados">
                <h2>Reservados</h2>
                <strong><?= $totalReservados ?></strong>
            </article>

            <article class="cartao taxa">
                <h2>Taxa de ocupação</h2>
                <strong><?= number_format($taxaOcupacao, 1, ",", ".") ?>%</strong>
            </article>
        </section>

        <section class="destaque-busca">
            <p>
                <strong>Primeiro lugar livre recomendado:</strong>
                <span class="badge-vaga"><?= $primeiroAssentoLivre ?? "Auditório Lotado" ?></span>
            </p>
        </section>

        <section class="auditorio" aria-label="Disposição dos assentos">
            <div class="palco">PALCO / APRESENTAÇÃO</div>

            <div class="legenda">
                <span class="item-legenda"><span class="indicador livre"></span> Livre</span>
                <span class="item-legenda"><span class="indicador ocupado"></span> Ocupado</span>
                <span class="item-legenda"><span class="indicador reservado"></span> Reservado</span>
            </div>

            <div class="grade-fileiras">
                <?php foreach ($mapaAuditorio as $letraFileira => $assentos) { ?>
                    <div class="linha-fileira">
                        <span class="identificador-fileira">Fileira <?= $letraFileira ?></span>

                        <div class="assentos">
                            <?php foreach ($assentos as $indice => $estado) { ?>
                                <?php $codigoAssento = "$letraFileira-" . ($indice + 1); ?>
                                <div class="assento <?= htmlspecialchars($estado) ?>" title="<?= $codigoAssento ?> (<?= ucfirst($estado) ?>)">
                                    <?= $codigoAssento ?>
                                </div>
                            <?php } ?>
                        </div>
                    </div>
                <?php } ?>
            </div>
        </section>
    </main>
</body>
</html>

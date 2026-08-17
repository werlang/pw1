<?php

/**
 * Dados das equipes da Gincana Integrada do IFSul.
 * Chave: nome da equipe.
 * Valor: array com lista de pontuações das etapas e penalidade em pontos.
 */
$equipes = [
    "Equipe Verde" => [
        "etapas" => [95, 110, 80],
        "penalidade" => 15
    ],
    "Equipe Azul" => [
        "etapas" => [100, 105, 95],
        "penalidade" => 0
    ],
    "Equipe Amarela" => [
        "etapas" => [75, 80, 85],
        "penalidade" => 0
    ],
    "Equipe Vermelha" => [
        "etapas" => [100, 95, 90],
        "penalidade" => 15
    ]
];

// Pontuação mínima para receber classificação/premiação
$pontuacaoMinimaFinal = 250;

// 1. Calcula a pontuação líquida de cada equipe
$pontuacoesFinais = [];
$pontuacoesBrutas = [];

foreach ($equipes as $nomeEquipe => $dados) {
    $bruto = array_sum($dados["etapas"]);
    $liquido = $bruto - $dados["penalidade"];

    $pontuacoesBrutas[$nomeEquipe] = $bruto;
    $pontuacoesFinais[$nomeEquipe] = $liquido;
}

// 2. Ordena as pontuações em ordem decrescente preservando os nomes das equipes (chaves)
arsort($pontuacoesFinais);

// Identifica a pontuação do líder para cálculo das diferenças
$pontuacaoLider = reset($pontuacoesFinais);
$nomeLider = key($pontuacoesFinais);

// Contadores para o resumo
$totalClassificadas = 0;
$somaTotalPontos = 0;

foreach ($pontuacoesFinais as $pontos) {
    $somaTotalPontos += $pontos;
    if ($pontos >= $pontuacaoMinimaFinal) {
        $totalClassificadas++;
    }
}

$mediaGeral = count($pontuacoesFinais) > 0 ? $somaTotalPontos / count($pontuacoesFinais) : 0;
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Apuração da Gincana - IFSul</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <main>
        <header>
            <h1>Apuração da Gincana Integrada</h1>
            <p>Classificação geral consolidada com tratamento de empates e penalidades.</p>
        </header>

        <section class="painel-resumo" aria-label="Resumo da apuração">
            <article class="cartao lider">
                <h2>Equipe Líder</h2>
                <strong><?= htmlspecialchars($nomeLider) ?></strong>
                <span><?= $pontuacaoLider ?> pontos</span>
            </article>

            <article class="cartao">
                <h2>Média de Pontos</h2>
                <strong><?= number_format($mediaGeral, 1, ",", ".") ?></strong>
                <span>por equipe</span>
            </article>

            <article class="cartao destaque">
                <h2>Classificadas para a Final</h2>
                <strong><?= $totalClassificadas ?> / <?= count($pontuacoesFinais) ?></strong>
                <span>(mínimo <?= $pontuacaoMinimaFinal ?> pts)</span>
            </article>
        </section>

        <section class="tabela-container">
            <table>
                <thead>
                    <tr>
                        <th>Posição</th>
                        <th>Equipe</th>
                        <th>Pontos Brutos</th>
                        <th>Penalidade</th>
                        <th>Pontuação Final</th>
                        <th>Dif. Líder</th>
                        <th>Situação</th>
                    </tr>
                </thead>
                <tbody>
                    <?php
                    $posicaoContador = 1;
                    $posicaoExibida = 1;
                    $pontosAnterior = null;

                    foreach ($pontuacoesFinais as $nomeEquipe => $pontuacaoFinal) {
                        // Se a pontuação for diferente da anterior, atualiza a posição exibida para o número da contagem atual
                        if ($pontosAnterior !== null && $pontuacaoFinal !== $pontosAnterior) {
                            $posicaoExibida = $posicaoContador;
                        }

                        $pontosBrutos = $pontuacoesBrutas[$nomeEquipe];
                        $penalidade = $equipes[$nomeEquipe]["penalidade"];
                        $diferenca = $pontuacaoFinal - $pontuacaoLider;
                        $atingiuMinimo = $pontuacaoFinal >= $pontuacaoMinimaFinal;
                        $textoDiferenca = $diferenca === 0 ? "—" : ($diferenca > 0 ? "+$diferenca" : "$diferenca");
                    ?>
                        <tr class="<?= $atingiuMinimo ? 'premiada' : '' ?> <?= $posicaoExibida === 1 ? 'primeiro-lugar' : '' ?>">
                            <td class="col-posicao">
                                <span class="badge-posicao"><?= $posicaoExibida ?>º</span>
                            </td>
                            <td class="col-equipe">
                                <strong><?= htmlspecialchars($nomeEquipe) ?></strong>
                                <?php if ($pontosAnterior !== null && $pontuacaoFinal === $pontosAnterior) { ?>
                                    <span class="tag-empate">Empate</span>
                                <?php } ?>
                            </td>
                            <td><?= $pontosBrutos ?> pts</td>
                            <td class="col-penalidade"><?= $penalidade > 0 ? "-$penalidade pts" : "0" ?></td>
                            <td class="col-final"><strong><?= $pontuacaoFinal ?> pts</strong></td>
                            <td class="col-diferenca"><?= $textoDiferenca ?></td>
                            <td>
                                <?php if ($atingiuMinimo) { ?>
                                    <span class="status classificada">Classificada para a final</span>
                                <?php } else { ?>
                                    <span class="status nao-classificada">Não classificada</span>
                                <?php } ?>
                            </td>
                        </tr>
                    <?php
                        $pontosAnterior = $pontuacaoFinal;
                        $posicaoContador++;
                    }
                    ?>
                </tbody>
            </table>
        </section>
    </main>
</body>
</html>

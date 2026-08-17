<?php

/**
 * Calcula o consumo total indicado pelo hidrômetro.
 *
 * @param float $leituraAnterior Leitura registrada no início do período.
 * @param float $leituraAtual Leitura registrada no fim do período.
 * @return float Consumo total no período.
 */
function calcularConsumoTotal($leituraAnterior, $leituraAtual)
{
    return $leituraAtual - $leituraAnterior;
}

/**
 * Calcula o consumo médio por dia sem dividir por um período inválido.
 *
 * @param float $consumoTotal Consumo total do período.
 * @param int $dias Quantidade de dias do período.
 * @return float Consumo médio diário ou zero quando não há dias válidos.
 */
function calcularMediaDiaria($consumoTotal, $dias)
{
    if ($dias < 1) {
        return 0;
    }

    return $consumoTotal / $dias;
}

/**
 * Calcula o consumo médio diário de cada morador.
 *
 * @param float $mediaDiaria Consumo médio de toda a residência.
 * @param int $moradores Quantidade de moradores.
 * @return float Consumo médio por morador ou zero quando não há moradores válidos.
 */
function calcularMediaPorMorador($mediaDiaria, $moradores)
{
    if ($moradores < 1) {
        return 0;
    }

    return $mediaDiaria / $moradores;
}

/**
 * Classifica o consumo médio de acordo com os limites do exercício.
 *
 * @param float $consumoPorMorador Consumo diário médio por morador.
 * @return string Faixa de consumo encontrada.
 */
function classificarConsumo($consumoPorMorador)
{
    if ($consumoPorMorador <= 120) {
        return "Econômico";
    }

    if ($consumoPorMorador <= 200) {
        return "Adequado";
    }

    return "Alto";
}

/**
 * Escolhe uma recomendação para a faixa encontrada.
 *
 * @param string $classificacao Faixa de consumo.
 * @return string Recomendação para o painel.
 */
function obterRecomendacao($classificacao)
{
    if ($classificacao === "Econômico") {
        return "O consumo está controlado. Mantenha os hábitos de economia.";
    }

    if ($classificacao === "Adequado") {
        return "O consumo está dentro do esperado. Observe possíveis desperdícios.";
    }

    return "O consumo está alto. Procure vazamentos e reduza o uso de água.";
}

$quantidadeMoradores = 4;
$leituraAnterior = 12000;
$leituraAtual = 15000;
$diasDoPeriodo = 30;

$consumoTotal = calcularConsumoTotal($leituraAnterior, $leituraAtual);
$mediaDiaria = calcularMediaDiaria($consumoTotal, $diasDoPeriodo);
$mediaPorMorador = calcularMediaPorMorador($mediaDiaria, $quantidadeMoradores);
$classificacao = classificarConsumo($mediaPorMorador);
$recomendacao = obterRecomendacao($classificacao);

$classeClassificacao = "economico";
if ($classificacao === "Adequado") {
    $classeClassificacao = "adequado";
} elseif ($classificacao === "Alto") {
    $classeClassificacao = "alto";
}
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Painel de consumo de água</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <main>
        <h1>Painel de consumo de água</h1>
        <p>
            Período de <?= $diasDoPeriodo ?> dias e
            <?= $quantidadeMoradores ?> moradores.
        </p>

        <section class="cartoes" aria-label="Indicadores de consumo">
            <article class="cartao">
                <h2>Consumo total</h2>
                <strong><?= number_format($consumoTotal, 2, ",", ".") ?> L</strong>
            </article>

            <article class="cartao">
                <h2>Média diária</h2>
                <strong><?= number_format($mediaDiaria, 2, ",", ".") ?> L</strong>
            </article>

            <article class="cartao">
                <h2>Por morador</h2>
                <strong><?= number_format($mediaPorMorador, 2, ",", ".") ?> L</strong>
            </article>

            <article class="cartao classificacao <?= $classeClassificacao ?>">
                <h2>Classificação</h2>
                <strong><?= $classificacao ?></strong>
            </article>
        </section>

        <p class="recomendacao"><strong>Recomendação:</strong> <?= $recomendacao ?></p>
    </main>
</body>
</html>

<?php

/**
 * Calcula o valor total de uma compra.
 *
 * @param float $precoUnitario Preço de uma unidade do produto.
 * @param int $quantidade Quantidade de unidades compradas.
 * @return float Valor total da compra.
 */
function calcularTotal($precoUnitario, $quantidade)
{
    return $precoUnitario * $quantidade;
}

$produto = "Sanduíche";
$precoUnitario = 7.50;
$quantidade = 3;
$total = calcularTotal($precoUnitario, $quantidade);
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Conta do lanche</title>
</head>
<body>
    <main>
        <h1>Conta do lanche</h1>

        <p><strong>Produto:</strong> <?= $produto ?></p>
        <p><strong>Preço unitário:</strong> R$ <?= $precoUnitario ?></p>
        <p><strong>Quantidade:</strong> <?= $quantidade ?></p>
        <p><strong>Total:</strong> R$ <?= $total ?></p>
    </main>
</body>
</html>

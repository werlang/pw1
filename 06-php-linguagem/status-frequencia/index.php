<?php

$frequenciaAtual = 82;
$frequenciaMinima = 75;
$atividadesEntregues = false;
$justificativaAceita = true;

// A frequência abaixo do mínimo deve ser verificada antes das outras regras.
if ($frequenciaAtual < $frequenciaMinima) {
    $situacao = "Recuperação por frequência";
} elseif ($atividadesEntregues || $justificativaAceita) {
    $situacao = "Estudante apto";
} else {
    $situacao = "Atividades pendentes";
}
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Status de frequência</title>
</head>
<body>
    <main>
        <h1>Status de frequência</h1>

        <p><strong>Frequência atual:</strong> <?= $frequenciaAtual ?>%</p>
        <p><strong>Frequência mínima:</strong> <?= $frequenciaMinima ?>%</p>
        <p><strong>Situação:</strong> <?= $situacao ?></p>
    </main>
</body>
</html>

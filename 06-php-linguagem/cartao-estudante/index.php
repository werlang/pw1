<?php

// Os dados ficam juntos no PHP para podermos alterá-los sem mexer no HTML.
$nomeEstudante = "Ana Souza";
$curso = "Informática";
$turno = "Manhã";
$sala = "Laboratório 2";
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cartão de estudante</title>
</head>
<body>
    <main>
        <h1>Cartão de estudante</h1>

        <p><strong>Nome:</strong> <?= $nomeEstudante ?></p>
        <p><strong>Curso:</strong> <?= $curso ?></p>
        <p><strong>Turno:</strong> <?= $turno ?></p>
        <p><strong>Sala:</strong> <?= $sala ?></p>
    </main>
</body>
</html>

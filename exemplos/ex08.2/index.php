<?php
    foreach ($_GET as $campo => $valor){
        echo "<div>Recebi no campo $campo o valor $valor</div>";
        if (is_array($valor)) {
            $todos = implode(", ", $valor);
            echo "<div>Este array possui os valores:$todos</div>";
        }
    }
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
<form action="index.php" method="GET">
    <input name="nome" placeholder="Nome">
    <input name="idade" placeholder="Idade">
    <label><input type="radio" name="sexo" value="m">Masculino</label>
    <label><input type="radio" name="sexo" value="f">Feminino</label>
    <div>
        <span>Últimos três salários</span>
        <input name="salarios[]">
        <input name="salarios[]">
        <input name="salarios[]">
    </div>
    <button>Enviar</button>
</form>
</body>
</html>
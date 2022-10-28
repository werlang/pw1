<?php
    $nome = "Usuário";
    if (isset($_GET["nome"]) && $_GET["nome"] != "") {
        $nome = $_GET["nome"];
    }
    $letra = "o";
    if (isset($_GET["sexo"]) && $_GET["sexo"] == "f") {
        $letra = "a";
    }
    $tratamento = '';
    if (isset($_GET["idade"]) && $_GET["idade"] >= 40) {
        $tratamento = "Sra.";
        if ($letra == "o") {
            $tratamento = "Sr.";
        }
    }
    echo "<h1>Bem-vind$letra $tratamento $nome.</h1>";

    if (isset($_GET["salarios"])) {
        $media = 0;
        foreach($_GET["salarios"] as $salario) {
            $media += $salario;
        }
        $n_salarios = count($_GET["salarios"]);
        $media /= $n_salarios;
    }
    if ($n_salarios > 0) {
        echo "<p>Sua média salarial dos últimos $n_salarios meses foi R$ $media</p>";
    }  
?>
<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="style.css">
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
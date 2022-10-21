<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="index.css">
</head>
<body>
    <?php
        $cadastro = array(
            array(
                "nome" => "João",
                "idade" => 25,
            ),
            array(
                "nome" => "Pedro",
                "idade" => 29,
            ),
            array(
                "nome" => "Maria",
                "idade" => 32,
            ),
            array(
                "nome" => "Guilherme",
                "idade" => 65,
            ),
            array(
                "nome" => "Rafaela",
                "idade" => 14,
            )
        );

        foreach ($cadastro as $item) {
            $row = "<div class='row'>";
            foreach ($item as $campo => $valor) {
                $row .= "<div class='col'>
                    <span>$campo</span>
                    <span class='value'>$valor</span>
                </div>";
            };
            $row .= "</div>";
            echo $row;
        }   
    ?>  
</body>
</html>
<?php 
    $tabela = array(
        array(
            "nome" => "João Silva",
            "idade" => 25,
            "email" => "joao.silva@gmail.com",
            "e.civil" => "Solteiro",
            "salario" => 1950
        ),
        array(
            "nome" => "Rafael Cardoso",
            "idade" => 32,
            "email" => "rafacardoso@gmail.com",
            "e.civil" => "Casado",
            "salario" => 5541
        ),
        array(
            "nome" => "Gabriela Schidt",
            "idade" => 21,
            "email" => "gabischidt@gmail.com",
            "e.civil" => "Solteira",
            "salario" => 3214
        ),
        array(
            "nome" => "Roberta Oliveira",
            "idade" => 38,
            "email" => "roberta.oliveira@gmail.com",
            "e.civil" => "Divorciada",
            "salario" => 4258
        ),
        array(
            "nome" => "Pedro Santos",
            "idade" => 17,
            "email" => "pebolado@gmail.com",
            "e.civil" => "Solteiro",
            "salario" => 2100
        )
    );
?>

<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="style.css">
</head>
<body>

    <table>
        <thead>
            <tr>
                <th>Nome</th>
                <th>Idade</th>
                <th>E-mail</th>
                <th>E.Civil</th>
                <th>Salário</th>
            </tr>
        </thead>
        <tbody>
        <?php
            foreach ($tabela as $item) {
                echo "<tr>";
                foreach ($item as $valor) {
                    echo "<td>$valor</td>";
                }
                echo "</tr>";
            }

        ?>
        </tbody>
    </table>
</body>
</html>


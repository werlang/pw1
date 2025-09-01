<?php
    include "produtos.php";
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <form action="index.php" method="GET">
        <label>Produto
            <input name="produto">
        </label>
        <button>PESQUISAR PRODUTO</button>
    </form>

    <div id="list">
        <?php
            if (isset($_GET["produto"])) {
                $id = $_GET["produto"];
                foreach($produtos as $produto) {
                    if ($produto["id"] == $id) {
                        $name = $produto["name"];
                        $price = $produto["price"];
                        echo "<div id='produto'>
                            <div>Nome: <span>$name</span></div>
                            <div>Preço: <span>$price</span></div>
                        </div";
                    }
                }
            }
        ?>
    </div>
</body>
</html>
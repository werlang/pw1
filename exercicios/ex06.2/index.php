<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <table><tbody>
        <?php
            for ($i=0 ; $i<10 ; $i++){
                echo "<tr>";
                for ($j=0 ; $j<10 ; $j++){
                    if ($i % 2 == 1) {
                        $num = rand(0,1000) * 2;
                        echo "<td>$num</td>";
                    }
                    else {
                        do {
                            $num = rand(0,1000);
                        } while ($num % 3 == 0 || $num % 5 == 0);
                        echo "<td>$num</td>";
                    }
                }
                echo "</tr>";
            }
        ?>
    </tbody></table>
</body>
</html>


<?php
    $cadastro = array();
    $cadastro[0] = array("email" => "joao.silva@gmail.com", "senha" => '$2y$10$gbZO2ojbzdwOHFMACJ3qle31bONmTUqlnYo4I7OLq1BI9HA4EVbH2', "nome" => "João Silva", "foto" => "https://foo.bar/foto/joao", "cidade" => "Charqueadas", "fone" => "51987653465");
    $cadastro[1] = array("email" => "guiferraz@gmail.com", "senha" => '$2y$10$BqziwDvq9cROIHLtw31IZ./rF1AuuBnNba93y.jp9t3djTOo8PvDe', "nome" => "Guilherme Ferraz", "foto" => "https://foo.bar/foto/gui", "cidade" => "Pelotas", "fone" => "5396234567");
    $cadastro[2] = array("email" => "rafaweinzel@gmail.com", "senha" => '$2y$10$xWWztGXhYqBmC03O7GKFXOat5BWxngSJ2t0ZoJuviNgnXjWGZIxVG', "nome" => "Rafaella Weinzel", "foto" => "https://foo.bar/foto/rafa", "cidade" => "Charqueadas", "fone" => "5197345612");
    $cadastro[3] = array("email" => "claricebrum@gmail.com", "senha" => '$2y$10$4YDLnneo5BBYiyvOrrfJkOdcSiSPYG5A4/rWJNnWw0YySJn3y1pUG', "nome" => "Clarisse Brum", "foto" => "https://foo.bar/foto/clarice", "cidade" => "São Jerônimo", "fone" => "5197689975");
    $cadastro[4] = array("email" => "michel1989@gmail.com", "senha" => '$2y$10$feomll8LvHnRIt7oQMNGAuWCJ6MYyv60NMiyJn8HjmTj3qvlZVj3.', "nome" => "Michel Zimmermann", "foto" => "https://foo.bar/foto/michel", "cidade" => "Porto Alegre", "fone" => "5196345213");
    
    $output = [];

    function validate($email, $password) {
        
        if (strlen($password) < 8) {
            return [
                "error" => true,
                "message" => "A senha deve possuir pelo menos 8 caracteres"
            ];
        }
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            return [
                "error" => true,
                "message" => "Email inválido"
            ];
        }

        return ["error" => false];
    }

    if (isset($_POST["email"]) && isset($_POST["password"])) {
        $email = $_POST["email"];
        $password = $_POST["password"];

        $output["error"] = true;
        $output["message"] = "Usuário não encontrado";

        $validateResponse = validate($email, $password);
        if ($validateResponse["error"] == true) {
            $output["message"] = $validateResponse["message"];
        }
        else {
            foreach($cadastro as $user) {
                if (
                    $email == $user["email"] &&
                    password_verify($password, $user["senha"])
                ) {
                    // deu certo
                    header("Location: profile.php");
                }
            }

        }

    }
?>

<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Login</title>
    <link rel="stylesheet" href="login.css">
</head>
<body>
    <form id="box" action="login.php", method="POST">
        <h1>Login</h1>
        
        <span>E-mail</span>
        <input id="email" name="email" class="text" type="email">

        <span>Senha</span>
        <input id="password" name="password" class="text" type="password">

        <?php
            if (isset($output["error"])) {
                $message = $output["message"];
                echo "<span class='error'>$message</span>";
            }
        ?>

        <button class="button">Entrar</button>
    </form>
</body>
</html>

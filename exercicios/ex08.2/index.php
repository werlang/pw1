<?php
    $cadastro = array();
    $cadastro[0] = array("email" => "joao.silva@gmail.com", "senha" => '$2y$10$gbZO2ojbzdwOHFMACJ3qle31bONmTUqlnYo4I7OLq1BI9HA4EVbH2', "nome" => "João Silva", "foto" => "https://foo.bar/foto/joao", "cidade" => "Charqueadas", "fone" => "51987653465");
    $cadastro[1] = array("email" => "guiferraz@gmail.com", "senha" => '$2y$10$BqziwDvq9cROIHLtw31IZ./rF1AuuBnNba93y.jp9t3djTOo8PvDe', "nome" => "Guilherme Ferraz", "foto" => "https://foo.bar/foto/gui", "cidade" => "Pelotas", "fone" => "5396234567");
    $cadastro[2] = array("email" => "rafaweinzel@gmail.com", "senha" => '$2y$10$xWWztGXhYqBmC03O7GKFXOat5BWxngSJ2t0ZoJuviNgnXjWGZIxVG', "nome" => "Rafaella Weinzel", "foto" => "https://foo.bar/foto/rafa", "cidade" => "Charqueadas", "fone" => "5197345612");
    $cadastro[3] = array("email" => "claricebrum@gmail.com", "senha" => '$2y$10$4YDLnneo5BBYiyvOrrfJkOdcSiSPYG5A4/rWJNnWw0YySJn3y1pUG', "nome" => "Clarisse Brum", "foto" => "https://foo.bar/foto/clarice", "cidade" => "São Jerônimo", "fone" => "5197689975");
    $cadastro[4] = array("email" => "michel1989@gmail.com", "senha" => '$2y$10$feomll8LvHnRIt7oQMNGAuWCJ6MYyv60NMiyJn8HjmTj3qvlZVj3.', "nome" => "Michel Zimmermann", "foto" => "https://foo.bar/foto/michel", "cidade" => "Porto Alegre", "fone" => "5196345213");
    
    $output = array();

    if (isset($_POST["email"]) && isset($_POST["password"])){

        $output = validate_person();
        if ($output["status"] == "sucesso"){
            $email = $_POST["email"];
            $password = $_POST["password"];
    
            // para o caso de não nenhum item corresponder
            $output["status"] = "erro";
            $output["message"] = "Usuário com as credenciais informadas não foi encontrado.";
    
            // busca email
            foreach($cadastro as $item){
                $hash = $item["senha"];
                // verifica se senha bate com hash
                // https://www.php.net/manual/pt_BR/function.password-verify.php
                if ($item["email"] == $email && password_verify($password, $hash)){
                    $output["status"] = "sucesso";
                    unset($output["message"]);
                    break;
                }
            }
        }
    }

    function validate_person(){
        $response = array();
        $response["status"] = "sucesso";

        if (!$_POST["email"]){
            $response["status"] = "erro";
            $response["message"] = "Campo email deve estar presente.";
        }
        // valida email
        // https://www.php.net/manual/pt_BR/filter.examples.validation.php
        elseif (!filter_var($_POST["email"], FILTER_VALIDATE_EMAIL)){
            $response["status"] = "erro";
            $response["message"] = "Email inválido.";
        }
        elseif (!$_POST["password"]){
            $response["status"] = "erro";
            $response["message"] = "Campo senha deve estar presente.";
        }
        elseif (strlen($_POST["password"]) < 8){
            $response["status"] = "erro";
            $response["message"] = "Senha deve possuir no mínimo 8 caracteres.";
        }

        return $response;
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
    <form id="box" action="index.php", method="POST">
        <h1>Login</h1>
        
        <span>E-mail</span>
        <input id="email" name="email" class="text" type="text">

        <span>Senha</span>
        <input id="password" name="password" class="text" type="password">

        <?php 
            if ($output && isset($output["status"])){
                if ($output["status"] == "erro"){
                    echo '<div class="error">'. $output["message"] .'</div>';
                }
                elseif ($output["status"] == "sucesso"){
                    header("Location: profile.php");
                }
            }
        ?>

        <button class="button">Entrar</button>
    </form>
</body>
</html>

<?php
    $cadastro = array();
    if (file_exists("cadastro.json")) {
        $cadastro = json_decode(file_get_contents("cadastro.json"), true);
    }

    $output = array();

    if (isset($_POST["email"]) && isset($_POST["password"])){

        $valida = validate_person();
        if ($valida["status"] == "erro"){
            $output = $valida;
        }
        else {
            $email = $_POST["email"];
            $password = $_POST["password"];
    
            // para o caso de não nenhum item corresponder
            $output["status"] = "erro";
            $output["error"] = "Usuário com as credenciais informadas não foi encontrado.";
    
            // busca email
            foreach($cadastro as $item){
                $hash = $item["senha"];
                // verifica se senha bate com hash
                // https://www.php.net/manual/pt_BR/function.password-verify.php
                if ($item["email"] == $email && password_verify($password, $hash)){
                    $output["status"] = "sucesso";
                    // $output["message"] = "Cadastro alterado com sucesso.";
                    unset($output["error"]);

                    session_start();
                    $_SESSION["nome"] = $item["nome"];
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
            $response["error"] = "Campo email deve estar presente.";
        }
        // valida email
        // https://www.php.net/manual/pt_BR/filter.examples.validation.php
        elseif (!filter_var($_POST["email"], FILTER_VALIDATE_EMAIL)){
            $response["status"] = "erro";
            $response["error"] = "Email inválido.";
        }
        elseif (!$_POST["password"]){
            $response["status"] = "erro";
            $response["error"] = "Campo senha deve estar presente.";
        }
        elseif (strlen($_POST["password"]) < 8){
            $response["status"] = "erro";
            $response["error"] = "Senha deve possuir no mínimo 8 caracteres.";
        }

        return $response;
    }

    echo json_encode($output);
?>

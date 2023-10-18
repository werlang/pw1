<?php
    require "connection.php";

    $output = array();

    if (isset($_POST["email"]) && isset($_POST["password"])){

        $valida = validate_person();
        if ($valida["status"] == "erro"){
            $output = $valida;
        }
        else {
            $email = $_POST["email"];
            $password = $_POST["password"];
        
            // busca email
            $sql = "SELECT * FROM users WHERE email = ?";
            $stmt = $conn->prepare($sql);
            $stmt->execute([ $email ]);
            $user = $stmt->fetch();
    
            // if ($user && $user["password"] == $password) {
            if ($user && password_verify($user["password"], $password)) {
                $output["status"] = "sucesso";

                session_start();
                $_SESSION["user"] = [
                    "id" => $user["id"],
                    "email" => $user["email"],
                    "name" => $user["name"]
                ];
            }
            else {
                $output["status"] = "erro";
                $output["error"] = "Usuário com as credenciais informadas não foi encontrado.";    
            }
        }
    }
    else {
        $output["status"] = "erro";
        $output["message"] = "Precisa informar email e senha";
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

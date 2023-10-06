<?php
    require "connection.php";

    header("Content-Type: application/json");

    $output = [];

    // valida campos
    $output = validate();
    if ($output["status"] == "erro"){
        echo json_encode($output);
        exit;
    }
    
    $name = $_POST["name"];
    $email = $_POST["email"];
    // criptografa senha
    // https://www.php.net/manual/pt_BR/function.password-hash.php
    $password = password_hash($_POST["password"], PASSWORD_DEFAULT);

    // insere usuário
    $sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->execute([$name, $email, $password]);

    $output["status"] = "sucesso";
    $output["message"] = "Usuário cadastrado com sucesso.";
    echo json_encode($output);

    function validate(){
        $response = [];
        $response["status"] = "erro";

        if (!isset($_POST["name"]) || !isset($_POST["email"]) || !isset($_POST["password"])){
            $response["message"] = "Campos nome, email e senha devem estar presentes.";
            $response["field"] = "name";
        }
        elseif (!$_POST["name"]){
            $response["message"] = "Campo nome deve estar presente.";
            $response["field"] = "name";
        }
        elseif (!$_POST["email"]){
            $response["message"] = "Campo email deve estar presente.";
            $response["field"] = "email";
        }
        // valida email
        // https://www.php.net/manual/pt_BR/filter.examples.validation.php
        elseif (!filter_var($_POST["email"], FILTER_VALIDATE_EMAIL)){
            $response["message"] = "Email inválido.";
            $response["field"] = "email";
        }
        elseif (!$_POST["password"]){
            $response["message"] = "Campo senha deve estar presente.";
            $response["field"] = "password";
        }
        elseif (strlen($_POST["password"]) < 8){
            $response["message"] = "Senha deve possuir no mínimo 8 caracteres.";
            $response["field"] = "password";
        }
        else {
            $response["status"] = "sucesso";
        }

        return $response;
    }
?>

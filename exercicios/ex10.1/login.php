<?php
    
    require "connection.php";

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

    function sendResponse($message, $error = true) {
        $output["error"] = $error;
        $output["message"] = $message;
        echo json_encode($output);
        exit;
    }

    if (!isset($_POST["email"]) || !isset($_POST["password"])) {
        sendResponse("Campos obrigatórios não enviados");
    }

    $email = $_POST["email"];
    $password = $_POST["password"];

    $validateResponse = validate($email, $password);
    if ($validateResponse["error"] == true) {
        sendResponse($validateResponse["message"]);
    }

    $sql = "SELECT * FROM users WHERE email = ?";
    $stmt = $conn->prepare($sql);
    $stmt->execute([ $email ]);

    $user = $stmt->fetch();
    if (!$user) {
        sendResponse("Usuário não encontrado");
    }

    if (!password_verify($password, $user["password"])) {
        sendResponse("Senha não confere");
    }

    sendResponse("Logado com sucesso", false);
?>

<?php
    session_start();

    $output = array();

    // logout
    if (isset($_POST["action"]) && $_POST["action"] == "logout") {
        $output["status"] = "success";
        unset($_SESSION["nome"]);
    }
    // get, sem sessão
    else if (!isset($_SESSION["nome"])) {
        $output["status"] = "error";
        $output["error"] = "Session not set";
    }
    // get, com sessão
    else {
        $output["status"] = "success";
        $output["nome"] = $_SESSION["nome"];
    }

    echo json_encode($output);
?>
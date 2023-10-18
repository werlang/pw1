<?php
    session_start();

    $output = array();

    // logout
    if (isset($_POST["action"]) && $_POST["action"] == "logout") {
        $output["status"] = "success";
        unset($_SESSION["user"]);
    }
    // get, sem sessão
    else if (!isset($_SESSION["user"])) {
        $output["status"] = "error";
        $output["error"] = "Session not set";
    }
    // get, com sessão
    else {
        $output["status"] = "success";
        $output["user"] = $_SESSION["user"];
    }

    echo json_encode($output);
?>
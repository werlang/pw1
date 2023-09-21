<?php
    $output = array();
    $db_name = "database.json";

    if (isset($_POST) && !empty($_POST)) {
        $item = array();
        $item["name"] = $_POST["name"];
        $item["birth"] = $_POST["birth"];
        $item["address"] = $_POST["address"];
        append_db($item);
        $output["status"] = "success";
    }
    else if (isset($_GET)) {
        $output["records"] = get_db();
        $output["status"] = "success";
    }

    echo json_encode($output);

    function get_db() {
        $db = array();
        if (file_exists($db_name)) {
            $db = json_decode(file_get_contents("database.json"), true);
        }

        return $db;
    }

    function append_db($data) {
        $db = get_db();
        array_push($db, $data);

        file_put_contents($db_name, json_encode($db));
        return json_encode($db);
    }
?>

<?php
$output = [];
$output["status"] = "OK";
foreach($_POST as $key => $value) {
    $output[$key] = $value;
}
echo json_encode($output);

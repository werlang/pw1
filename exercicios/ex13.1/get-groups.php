<?php

require "groups-function.php";

header('Content-Type: application/json');
echo json_encode([
    "status" => "success",
    "groups" => getGroups()
]);


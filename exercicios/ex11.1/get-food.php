<?php

require "groups-function.php";
$groups = getGroups();

$groupid = $_GET['group'];
$groupName = $groups[$groupid];

$table = [];
$file = fopen("generic-food.csv", "r");
while (!feof($file)) {
    $line = fgetcsv($file);
    if ($line && $line[2] == $groupName) {
        $table[] = $line;
    }
}
fclose($file);


echo json_encode($table);
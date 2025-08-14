<?php

function getGroups() {
    $groups = [];
    
    $file = fopen("generic-food.csv", "r");
    while (!feof($file)) {
        $line = fgetcsv($file);
        if ($line && !in_array($line[2], $groups)) {
            $groups[] = $line[2];
        }
    }
    fclose($file);
    $groups = array_slice($groups, 1);
    return $groups;
}
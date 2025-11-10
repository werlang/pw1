<?php

include "../session.php";
include "../connection.php";

echo json_encode([
    "message" => "Usuário encontrado",
    "user" => $loggedUser,
]);
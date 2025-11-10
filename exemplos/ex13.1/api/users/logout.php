<?php

include "../session.php";

unset($_SESSION["user"]);

echo json_encode([
    "message" => "O usuário foi deslogado",
]);
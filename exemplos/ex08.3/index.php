<?php
$senha = "teste";
$hash = password_hash($senha, PASSWORD_DEFAULT);

$senha2 = "abc";

if (password_verify($senha2, $hash)) {
    echo "Válido";
}
else {
    echo "Inválido";
}
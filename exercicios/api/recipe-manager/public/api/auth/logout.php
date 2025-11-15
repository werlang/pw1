<?php
session_start();
session_destroy();
session_write_close();

header('Content-Type: application/json');
echo json_encode([
    'message' => 'Logout realizado com sucesso'
]);

<?php

require "../core/connection.php";

// Questão 4
// Busque as informações do usuário logado no banco de dados, e verifique se ele é um professor. Um professor tem o campo "role" igual a 1.
//   SELECT * FROM users WHERE id = ?
// Atualize grade e feedback da submissão enviada no corpo da requisição.
//   UPDATE submissions SET grade = ?, feedback = ? WHERE id = ?

session_start();
$user = $_SESSION["user"];

$sql = "SELECT * FROM users WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->execute([ $user["id"] ]);
$user = $stmt->fetch();

if ($user["role"] != 1) {
    echo json_encode([
        "error" => true,
        "message" => "Usuário não é um professor"
    ]);
    exit;
}

$grade = $_POST["grade"];
$feedback = $_POST["feedback"];
$submissionId = $_POST["submission_id"];

$sql = "UPDATE submissions SET grade = ?, feedback = ? WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->execute([
    $grade,
    $feedback,
    $submissionId,
]);


// Exemplo de retorno:
echo json_encode([
    "message" => "Avaliação salva com sucesso",
    "evaluation" => [
        "grade" => $grade,
        "feedback" => $feedback, 
    ],
]);

<?php

require "../core/connection.php";

// Questão 3
// Receba as informações do usuário logado da sessão
// Salve o arquivo enviado pelo usuário na pasta /upload, com um nome único, e com a mesma extensão do arquivo original
// Use md5(microtime()) para gerar um nome único
// Insira no banco de dados a submissão da tarefa enviada no formulário
//   INSERT INTO submissions (task_id, student_id, file_name) VALUES (?, ?, ?)
//   student_id é o id do usuário logado
//   file_name é o nome do arquivo salvo na pasta upload (com a extensão)
//   task_id é o id da tarefa enviada no formulário

session_start();

$file = $_FILES["submission"];
$extension = strtolower(pathinfo($file["name"], PATHINFO_EXTENSION));
$fileName = md5(microtime()) .".". $extension;
$destination = "../upload/". $fileName;
move_uploaded_file($file["tmp_name"], $destination);

$taskId = $_POST["task_id"];
$stduentId = $_SESSION["user"]["id"];

$sql = "INSERT INTO submissions (task_id, student_id, file_name) VALUES (?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->execute([
    $taskId,
    $stduentId,
    $fileName
]);

echo json_encode([
    "message" => "Resposta submetida com sucesso",
]);

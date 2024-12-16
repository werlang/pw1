<?php

require "../core/connection.php";

// Questão 3
// Busque no banco de dados todas as tarefas que o usuário logado criou para a turma informada na URL.
//   SELECT id, title, description, deadline FROM tasks WHERE author = ? AND class_id = ?
// Para cada tarefa, busque no banco de dados todas as submissões dos alunos.
//   SELECT s.id, u.name, s.file_name, s.submission_date, s.grade, s.feedback FROM submissions s INNER JOIN users u ON u.id = s.student_id WHERE s.task_id = ?
// Guarde as submissões no array de tarefas usando a chave "submissions" e retorne um JSON com todas as tarefas.

session_start();
$authorId = $_SESSION["user"]["id"];

$classId = $_GET["class_id"];

$sql = "SELECT id, title, description, deadline FROM tasks WHERE author = ? AND class_id = ?";
$stmt = $conn->prepare($sql);
$stmt->execute([
    $authorId,
    $classId
]);

$tasks = $stmt->fetchAll();

foreach($tasks as $id => $task) {
    $sql = "SELECT s.id, u.name, s.file_name, s.submission_date, s.grade, s.feedback FROM submissions s INNER JOIN users u ON u.id = s.student_id WHERE s.task_id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->execute([
        $task["id"]
    ]);

    $submissions = $stmt->fetchAll();
    $tasks[$id]["submissions"] = $submissions;
}

echo json_encode([
    "tasks" => $tasks,
]);

// Exemplo de retorno:
// echo json_encode([
//     "tasks" => [
//         [
//             "id" => 1,
//             "title" => "Tarefa 1",
//             "description" => "Descrição da tarefa 1",
//             "deadline" => "2021-10-01",
//             "submissions" => [
//                 [
//                     "id" => 1,
//                     "name" => "Aluno 1",
//                     "file_name" => "aluno1.pdf",
//                     "submission_date" => "2021-09-30",
//                     "grade" => 8,
//                     "feedback" => "Bom trabalho",
//                 ],
//                 [
//                     "id" => 2,
//                     "name" => "Aluno 2",
//                     "file_name" => "aluno2.pdf",
//                     "submission_date" => "2021-09-30",
//                     "grade" => 7,
//                     "feedback" => "Poderia melhorar",
//                 ],
//             ],
//         ],
//         [
//             "id" => 2,
//             "title" => "Tarefa 2",
//             "description" => "Descrição da tarefa 2",
//             "deadline" => "2021-10-05",
//             "submissions" => [
//                 [
//                     "id" => 3,
//                     "name" => "Aluno 1",
//                     "file_name" => "aluno1.pdf",
//                     "submission_date" => "2021-10-04",
//                     "grade" => 9,
//                     "feedback" => "Ótimo trabalho",
//                 ],
//                 [
//                     "id" => 4,
//                     "name" => "Aluno 2",
//                     "file_name" => "aluno2.pdf",
//                     "submission_date" => "2021-10-04",
//                     "grade" => 6,
//                     "feedback" => "Poderia melhorar",
//                 ],
//             ],
//         ],
//     ]
// ]);

<?php

require "../core/connection.php";

// Questão 2
// Busque no banco de dados as informações de todas as tarefas que pertencem à turma do usuário logado
//   SELECT id, title, description, deadline FROM tasks WHERE class_id = (SELECT class_id FROM users WHERE id = ?)
// Para cada tarefa, busque no banco de dados a submissão do usuário logado
//   SELECT id, file_name FROM submissions WHERE task_id = ? AND student_id = ?
// Retorne um json com as tarefas e suas submissões

session_start();
$userLogged = $_SESSION["user"];
$id = $userLogged["id"];

$sql = "SELECT id, title, description, deadline FROM tasks WHERE class_id = (SELECT class_id FROM users WHERE id = ?)";
$stmt = $conn->prepare($sql);
$stmt->execute([$id]);

$tasks = $stmt->fetchAll();

foreach($tasks as $index => $task) {
    $sql = "SELECT id, file_name FROM submissions WHERE task_id = ? AND student_id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->execute([
        $task["id"],
        $id
    ]);

    $submission = $stmt->fetch();
    $tasks[$index]["submission"] = $submission;
}

echo json_encode([  
    "tasks" => $tasks
]);

// Exemplo de retorno:
// echo json_encode([
//     "tasks" => [
//         [
//             "id" => 1,
//             "title" => "Tarefa 1",
//             "description" => "Descrição da tarefa 1",
//             "deadline" => "2021-10-01",
//             "submission" => [
//                 "id" => 1,
//                 "file_name" => "4bac0e5f05787a481f482dc4936d2ede.pdf" // Nome do arquivo da submissão
//             ]
//         ],
//         [
//             "id" => 2,
//             "title" => "Tarefa 2",
//             "description" => "Descrição da tarefa 2",
//             "deadline" => "2021-10-02",
//             "submission" => [
//                 "id" => 2,
//                 "file_name" => "4bac0e5f05787a481f482dc4936d2ede.pdf" 
//             ]
//         ],
//         [
//             "id" => 3,
//             "title" => "Tarefa 3",
//             "description" => "Descrição da tarefa 3",
//             "deadline" => "2021-10-03",
//             "submission" => false // Não foi feita a submissão
//         ]
//     ]
// ]);
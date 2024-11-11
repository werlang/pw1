<?php

require "connection.php";

$sql = "SELECT jobs.*, COUNT(applications.user) AS applications FROM jobs LEFT JOIN applications ON jobs.id = applications.job GROUP BY jobs.id";
$stmt = $conn->prepare($sql);
$stmt->execute();
$jobs = $stmt->fetchAll();

echo json_encode([
    "status" => "success",
    "message" => "Lista de vagas",
    "jobs" => $jobs,
]);
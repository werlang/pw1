<?php

header("Content-Type: application/json");

require "doctors.php";
require "patients.php";
require "appointments.php";

if (isset($_GET["doctors"])) {
    $result = [];
    foreach($doctors as $doctor) {
        $result[] = [
            "id" => $doctor["id"],
            "name" => $doctor["name"],
        ];
    }
    echo json_encode($result);
    exit;
}

$name = $_POST["patient-name"];
$doctorId = $_POST["doctor-id"];
$notes = $_POST["appointment-notes"];
$date = $_POST["appointment-date"];
$time = $_POST["appointment-time"];
$timeConcat = "$date $time";

$patientFound = false;
foreach($patients as $p) {
    if ($p["name"] == $name) {
        $patientFound = true;
    }
}

if (!$patientFound) {
    echo json_encode([
        "error" => true,
        "message" => "Paciente não encontrado",
    ]);
    exit;
}


$appointmentChosenDoctor = [];
foreach($appointments as $a) {
    if ($a["doctor_id"] == $doctorId ) {
        $appointmentChosenDoctor[] = $a;
    }
}

foreach($appointmentChosenDoctor as $a) {
    if ($a["time"] == $timeConcat) {
        echo json_encode([
            "error" => true,
            "message" => "Médico não disponível na data e hora informados",
        ]);
        exit;
    }
}

$myDoctor;
foreach($doctors as $doctor) {
    if ($doctor["id"] == $doctorId) {
        $myDoctor = $doctor["name"];
    }
}

echo json_encode([
    "message" => "Consulta agendada com sucesso",
    "appointment" => [
        "patient" => $name,
        "doctor" => $myDoctor,
        "date" => $date,
        "time" => $time,
        "notes" => $notes
    ]
]);
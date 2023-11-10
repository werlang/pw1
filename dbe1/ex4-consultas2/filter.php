<?php

require "appointments.php";
require "patients.php";
require "doctors.php";

header("Content-Type: application/json");

$filteredAppointments = $appointments;

if (isset($_GET["datefrom"]) && isset($_GET["dateto"])) {
    $datefrom = $_GET["datefrom"];
    $dateto = $_GET["dateto"]; //yyyy-mm-dd
    
    $result = [];
    foreach($filteredAppointments as $appointment) {
        if (compareDates($appointment["time"], $datefrom) >= 0 && compareDates($appointment["time"], $dateto) <= 0) {
            $result[] = $appointment;
        }
    }

    $filteredAppointments = $result;
}

if (isset($_GET["doctor"])) {
    $id = $_GET["doctor"];
    
    $result = [];
    foreach($filteredAppointments as $appointment) {
        if ($appointment["doctor_id"] == $id) {
            $result[] = $appointment;
        }
    }

    $filteredAppointments = $result;
}

if (isset($_GET["patient"])) {
    $id = $_GET["patient"];

    $result = [];
    foreach($filteredAppointments as $appointment) {
        if ($appointment["patient_id"] == $id) {
            $result[] = $appointment;

        }
    }

    $filteredAppointments = $result;
}

$result = [];
foreach($filteredAppointments as $appointment) {
    $newAppointment = [
        "time" => $appointment["time"],
        "notes" => $appointment["notes"],
    ];

    if (isset($_GET["datefrom"]) && isset($_GET["dateto"])) {
        $newAppointment["doctor"] = getDoctorName($appointment["doctor_id"]);
        $newAppointment["patient"] = getPatientName($appointment["patient_id"]);
    }
    else if (isset($_GET["patient"])) {
        $newAppointment["doctor"] = getDoctorName($appointment["doctor_id"]);
    }
    if (isset($_GET["doctor"])) {
        $newAppointment["patient"] = getPatientName($appointment["patient_id"]);
    }

    $result[] = $newAppointment;
}

echo json_encode($result);


function getPatientName($id) {
    global $patients;

    foreach($patients as $patient) {
        if ($patient["id"] == $id) {
            return $patient["name"];
        }
    }
    return null;
}

function getDoctorName($id) {
    global $doctors;

    foreach($doctors as $doctor) {
        if ($doctor["id"] == $id) {
            return $doctor["name"];
        }
    }
    return null;
}

function compareDates($date1, $date2) {
    $date1 = strtotime($date1);
    $date2 = strtotime($date2);

    if (!$date1 || !$date2) {
        return null;
    }

    if ($date1 < $date2) {
        return -1;
    }
    if ($date1 > $date2) {
        return 1;
    }
    return 0;
}
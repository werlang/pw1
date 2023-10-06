<?php
// use require para receber o array dos pacientes do arquivo patients.php

// recebe do JS GET id

// devolve um json com os campos
// error: true ou false
// message: mensagem informativa
// caso recebeu um id do JS
//    patient: informações do paciente encontrado
// caso não recebeu um id do JS
//    patients: array com todos os pacientes
// caso não encontre o paciente
//    não devolve o campo patient
//    message: "Paciente não encontrado"
//    error: true
// para todos casos em que encontra paciente(s), retornar também o campo age, com a idade do paciente (calculada a partir da data de nascimento)
// tambem retornar o campo height em metros, ao invés de centímetros
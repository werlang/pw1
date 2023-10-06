# Exercício

## Descrição

Este exercício consiste em criar um script PHP que recebe um ID de paciente via GET e retorna um JSON com as informações do paciente correspondente. O script deve utilizar o arquivo `patients.php` para obter o array de pacientes.

## Requisitos

- Utilizar `require` para receber o array dos pacientes do arquivo `patients.php`.
- Receber do JS o ID do paciente via GET.
- Devolver um JSON com os seguintes campos:
    - `error`: `true` ou `false`.
    - `message`: mensagem informativa.
    - Caso tenha recebido um ID do JS:
        - `patient`: informações do paciente encontrado.
    - Caso não tenha recebido um ID do JS:
        - `patients`: array com todos os pacientes.
    - Caso não encontre o paciente:
        - Não devolver o campo `patient`.
        - `message`: "Paciente não encontrado".
        - `error`: `true`.
    - Para todos os casos em que encontrar paciente(s), retornar também o campo `age`, com a idade do paciente (calculada a partir da data de nascimento).
    - Também retornar o campo `height` em metros, ao invés de centímetros.

# Exercício de Programação em PHP - Filtros de Consultas

Neste exercício, você deve criar um script PHP chamado `filter.php` que será responsável por filtrar consultas médicas. O script deve importar informações de pacientes, médicos e consultas a partir dos arquivos `patients.php`, `doctors.php` e `appointments.php`, respectivamente.

## Filtro por Médico

O script deve receber por **GET** na variável *doctor* o *id* de um médico e retornar um JSON com as consultas agendadas para o médico no seguinte formato:

```json
[
  {
    "patient": "nome do paciente",
    "time": "data e hora da consulta",
    "notes": "observações sobre a consulta"
  },
]
```

## Filtro por Paciente

O script deve receber por **GET** na variável *patient* o *id* de um paciente e retornar um JSON com as consultas agendadas para o paciente no seguinte formato:

```json
[
  {
    "doctor": "nome do médico",
    "time": "data e hora da consulta",
    "notes": "observações sobre a consulta"
  },
]
```

## Filtro por Data

O script deve receber por **GET** nas variáveis *datefrom* e *dateto* uma data no formato *aaaa-mm-dd* e retornar um JSON com as consultas agendadas entre as datas especificadas no seguinte formato:

```json
[
  {
    "patient": "nome do paciente",
    "doctor": "nome do médico",
    "time": "data e hora da consulta",
    "notes": "observações sobre a consulta"
  },
]
```

## Filtro mais de um Parâmetro

O script pode receber mais de um parâmetro de filtro ao mesmo tempo. Neste caso, o script deve retornar apenas as consultas que atendam a todos os filtros especificados.
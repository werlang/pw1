# Exercício de Programação em PHP - Agendamento de Consultas

Neste exercício, você deve criar um script PHP chamado `schedule.php` que será responsável por agendar consultas médicas. O script deve importar informações de pacientes, médicos e consultas a partir dos arquivos `patients.php`, `doctors.php` e `appointments.php`, respectivamente.

A `index.html` já está pronta e contém um formulário de agendamento de consultas. O formulário envia os dados para o script `schedule.php` via AJAX e exibe a resposta em um alerta to tipo toast. Caso a consulta seja agendada com sucesso, as informações da consulta são exibidas na página. Esta parte (o front-end) já está pronta e não deve ser alterada.

## Funcionalidades do Script

O schedule.php deve realizar as seguintes tarefas:

* Receber dados do formulário de agendamento, incluindo o nome do paciente, o ID do médico, a data e a hora da consulta e as observações sobre a consulta.

* Buscar as informaçÕes dos médicos, pacientes e consultas nos respectivos arrays.

* Verificar se o médico está disponível na data e hora especificadas.

* Retornar uma resposta em formato JSON com base na verificação:

### Paciente Não Encontrado

Se o paciente não for encontrado, o script deve retornar o seguinte JSON:

```json
{
  "error": true,
  "message": "Paciente não encontrado",
}
```

### Consulta Agendada com Sucesso

Se o médico estiver disponível, o script deve retornar o seguinte JSON:

```json
{
  "message": "Consulta agendada com sucesso",
  "appointment": {
    "patient": "nome do paciente",
    "doctor": "nome do médico",
    "date": "data da consulta",
    "time": "hora da consulta",
    "notes": "observações sobre a consulta"
  }
}
```

### Médico Não Disponível

Se o médico não estiver disponível na data e hora especificadas, o script deve retornar o seguinte JSON:

```json
{
  "error": true,
  "message": "Médico não disponível na data e hora informados",
}
```
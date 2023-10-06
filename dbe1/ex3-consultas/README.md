# Exercício de Programação em PHP - Agendamento de Consultas

Neste exercício, você deve criar um script PHP chamado schedule.php que será responsável por agendar consultas médicas. O script deve importar informações de pacientes, médicos e consultas a partir dos arquivos `patients.php`, `doctors.php` e `appointments.php`, respectivamente.

## Funcionalidades do Script

O schedule.php deve realizar as seguintes tarefas:

* Receber dados do formulário de agendamento, incluindo o ID do paciente, o ID do médico, a data e a hora da consulta.

* Verificar se o médico está disponível na data e hora especificadas.

* Retornar uma resposta em formato JSON com base na verificação:

### Consulta Agendada com Sucesso

Se o médico estiver disponível, o script deve retornar o seguinte JSON:

```json
{
  "error": false,
  "message": "Consulta agendada com sucesso",
  "appointment": {
    "patient": { /* array com as informações do paciente */ },
    "doctor": { /* array com as informações do médico */ },
    "date": "data da consulta",
    "time": "hora da consulta"
  }
}
```

### Médico Não Disponível

Se o médico não estiver disponível na data e hora especificadas, o script deve retornar o seguinte JSON:

```json
{
  "error": true,
  "message": "Médico não disponível na data e hora informados",
  "appointment": null
}
```
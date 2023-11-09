# Exercício de Programação em PHP - Cadastro de pacientes

## 1. Cadastro de Pacientes

Você deve criar um script PHP chamado `register.php` que será responsável por cadastrar pacientes. O script deve importar informações de pacientes a partir do arquivo `patients.json`.

* O Script deve receber por POST os dados de um paciente, deve adicionar o paciente no arquivo `patients.json` e retornar um JSON com os dados do paciente no seguinte formato:

```json
{
  "message": "Paciente cadastrado com sucesso",
  "patient": {
    "id": "id do paciente",
    "name": "nome do paciente",
    "phone": "telefone do paciente",
    "email": "email do paciente",
    "notes": "observações sobre o paciente"
  }
}
```

Lembre-se de manter no arquivo `patients.json` todos os pacientes cadastrados anteriormente.

* Caso receba por POST um email de um paciente que já existe, deve retornar um JSON com a seguinte estrutura:

```json
{
  "error": true,
  "message": "Paciente já cadastrado",
}
```

## 2. Listagem de Pacientes

Você deve criar um script PHP chamado `patients.php` que será responsável por listar pacientes. O script deve importar informações de pacientes a partir do arquivo `patients.json`.


* Recebendo uma requisição do tipo GET, o script deve retornar um JSON com os dados de todos os pacientes no seguinte formato:

```json
[
  {
    "id": "id do paciente",
    "name": "nome do paciente",
    "phone": "telefone do paciente",
    "email": "email do paciente",
    "notes": "observações sobre o paciente"
  },
]
```


## Front-end

O Formulário de cadastro de pacientes está disponível na página `register.html`. O script `register.js` já está pronto. Ele envia os dados do formulário para o script `register.php` e exibe a resposta em um alerta to tipo toast. Esta parte (o front-end) já está pronta e não deve ser alterada.

A página `patients.html` também já está pronta. Ela usa o script `patients.js` para fazer uma requisição para `patients.php` e receber a lista de pacientes cadastrados no arquivo `patients.json`. Esta parte (o front-end) já está pronta e não deve ser alterada.
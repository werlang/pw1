# PWI - P1 - Questão 01

Dado os arquivos que compõe a questão, faça com que ao clicar no botão _Registrar Evento_ na página `index.html`, insira os dados dos campos `Nome do Evento`, `Localização` e `Data` e `Horário` em um array de objetos, onde cada objeto representa um Evento. O array deverá possuir a seguinte estrutura:

```json
[
  {
    "eventName": "Nome do Evento",
    "location": "Localização",
    "date": "DD/MM/AAAA",
    "time": "HH:MM"
  }
]
```

Exemplo:

```json
[
  {
    "eventName": "V FEIRA DE CIÊNCIAS",
    "location": "Sala 1",
    "date": "01/01/2024",
    "time": "08:00"
  },
  {
    "eventName": "VII SEMANA DE INFORMÁTICA",
    "location": "Sala 2",
    "date": "01/02/2024",
    "time": "09:00"
  }
]
```

Depois de cadastro, **os _inputs_ devem ser limpos** e uma mensagem de sucesso deve ser exibida no documento, dentro do `div#message`, conforme exemplo abaixo:

```html
Evento <span id="event-name">VIII CHARCODE</span> cadastrado com sucesso!
```

Mostre também o array de objetos no console do navegador.

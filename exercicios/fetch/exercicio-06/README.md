# Exercício 6: Cadastrar Evento com Data e Hora

## Objetivo

Praticar POST com validação de data e hora.

## Tema

Sistema de Agenda de Eventos

## Descrição

Implemente cadastro de eventos com título, data, hora e local. Valide se a data não está no passado.

## API

- **URL**: `/api/event/add.php`
- **Método**: `POST`
- **Dados**: `title`, `date`, `time`, `location`

## Resposta
```json
{
    "message": "Evento cadastrado",
    "event": {"id": 1, "title": "Reunião", "date": "2024-12-25", "time": "14:00", "location": "Sala 1"}
}
```

## Tarefa

Valide a data no JavaScript antes de enviar, exiba erro se data for anterior a hoje.

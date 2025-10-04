# Exercício 7: Marcar Múltiplos E-mails como Lidos

## Objetivo

Praticar operações em lote (bulk operations).

## Tema

Sistema de E-mail

## Descrição

Liste e-mails não lidos. Permita selecionar múltiplos e-mails com checkboxes e marcar todos como lidos de uma vez.

## API

**Listar**: `/api/email/list.php`
**Marcar como lidos**: `/api/email/mark-read.php?ids=1,2,3` (GET)

## Resposta
```json
{
    "message": "3 e-mails marcados como lidos"
}
```

## Tarefa

Crie checkboxes, colete IDs selecionados, envie em query string separados por vírgula.

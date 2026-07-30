# Exercício: Reserva de Laboratórios

## Objetivo

Criar uma reserva que depende de mais de uma verificação e deve ser confirmada integralmente ou não ocorrer.

## Dados

Use tabelas `laboratorios` e `reservas`, relacionadas pelo identificador do laboratório.

## Requisitos

- listar laboratórios ativos;
- receber laboratório, data, horário inicial, horário final e responsável;
- validar que o intervalo é crescente;
- detectar sobreposição com reservas existentes;
- iniciar transação, conferir disponibilidade e inserir a reserva;
- confirmar ou desfazer a transação e responder o motivo do conflito.

## Conceitos trabalhados

Relação entre tabelas, consulta de intervalo, transação, `commit()`, `rollBack()` e restrições.

## Critérios de verificação

- reservas adjacentes podem ser aceitas; reservas sobrepostas não;
- nenhuma reserva pode surgir se uma etapa falhar;
- o laboratório deve ser validado no banco, não apenas no formulário.

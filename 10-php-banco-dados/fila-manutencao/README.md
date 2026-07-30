# Exercício: Fila de Manutenção

## Objetivo

Controlar a transição de chamados entre estados válidos e detectar quando uma atualização perdeu a corrida para outra operação.

## Dados

Use uma tabela `chamados` com descrição, prioridade, estado e datas de abertura e conclusão.

## Requisitos

- listar chamados por prioridade e antiguidade;
- permitir somente `aberto → em_atendimento → concluido`;
- executar a mudança com `UPDATE` que confira também o estado anterior;
- verificar `rowCount()` para detectar conflito;
- impedir edição de chamado concluído;
- devolver respostas JSON e atualizar o cartão correspondente com `fetch()`.

## Conceitos trabalhados

PDO, consulta preparada, máquina de estados, atualização condicional, conflito e integração AJAX.

## Critérios de verificação

- não deve ser possível pular estados;
- duas telas tentando avançar o mesmo chamado devem produzir um conflito observável;
- o SQL não pode receber valores interpolados.

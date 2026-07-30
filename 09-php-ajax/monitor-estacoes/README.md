# Exercício: Monitor de Estações

## Objetivo

Atualizar um painel periodicamente sem permitir requisições sobrepostas e sem esconder quando os dados ficaram desatualizados.

## Estrutura

Crie um endpoint PHP que devolva leituras simuladas de temperatura, umidade e horário para várias estações.

## Requisitos

- buscar uma nova leitura somente depois que a anterior terminar;
- permitir iniciar e pausar o monitoramento;
- mostrar o horário da última resposta;
- destacar leituras fora das faixas definidas;
- marcar o painel como desatualizado após um período sem sucesso;
- aumentar gradualmente o intervalo depois de falhas consecutivas.

## Conceitos trabalhados

Polling sequencial, `setTimeout()` recursivo, `fetch()`, prevenção de sobreposição, falhas consecutivas e estado temporal.

## Critérios de verificação

- não pode ser usado `setInterval()` para disparar chamadas concorrentes;
- pausar deve impedir o próximo agendamento;
- uma falha não pode apagar a última leitura válida.

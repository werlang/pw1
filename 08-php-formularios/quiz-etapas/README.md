# Exercício: Quiz em Etapas

## Objetivo

Construir um fluxo de várias requisições sem usar sessão. O estado mínimo deve viajar em campos ocultos a cada resposta.

## Requisitos

- manter ao menos quatro perguntas em um array PHP;
- mostrar somente a pergunta da etapa atual;
- enviar etapa e pontuação em campos `hidden`;
- validar se a etapa recebida existe e se uma alternativa foi marcada;
- somar o ponto no servidor e avançar;
- ao final, mostrar o resultado e um link para reiniciar sem campos ocultos.

## Conceitos trabalhados

POST, campos ocultos, fluxo por índice, validação de estado recebido e formulário autoendereçado.

## Critérios de verificação

- não pode haver JavaScript controlando a etapa;
- alterar manualmente um índice inválido deve produzir recuperação segura;
- a resposta correta não deve ser enviada em um campo do formulário.

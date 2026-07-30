# Exercício: Quiz com Tentativas Controladas

## Objetivo

Controlar progresso, limite de tentativas e tempo de inatividade sem confiar em campos ocultos enviados pelo navegador.

## Requisitos

- guardar pergunta atual, acertos, tentativas e horário da última ação na sessão;
- expirar o quiz após o período de inatividade definido;
- impedir mais de três respostas para a mesma pergunta;
- gerar um token CSRF para as ações de responder e reiniciar;
- invalidar o token depois do uso;
- mostrar ao final um histórico resumido construído a partir da sessão.

## Conceitos trabalhados

Sessão, estado temporal, limite de tentativas, expiração, token CSRF e transição de estado.

## Critérios de verificação

- editar o HTML não pode aumentar tentativas nem pontuação;
- um formulário antigo reenviado deve ser rejeitado;
- expiração, conclusão e bloqueio por tentativas devem produzir finais diferentes.

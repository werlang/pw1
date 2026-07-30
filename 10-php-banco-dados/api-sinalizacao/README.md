# Exercício: API de Sinalização de Salas

## Objetivo

Projetar uma API que mantém avisos exibidos nas portas das salas. O método HTTP determina a operação, e o estado do aviso limita o que ainda pode ser alterado.

## Dados

Use tabelas `salas` e `avisos`. Cada aviso possui título, mensagem, início, fim e estado `rascunho`, `publicado` ou `encerrado`.

## Requisitos

- `GET` lista avisos ativos de uma sala ou busca um aviso por identificador;
- `POST` cria um aviso em rascunho para uma sala existente;
- `PUT` edita rascunho ou muda o estado por transições permitidas;
- `DELETE` remove somente um rascunho;
- cada operação valida entrada, usa consulta preparada e define código HTTP coerente;
- respostas seguem `status`, `result` e `message`.

## Conceitos trabalhados

PDO, CRUD, métodos HTTP, leitura de JSON, endpoint orientado a contrato e tratamento de erros.

## Critérios de verificação

- método não suportado deve responder 405;
- sala ou aviso inexistente deve responder 404;
- tentativa de editar aviso publicado ou encerrado deve responder 409;
- nenhuma resposta de erro pode expor a exceção ou a configuração do banco.

# Exercício: Busca Cancelável no Acervo

## Objetivo

Evitar resultados fora de ordem quando o usuário digita novas buscas antes de a requisição anterior terminar.

## Estrutura

Crie uma página JavaScript e um endpoint PHP GET que filtre um catálogo definido em array e responda JSON.

## Requisitos

- aguardar um pequeno intervalo após a digitação antes de buscar;
- cancelar a requisição anterior com `AbortController`;
- enviar o termo com `URLSearchParams`;
- validar termo mínimo no cliente e no PHP;
- mostrar estados vazio, carregando, resultado e erro;
- renderizar somente a resposta da busca mais recente.

## Conceitos trabalhados

Debounce, `fetch()`, GET, `AbortController`, contrato JSON e proteção contra respostas atrasadas.

## Critérios de verificação

- digitar rapidamente não pode exibir um resultado antigo;
- cancelamento não deve aparecer como erro ao usuário;
- o endpoint precisa funcionar também quando aberto diretamente com um termo válido.

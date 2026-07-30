# Exercício: Preferências de Leitura

## Objetivo

Usar cookies para lembrar escolhas não sensíveis que modificam a apresentação de todas as páginas do mini-projeto.

## Requisitos

- permitir escolher tema, tamanho da fonte e modo de alto contraste;
- validar cada valor contra uma lista permitida;
- gravar cookies com expiração definida e `SameSite=Lax`;
- aplicar as preferências no carregamento de duas páginas diferentes;
- oferecer uma ação POST para restaurar os padrões;
- explicar na interface que os cookies guardam preferências, não identidade.

## Conceitos trabalhados

`setcookie()`, `$_COOKIE`, expiração, validação por lista permitida e preferência persistente.

## Critérios de verificação

- alterar uma preferência deve afetar as duas páginas;
- valor de cookie adulterado deve voltar ao padrão;
- a restauração deve remover somente os cookies deste exercício.

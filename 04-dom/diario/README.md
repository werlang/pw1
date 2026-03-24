# Exercício Prático: Diário Virtual

## Objetivo da Atividade

O objetivo desta prática é criar uma interface de postagens usando manipulação direta do DOM. O aluno trabalha com leitura de `textarea`, criação de elementos, atualização de texto e remoção ou edição de blocos visuais.

## Conceitos trabalhados

- `querySelector()`;
- `createElement()`;
- `append()`;
- `remove()`;
- `textContent`;
- `new Date().toLocaleString('pt-BR')`.

## Especificações Técnicas do Sistema

O aplicativo deve permitir:

- digitar um texto em uma área de postagem;
- publicar esse texto na tela em formato de card;
- mostrar data e hora da publicação;
- editar uma postagem individual;
- remover uma postagem individual;
- limpar todas as postagens de uma vez.

## O que observar durante a prática

- o foco está em criar e remover elementos dinamicamente;
- cada card publicado vira um novo pedaço do DOM;
- atualizar a interface corretamente exige reconstruir ou manipular os elementos certos.
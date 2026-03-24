# Exercício Prático: Diário Virtual

## Objetivo da Atividade

O objetivo desta prática é criar uma interface de postagens usando DOM, mas com uma estrutura de dados por trás: cada postagem deve ser representada por um objeto dentro de um array.

## Conceitos trabalhados

- `querySelector()`;
- `createElement()`;
- `append()`;
- arrays de objetos;
- `textContent`;
- `new Date().toLocaleString('pt-BR')`.

## Especificações Técnicas do Sistema

O sistema deve manter um array de postagens. Cada postagem pode ter, por exemplo, `id`, `texto` e `data`.

O aplicativo deve permitir:

- digitar um texto em uma área de postagem;
- publicar esse texto na tela em formato de card;
- mostrar data e hora da publicação;
- editar uma postagem individual;
- remover uma postagem individual;
- limpar todas as postagens de uma vez.

## Estrutura mínima esperada

- um `textarea` para escrever a postagem;
- um botão para publicar;
- um botão para limpar todas as postagens;
- uma área de mensagem ou status;
- uma área que renderize os cards publicados.

## Regras de funcionamento

- uma postagem vazia não deve ser publicada;
- ao publicar, o sistema deve criar um objeto e inseri-lo no array de postagens;
- editar ou remover deve alterar o array antes de atualizar a tela;
- a lista visual deve ser reconstruída a partir do array sempre que houver mudança;
- a data exibida deve representar a criação ou a última edição da postagem.

## O que observar durante a prática

- aqui o DOM entra como camada de exibição, enquanto o array de objetos guarda os dados;
- o exercício reaproveita conteúdos de eventos, arrays e objetos ao mesmo tempo;
- renderizar a tela a partir do estado atual reduz inconsistências.
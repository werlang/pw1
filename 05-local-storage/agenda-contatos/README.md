# Exercício Prático: Agenda de Contatos

## Objetivo da Atividade

O objetivo desta prática é persistir uma agenda de contatos em `localStorage`, reforçando que a lista deve ser mantida em memória e regravada sempre que houver adição ou remoção.

## Conceitos trabalhados

- array de objetos;
- `localStorage` como persistência do cadastro;
- remoção individual;
- filtro visual da lista;
- renderização baseada no estado atual da aplicação.

## Especificações Técnicas do Sistema

O aplicativo deve atender aos seguintes pontos:

- o usuário informa nome e telefone;
- cada contato deve ser salvo em um array de objetos;
- o array deve ser persistido na chave `agenda-contatos`;
- a lista deve ser carregada ao abrir a página;
- cada contato deve ter um botão para remoção;
- um campo de busca deve filtrar visualmente os contatos pelo nome.

## O que observar durante a prática

- o filtro não precisa alterar a lista principal em memória;
- remover um contato muda a memória e exige regravação do storage;
- a tela deve sempre ser reconstruída a partir do estado atual.
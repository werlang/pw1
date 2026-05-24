# Exercício Prático: Cadastro de Alunos

## Objetivo da Atividade

O objetivo desta prática é trabalhar com um array de objetos persistido no `localStorage`, usando o padrão correto de carregar o cadastro no início da aplicação e regravar sempre que a lista mudar.

## Conceitos trabalhados

- array de objetos;
- `localStorage`;
- leitura inicial do storage;
- regravação consistente com `JSON.stringify()`;
- renderização de resumo e lista a partir da memória.

## Especificações Técnicas do Sistema

O aplicativo deve atender aos seguintes pontos:

- o usuário informa nome, turma e média;
- cada cadastro deve gerar um objeto dentro de um array;
- esse array deve ser salvo na chave `cadastro-alunos`;
- ao abrir a página, a lista salva deve ser carregada uma vez;
- a interface deve mostrar total de alunos, média geral e a lista cadastrada;
- deve existir um botão para limpar o cadastro inteiro.

## O que observar durante a prática

- a lista em memória é a fonte principal da verdade;
- o storage deve ser lido no início da aplicação, não a cada clique;
- sempre que o array mudar, o storage deve ser reescrito.
# Exercício Prático: Perfil do Estudante

## Objetivo da Atividade

O objetivo desta prática é salvar um único objeto no `localStorage` para entender a relação entre formulário, JSON e persistência no navegador.

## Conceitos trabalhados

- objeto literal;
- `localStorage`;
- `JSON.stringify()`;
- `JSON.parse()`;
- reconstrução da interface a partir do dado salvo;
- remoção de uma chave com `removeItem()`.

## Especificações Técnicas do Sistema

O aplicativo deve atender aos seguintes pontos:

- o usuário informa nome, turma, e-mail e cor favorita;
- ao clicar em salvar, esses dados devem formar um objeto;
- o objeto deve ser salvo no `localStorage` na chave `perfil-estudante`;
- quando a página abrir, o perfil salvo deve ser lido e exibido na tela;
- deve existir um botão para limpar o perfil salvo.

## O que observar durante a prática

- o storage guarda texto, então o objeto precisa ser convertido antes de ser salvo;
- o perfil deve ser carregado no início da aplicação;
- a interface deve refletir o objeto atual salvo na memória.
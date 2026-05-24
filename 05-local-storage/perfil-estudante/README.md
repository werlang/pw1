# Exercício Prático: Perfil do Estudante

## Objetivo da Atividade

O objetivo desta prática é montar um mini cartão de identificação escolar e salvar um único objeto no `localStorage`, treinando a ideia de perfil persistente.

## Conceitos trabalhados

- objeto literal;
- `localStorage`;
- `JSON.stringify()`;
- `JSON.parse()`;
- pré-visualização de dados na interface;
- reconstrução da interface a partir do dado salvo;
- remoção de uma chave com `removeItem()`.

## Especificações Técnicas do Sistema

O aplicativo deve atender aos seguintes pontos:

- o usuário informa nome, turma, curso, ano escolar e uma cor de destaque;
- deve existir uma opção de participação em monitoria (sim/não);
- enquanto o estudante digita, uma prévia do cartão deve ser atualizada na tela;
- ao clicar em salvar, esses dados devem formar um objeto;
- o objeto deve ser salvo no `localStorage` na chave `perfil-estudante`;
- quando a página abrir, o perfil salvo deve ser lido e exibido na tela;
- deve existir um botão para limpar o perfil salvo.

## O que observar durante a prática

- o storage guarda texto, então o objeto precisa ser convertido antes de ser salvo;
- o cartão visual não substitui o objeto em memória, ele só representa os dados atuais;
- o perfil deve ser carregado no início da aplicação;
- a interface deve refletir o objeto atual salvo na memória.
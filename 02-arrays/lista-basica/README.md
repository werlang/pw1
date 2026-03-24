# Exercício Prático: Lista Básica com Arrays

## Objetivo da Atividade

O objetivo desta prática é usar um array simples para armazenar itens digitados pelo usuário e refletir esse estado na interface.

## Conceitos trabalhados

- array vazio;
- `push()`;
- `length`;
- `join()`;
- renderização de lista no documento;
- limpeza e reexibição da interface.

## Especificacoes Tecnicas do Sistema

O aplicativo deve atender aos seguintes pontos:

- o usuário digita um item em um campo de texto;
- ao clicar no botao de adicionar, o texto deve ser inserido no array;
- a lista visual deve ser atualizada com todos os itens atuais;
- a quantidade total deve ser mostrada na tela;
- o último item inserido também deve ser exibido;
- a lista deve aparecer em texto corrido usando `join()`;
- um botão extra deve limpar o array e restaurar a interface.

## O que observar durante a prática

- o array é a fonte principal da verdade;
- a interface não deve ser atualizada item por item de forma solta;
- a cada mudança, uma função de renderização deve reconstruir o que aparece na tela.
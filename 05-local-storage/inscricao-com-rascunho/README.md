# Exercício Prático: Inscrição com Rascunho

## Objetivo da Atividade

O objetivo desta prática é combinar `localStorage` e `sessionStorage` em um cenário de cadastro: as inscrições confirmadas devem persistir por mais tempo, enquanto o formulário em andamento deve funcionar como rascunho temporário.

## Conceitos trabalhados

- array de objetos;
- `localStorage` para inscrições confirmadas;
- `sessionStorage` para rascunho do formulário;
- leitura inicial dos dois storages;
- regravação do storage quando a memória muda.

## Especificações Técnicas do Sistema

O aplicativo deve atender aos seguintes pontos:

- o usuário informa nome, e-mail e turno desejado;
- o formulário deve salvar o rascunho no `sessionStorage` enquanto o usuário digita;
- ao concluir a inscrição, o registro deve entrar em um array salvo no `localStorage`;
- o rascunho deve ser limpo depois da inscrição;
- a lista de inscrições confirmadas deve ser mostrada na tela.

## O que observar durante a prática

- o cadastro confirmado e o rascunho têm objetivos diferentes;
- o `localStorage` guarda a lista principal em memória;
- o `sessionStorage` evita perda de dados temporários sem virar fonte principal da verdade.
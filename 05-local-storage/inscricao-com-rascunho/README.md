# Exercício Prático: Inscrição com Rascunho

## Objetivo da Atividade

O objetivo desta prática é combinar `localStorage` e `sessionStorage` em uma inscrição de oficina escolar: inscrições confirmadas ficam persistidas, enquanto o formulário em andamento vira rascunho temporário.

## Conceitos trabalhados

- array de objetos;
- `localStorage` para inscrições confirmadas;
- `sessionStorage` para rascunho do formulário;
- campos de seleção múltipla (checkbox);
- texto livre com contagem de caracteres;
- leitura inicial dos dois storages;
- regravação do storage quando a memória muda.

## Especificações Técnicas do Sistema

O aplicativo deve atender aos seguintes pontos:

- o usuário informa nome, e-mail, turno e oficinas de interesse;
- o usuário escreve uma justificativa curta no campo de texto;
- o formulário deve salvar o rascunho no `sessionStorage` enquanto o usuário digita;
- ao concluir a inscrição, o registro deve entrar em um array salvo no `localStorage`;
- o rascunho deve ser limpo depois da inscrição;
- a lista de inscrições confirmadas deve ser mostrada na tela.

## O que observar durante a prática

- o cadastro confirmado e o rascunho têm objetivos diferentes;
- o `localStorage` guarda a lista principal em memória;
- o `sessionStorage` evita perda de dados temporários sem virar fonte principal da verdade;
- ao recuperar o rascunho, a interface deve voltar para o mesmo estado de preenchimento.
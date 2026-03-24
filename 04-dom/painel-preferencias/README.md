# Exercício Prático: Painel de Preferências

## Objetivo da Atividade

O objetivo desta prática é ler campos de formulário e atualizar elementos já existentes no DOM a partir de um objeto de preferências.

## Conceitos trabalhados

- `value`;
- `checked`;
- objeto literal;
- `textContent`;
- `classList`.

## Especificações Técnicas do Sistema

O sistema deve manter um objeto com as preferências atuais da interface, como nome exibido, cor escolhida e destaque visual.

O aplicativo deve permitir:

- informar nome de usuário;
- escolher uma cor de destaque;
- marcar ou desmarcar uma preferência visual;
- aplicar as mudanças em um card de pré-visualização;
- atualizar textos, classes e estados visuais.

## Estrutura mínima esperada

- um campo para nome;
- um seletor de cor;
- um checkbox para o destaque;
- um botão para aplicar preferências;
- um card de pré-visualização já existente na página.

## Regras de funcionamento

- os dados do formulário devem atualizar um objeto de preferências;
- a interface deve ser atualizada com base nesse objeto;
- a cor do card deve mudar por classe CSS ou outra estratégia equivalente;
- o nome deve mostrar um valor padrão se o campo estiver vazio;
- o checkbox deve controlar claramente um efeito visual perceptível.

## O que observar durante a prática

- nem todo exercício de DOM precisa criar elementos novos;
- objetos ajudam a agrupar o estado atual da interface;
- este exercício reaproveita eventos e objetos para controlar a aparência da página.
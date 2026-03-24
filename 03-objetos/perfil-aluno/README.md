# Exercício Prático: Perfil de Aluno

## Objetivo da Atividade

O objetivo desta prática é representar um aluno com um único objeto, atualizando suas propriedades a partir de um formulário.

## Conceitos trabalhados

- objeto literal;
- atualização de propriedades;
- leitura com notação de ponto;
- `checked` em formulários;
- exibição de dados organizados na tela.

## Especificações Técnicas do Sistema

O sistema deve manter um objeto com os dados atuais do aluno exibido na tela.

O aplicativo deve permitir:

- informar nome, turma, cidade e idade;
- marcar se o aluno recebe bolsa;
- atualizar o objeto principal com esses valores;
- exibir o conteúdo atual do objeto de forma organizada;
- mostrar um resumo visual do perfil preenchido.

## Estrutura mínima esperada

- campos de formulário para cada propriedade do aluno;
- um botão para aplicar ou atualizar os dados;
- uma área que mostre o resumo do perfil;
- uma área opcional para exibir o objeto formatado.

## Regras de funcionamento

- o objeto deve concentrar os dados do aluno em vez de espalhar várias variáveis independentes;
- ao clicar no botão, as propriedades devem ser atualizadas com os novos valores;
- a idade deve ser tratada como número, se isso fizer sentido na sua solução;
- o estado visual mostrado na tela deve ser derivado do objeto atual;
- se algum campo estiver vazio, o sistema pode usar texto padrão, mas isso deve ficar consistente.

## O que observar durante a prática

- objetos organizam dados diferentes que pertencem à mesma entidade;
- alterar a interface passa a ser consequência de alterar o objeto;
- esse padrão prepara o caminho para trabalhar com vários alunos depois.
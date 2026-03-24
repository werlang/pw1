# Exercício Prático: Boletim com Array de Objetos

## Objetivo da Atividade

O objetivo desta prática é sair do array simples e trabalhar com uma estrutura mais realista: um array de objetos representando alunos e notas.

## Conceitos trabalhados

- array de objetos;
- `push()` com objetos;
- `forEach()` para renderização;
- `filter()` para aprovados;
- `map()` para extrair nomes;
- `reduce()` para calcular média;
- comparação de maior nota.

## Especificações Técnicas do Sistema

O aplicativo deve permitir cadastrar novos alunos e analisar o boletim da turma a partir de um único array principal.

Requisitos principais:

- cada aluno deve possuir pelo menos as propriedades `nome` e `nota`;
- os alunos devem ser exibidos em tabela ou lista organizada;
- o sistema deve calcular a média da turma;
- o sistema deve identificar a maior nota;
- o sistema deve mostrar os nomes dos aprovados;
- um novo cadastro deve entrar no array e atualizar a interface;
- as notas devem ser tratadas como número.

## Estrutura mínima esperada

- um formulário com nome e nota;
- um botão para cadastrar aluno;
- uma área para exibir a tabela ou lista da turma;
- uma área de resumo com média, maior nota e aprovados.

## Regras de funcionamento

- cada novo aluno deve virar um objeto antes de ser inserido no array;
- a nota digitada precisa ser convertida para número;
- os cálculos devem usar o array de alunos como fonte única de verdade;
- a lista de aprovados deve ser obtida a partir dos dados atuais da turma;
- sempre que houver novo cadastro, os dados visuais devem ser atualizados.

## O que observar durante a prática

- arrays de objetos aparecem muito em aplicações reais;
- `filter()`, `map()` e `reduce()` ficam mais úteis quando cada item tem estrutura própria;
- a interface pode ser inteiramente derivada do array principal.
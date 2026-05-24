# Exercício Prático: Cadastro de Alunos

## Objetivo da Atividade

O objetivo desta prática é montar um mini boletim de conselho de classe, com notas por semestre e situação final de cada estudante, persistindo tudo no `localStorage`.

## Conceitos trabalhados

- array de objetos;
- `localStorage`;
- leitura inicial do storage;
- regravação consistente com `JSON.stringify()`;
- cálculo de média e situação;
- renderização de tabela e painel de indicadores a partir da memória.

## Especificações Técnicas do Sistema

O aplicativo deve atender aos seguintes pontos:

- o usuário informa nome, turma e duas notas (1º e 2º semestre);
- cada cadastro deve gerar um objeto dentro de um array;
- esse array deve ser salvo na chave `cadastro-alunos`;
- ao abrir a página, a lista salva deve ser carregada uma vez;
- a interface deve mostrar total de estudantes, média da turma e quantos estão aprovados/recuperação;
- a lista deve aparecer em formato de tabela, com situação calculada por cor;
- deve existir um botão para limpar o cadastro inteiro.

## O que observar durante a prática

- a lista em memória é a fonte principal da verdade;
- o storage deve ser lido no início da aplicação, não a cada clique;
- sempre que o array mudar, o storage deve ser reescrito;
- o cálculo da situação deve ser feito com base na média: `>= 6` aprovado, abaixo disso recuperação.
# Exercício Introdutório: Tabuada de Uma Turma

## Objetivo da atividade

Uma turma quer consultar uma tabuada curta, e o professor também quer saber
quantas linhas foram geradas. Você vai criar essa página sem copiar uma linha
HTML para cada conta.

Durante a repetição, os multiplicadores pares devem receber uma marca curta.
Assim, a atividade reúne um `for`, uma regra baseada em `%` e um pequeno
resumo ao final.

## Conceito central

Pratique o laço `for`, o operador `%`, um contador de linhas, a multiplicação
dentro da repetição e a geração repetitiva de HTML.

## Dados iniciais

Crie as variáveis `$numeroTabuada` e `$ultimoMultiplicador`. Comece com o
número `7` e o último multiplicador `5`.

## O que você deve construir

Crie um arquivo `index.php` com um título que indique o número escolhido e
uma lista ou tabela com os resultados de `1` até o limite. Cada multiplicador
deve aparecer uma única vez, com a conta e o resultado correspondentes.

## Solução completa

A resposta completa está em [index.php](./index.php). Tente resolver o
enunciado antes de consultá-la. Depois, compare sua solução com esse arquivo.

## Regras de funcionamento

- use um `for` para percorrer os multiplicadores;
- use `%` para identificar os multiplicadores pares e acrescente uma marca
  curta nessas linhas;
- incremente um contador a cada linha gerada e mostre o total ao final;
- faça o limite vir de `$ultimoMultiplicador`, sem escrever manualmente uma
  quantidade fixa de contas.

## Casos para testar

- gere a tabuada do `7` até `5`;
- mude o limite para `10` e confira se cinco novas linhas aparecem;
- mude o número para `4` e confira os resultados e as marcas dos pares.

## Extensão guiada: trocar `for` por `while`

Depois de concluir a versão básica, reescreva somente a repetição usando
`while`. A saída deve continuar igual. Essa extensão prepara a simulação do
reservatório, mas não faz parte da primeira entrega.

## O que observar durante a prática

O contador controla quantas vezes a repetição avança, enquanto `%` permite
identificar um padrão sem comparar vários números manualmente. A mesma
estrutura HTML pode ser gerada várias vezes; por isso, mudar os dados iniciais
não deve exigir novas linhas copiadas.

## Critérios de verificação

- todos os multiplicadores do intervalo aparecem uma vez;
- os resultados estão corretos;
- as linhas pares recebem a marca correta;
- o resumo informa a quantidade real de linhas;
- o código usa um único `for`;
- não há dez contas escritas manualmente.

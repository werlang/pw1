# Exercício Introdutório: Tabuada de Uma Turma

## Objetivo da atividade

Gerar uma pequena tabuada sem repetir manualmente as linhas HTML e marcar os multiplicadores pares. O exercício treina uma repetição com contador, uma regra periódica e um resumo simples.

## Conceito central

- laço `for`;
- operador `%`;
- contador de linhas;
- multiplicação dentro da repetição;
- geração repetitiva de HTML.

## Dados iniciais

Defina:

- o número da tabuada;
- o último multiplicador.

Use os nomes $numeroTabuada e $ultimoMultiplicador para essas variáveis.

Comece com número `7` e último multiplicador `5`.

## Estrutura mínima

- o arquivo `index.php` com a implementação;
- um título indicando o número escolhido;
- uma lista ou tabela com os resultados de `1` até o limite.

Realize a implementação, altere o número ou o limite no início do arquivo e
observe como a repetição gera as novas linhas.

## Regras de funcionamento

- use `for` para percorrer os multiplicadores;
- mostre uma linha para cada multiplicador;
- cada linha deve mostrar a conta e o resultado;
- use `%` para identificar os multiplicadores pares e acrescente uma marca curta nessa linha;
- incremente um contador de linhas durante a repetição e mostre seu total ao final;
- o limite deve vir de uma variável, não de uma quantidade de linhas escrita manualmente.

## Casos para testar

- gere a tabuada do `7` até `5`;
- altere o limite para `10` e confirme que cinco novas linhas aparecem;
- altere o número para `4` e confira os resultados.

## Extensão guiada: trocar `for` por `while`

Depois de concluir a versão básica, reescreva somente a repetição usando `while`. A saída deve continuar igual. Esta extensão prepara a simulação do reservatório sem fazer parte da primeira entrega.

## O que observar durante a prática

- o contador controla a repetição;
- `%` identifica um padrão sem precisar comparar vários números manualmente;
- o contador de linhas guarda um resumo enquanto o laço avança;
- uma mesma estrutura HTML pode ser gerada várias vezes;
- mudar os dados iniciais não deve exigir copiar novas linhas.

## Critérios de verificação

- todos os multiplicadores do intervalo aparecem uma vez;
- os resultados estão corretos;
- as linhas pares recebem a marca correta;
- o resumo informa a quantidade real de linhas;
- o código usa um único `for`;
- não há dez contas escritas manualmente.

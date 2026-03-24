# Exercício Prático: Analisador de Números

## Objetivo da Atividade

O objetivo desta prática é montar uma lista de números e transformá-la em um pequeno painel de análise, com resultados calculados a partir do array.

## Conceitos trabalhados

- array de números;
- conversão com `Number()`;
- `reduce()`;
- `length`;
- comparação de maior e menor valor;
- atualização de resumo na interface.

## Especificações Técnicas do Sistema

O sistema deve manter um array numérico e recalcular os resultados sempre que um novo valor for inserido ou quando a lista for limpa.

O aplicativo deve permitir:

- adicionar números ao array;
- mostrar os números cadastrados;
- calcular a soma dos valores;
- calcular a média da lista;
- identificar o maior número;
- identificar o menor número;
- limpar todos os dados para iniciar uma nova análise.

## Estrutura mínima esperada

- um campo para digitar um número;
- um botão para adicionar o valor;
- um botão para limpar a análise;
- uma área que mostre a lista de números cadastrados;
- uma área de resumo com soma, média, maior e menor valor.

## Regras de funcionamento

- o valor digitado deve ser convertido para número antes de entrar no array;
- entradas vazias não devem ser adicionadas;
- o resumo deve ser recalculado a partir do array atual, e não de variáveis soltas;
- ao limpar os dados, tanto o array quanto a interface devem voltar ao estado inicial;
- se não houver números cadastrados, a tela deve mostrar uma mensagem adequada ou valores neutros.

## O que observar durante a prática

- campos de formulário devolvem texto, então a conversão é obrigatória;
- arrays numéricos aparecem muito em relatórios e estatísticas simples;
- a mesma lista pode gerar vários resultados diferentes sem duplicar dados.
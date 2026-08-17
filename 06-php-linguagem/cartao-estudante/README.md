# Exercício Introdutório: Cartão de Estudante

## Objetivo da atividade

Imagine que a escola precise exibir uma identificação simples de cada
estudante. Nesta primeira página PHP, você vai montar um cartão usando dados
definidos no próprio arquivo.

O objetivo é perceber duas coisas: o PHP consegue guardar informações em
variáveis e pode misturar essas informações ao HTML que o servidor entrega.

## Conceito central

Nesta atividade, pratique a abertura do PHP com `<?php`, a criação de
variáveis e a exibição de valores com `echo` ou `<?= ... ?>` dentro do HTML.

## Dados iniciais

No início do `index.php`, crie as variáveis `$nomeEstudante`, `$curso`,
`$turno` e `$sala`. Comece com estes valores:

- nome: Ana Souza;
- curso: Informática;
- turno: Manhã;
- sala: Laboratório 2.

## O que você deve construir

Crie um arquivo `index.php` com um título e um cartão de identificação. O
nome deve ficar em destaque, e curso, turno e sala devem aparecer em linhas
separadas.

Por enquanto, não use formulário, array, decisão, repetição nem função
própria. A página será fixa; a única forma de alterar o cartão será mudar os
valores definidos no PHP.

## Solução completa

A resposta completa está em [index.php](./index.php). Tente resolver o
enunciado antes de consultá-la. Depois, compare sua solução com esse arquivo.

## Regras de funcionamento

- todo valor mostrado no cartão deve vir de uma das quatro variáveis;
- não repita manualmente no HTML os textos que já estão nas variáveis;
- mantenha os dados definidos no PHP antes da marcação HTML.

## Casos para testar

- troque apenas o nome e confira se o destaque do cartão foi atualizado;
- troque o turno e a sala e confira se as duas linhas mudaram;
- reutilize uma variável em mais de um ponto da página e observe o resultado.

## O que observar durante a prática

O servidor executa o PHP antes de entregar o HTML ao navegador. Por isso,
quando você altera uma variável, o conteúdo correspondente também muda. Ainda
não há formulário nem interação com o usuário: esse será o foco de atividades
posteriores.

## Critérios de verificação

- a página abre por um servidor PHP;
- os quatro valores aparecem corretamente;
- alterar uma variável altera a saída correspondente;
- o arquivo não contém repetição manual dos valores.

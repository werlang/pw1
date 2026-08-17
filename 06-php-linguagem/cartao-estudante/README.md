# Exercício Introdutório: Cartão de Estudante

## Objetivo da atividade

Criar a primeira página PHP da sequência. O programa deve usar valores
definidos no próprio arquivo e apresentá-los em um cartão simples de
identificação.

O foco é perceber que o PHP pode guardar valores em variáveis e misturá-los ao HTML produzido pelo servidor.

## Conceito central

- abertura do PHP com `<?php`;
- variáveis;
- `echo` ou `<?= ... ?>`;
- PHP misturado ao HTML.

## Dados iniciais

Defina no início do arquivo:

- nome do estudante;
- curso;
- turno;
- sala.

Use as variáveis $nomeEstudante, $curso, $turno e $sala. Comece com Ana
Souza, Informática, Manhã e Laboratório 2.

## Estrutura mínima

- o arquivo `index.php` com a implementação;
- um título para o cartão;
- uma linha HTML para cada dado.

Não use formulário, array, decisão, repetição ou função própria.

## Regras de funcionamento

- todos os valores exibidos devem vir das variáveis;
- o nome deve aparecer como destaque do cartão;
- curso, turno e sala devem aparecer em linhas separadas;
- não repita os valores manualmente no HTML.

## Casos para testar

- troque apenas o nome e confirme que o cartão muda;
- troque o turno e a sala e confirme que as duas linhas são atualizadas;
- deixe todos os dados definidos no PHP antes da marcação HTML.

## O que observar durante a prática

- o servidor executa o PHP antes de entregar o HTML;
- uma variável pode ser usada em mais de um ponto da página;
- neste exercício, a saída é fixa: ainda não há formulário nem interação do usuário.

## Critérios de verificação

- a página abre por um servidor PHP;
- os quatro valores aparecem corretamente;
- alterar uma variável altera a saída correspondente;
- o arquivo não contém repetição manual dos valores.

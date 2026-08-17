# Exercício Introdutório: Status de Frequência

## Objetivo da atividade

Imagine que um professor precise consultar rapidamente a situação de um
estudante. A página deve comparar a frequência com o mínimo exigido e também
considerar a entrega das atividades ou a existência de uma justificativa
aceita.

Você vai resolver esse caso com uma sequência de decisões. Não é necessário
criar cadastro nem formulário: todos os dados ficarão no próprio arquivo PHP.

## Conceito central

Pratique comparações numéricas, valores booleanos, operadores lógicos e as
estruturas `if`, `elseif` e `else` para escolher uma única mensagem.

## Dados iniciais

Crie as variáveis `$frequenciaAtual`, `$frequenciaMinima`,
`$atividadesEntregues` e `$justificativaAceita`. Elas representam,
respectivamente, a frequência atual, o mínimo exigido, a entrega das
atividades e a aceitação da justificativa.

Comece com frequência atual `82`, mínimo `75`, atividades não entregues
(`false`) e justificativa aceita (`true`).

## O que você deve construir

Crie um arquivo `index.php` que mostre a frequência atual e uma mensagem de
situação. Não use formulário, array, repetição nem função própria.

## Solução completa

A resposta completa está em [index.php](./index.php). Tente resolver o
enunciado antes de consultá-la. Depois, compare sua solução com esse arquivo.

## Regras de funcionamento

A decisão deve seguir esta ordem:

- se a frequência estiver abaixo do mínimo, mostre `Recuperação por frequência`;
- se a frequência for igual ou maior que o mínimo e as atividades tiverem sido
  entregues ou houver justificativa aceita, mostre `Estudante apto`;
- em qualquer outro caso, mostre `Atividades pendentes`.

A página deve mostrar somente uma dessas três mensagens. Observe que o valor
exatamente igual ao mínimo atende à segunda regra, pois o limite é inclusivo.

## Casos para testar

- use `82`, mínimo `75`, atividades não entregues e justificativa aceita;
- use `70`, mínimo `75`, atividades entregues e justificativa aceita;
- use `82`, mínimo `75`, atividades não entregues e sem justificativa;
- use `75`, mínimo `75`, atividades não entregues e justificativa aceita.

## O que observar durante a prática

O `if` verifica o primeiro caso, o `elseif` permite testar a próxima regra e
o `else` reúne o que restou. Use `&&` quando as duas condições forem
necessárias, `||` quando qualquer uma de duas alternativas for suficiente e
`>=` para incluir o valor do limite.

## Critérios de verificação

- os três resultados possíveis podem ser testados;
- o caso exatamente igual ao mínimo é tratado corretamente;
- a condição combinada considera a entrega das atividades;
- a mensagem exibida corresponde aos valores comparados;
- a decisão não depende de um texto fixo no lugar dos dados.

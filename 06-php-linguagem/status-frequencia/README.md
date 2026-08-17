# Exercício Introdutório: Status de Frequência

## Objetivo da atividade

Mostrar uma situação conforme a frequência e a entrega de atividades de um estudante. O exercício treina uma decisão em cadeia sem transformar o problema em um cadastro.

## Conceito central

- comparações numéricas;
- valores booleanos;
- operadores lógicos;
- `if`, `elseif` e `else`;
- saída condicional.

## Dados iniciais

Defina quatro variáveis:

- frequência atual, em porcentagem;
- frequência mínima exigida;
- indicador booleano informando se as atividades foram entregues;
- indicador booleano informando se existe uma justificativa aceita.

Use os nomes $frequenciaAtual, $frequenciaMinima, $atividadesEntregues e
$justificativaAceita para essas variáveis.

Comece com frequência atual `82`, mínimo `75`, atividades entregues como `false` e justificativa aceita como `true`.

## Estrutura mínima

- o arquivo `index.php` com uma implementação de referência;
- uma linha mostrando a frequência atual;
- uma mensagem de situação.

Não use formulário, array, repetição ou função própria.

Leia a implementação, altere os dados no início do arquivo e teste cada
resultado descrito nas regras.

## Regras de funcionamento

- quando a frequência estiver abaixo do mínimo, mostre `Recuperação por frequência`;
- quando a frequência atingir o mínimo e as atividades tiverem sido entregues ou houver justificativa aceita, mostre `Estudante apto`;
- nos demais casos, mostre `Atividades pendentes`;
- mostre somente uma das três mensagens.

## Casos para testar

- teste `82`, mínimo `75`, atividades não entregues e justificativa aceita;
- teste `70`, mínimo `75`, atividades entregues e justificativa aceita;
- teste `82`, mínimo `75`, atividades não entregues e sem justificativa;
- teste `75`, mínimo `75`, atividades não entregues e justificativa aceita;

## O que observar durante a prática

- `if` testa o primeiro caso;
- `elseif` permite testar uma nova regra sem repetir a página inteira;
- `else` representa os casos restantes;
- `&&` exige que duas condições sejam verdadeiras;
- `||` aceita uma de duas alternativas;
- o operador `>=` inclui o valor do limite.

## Critérios de verificação

- os três resultados possíveis podem ser testados;
- o caso exatamente igual ao mínimo é tratado corretamente;
- a condição combinada usa o booleano das atividades;
- a mensagem exibida corresponde à comparação;
- não há decisão baseada em texto fixo.

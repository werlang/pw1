# Exercício: Buscador de Rotas Escolares

## Objetivo

Criar uma consulta GET cuja URL possa ser copiada e reaberta com os mesmos filtros.

## Dados

Mantenha em PHP um array de rotas com bairro, turno, acessibilidade e quantidade de vagas.

## Requisitos

- oferecer filtros por bairro, turno e necessidade de acessibilidade;
- usar `method="get"` e ler os valores com segurança;
- considerar filtros vazios como “qualquer valor”;
- preservar as opções selecionadas após a busca;
- mostrar somente rotas compatíveis e o total encontrado;
- exibir uma mensagem específica quando não houver resultado.

## Conceitos trabalhados

GET, parâmetros opcionais, normalização, filtros de array, preservação de campos e escape na saída.

## Critérios de verificação

- recarregar a URL resultante deve repetir a consulta;
- combinar dois filtros deve restringir os resultados;
- o valor `"0"` não pode ser confundido com campo ausente.

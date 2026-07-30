# Exercício: Comanda da Cantina por Rodadas

## Objetivo

Manter uma comanda entre várias requisições e separar os itens em rodadas de retirada, usando a sessão como fonte do estado.

## Requisitos

- iniciar a sessão antes de qualquer saída;
- guardar na rodada atual somente código e quantidade;
- obter nomes e preços de um catálogo controlado pelo servidor;
- adicionar, incrementar, diminuir e remover itens por ações POST;
- fechar uma rodada, movendo seu resumo para o histórico da comanda;
- recalcular total da rodada e total acumulado;
- encerrar a comanda e redirecionar para evitar repetição do POST.

## Conceitos trabalhados

`$_SESSION`, estado associativo com rodada atual e histórico, ações POST, padrão POST/Redirect/GET e cálculo derivado.

## Critérios de verificação

- preço enviado pelo navegador deve ser ignorado;
- atualizar a página não pode repetir a última adição ou fechamento;
- fechar uma rodada não pode apagar as anteriores;
- duas abas da mesma sessão devem enxergar a mesma comanda.

# Exercício Prático: Urna de Prioridades

## Objetivo da Atividade

O objetivo desta prática é criar uma urna local em que cada participante distribui 10 pontos entre propostas de melhoria da escola. O desafio é salvar votos compostos, impedir código repetido e calcular um ranking.

## Conceitos trabalhados

- array de votos;
- objeto de pontuação por proposta;
- `localStorage`;
- renderização de controles dinâmicos;
- validação de soma;
- agregação de resultados com `reduce()`;
- bloqueio de voto duplicado.

## Especificações Técnicas do Sistema

O aplicativo deve atender aos seguintes pontos:

- existem propostas fixas no array `proposals`;
- o participante informa um código de votante;
- cada voto distribui exatamente 10 pontos entre as propostas;
- o voto deve ser salvo na chave `urna-prioridades`;
- não deve ser possível votar duas vezes com o mesmo código;
- o painel deve mostrar pontos restantes antes do envio;
- o ranking deve somar os pontos de todos os votos;
- deve existir um botão para limpar apenas o voto em montagem, sem apagar os votos salvos.

## O que você deve fazer

Edite somente o arquivo `script.js`.

### Parte 1 - Implementar `loadVotes()` e `saveVotes()`

Carregue e persista o array de votos.

### Parte 2 - Implementar `changeDraftPoints(proposalId, delta)`

Some ou subtraia pontos da proposta respeitando o limite total de 10 pontos.

### Parte 3 - Implementar `getRemainingPoints()`

Retorne quantos pontos ainda faltam distribuir.

### Parte 4 - Implementar `submitVote()`

Valide o código, impeça duplicidade, valide soma igual a 10 e salve o voto.

### Parte 5 - Implementar `renderBallot()` e `renderRanking()`

Renderize a cédula com botões de mais/menos e o ranking agregado.

## Resumo do fluxo

1. O participante distribui 10 pontos.
2. O sistema valida se todos os pontos foram usados.
3. O voto salvo contém um objeto de pontuações.
4. O ranking é recalculado a partir de todos os votos persistidos.

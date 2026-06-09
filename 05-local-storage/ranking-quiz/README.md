# Exercício Prático: Ranking de Quiz

## Objetivo da Atividade

O objetivo desta prática é criar uma rodada de quiz local com pontuação persistida. O fluxo não é um cadastro: o estudante precisa controlar uma pergunta por vez, calcular pontos e manter um ranking de tentativas.

## Conceitos trabalhados

- array fixo de perguntas;
- objeto de tentativa em andamento;
- `localStorage`;
- navegação por índice;
- cálculo de pontuação;
- ranking ordenado;
- persistência de histórico.

## Especificações Técnicas do Sistema

O aplicativo deve atender aos seguintes pontos:

- o array `questions` já contém perguntas, alternativas e resposta correta;
- o usuário informa o nome antes de iniciar;
- durante a tentativa, o sistema guarda questão atual, acertos e respostas;
- ao responder, o sistema deve avançar para a próxima pergunta;
- ao finalizar, a tentativa deve ser adicionada ao ranking salvo na chave `ranking-quiz`;
- o ranking deve mostrar nome, acertos, total e percentual;
- o ranking deve aparecer ordenado pelo maior percentual;
- deve existir uma ação para abandonar a tentativa atual sem apagar o ranking.

## O que você deve fazer

Edite somente o arquivo `script.js`.

### Parte 1 - Implementar `loadRanking()` e `saveRanking()`

Carregue e salve o array de resultados.

### Parte 2 - Implementar `startAttempt()`

Crie a tentativa em andamento com nome, índice inicial, acertos e respostas vazias.

### Parte 3 - Implementar `answerQuestion(optionIndex)`

Compare a alternativa escolhida com a resposta correta, atualize acertos e avance.

### Parte 4 - Implementar `finishAttempt()`

Crie o resultado final, adicione ao ranking, salve e limpe a tentativa.

### Parte 5 - Implementar `renderQuestion()` e `renderRanking()`

Mostre a pergunta atual, alternativas e ranking ordenado.

## Resumo do fluxo

1. O usuário inicia uma tentativa.
2. A tela mostra uma pergunta por vez.
3. Cada resposta altera a tentativa em memória.
4. Ao final, só o resultado consolidado entra no `localStorage`.

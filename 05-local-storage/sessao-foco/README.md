# Exercício Prático: Sessão de Foco

## Objetivo da Atividade

O objetivo desta prática é implementar uma sessão de estudo com temporizador persistente. O desafio principal é salvar um objeto de estado e recalcular o tempo restante quando a página for recarregada.

## Conceitos trabalhados

- objeto de estado;
- `localStorage`;
- `Date.now()`;
- cálculo de tempo decorrido;
- estados de interface;
- botões de iniciar, pausar e reiniciar;
- renderização recorrente com `setInterval()`.

## Especificações Técnicas do Sistema

O aplicativo deve atender aos seguintes pontos:

- o usuário informa uma disciplina e a duração em minutos;
- ao iniciar, o sistema deve salvar uma sessão na chave `sessao-foco`;
- o objeto salvo deve conter disciplina, duração total, tempo restante, status e horário de início;
- ao recarregar a página com a sessão rodando, o sistema deve descontar o tempo já decorrido;
- deve existir botão para pausar;
- deve existir botão para retomar;
- deve existir botão para reiniciar e apagar a sessão salva;
- quando o tempo chegar a zero, a sessão deve mudar para status `concluida`.

## O que você deve fazer

Edite somente o arquivo `script.js`.

### Parte 1 - Implementar `loadSession()` e `saveSession()`

Carregue e salve o objeto da sessão.

### Parte 2 - Implementar `getVisibleRemainingSeconds()`

Calcule o tempo restante real quando a sessão estiver rodando.

### Parte 3 - Implementar `startSession()`

Crie uma nova sessão com status `rodando`.

### Parte 4 - Implementar `pauseSession()` e `resumeSession()`

Pause guardando o tempo restante atual e retome registrando um novo `startedAt`.

### Parte 5 - Implementar `resetSession()`

Apague a sessão do `localStorage` e volte para o estado inicial.

### Parte 6 - Implementar `renderSession()`

Mostre disciplina, status, tempo formatado e habilite/desabilite botões conforme o estado.

## Resumo do fluxo

1. O usuário inicia um foco de estudo.
2. A sessão salva sabe quanto tempo tinha e quando começou.
3. Ao recarregar, o tempo visível é recalculado.
4. Pausar e retomar alteram o objeto salvo, não apenas a tela.

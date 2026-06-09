# Exercício Prático: Trilha de Leitura

## Objetivo da Atividade

O objetivo desta prática é criar um leitor de trilha com progresso salvo. O estudante precisa persistir o livro escolhido, o capítulo atual e anotações por capítulo.

## Conceitos trabalhados

- objeto de progresso;
- array fixo de livros;
- `localStorage`;
- navegação por estado;
- propriedade dinâmica para notas por capítulo;
- barra de progresso;
- reconstrução da tela a partir do estado salvo.

## Especificações Técnicas do Sistema

O aplicativo deve atender aos seguintes pontos:

- o array `books` já contém livros e capítulos;
- o usuário escolhe um livro para iniciar;
- o progresso deve ser salvo na chave `trilha-leitura`;
- o objeto salvo deve conter `bookId`, `chapterIndex` e `notes`;
- os botões próximo e anterior devem navegar entre capítulos;
- o campo de nota deve salvar uma anotação diferente para cada capítulo;
- ao trocar de capítulo, a nota correspondente deve aparecer;
- a barra de progresso deve indicar quanto do livro já foi percorrido;
- deve existir uma ação para concluir a leitura e limpar o progresso salvo.

## O que você deve fazer

Edite somente o arquivo `script.js`.

### Parte 1 - Implementar `loadProgress()` e `saveProgress()`

Carregue e salve o objeto de progresso.

### Parte 2 - Implementar `startBook()`

Crie um progresso inicial para o livro escolhido.

### Parte 3 - Implementar `getCurrentBook()` e `getCurrentChapter()`

Localize o livro e o capítulo atuais a partir do objeto salvo.

### Parte 4 - Implementar `goToPreviousChapter()` e `goToNextChapter()`

Altere `chapterIndex` respeitando os limites do livro.

### Parte 5 - Implementar `saveCurrentNote()`

Salve a anotação usando uma chave do capítulo dentro de `notes`.

### Parte 6 - Implementar `renderReader()`

Mostre título do livro, capítulo atual, nota salva e progresso percentual.

## Resumo do fluxo

1. O usuário escolhe um livro.
2. A leitura passa a ser controlada por um objeto de progresso.
3. Cada capítulo possui uma nota própria.
4. Ao recarregar, o leitor volta para o mesmo capítulo.

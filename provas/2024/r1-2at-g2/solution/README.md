# PWI - Reavaliação Semestre 01

## Introdução

Nesta prova, você deverá implementar um sistema de gerenciamento de livros com cadastro de livros e visualização dos livros cadastrados.

## Questão 1

**(Peso 2)** No arquivo `book.js`, ao clicar no botão verde no canto inferior direito, um modal abrirá permitindo o cadastro de um novo livro. Implemente o cadastro de livros com os seguintes campos:
- Título do Livro
- Autor
- Gênero
- Ano de Publicação
- Dificuldade de Leitura
    - Fácil
    - Médio
    - Difícil

```JavaScript
const book = {
    title: 'Título do Livro',
    author: 'Autor',
    genre: 'Gênero',
    year: 'Ano de Publicação',
    difficulty: 'Dificuldade de Leitura'
};
```

Os livros devem ser inseridos em uma lista de objetos e salvos no `localStorage` utilizando a chave `bookList`.


## Questão 2

**(Peso 2)** Implemente a visualização dos livros cadastrados. Ao carregar a página as informações devem ser recuperadas do `localStorage` (`bookList`) e exibidas na tela, cada livro ocupará uma `li`.

```html
<li book-id="1">
   <span>Título do Livro - Autor: X</span>
   <button class="btn-delete">Excluir</button>
   <button class="btn-edit">Editar</button>
</li>
```

### Implemente a funcionalidade dos botões “Excluir” e “Editar”.

- **(Peso 2)** O botão “Excluir” ao ser pressionado deve retirar o livro da lista de objetos e a lista deve ser atualizada (lembrando também de atualizar o armazenamento local).
- **(Peso 3)** O botão “Editar” ao ser pressionado deve ativar a modal com a possibilidade de alterar os dados do livro. Quando a modal se abre, os campos devem estar preenchidos com os dados atuais do livro. Ao clicar no botão “Salvar”, os dados do livro devem ser alterados e a lista de livros deve ser atualizada. A classe CSS active deve ser adicionada ao modal para que ele seja exibido.

### Dicas de abordagens para resolver o problema

1. **Abordagem 1**: Adicionar um eventListener para cada botão de cada li da lista de livros no momento da criação de cada li.
2. **Abordagem 2**: Adicionar um eventListener na tag main e verificar qual botão foi clicado através do event.target, que é passado como argumento para a função de callback do eventListener.
3. **Abordagem 3**: Quando criada a lista de livros, adicionar um id para cada li com um valor único (ex.: book-id-1). Após, selecionar todos os botões de cada li e adicionar um eventListener para cada um deles, verificando qual botão foi clicado através do id do li pai do botão clicado.
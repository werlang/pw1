const ano = document.querySelector('#ano');
const editora = document.querySelector('#editora');
const titulo = document.querySelector('#titulo');
const autor = document.querySelector('#autor');
const button = document.querySelector('button');
const resposta = document.querySelector('#resposta');

const book = {};

button.addEventListener('click', () => {
    book.titulo = titulo.value;
    book.ano = ano.value;
    book.editora = editora.value;
    book.autor = autor.value;

    resposta.innerHTML = `
        <h2>Livro cadastrado com sucesso.</h2>
        <div id="info">O livro <span>${book.titulo}</span> foi publicado pela editora <span>${book.editora}</span> em <span>${book.ano}</span> e escrito por <span>${book.autor}</span>.</div>
    `;
})
const bookList = document.querySelector('#book-list');
const bookModal = document.querySelector('.modal');
const bookModalClose = document.querySelector('.close-button');
const btnAddBook = document.querySelector('#btn-add-book');

// Exemplo de como abrir o modal
btnAddBook.addEventListener('click', (event) => {
    bookModal.classList.add('active');
});

// Evento que fecha o modal
bookModalClose.addEventListener('click', () => {
    bookModal.classList.remove('active');
})

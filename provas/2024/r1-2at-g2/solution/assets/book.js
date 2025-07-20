const bookList = document.querySelector('#book-list');
const bookModal = document.querySelector('.modal');
const bookModalClose = document.querySelector('.close-button');
const btnAddBook = document.querySelector('#btn-add-book');

const title = bookModal.querySelector('#edit-book-title');
const author = bookModal.querySelector('#edit-author');
const genre = bookModal.querySelector('#edit-genre');
const year = bookModal.querySelector('#edit-year');
const difficulty = bookModal.querySelector('#edit-difficulty');

let isEdit = null;
let editIndex = null;

function openModal() {
    form.reset();
    bookModal.classList.add('active');
}

// Exemplo de como abrir o modal
btnAddBook.addEventListener('click', (event) => {
    isEdit = false;
    openModal();
});

function closeModal() {
    bookModal.classList.remove('active');
}

// Evento que fecha o modal
bookModalClose.addEventListener('click', () => {
    closeModal();
})

function loadBooks() {
    const json = localStorage.getItem('bookList');
    if (!json) {
        return [];
    }
    return JSON.parse(json);
}

function saveBooks() {
    const json = JSON.stringify(books);
    localStorage.setItem('bookList', json);
}

const books = loadBooks();

const form = bookModal.querySelector('form');
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const book = {
        title: title.value,
        author: author.value,
        genre: genre.value,
        year: year.value,
        difficulty: difficulty.value,
    }

    // editar
    if (isEdit) {
        books[editIndex] = book;
    }
    // inserir
    else {
        books.push(book);
    }

    saveBooks();    
    form.reset();
    closeModal();
    refreshList();
});

function refreshList() {
    bookList.innerHTML = '';
    books.forEach((book, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${book.title} - Autor: ${book.author}</span>
            <button class="btn-delete">Excluir</button>
            <button class="btn-edit">Editar</button>
        `;
        bookList.append(li);

        const btnDelete = li.querySelector('.btn-delete');
        btnDelete.addEventListener('click', () => {
            books.splice(index, 1);
            saveBooks();
            refreshList();
        });

        const btnEdit = li.querySelector('.btn-edit');
        btnEdit.addEventListener('click', () => {
            openModal();
            isEdit = true;
            editIndex = index;

            title.value = book.title;
            author.value = book.author;
            genre.value = book.genre;
            year.value = book.year;
            difficulty.value = book.difficulty;
        });
    })
}
refreshList();


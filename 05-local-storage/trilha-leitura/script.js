const STORAGE_KEY = 'trilha-leitura';

const books = [
    {
        id: 'dom',
        title: 'Guia de DOM para Iniciantes',
        chapters: ['Seletores', 'Eventos', 'Criação de elementos', 'Renderização'],
    },
    {
        id: 'js',
        title: 'JavaScript Essencial',
        chapters: ['Variáveis', 'Objetos', 'Arrays', 'Funções', 'Storage'],
    },
    {
        id: 'web',
        title: 'Projeto Web na Prática',
        chapters: ['HTML', 'CSS', 'Interação', 'Persistência'],
    },
];

const bookSelect = document.querySelector('#book-select');
const noteInput = document.querySelector('#note-input');
const message = document.querySelector('#message');

let progress = loadProgress();

/**
 * Recupera o progresso salvo.
 * @returns {object | null} Progresso de leitura atual.
 */
function loadProgress() {
    return null;

    // Passo a passo:
    // 1. Leia localStorage.getItem(STORAGE_KEY).
    // 2. Se não houver progresso, retorne null.
    // 3. Se houver, retorne JSON.parse(json).
}

/**
 * Salva ou remove o progresso atual.
 */
function saveProgress() {
    // Passo a passo:
    // 1. Se progress for null, remova STORAGE_KEY.
    // 2. Caso contrário, salve JSON.stringify(progress).
}

/**
 * Inicia uma trilha no primeiro capítulo do livro selecionado.
 */
function startBook() {
    message.textContent = 'Implemente startBook().';

    // Passo a passo:
    // 1. Leia bookSelect.value.
    // 2. Valide se um livro foi escolhido.
    // 3. Crie progress com bookId, chapterIndex = 0 e notes = {}.
    // 4. Salve e chame renderReader().
}

/**
 * Localiza o livro atual.
 * @returns {object | undefined} Livro em andamento.
 */
function getCurrentBook() {
    return undefined;

    // Passo a passo:
    // 1. Se progress for null, retorne undefined.
    // 2. Encontre em books o livro com id igual a progress.bookId.
}

/**
 * Localiza o capítulo atual.
 * @returns {string} Título do capítulo atual.
 */
function getCurrentChapter() {
    return '';

    // Passo a passo:
    // 1. Obtenha o livro atual.
    // 2. Se não houver livro, retorne ''.
    // 3. Retorne book.chapters[progress.chapterIndex].
}

/**
 * Navega para o capítulo anterior.
 */
function goToPreviousChapter() {
    message.textContent = 'Implemente goToPreviousChapter().';

    // Passo a passo:
    // 1. Se não houver progresso, interrompa.
    // 2. Se chapterIndex já for 0, interrompa.
    // 3. Subtraia 1 de chapterIndex.
    // 4. Salve e renderize.
}

/**
 * Navega para o próximo capítulo.
 */
function goToNextChapter() {
    message.textContent = 'Implemente goToNextChapter().';

    // Passo a passo:
    // 1. Obtenha o livro atual.
    // 2. Se não houver progresso ou livro, interrompa.
    // 3. Se chapterIndex já for o último, interrompa.
    // 4. Some 1 em chapterIndex.
    // 5. Salve e renderize.
}

/**
 * Salva uma anotação específica do capítulo atual.
 */
function saveCurrentNote() {
    message.textContent = 'Implemente saveCurrentNote().';

    // Passo a passo:
    // 1. Se não houver progresso, interrompa.
    // 2. Monte uma chave como `chapter-${progress.chapterIndex}`.
    // 3. Salve noteInput.value em progress.notes[chave].
    // 4. Salve no localStorage.
}

/**
 * Conclui a leitura removendo o progresso salvo.
 */
function finishReading() {
    progress = null;
    saveProgress();
    renderReader();
}

/**
 * Renderiza opções de livro.
 */
function renderBookOptions() {
    bookSelect.innerHTML = '<option value="">Selecione</option>';

    books.forEach(function(book) {
        const option = document.createElement('option');
        option.value = book.id;
        option.textContent = book.title;
        bookSelect.appendChild(option);
    });
}

/**
 * Atualiza o leitor a partir do progresso salvo.
 */
function renderReader() {
    document.querySelector('#chapter-title').textContent = 'Implemente renderReader().';

    // Passo a passo:
    // 1. Se não houver progresso, mostre estado vazio e desabilite os botões de leitura.
    // 2. Obtenha livro e capítulo atuais.
    // 3. Atualize título do livro, título do capítulo e posição.
    // 4. Calcule percentual: (chapterIndex + 1) / total de capítulos * 100.
    // 5. Ajuste width de #progress-bar.
    // 6. Carregue a nota do capítulo atual em noteInput.
    // 7. Desabilite anterior no primeiro capítulo e próximo no último.
}

document.querySelector('#start-button').addEventListener('click', startBook);
document.querySelector('#previous-button').addEventListener('click', goToPreviousChapter);
document.querySelector('#next-button').addEventListener('click', goToNextChapter);
document.querySelector('#save-note-button').addEventListener('click', saveCurrentNote);
document.querySelector('#finish-button').addEventListener('click', finishReading);

renderBookOptions();
renderReader();

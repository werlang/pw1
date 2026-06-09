const STORAGE_KEY = 'ranking-quiz';

const questions = [
    {
        title: 'Qual método salva um valor no localStorage?',
        options: ['getItem()', 'setItem()', 'removeItem()', 'parse()'],
        correctIndex: 1,
    },
    {
        title: 'Por que usamos JSON.stringify() antes de salvar um array?',
        options: ['Para ordenar o array', 'Para transformar em texto', 'Para apagar chaves', 'Para criar eventos'],
        correctIndex: 1,
    },
    {
        title: 'O que localStorage.getItem() retorna quando a chave não existe?',
        options: ['undefined', 'false', 'null', '[]'],
        correctIndex: 2,
    },
    {
        title: 'Qual storage é mais adequado para rascunho temporário de uma aba?',
        options: ['sessionStorage', 'localStorage', 'JSON', 'DOM'],
        correctIndex: 0,
    },
];

const playerInput = document.querySelector('#player-input');
const message = document.querySelector('#message');
const optionsList = document.querySelector('#options-list');
const rankingList = document.querySelector('#ranking-list');

let ranking = loadRanking();
let currentAttempt = null;

/**
 * Carrega resultados salvos.
 * @returns {Array<object>} Ranking persistido.
 */
function loadRanking() {
    return [];

    // Passo a passo:
    // 1. Leia localStorage.getItem(STORAGE_KEY).
    // 2. Se não houver dado salvo, retorne [].
    // 3. Se houver, retorne JSON.parse(json).
}

/**
 * Salva o ranking consolidado.
 */
function saveRanking() {
    // Passo a passo:
    // 1. Converta ranking para JSON.
    // 2. Grave na chave STORAGE_KEY.
}

/**
 * Inicia uma tentativa em memória. O ranking só muda no final.
 */
function startAttempt() {
    message.textContent = 'Implemente startAttempt().';

    // Passo a passo:
    // 1. Capture e normalize o nome.
    // 2. Valide se o nome foi preenchido.
    // 3. Crie currentAttempt com player, currentIndex = 0, hits = 0 e answers = [].
    // 4. Chame renderQuestion().
}

/**
 * Registra uma resposta e avança a tentativa.
 * @param {number} optionIndex Índice da alternativa escolhida.
 */
function answerQuestion(optionIndex) {
    message.textContent = 'Implemente answerQuestion().';

    // Passo a passo:
    // 1. Se não houver currentAttempt, interrompa.
    // 2. Localize a pergunta atual.
    // 3. Compare optionIndex com correctIndex.
    // 4. Se acertou, some 1 em hits.
    // 5. Registre a resposta em answers.
    // 6. Avance currentIndex.
    // 7. Se acabou, chame finishAttempt(); caso contrário, renderQuestion().
}

/**
 * Consolida a tentativa atual no ranking persistido.
 */
function finishAttempt() {
    message.textContent = 'Implemente finishAttempt().';

    // Passo a passo:
    // 1. Calcule percentual de acertos.
    // 2. Crie um resultado com player, hits, total e percent.
    // 3. Adicione em ranking.
    // 4. Salve no localStorage.
    // 5. Limpe currentAttempt e atualize pergunta/ranking.
}

/**
 * Abandona somente a tentativa em andamento.
 */
function abandonAttempt() {
    currentAttempt = null;
    renderQuestion();
}

/**
 * Mostra a pergunta atual e suas alternativas.
 */
function renderQuestion() {
    optionsList.innerHTML = '<p class="empty-state">Implemente renderQuestion().</p>';

    // Passo a passo:
    // 1. Se não houver tentativa, mostre estado inicial.
    // 2. Atualize #progress-label com questão atual e total.
    // 3. Atualize #question-title.
    // 4. Renderize as alternativas como botões.
    // 5. Cada botão deve chamar answerQuestion(index).
}

/**
 * Renderiza o ranking ordenado por percentual e acertos.
 */
function renderRanking() {
    rankingList.innerHTML = '<p class="empty-state">Implemente renderRanking().</p>';

    // Passo a passo:
    // 1. Atualize #ranking-count.
    // 2. Copie e ordene ranking por percent desc e hits desc.
    // 3. Renderize nome, acertos, total e percentual.
    // 4. Se ranking estiver vazio, mostre estado vazio.
}

document.querySelector('#start-button').addEventListener('click', startAttempt);
document.querySelector('#abandon-button').addEventListener('click', abandonAttempt);

renderQuestion();
renderRanking();

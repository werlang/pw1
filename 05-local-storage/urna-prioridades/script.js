const STORAGE_KEY = 'urna-prioridades';
const TOTAL_POINTS = 10;

const proposals = [
    { id: 'lab', title: 'Melhorar os laboratórios' },
    { id: 'biblioteca', title: 'Ampliar acervo da biblioteca' },
    { id: 'esporte', title: 'Comprar materiais esportivos' },
    { id: 'convivencia', title: 'Criar espaço de convivência' },
];

const voterCodeInput = document.querySelector('#voter-code-input');
const ballotList = document.querySelector('#ballot-list');
const rankingList = document.querySelector('#ranking-list');
const message = document.querySelector('#message');

let votes = loadVotes();
let draftPoints = createEmptyDraft();

/**
 * Cria uma cédula vazia com todas as propostas zeradas.
 * @returns {Record<string, number>} Pontos por proposta.
 */
function createEmptyDraft() {
    const draft = {};

    proposals.forEach(function(proposal) {
        draft[proposal.id] = 0;
    });

    return draft;
}

/**
 * Recupera os votos salvos.
 * @returns {Array<object>} Lista de votos enviados.
 */
function loadVotes() {
    return [];

    // Passo a passo:
    // 1. Leia localStorage.getItem(STORAGE_KEY).
    // 2. Se não existir dado salvo, retorne [].
    // 3. Se existir, retorne JSON.parse(json).
}

/**
 * Salva todos os votos enviados.
 */
function saveVotes() {
    // Passo a passo:
    // 1. Converta votes para JSON.
    // 2. Grave na chave STORAGE_KEY.
}

/**
 * Calcula quantos pontos ainda não foram distribuídos na cédula atual.
 * @returns {number} Pontos restantes.
 */
function getRemainingPoints() {
    return TOTAL_POINTS;

    // Passo a passo:
    // 1. Some os valores de draftPoints.
    // 2. Retorne TOTAL_POINTS - soma.
}

/**
 * Altera os pontos de uma proposta sem permitir saldo negativo ou ultrapassar o total.
 * @param {string} proposalId Identificador da proposta.
 * @param {number} delta Variação desejada, normalmente 1 ou -1.
 */
function changeDraftPoints(proposalId, delta) {
    message.textContent = 'Implemente changeDraftPoints().';

    // Passo a passo:
    // 1. Verifique a pontuação atual da proposta.
    // 2. Se delta for negativo, não permita ficar abaixo de 0.
    // 3. Se delta for positivo, não permita usar mais que TOTAL_POINTS.
    // 4. Atualize draftPoints[proposalId].
    // 5. Chame renderBallot().
}

/**
 * Envia a cédula quando o código é único e os 10 pontos foram usados.
 */
function submitVote() {
    message.textContent = 'Implemente submitVote().';

    // Passo a passo:
    // 1. Capture e normalize o código do votante.
    // 2. Valide se o código foi preenchido.
    // 3. Verifique se votes já possui esse voterCode.
    // 4. Valide se getRemainingPoints() é 0.
    // 5. Adicione em votes um objeto com voterCode e points.
    // 6. Salve no localStorage, limpe a cédula e atualize a tela.
}

/**
 * Limpa somente a cédula em montagem.
 */
function clearDraft() {
    draftPoints = createEmptyDraft();
    renderBallot();
}

/**
 * Renderiza as propostas com botões de distribuição de pontos.
 */
function renderBallot() {
    ballotList.innerHTML = '<p>Implemente renderBallot().</p>';

    // Passo a passo:
    // 1. Atualize #remaining-points com getRemainingPoints().
    // 2. Limpe ballotList.
    // 3. Para cada proposta, renderize título, pontuação atual, botão + e botão -.
    // 4. Os botões devem chamar changeDraftPoints(proposal.id, 1 ou -1).
}

/**
 * Renderiza o ranking agregado a partir dos votos salvos.
 */
function renderRanking() {
    rankingList.innerHTML = '<p>Implemente renderRanking().</p>';

    // Passo a passo:
    // 1. Atualize #vote-count.
    // 2. Some os pontos de todos os votos por proposta.
    // 3. Ordene as propostas pela maior pontuação.
    // 4. Renderize título da proposta e total de pontos.
}

document.querySelector('#submit-button').addEventListener('click', submitVote);
document.querySelector('#clear-draft-button').addEventListener('click', clearDraft);

renderBallot();
renderRanking();

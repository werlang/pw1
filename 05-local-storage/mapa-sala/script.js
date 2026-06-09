const STORAGE_KEY = 'mapa-sala';
const ROWS = ['A', 'B', 'C', 'D'];
const SEATS_PER_ROW = 5;

const studentInput = document.querySelector('#student-input');
const rowSelect = document.querySelector('#row-select');
const seatSelect = document.querySelector('#seat-select');
const assignButton = document.querySelector('#assign-button');
const message = document.querySelector('#message');
const seatMapContainer = document.querySelector('#seat-map');

let seatMap = loadSeatMap();

/**
 * Recupera o mapa salvo. O estado esperado é um objeto indexado pela chave do assento.
 * @returns {Record<string, string>} Mapa de assentos ocupados.
 */
function loadSeatMap() {
    return {};

    // Passo a passo:
    // 1. Leia localStorage.getItem(STORAGE_KEY).
    // 2. Se não houver dado salvo, retorne {}.
    // 3. Se houver, retorne JSON.parse(json).
}

/**
 * Salva o objeto completo do mapa de sala.
 */
function saveSeatMap() {
    // Passo a passo:
    // 1. Converta seatMap com JSON.stringify().
    // 2. Grave na chave STORAGE_KEY.
}

/**
 * Monta a chave composta do assento selecionado.
 * @returns {string} Chave como A-1, B-4 ou string vazia.
 */
function getSelectedSeatKey() {
    return '';

    // Passo a passo:
    // 1. Leia rowSelect.value e seatSelect.value.
    // 2. Se faltar algum valor, retorne ''.
    // 3. Retorne `${row}-${seat}`.
}

/**
 * Ocupa um assento livre com o nome informado.
 */
function assignSeat() {
    message.textContent = 'Implemente assignSeat().';

    // Passo a passo:
    // 1. Capture e normalize o nome do estudante.
    // 2. Obtenha a chave do assento com getSelectedSeatKey().
    // 3. Valide nome e assento.
    // 4. Se seatMap[seatKey] já existir, mostre erro e interrompa.
    // 5. Salve seatMap[seatKey] = studentName.
    // 6. Grave no localStorage e chame renderSeatMap().
}

/**
 * Libera um assento removendo sua chave do objeto salvo.
 * @param {string} seatKey Chave do assento.
 */
function releaseSeat(seatKey) {
    message.textContent = 'Implemente releaseSeat().';

    // Passo a passo:
    // 1. Use delete seatMap[seatKey].
    // 2. Salve no localStorage.
    // 3. Chame renderSeatMap().
}

/**
 * Renderiza todos os assentos da sala, livres ou ocupados.
 */
function renderSeatMap() {
    seatMapContainer.innerHTML = '<p>Implemente renderSeatMap().</p>';

    // Passo a passo:
    // 1. Calcule ocupados com Object.keys(seatMap).length.
    // 2. Atualize #occupied-count e #free-count.
    // 3. Limpe seatMapContainer.
    // 4. Para cada fileira e cadeira, monte a chave do assento.
    // 5. Renderize um botão/card livre ou ocupado.
    // 6. Em assentos ocupados, crie botão que chame releaseSeat(seatKey).
}

assignButton.addEventListener('click', assignSeat);

renderSeatMap();

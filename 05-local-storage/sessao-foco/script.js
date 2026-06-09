const STORAGE_KEY = 'sessao-foco';

const subjectInput = document.querySelector('#subject-input');
const minutesInput = document.querySelector('#minutes-input');
const message = document.querySelector('#message');

let currentSession = loadSession();

/**
 * Carrega a sessão salva no navegador.
 * @returns {object | null} Sessão atual ou null.
 */
function loadSession() {
    return null;

    // Passo a passo:
    // 1. Leia localStorage.getItem(STORAGE_KEY).
    // 2. Se não houver dado salvo, retorne null.
    // 3. Se houver, retorne JSON.parse(json).
}

/**
 * Salva a sessão atual ou remove a chave quando não existir sessão.
 */
function saveSession() {
    // Passo a passo:
    // 1. Se currentSession for null, use localStorage.removeItem(STORAGE_KEY).
    // 2. Caso contrário, salve JSON.stringify(currentSession).
}

/**
 * Formata segundos como MM:SS.
 * @param {number} seconds Tempo em segundos.
 * @returns {string} Tempo formatado.
 */
function formatSeconds(seconds) {
    const minutes = Math.floor(seconds / 60);
    const rest = seconds % 60;

    return `${String(minutes).padStart(2, '0')}:${String(rest).padStart(2, '0')}`;
}

/**
 * Calcula o tempo visível considerando o tempo decorrido desde o início.
 * @returns {number} Segundos restantes.
 */
function getVisibleRemainingSeconds() {
    return 0;

    // Passo a passo:
    // 1. Se não houver sessão, retorne 0.
    // 2. Se status não for 'rodando', retorne currentSession.remainingSeconds.
    // 3. Calcule quantos segundos passaram desde currentSession.startedAt.
    // 4. Retorne remainingSeconds - elapsed, sem permitir valor negativo.
}

/**
 * Cria uma nova sessão rodando.
 */
function startSession() {
    message.textContent = 'Implemente startSession().';

    // Passo a passo:
    // 1. Capture disciplina e duração.
    // 2. Valide se disciplina foi preenchida e duração é maior que 0.
    // 3. Crie currentSession com subject, totalSeconds, remainingSeconds, status = 'rodando' e startedAt = Date.now().
    // 4. Salve no localStorage e chame renderSession().
}

/**
 * Pausa a sessão usando o tempo visível atual como novo restante.
 */
function pauseSession() {
    message.textContent = 'Implemente pauseSession().';

    // Passo a passo:
    // 1. Se não houver sessão rodando, interrompa.
    // 2. Atualize remainingSeconds com getVisibleRemainingSeconds().
    // 3. Altere status para 'pausada'.
    // 4. Salve e renderize.
}

/**
 * Retoma uma sessão pausada registrando novo horário de início.
 */
function resumeSession() {
    message.textContent = 'Implemente resumeSession().';

    // Passo a passo:
    // 1. Se não houver sessão pausada, interrompa.
    // 2. Altere status para 'rodando'.
    // 3. Atualize startedAt com Date.now().
    // 4. Salve e renderize.
}

/**
 * Remove a sessão atual e volta ao estado inicial.
 */
function resetSession() {
    currentSession = null;
    saveSession();
    renderSession();
}

/**
 * Atualiza a tela e conclui a sessão quando o tempo acaba.
 */
function renderSession() {
    const remaining = getVisibleRemainingSeconds();

    document.querySelector('#timer-display').textContent = formatSeconds(remaining);

    // Passo a passo:
    // 1. Se não houver sessão, mostre estado parado e desabilite pausar/retomar.
    // 2. Se remaining for 0 e status for 'rodando', mude status para 'concluida' e salve.
    // 3. Mostre disciplina, status e tempo restante.
    // 4. Habilite pausar apenas quando status for 'rodando'.
    // 5. Habilite retomar apenas quando status for 'pausada'.
}

document.querySelector('#start-button').addEventListener('click', startSession);
document.querySelector('#pause-button').addEventListener('click', pauseSession);
document.querySelector('#resume-button').addEventListener('click', resumeSession);
document.querySelector('#reset-button').addEventListener('click', resetSession);

setInterval(renderSession, 1000);
renderSession();

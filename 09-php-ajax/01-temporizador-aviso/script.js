/**
 * Exercício 01: Temporizador de Aviso Escolar
 * 
 * Demonstra a criação de uma Promise que encapsula setTimeout(),
 * consumida de forma síncrona aos olhos do código com async e await.
 */

// 1. Seleção dos elementos do DOM
const seletorTempo = document.querySelector('#seletor-tempo');
const btnEmitir = document.querySelector('#btn-emitir');
const statusAviso = document.querySelector('#status-aviso');

/**
 * Retorna uma Promise que se resolve após o tempo indicado em milissegundos.
 * Esta é a base de quase todas as operações assíncronas temporizadas no JS.
 * 
 * @param {number} ms Tempo de espera em milissegundos
 * @returns {Promise<void>}
 */
function esperar(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

/**
 * Função assíncrona que gerencia o fluxo de emissão do aviso.
 */
async function dispararAviso() {
  const milissegundos = Number(seletorTempo.value);
  const segundos = milissegundos / 1000;

  // 1. Bloqueia a interface para evitar disparos duplicados
  btnEmitir.disabled = true;
  seletorTempo.disabled = true;

  // 2. Informa o estado de espera ao usuário
  statusAviso.className = 'status status-aguardando';
  statusAviso.textContent = `Aguardando ${segundos} segundo${segundos > 1 ? 's' : ''} para tocar o sinal...`;

  try {
    // 3. Pausa a execução assíncrona sem travar a interface do navegador
    await esperar(milissegundos);

    // 4. Ao acordar da Promise, exibe o resultado
    const horarioAtual = new Date().toLocaleTimeString('pt-BR');
    statusAviso.className = 'status status-concluido';
    statusAviso.textContent = `🔔 Sinal sonoro emitido com sucesso às ${horarioAtual}!`;

  } finally {
    // 5. Garante que os botões voltem ao normal independentemente do resultado
    btnEmitir.disabled = false;
    seletorTempo.disabled = false;
  }
}

// 2. Registro do ouvinte de clique
btnEmitir.addEventListener('click', dispararAviso);

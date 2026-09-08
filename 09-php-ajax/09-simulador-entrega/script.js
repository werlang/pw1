/**
 * Simulador de Rastreamento de Entregas - Script Didático
 * 
 * Demonstra:
 * 1. Pipeline assíncrono com Promises e encadeamento sequencial.
 * 2. Cancelamento limpo com clearTimeout sem efeitos colaterais.
 * 3. Máquina de estados com retomada inteligente a partir da etapa que falhou.
 */

// 1. Definição estática das etapas do processo
const ETAPAS = [
  {
    elementoId: 'etapa-1',
    numero: 1,
    titulo: 'Pedido Recebido',
    duracaoMs: 1200,
    podeFalhar: false
  },
  {
    elementoId: 'etapa-2',
    numero: 2,
    titulo: 'Separação dos Itens',
    duracaoMs: 1600,
    podeFalhar: false
  },
  {
    elementoId: 'etapa-3',
    numero: 3,
    titulo: 'Em Transporte',
    duracaoMs: 2200,
    podeFalhar: true // Etapa onde simulamos a falha se o código contiver 'FALHA'
  },
  {
    elementoId: 'etapa-4',
    numero: 4,
    titulo: 'Entregue ao Destinatário',
    duracaoMs: 1000,
    podeFalhar: false
  }
];

// 2. Elementos da interface
const formRastreio = document.querySelector('#form-rastreio');
const campoCodigo = document.querySelector('#campo-codigo');
const btnIniciar = document.querySelector('#btn-iniciar');
const btnCancelar = document.querySelector('#btn-cancelar');
const btnRetomar = document.querySelector('#btn-retomar');
const btnReiniciar = document.querySelector('#btn-reiniciar');
const painelFeedback = document.querySelector('#painel-feedback');

// 3. Variáveis de estado do pipeline
let indiceEtapaAtual = 0; // Índice (0 a 3) da etapa que está em execução ou pendente
let emExecucao = false;
let idTemporizadorAtual = null;
let rejeitarEtapaAtual = null;

/**
 * Atualiza o painel de feedback textual com o tipo visual correspondente.
 * @param {string} mensagem Texto descritivo
 * @param {'neutro' | 'andamento' | 'sucesso' | 'erro' | 'cancelado'} tipo
 */
function definirFeedback(mensagem, tipo) {
  painelFeedback.innerHTML = mensagem;
  painelFeedback.className = `feedback-caixa feedback-${tipo}`;
}

/**
 * Atualiza visualmente o card de uma etapa específica na timeline.
 * @param {Object} etapa Configuração da etapa
 * @param {'pendente' | 'ativa' | 'concluida' | 'falha' | 'cancelada'} estado
 * @param {string} textoStatus Mensagem descritiva exibida dentro do card
 */
function definirEstadoEtapa(etapa, estado, textoStatus) {
  const elemento = document.querySelector(`#${etapa.elementoId}`);
  if (!elemento) return;

  // Atualiza classes do elemento
  elemento.className = `etapa etapa-${estado}`;

  const marcador = elemento.querySelector('.marcador-etapa');
  const spanStatus = elemento.querySelector('.status-etapa');

  spanStatus.textContent = textoStatus;

  // Ajusta o ícone ou número no círculo marcador
  if (estado === 'concluida') {
    marcador.textContent = '✓';
  } else if (estado === 'falha') {
    marcador.textContent = '✕';
  } else if (estado === 'cancelada') {
    marcador.textContent = '!';
  } else {
    marcador.textContent = etapa.numero;
  }
}

/**
 * Simula uma etapa assíncrona por meio de uma Promise com atraso.
 * Se o código de rastreamento contiver a palavra 'FALHA' e a etapa puder falhar,
 * a Promise será rejeitada.
 * @param {Object} etapa
 * @param {string} codigo
 * @returns {Promise<void>}
 */
function executarEtapa(etapa, codigo) {
  return new Promise((resolve, reject) => {
    // Guarda o rejeitar para permitir cancelamento imediato pelo usuário
    rejeitarEtapaAtual = reject;

    idTemporizadorAtual = setTimeout(() => {
      // Verifica se deve simular falha
      if (etapa.podeFalhar && codigo.toUpperCase().includes('FALHA')) {
        reject(new Error('Incidente rodoviário na rota de transporte! Carga retida para averiguação.'));
      } else {
        resolve();
      }
    }, etapa.duracaoMs);
  });
}

/**
 * Executa sequencialmente as etapas da entrega utilizando async / await.
 * Mantém o índice atual salvo, permitindo retomar de onde parou.
 */
async function processarPipeline() {
  if (emExecucao) return;

  const codigo = campoCodigo.value.trim();
  if (!codigo) {
    definirFeedback('Por favor, digite um código de rastreamento válido.', 'erro');
    campoCodigo.focus();
    return;
  }

  emExecucao = true;
  campoCodigo.disabled = true;
  btnIniciar.disabled = true;
  btnIniciar.style.display = 'none';
  btnCancelar.disabled = false;
  btnRetomar.style.display = 'none';
  btnReiniciar.style.display = 'none';

  // Executa as etapas a partir do índice em que parou
  for (; indiceEtapaAtual < ETAPAS.length; indiceEtapaAtual++) {
    const etapa = ETAPAS[indiceEtapaAtual];

    // Marca visualmente como em andamento
    definirEstadoEtapa(etapa, 'ativa', 'Em processamento...');
    definirFeedback(`Executando etapa ${etapa.numero} de ${ETAPAS.length}: <strong>${etapa.titulo}</strong>...`, 'andamento');

    try {
      await executarEtapa(etapa, codigo);

      // Conclusão com sucesso desta etapa
      const agora = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      definirEstadoEtapa(etapa, 'concluida', `Concluído com sucesso às ${agora}`);

    } catch (erro) {
      emExecucao = false;
      btnCancelar.disabled = true;

      // Diferenciação clara entre cancelamento e erro real de negócio
      if (erro.name === 'CancelamentoError') {
        definirEstadoEtapa(etapa, 'cancelada', 'Interrompido a pedido do operador');
        definirFeedback(`Envio <strong>cancelado</strong> durante a etapa "${etapa.titulo}". Você pode retomar de onde parou ou iniciar novo rastreamento.`, 'cancelado');
      } else {
        definirEstadoEtapa(etapa, 'falha', erro.message);
        definirFeedback(`<strong>Falha na etapa ${etapa.numero} (${etapa.titulo}):</strong> ${erro.message}`, 'erro');
      }

      // Oferece opções de retomar da etapa atual ou recomeçar
      btnRetomar.style.display = 'inline-block';
      btnReiniciar.style.display = 'inline-block';
      return;
    }
  }

  // Todas as etapas foram concluídas!
  emExecucao = false;
  btnCancelar.disabled = true;
  definirFeedback('<strong>Entrega finalizada com sucesso!</strong> Encomenda entregue e confirmada no campus.', 'sucesso');
  btnReiniciar.style.display = 'inline-block';
}

/**
 * Cancela a etapa em andamento imediatamente.
 */
function cancelarProcesso() {
  if (!emExecucao) return;

  // Limpa o temporizador em voo para que ele não dispare a conclusão
  if (idTemporizadorAtual) {
    clearTimeout(idTemporizadorAtual);
    idTemporizadorAtual = null;
  }

  // Se a Promise da etapa estiver aguardando, rejeita com erro especial de cancelamento
  if (rejeitarEtapaAtual) {
    const erroCancelamento = new Error('Operação cancelada pelo operador');
    erroCancelamento.name = 'CancelamentoError';
    rejeitarEtapaAtual(erroCancelamento);
    rejeitarEtapaAtual = null;
  }
}

/**
 * Restaura todos os elementos e variáveis de estado para um novo teste do zero.
 */
function reiniciarDoZero() {
  cancelarProcesso();

  indiceEtapaAtual = 0;
  emExecucao = false;

  campoCodigo.disabled = false;
  campoCodigo.value = 'IFSUL-2026';
  
  btnIniciar.disabled = false;
  btnIniciar.style.display = 'inline-block';
  btnCancelar.disabled = true;
  btnRetomar.style.display = 'none';
  btnReiniciar.style.display = 'none';

  // Reseta todas as etapas na interface
  for (const etapa of ETAPAS) {
    definirEstadoEtapa(etapa, 'pendente', 'Aguardando início');
  }

  definirFeedback('Informe um código de rastreamento e clique em <strong>Iniciar Envio</strong>.', 'neutro');
  campoCodigo.focus();
}

// 4. Registro dos ouvintes de eventos
formRastreio.addEventListener('submit', (evento) => {
  evento.preventDefault();
  processarPipeline();
});

btnCancelar.addEventListener('click', cancelarProcesso);

btnRetomar.addEventListener('click', () => {
  processarPipeline();
});

btnReiniciar.addEventListener('click', reiniciarDoZero);

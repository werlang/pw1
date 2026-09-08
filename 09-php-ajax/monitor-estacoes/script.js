/**
 * Monitor de Telemetria de Estações - Script Didático
 * 
 * Demonstra:
 * 1. Polling sequencial seguro com setTimeout() recursivo no bloco finally.
 * 2. Prevenção de acúmulo de requisições concorrentes na rede.
 * 3. Backoff gradual em caso de falhas consecutivas.
 * 4. Preservação de dados na tela e aviso de dados defasados (stale data).
 */

// 1. Elementos da interface
const pontoStatus = document.querySelector('#ponto-status');
const textoStatus = document.querySelector('#texto-status');
const horarioUltimaLeitura = document.querySelector('#horario-ultima-leitura');
const tempoDecorrido = document.querySelector('#tempo-decorrido');
const btnIniciar = document.querySelector('#btn-iniciar');
const btnPausar = document.querySelector('#btn-pausar');
const btnAtualizar = document.querySelector('#btn-atualizar');
const chkSimularFalha = document.querySelector('#chk-simular-falha');
const bannerStale = document.querySelector('#banner-stale');
const gradeEstacoes = document.querySelector('#grade-estacoes');

// 2. Parâmetros e estado do polling
const INTERVALO_PADRAO_MS = 4000;
const LIMITE_DEFASAGEM_SEGUNDOS = 15;

let monitoramentoAtivo = false;
let emRequisicao = false;
let idTemporizadorPolling = null;
let falhasConsecutivas = 0;
let timestampUltimoSucesso = null;

// Mapa em memória para atualizar nós DOM existentes sem recriar tudo e sem usar data-*
const mapaEstacoesDOM = new Map();

/**
 * Atualiza o indicador visual da conexão.
 * @param {'conectado' | 'sincronizando' | 'alerta' | 'erro' | 'pausado'} estado
 * @param {string} texto
 */
function definirConexao(estado, texto) {
  pontoStatus.className = `ponto-status ${estado}`;
  textoStatus.textContent = texto;
}

/**
 * Cria a estrutura inicial de um card de estação no DOM.
 * Não utiliza atributos data-*.
 * @param {Object} estacao
 * @returns {HTMLElement}
 */
function criarCardEstacao(estacao) {
  const card = document.createElement('article');
  card.className = 'card-estacao';

  // Cabeçalho
  const cabecalho = document.createElement('div');
  cabecalho.className = 'card-cabecalho';

  const titulos = document.createElement('div');
  const nome = document.createElement('h2');
  nome.className = 'estacao-nome';
  nome.textContent = estacao.nome;

  const local = document.createElement('p');
  local.className = 'estacao-local';
  local.textContent = estacao.local;

  titulos.append(nome, local);

  const badgeOperacional = document.createElement('span');
  badgeOperacional.className = 'badge-operacional normal';
  badgeOperacional.textContent = 'Normal';

  cabecalho.append(titulos, badgeOperacional);

  // Grid de métricas
  const grid = document.createElement('div');
  grid.className = 'metricas-grid';

  // Bloco Temperatura
  const blocoTemp = document.createElement('div');
  blocoTemp.className = 'bloco-metrica';
  const rotuloTemp = document.createElement('span');
  rotuloTemp.className = 'rotulo-metrica';
  rotuloTemp.textContent = 'Temperatura';
  const valorTemp = document.createElement('p');
  valorTemp.className = 'valor-metrica';
  valorTemp.textContent = `${estacao.temperatura.toFixed(1)} °C`;
  blocoTemp.append(rotuloTemp, valorTemp);

  // Bloco Umidade
  const blocoUmid = document.createElement('div');
  blocoUmid.className = 'bloco-metrica';
  const rotuloUmid = document.createElement('span');
  rotuloUmid.className = 'rotulo-metrica';
  rotuloUmid.textContent = 'Umidade Relativa';
  const valorUmid = document.createElement('p');
  valorUmid.className = 'valor-metrica';
  valorUmid.textContent = `${estacao.umidade.toFixed(1)} %`;
  blocoUmid.append(rotuloUmid, valorUmid);

  grid.append(blocoTemp, blocoUmid);

  // Rodapé com bateria
  const rodape = document.createElement('footer');
  rodape.className = 'card-rodape';

  const bateria = document.createElement('span');
  bateria.className = 'bateria-info';
  bateria.textContent = `Bateria: ${estacao.bateria}%`;

  const limiteInfo = document.createElement('span');
  limiteInfo.textContent = `Máx: ${estacao.limite_temperatura}°C`;

  rodape.append(bateria, limiteInfo);

  card.append(cabecalho, grid, rodape);

  // Salva no mapa em memória as referências dos nós que mudam a cada leitura
  mapaEstacoesDOM.set(estacao.id, {
    card,
    badgeOperacional,
    valorTemp,
    valorUmid,
    bateria
  });

  return card;
}

/**
 * Atualiza os valores visuais de uma estação já existente na tela.
 * @param {Object} estacao
 */
function atualizarValoresEstacao(estacao) {
  const refs = mapaEstacoesDOM.get(estacao.id);
  if (!refs) return;

  refs.valorTemp.textContent = `${estacao.temperatura.toFixed(1)} °C`;
  refs.valorUmid.textContent = `${estacao.umidade.toFixed(1)} %`;
  refs.bateria.textContent = `Bateria: ${estacao.bateria}%`;

  const emAlerta = estacao.status_operacional === 'alerta';
  refs.card.className = `card-estacao ${emAlerta ? 'status-alerta' : ''}`;
  refs.badgeOperacional.className = `badge-operacional ${emAlerta ? 'alerta' : 'normal'}`;
  refs.badgeOperacional.textContent = emAlerta ? 'Alerta' : 'Normal';

  if (estacao.temperatura > estacao.limite_temperatura) {
    refs.valorTemp.className = 'valor-metrica destaque-alerta';
  } else {
    refs.valorTemp.className = 'valor-metrica';
  }
}

/**
 * Calcula o tempo de espera até o próximo ciclo aplicando backoff gradual em falhas.
 * @returns {number} Milissegundos de espera
 */
function calcularProximoIntervalo() {
  if (falhasConsecutivas === 0) return INTERVALO_PADRAO_MS;
  if (falhasConsecutivas === 1) return 6000;
  if (falhasConsecutivas === 2) return 9000;
  return 12000; // Teto máximo de espera após 3 ou mais falhas
}

/**
 * Realiza uma consulta ao backend PHP e programa a próxima consulta no bloco finally.
 */
async function sincronizarTelemetria() {
  // Evita reentrância caso já haja uma requisição em curso
  if (emRequisicao) return;

  emRequisicao = true;
  definirConexao('sincronizando', 'Consultando telemetria no servidor...');

  // Se houver um temporizador pendente agendado, limpa
  if (idTemporizadorPolling) {
    clearTimeout(idTemporizadorPolling);
    idTemporizadorPolling = null;
  }

  try {
    const url = chkSimularFalha.checked ? 'api.php?falhar=1' : 'api.php';
    const resposta = await fetch(url);

    if (!resposta.ok) {
      throw new Error(`Servidor respondeu com código HTTP ${resposta.status}`);
    }

    const dados = await resposta.json();

    // SUCESSO: zera o contador de falhas e registra timestamp
    falhasConsecutivas = 0;
    timestampUltimoSucesso = Date.now();

    horarioUltimaLeitura.textContent = dados.servidor_horario;
    definirConexao('conectado', 'Sincronizado • Leituras atualizadas');

    // Renderiza novos cards se a grade ainda estiver vazia, ou atualiza nós existentes
    for (const estacao of dados.estacoes) {
      if (!mapaEstacoesDOM.has(estacao.id)) {
        const novoCard = criarCardEstacao(estacao);
        gradeEstacoes.append(novoCard);
      } else {
        atualizarValoresEstacao(estacao);
      }
    }

  } catch (erro) {
    // FALHA: incrementa falhas consecutivas, mas MANTÉM os dados anteriores na tela!
    falhasConsecutivas++;
    const espera = calcularProximoIntervalo() / 1000;
    definirConexao('erro', `Falha na sincronização (${erro.message}). Próxima tentativa em ${espera}s.`);
    console.warn(`[Telemetria] Falha consecutiva #${falhasConsecutivas}:`, erro);

  } finally {
    emRequisicao = false;

    // REGRA DE OURO DO POLLING:
    // O próximo ciclo só é agendado SE o monitoramento ainda estiver ativo.
    // Usamos setTimeout() aqui dentro do finally, garantindo que requisições NUNCA se sobreponham!
    if (monitoramentoAtivo) {
      const proximaEspera = calcularProximoIntervalo();
      idTemporizadorPolling = setTimeout(() => {
        sincronizarTelemetria();
      }, proximaEspera);
    }
  }
}

/**
 * Atualiza os contadores de tempo decorrido e verifica se os dados estão defasados (stale).
 */
function verificarDefasagem() {
  if (!timestampUltimoSucesso) {
    tempoDecorrido.textContent = '(nenhuma leitura realizada)';
    bannerStale.style.display = 'none';
    return;
  }

  const segundosDecorridos = Math.floor((Date.now() - timestampUltimoSucesso) / 1000);
  tempoDecorrido.textContent = `(há ${segundosDecorridos} segundo${segundosDecorridos === 1 ? '' : 's'})`;

  // Alerta de dados defasados se passou do limite tolerável
  if (segundosDecorridos >= LIMITE_DEFASAGEM_SEGUNDOS) {
    bannerStale.style.display = 'block';
  } else {
    bannerStale.style.display = 'none';
  }
}

/**
 * Inicia o ciclo de monitoramento periódico.
 */
function iniciarMonitoramento() {
  if (monitoramentoAtivo) return;

  monitoramentoAtivo = true;
  btnIniciar.disabled = true;
  btnPausar.disabled = false;

  // Executa imediatamente a primeira leitura
  sincronizarTelemetria();
}

/**
 * Pausa o monitoramento periódico e cancela qualquer consulta futura já agendada.
 */
function pausarMonitoramento() {
  monitoramentoAtivo = false;
  btnIniciar.disabled = false;
  btnPausar.disabled = true;

  if (idTemporizadorPolling) {
    clearTimeout(idTemporizadorPolling);
    idTemporizadorPolling = null;
  }

  definirConexao('pausado', 'Monitoramento pausado pelo operador');
}

// 3. Ouvintes de eventos
btnIniciar.addEventListener('click', iniciarMonitoramento);
btnPausar.addEventListener('click', pausarMonitoramento);

btnAtualizar.addEventListener('click', () => {
  // Força uma sincronização manual imediata
  sincronizarTelemetria();
});

// Relógio leve para atualizar o texto "(há X segundos)" a cada 1s
setInterval(verificarDefasagem, 1000);

// Inicia automaticamente o monitoramento ao carregar a página
iniciarMonitoramento();

// Seleção dos elementos da interface
const indicadorStatus = document.querySelector('#indicador-status');
const textoStatus = document.querySelector('#texto-status');
const mostrador = document.querySelector('#mostrador');
const mensagemGuia = document.querySelector('#mensagem-guia');
const btnIniciar = document.querySelector('#btn-iniciar');
const btnPausar = document.querySelector('#btn-pausar');
const btnCancelar = document.querySelector('#btn-cancelar');
const listaHistorico = document.querySelector('#lista-historico');

// Variáveis de estado da prova
let emExecucao = false;
let pausado = false;
let cancelado = false;
let segundosRestantes = 3;
let etapaAtual = 'Inicial';

/**
 * Função auxiliar que retorna uma Promise resolvida após determinado tempo.
 * Permite usar a sintaxe 'await esperar(ms)' sem travar o navegador.
 */
function esperar(ms) {
    return new Promise(function(resolve) {
        setTimeout(resolve, ms);
    });
}

/**
 * Atualiza o estilo visual do indicador de status.
 */
function definirStatus(mensagem, classeCss) {
    textoStatus.textContent = mensagem;
    indicadorStatus.className = 'status-box ' + classeCss;
}

/**
 * Adiciona um registro ao histórico de tentativas usando nós do DOM.
 * Evita o uso de data-* attributes conforme o padrão do repositório.
 */
function registrarHistorico(mensagem, tipo) {
    // Remove o aviso de histórico vazio se existir
    const itemVazio = listaHistorico.querySelector('.historico-vazio');
    if (itemVazio) {
        itemVazio.remove();
    }

    const item = document.createElement('li');
    const horario = new Date().toLocaleTimeString('pt-BR');
    item.textContent = `[${horario}] ${mensagem}`;

    if (tipo === 'largada') {
        item.classList.add('registro-largada');
    } else if (tipo === 'cancelado') {
        item.classList.add('registro-cancelado');
    }

    // Insere no topo da lista
    listaHistorico.prepend(item);
}

/**
 * Restaura os botões e estado para a condição de repouso.
 */
function restaurarEstadoInicial() {
    emExecucao = false;
    pausado = false;
    cancelado = false;
    segundosRestantes = 3;
    etapaAtual = 'Inicial';

    btnIniciar.disabled = false;
    btnPausar.disabled = true;
    btnPausar.textContent = 'Pausar';
    btnCancelar.disabled = true;
}

/**
 * Executa a sequência assíncrona da largada.
 */
async function iniciarSequencia() {
    // Trava de segurança: impede que cliques duplos acelerem ou dupliquem a contagem
    if (emExecucao) {
        return;
    }

    emExecucao = true;
    pausado = false;
    cancelado = false;
    segundosRestantes = 3;

    // Atualiza controles da interface
    btnIniciar.disabled = true;
    btnPausar.disabled = false;
    btnCancelar.disabled = false;

    // 1. Etapa de Atenção aos atletas
    etapaAtual = 'Atenção aos atletas';
    definirStatus('Atenção: atletas aos seus lugares!', 'status-atencao');
    mostrador.textContent = '--';
    mensagemGuia.textContent = 'Aguardando atletas se posicionarem nos blocos...';

    await esperar(1500);

    // Se o árbitro cancelou durante o tempo de atenção, interrompe o fluxo
    if (cancelado) return;

    // 2. Etapa de Contagem Regressiva (3, 2, 1)
    definirStatus('Contagem regressiva em andamento', 'status-contando');

    while (segundosRestantes > 0) {
        // Se a prova foi pausada por ocorrência na pista, aguarda liberação
        while (pausado) {
            if (cancelado) return;
            await esperar(200);
        }

        if (cancelado) return;

        etapaAtual = `Contagem: ${segundosRestantes}`;
        mostrador.textContent = segundosRestantes;

        if (segundosRestantes === 3) {
            mensagemGuia.textContent = 'Preparar...';
        } else if (segundosRestantes === 2) {
            mensagemGuia.textContent = 'Apontar...';
        } else if (segundosRestantes === 1) {
            mensagemGuia.textContent = 'Atenção máxima...';
        }

        // Aguarda 1 segundo
        await esperar(1000);

        // Se pausou durante o último segundo, não decrementa ainda
        if (!pausado && !cancelado) {
            segundosRestantes--;
        }

        if (cancelado) return;
    }

    // 3. Etapa de Largada autorizada!
    etapaAtual = 'Largada';
    definirStatus('PROVA INICIADA! Atletas na pista.', 'status-largada');
    mostrador.textContent = 'VAI!';
    mensagemGuia.textContent = 'Largada autorizada pela arbitragem!';

    registrarHistorico('Largada autorizada com sucesso!', 'largada');

    // Mantém o aviso na tela por 3 segundos antes de liberar novo início
    await esperar(3000);
    restaurarEstadoInicial();
    definirStatus('Aguardando atletas na pista', 'status-aguardando');
    mostrador.textContent = '--';
    mensagemGuia.textContent = 'Pressione Iniciar quando os atletas estiverem prontos';
}

// Eventos de clique dos botões
btnIniciar.addEventListener('click', function() {
    iniciarSequencia();
});

btnPausar.addEventListener('click', function() {
    if (!emExecucao) return;

    pausado = !pausado;

    if (pausado) {
        btnPausar.textContent = 'Retomar';
        definirStatus('PROVA PAUSADA: ocorrência na pista!', 'status-atencao');
        mensagemGuia.textContent = 'A contagem está congelada. Clique em Retomar para prosseguir.';
    } else {
        btnPausar.textContent = 'Pausar';
        definirStatus('Contagem regressiva retomada', 'status-contando');
    }
});

btnCancelar.addEventListener('click', function() {
    if (!emExecucao) return;

    cancelado = true;
    registrarHistorico(`Tentativa cancelada na etapa: ${etapaAtual}`, 'cancelado');

    definirStatus('Largada cancelada pela arbitragem (Falsa largada)', 'status-cancelado');
    mostrador.textContent = 'STOP';
    mensagemGuia.textContent = 'Tentativa interrompida. Painel reiniciado.';

    restaurarEstadoInicial();
});

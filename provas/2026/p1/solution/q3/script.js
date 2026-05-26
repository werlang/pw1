import { showToast } from './toast.js';

const tasks = [
    { id: 301, title: 'Treino de LLM', status: 'em_execucao' },
    { id: 302, title: 'Render do frame 9001', status: 'em_execucao' },
    { id: 303, title: 'Simulação de fluidos', status: 'pendente' },
];

const gpus = [
    { id: 1, name: 'RTX 4090', sector: 'Treinamento', power: 450, status: 'ocupada', currentTaskId: 301 },
    { id: 2, name: 'RTX 6000 Ada', sector: 'Renderizacao', power: 300, status: 'ocupada', currentTaskId: 302 },
    { id: 3, name: 'A100', sector: 'Treinamento', power: 400, status: 'disponivel', currentTaskId: null },
];

/**
 * Busca uma tarefa pelo id.
 * @param {number | null} taskId
 * @returns {object | undefined}
 */
function getTaskById(taskId) {
    return tasks.find((task) => task.id === taskId);
}

/**
 * Calcula os indicadores principais do painel.
 * @returns {{ totalGpus: number, freeGpus: number, busyGpus: number, activePower: number }}
 */
function getDashboardStats() {
    const busyGpus = gpus.filter(gpu => gpu.status !== 'disponivel');
    let totalPower = 0;
    for (const gpu of busyGpus) {
        totalPower += gpu.power;
    }

    return {
        totalGpus: gpus.length,
        freeGpus: gpus.length - busyGpus.length,
        busyGpus: busyGpus.length,
        activePower: totalPower,
    };

    // Passo a passo:
    // 1. Descubra quantas GPUs existem no total.
    // 2. Conte quantas estão livres.
    // 3. Conte quantas estão ocupadas.
    // 4. Some o consumo (power) apenas das GPUs ocupadas.
}

/**
 * Renderiza o grid de GPUs conforme o filtro selecionado.
 * @param {string} filter
 */
function renderGpuGrid(filter = 'todos') {
    const gpuGrid = document.querySelector('#gpu-grid');

    // console.log(filter);
    let selectedGpus = gpus;
    if (filter !== 'todos') {
        selectedGpus = gpus.filter(gpu => {
            return gpu.sector === filter;
        });
    }
    // console.log(selectedGpus);

    gpuGrid.innerHTML = '';
    if (selectedGpus.length === 0) {
        gpuGrid.innerHTML = '<p class="empty-state">Nenhuma GPU encontrada para este filtro.</p>';
    }
    else {
        selectedGpus.forEach(gpu => {
            const task = getTaskById(gpu.currentTaskId);
            // console.log(task);
            let taskName = 'Nenhuma';
            let buttonText = '';
            if (task !== undefined) {
                taskName = task.title;
                buttonText = '<button type="button">Finalizar tarefa</button>';
            }

            const card = document.createElement('div');
            card.classList.add('gpu-card');
            card.innerHTML = `
                <h3>${gpu.name}</h3>
                <p><strong>Setor:</strong> ${gpu.sector}</p>
                <p><strong>Consumo:</strong> ${gpu.power} W</p>
                <span class="status-pill">${gpu.status}</span>
                <p><strong>Tarefa:</strong> ${taskName}</p>
                ${buttonText}
            `;
            gpuGrid.append(card);

            if (buttonText != '') {
                const button = card.querySelector('button');
                button.addEventListener('click', () => {
                    finishTask(gpu.id)
                });
            }
        })
    }

    // Passo a passo:
    // 1. Filtre o array gpus pelo setor informado em filter.
    // 2. Se não houver resultados, exiba a mensagem de estado vazio.
    // 3. Para cada GPU, monte um card com nome, setor, consumo e status.
    // 4. Se houver tarefa em execução, mostre o título da tarefa.
    // 5. Se a GPU estiver ocupada, renderize um botão que chama finishTask(gpu.id).
}

/**
 * Libera a GPU informada e marca sua tarefa como concluída.
 * @param {number} gpuId
 */
function finishTask(gpuId) {
    const gpu = gpus.find(gpu => gpu.id === gpuId);
    const task = getTaskById(gpu.currentTaskId);

    gpu.status = 'disponivel';
    task.status = 'concluida';
    gpu.currentTaskId = null;

    showToast('GPU Liberada', 'success');
    refreshDashboard();

    // Passo a passo:
    // 1. Localize a GPU pelo id recebido.
    // 2. Localize a tarefa atual usando gpu.currentTaskId.
    // 3. Atualize a tarefa para status 'concluida'.
    // 4. Atualize a GPU para status 'disponivel'.
    // 5. Defina gpu.currentTaskId = null.
    // 6. Exiba um toast de sucesso.
    // 7. Chame refreshDashboard().
}

/**
 * Atualiza os indicadores numéricos e o grid principal.
 */
function refreshDashboard() {
    const stats = getDashboardStats();
    const filter = document.querySelector('#sector-filter').value;

    document.querySelector('#total-gpus').textContent = stats.totalGpus;
    document.querySelector('#free-gpus').textContent = stats.freeGpus;
    document.querySelector('#busy-gpus').textContent = stats.busyGpus;
    document.querySelector('#active-power').textContent = `${stats.activePower} W`;

    renderGpuGrid(filter);
}

document.querySelector('#sector-filter').addEventListener('change', refreshDashboard);

refreshDashboard();
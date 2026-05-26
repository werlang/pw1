import { showToast } from './toast.js';

const gpus = [
    { id: 1, name: 'RTX 4090', memory: 24, status: 'livre' },
    { id: 2, name: 'RTX 4080', memory: 16, status: 'livre' },
    { id: 3, name: 'A100', memory: 40, status: 'livre' },
];

const tasks = [
    { id: 1, title: 'Treino de CNN', requiredMemory: 20 },
    { id: 2, title: 'Render de animação', requiredMemory: 12 },
    { id: 3, title: 'Simulação térmica', requiredMemory: 28 },
];

const allocations = [];

/**
 * Atualiza os selects e o painel visual de alocação.
 */
function renderDashboard() {
    const taskSelect = document.querySelector('#task-select');
    const gpuSelect = document.querySelector('#gpu-select');
    const allocationList = document.querySelector('#allocation-list');

    taskSelect.innerHTML = '<option value="">Implemente renderDashboard()</option>';
    gpuSelect.innerHTML = '<option value="">Implemente renderDashboard()</option>';
    allocationList.innerHTML = '<p class="empty-state">Implemente renderDashboard() para exibir o painel.</p>';

    // Passo a passo:
    // 1. Preencha #task-select com a lista de tarefas.
    // 2. Preencha #gpu-select somente com GPUs livres.
    // 3. Monte cards em #allocation-list com as tarefas alocadas disponíveis no array allocations.
    // 4. Exiba nome, memória exigida, GPU alocada e status.
    // 5. Se não houver tarefas alocadas, mostre:
    //    <p class="empty-state">Nenhuma tarefa disponível.</p>
}

/**
 * Lê os selects, valida a alocação e atualiza os arrays.
 */
function allocateSelectedTask() {
    showToast(
        'Função allocateSelectedTask() precisa ser implementada.',
        'error'
    );

    // Passo a passo:
    // 1. Capture os ids selecionados em #task-select e #gpu-select.
    // 2. Se faltar um deles, use:
    //    showToast('Selecione uma tarefa e uma GPU.', 'error')
    // 3. Localize a tarefa e a GPU pelos ids.
    // 4. Valide se a GPU possui memória suficiente.
    // 5. Se não possuir, use:
    //    showToast('A GPU selecionada não possui memória suficiente para esta tarefa.', 'error')
    // 6. Adicione um objeto ao array allocations com task, memory, gpu e status = 'em_execucao'.
    // 7. Atualize o status da gpu para 'ocupada'.
    // 8. Exiba um toast de sucesso.
    // 9. Chame renderDashboard().
}

document.querySelector('#allocate-button').addEventListener('click', allocateSelectedTask);

renderDashboard();
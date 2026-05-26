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
    { id: 4, title: 'Não SEI!!!!', requiredMemory: 999 },
];

const allocations = [];

/**
 * Atualiza os selects e o painel visual de alocação.
 */
function renderDashboard() {
    const taskSelect = document.querySelector('#task-select');
    const gpuSelect = document.querySelector('#gpu-select');
    const allocationList = document.querySelector('#allocation-list');

    taskSelect.innerHTML = '';
    tasks.forEach(task => {
        const option = document.createElement('option');
        option.value = task.id;
        option.textContent = `${task.title} (${task.requiredMemory} GB)`;
        taskSelect.append(option);
    });

    gpuSelect.innerHTML = '';
    gpus.forEach(gpu => {
        if (gpu.status === 'livre') {
            const option = document.createElement('option');
            option.value = gpu.id;
            option.textContent = `${gpu.name} (${gpu.memory} GB)`;
            gpuSelect.append(option);
        }
    });

    allocationList.innerHTML = '';
    for (const allocation of allocations) {
        const card = document.createElement('div');
        card.classList.add('allocation-card');
        card.innerHTML = `
            <h3>${allocation.task}</h3>
            <p><strong>Memória exigida:</strong> ${allocation.memory} GB</p>
            <p><strong>GPU:</strong> ${allocation.gpu}</p>
            <span class="status-pill status-em_execucao">${allocation.status}</span>
        `;
        allocationList.append(card);
    }

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
    const gpuSelect = document.querySelector('#gpu-select');
    const taskSelect = document.querySelector('#task-select');

    if (gpuSelect.value === '' || taskSelect.value === '') {
        showToast('Selecione uma tarefa e uma GPU.', 'error');
        return;
    }

    const selectedGpu = gpus.find(gpu => {
        return gpu.id === Number(gpuSelect.value);
    });
    const selectedTask = tasks.find(task => {
        return task.id === Number(taskSelect.value);
    });

    if (selectedTask.requiredMemory > selectedGpu.memory) {
        showToast('A GPU selecionada não possui memória suficiente para esta tarefa.', 'error');
        return;
    }

    selectedGpu.status = 'ocupada';

    const allocation = {
        task: selectedTask.title,
        memory: selectedTask.requiredMemory,
        gpu: selectedGpu.name,
        status: "em_execucao",
    }
    allocations.push(allocation);

    showToast('Tarefa alocada com sucesso.', 'success');
    renderDashboard();
    
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
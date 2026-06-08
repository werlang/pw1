import { showToast } from './toast.js';
import { loadFromLocalStorage, saveToLocalStorage } from './localStorage.js';

const STORAGE_KEY = 'gpus'
const gpus = loadFromLocalStorage(STORAGE_KEY);

/**
 * Atualiza a lista de GPUs cadastradas na interface.
 */
function renderGpuList() {
    const gpuList = document.querySelector('#gpu-list');
    gpuList.innerHTML = '';

    if (gpus.length === 0) {
        gpuList.innerHTML = `<p class="empty-state">Nenhuma GPU cadastrada.</p>`;
        return;
    }

    gpus.forEach((gpu, index) => {
        const card = document.createElement('div');
        card.classList.add('gpu-card');
        card.innerHTML = `
            <div class="remove-container"><span class="remove-item">❌</span></div>
            <h3>${gpu.name}</h3>
            <p><strong>Setor:</strong> ${gpu.sector}</p>
            <p><strong>Memória:</strong> ${gpu.memory} GB</p>
            <p><strong>Consumo:</strong> ${gpu.power} W</p>
            <span class="status-pill">${gpu.status}</span>
        `;
        gpuList.append(card);   

        const removeButton = card.querySelector('.remove-item');
        removeButton.addEventListener('click', () => {
            gpus.splice(index, 1);
            renderGpuList();
            saveToLocalStorage(STORAGE_KEY, gpus);
        });
    });


    // Passo a passo:
    // 1. Capture o elemento #gpu-list.
    // 2. Limpe o conteúdo atual.
    // 3. Se o array gpus estiver vazio, exiba:
    //    <p class="empty-state">Nenhuma GPU cadastrada.</p>
    // 4. Caso contrário, percorra o array e monte um card para cada GPU.
    // 5. Mostre nome, setor, memória, consumo e status.
}

/**
 * Captura os dados do formulário e adiciona uma GPU ao array.
 */
function createGpu() {
    const gpuName = document.querySelector('#gpu-name');
    const gpuSector = document.querySelector('#gpu-sector');
    const gpuMemory = document.querySelector('#gpu-memory');
    const gpuPower = document.querySelector('#gpu-power');

    if (
        gpuName.value === '' ||
        gpuSector.value === '' ||
        gpuMemory.value === '' ||
        gpuPower.value === ''
    ) {
        showToast('Preencha todos os campos da GPU.', 'error');
        return;
    }

    const gpu = {
        name: gpuName.value,
        sector: gpuSector.value,
        memory: gpuMemory.value,
        power: gpuPower.value,
        status: 'disponivel',
    };
    gpus.push(gpu);
    saveToLocalStorage(STORAGE_KEY, gpus);

    gpuName.value = '';
    gpuSector.value = '';
    gpuMemory.value = '';
    gpuPower.value = '';

    showToast('GPU cadastrada com sucesso.', 'success');
    renderGpuList();

    // Passo a passo:
    // 1. Capture os valores de #gpu-name, #gpu-sector, #gpu-memory e #gpu-power.
    // 2. Valide se todos os campos foram preenchidos.
    // 3. Se faltar algum valor, use:
    //    showToast('Preencha todos os campos da GPU.', 'error')
    // 4. Crie um objeto com name, sector, memory, power e status.
    // 5. A propriedade status deve começar como 'disponivel'.
    // 6. Adicione a GPU ao array gpus.
    // 7. Limpe o formulário.
    // 8. Exiba um toast de sucesso.
    // 9. Chame renderGpuList().
}

document.querySelector('#register-gpu').addEventListener('click', createGpu);

renderGpuList();
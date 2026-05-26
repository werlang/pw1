import { showToast } from './toast.js';

const gpus = [];

/**
 * Atualiza a lista de GPUs cadastradas na interface.
 */
function renderGpuList() {
    const gpuList = document.querySelector('#gpu-list');

    gpuList.innerHTML = '<p class="empty-state">Implemente renderGpuList() para exibir as GPUs cadastradas.</p>';

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
    showToast(
        'Função createGpu() precisa ser implementada.',
        'error'
    );

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
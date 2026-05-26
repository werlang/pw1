# PWI - P1 - Questão 03

## Objetivo

Nesta questão, você irá montar um painel operacional para acompanhar o data center e liberar GPUs quando uma tarefa for concluída.

Os arrays `tasks` e `gpus` já estão prontos no arquivo `script.js`.

## O que você deve fazer

Edite somente o arquivo `script.js`.

### Parte 1 - Implementar `getDashboardStats()`

Retorne um objeto com esta estrutura:

```json
{
    "totalGpus": 3,
    "freeGpus": 1,
    "busyGpus": 2,
    "activePower": 750
}
```

Onde:

1. `totalGpus` é a quantidade total de GPUs.
2. `freeGpus` é a quantidade de GPUs livres.
3. `busyGpus` é a quantidade de GPUs ocupadas.
4. `activePower` é a soma do consumo das GPUs ocupadas.

### Parte 2 - Implementar `renderGpuGrid(filter)`

1. Capture o container `#gpu-grid`.
2. Filtre as GPUs pelo setor selecionado no `#sector-filter`.
3. Se nenhuma GPU corresponder ao filtro, exiba:

```html
<p class="empty-state">Nenhuma GPU encontrada para este filtro.</p>
```

4. Para cada GPU, renderize um card com:
   - nome;
   - setor;
   - consumo;
   - status;
   - nome da tarefa atual, quando existir.

O card deve ter a classe `gpu-card`, e possuir o seguinte formato:

```html
<div class="gpu-card">
    <h3>RTX 4090</h3>
    <p><strong>Setor:</strong> Treinamento</p>
    <p><strong>Consumo:</strong> 450 W</p>
    <span class="status-pill">ocupada</span>
    <p><strong>Tarefa:</strong> Treino de LLM</p>
</div>
```

5. Se a GPU estiver ocupada, renderize um botão para finalizar a tarefa com o seguinte formato:

```html
<button type="button">Finalizar tarefa</button>
```

Ao clicar neste botão, a tarefa deve ser finalizada e a GPU liberada. Para isso, adicione um event listener que chame a função `finishTask(gpu.id)`.

### Parte 3 - Implementar `finishTask(gpuId)`

1. Localize a GPU.
2. Localize a tarefa em execução nela.
3. Atualize a tarefa para `concluida`.
4. Atualize a GPU para `disponivel`.
5. Defina `gpu.currentTaskId = null`.
6. Exiba um toast de sucesso.
7. Chame `refreshDashboard()`.

## Resumo do fluxo

1. O painel calcula os indicadores do data center.
2. O filtro mostra apenas o setor desejado.
3. Ao finalizar uma tarefa, a GPU volta a ficar livre.
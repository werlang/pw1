# PWI - P1 - Questão 02

## Objetivo

Nesta questão, você irá implementar a alocação de tarefas para GPUs disponíveis.

Os arrays `tasks` e `gpus` já estão prontos no arquivo `script.js`. 

### Regras da alocação

Uma alocação só pode acontecer quando:

1. existir uma tarefa selecionada;
2. existir uma GPU selecionada;
3. a GPU estiver livre (`status === 'livre'`);
4. a GPU possuir memória suficiente para a tarefa.

## O que você deve fazer

Edite somente o arquivo `script.js`.

### Parte 1 - Implementar `renderDashboard()`

1. Preencha o select `#task-select` com a lista de tarefas.

Para cada tarefa, mostre o título e a memória exigida, no formato:

```html
<option value="task-id">Título da Tarefa (X GB)</option>
```

2. Preencha o select `#gpu-select` apenas com GPUs livres.

Para cada GPU cujo status seja `livre`, mostre o nome e a memória, no formato:

```html
<option value="gpu-id">Nome da GPU (X GB)</option>
```

3. Monte a lista em `#allocation-list` com as tarefas alocadas disponíveis no array `allocations`. Para cada tarefa alocada, exiba:
   - nome da tarefa;
   - memória exigida;
   - Nome da GPU alocada;
   - status da tarefa.

O objeto de alocação possui o seguinte formato:

```json
{
    "task": "Render de animação",
    "memory": 12,
    "gpu": "RTX 4090",
    "status": "em_execucao"
}
```

O card deve ter a classe `allocation-card` e o seguinte formato:

```html
<div class="allocation-card">
      <h3>Render de animação</h3>
      <p><strong>Memória exigida:</strong> 12 GB</p>
      <p><strong>GPU:</strong> RTX 4090</p>
      <span class="status-pill status-em_execucao">em_execucao</span>
</div>
```

### Parte 2 - Implementar `allocateSelectedTask()`

1. Capture os ids selecionados nos dois selects.
2. Se um deles não tiver sido escolhido, exiba:

```javascript
showToast('Selecione uma tarefa e uma GPU.', 'error')
```

3. Localize a tarefa e a GPU correspondentes.
4. Se a memória da GPU for menor que a memória exigida pela tarefa, exiba:

```javascript
showToast('A GPU selecionada não possui memória suficiente para esta tarefa.', 'error')
```

5. Se a alocação for válida, atualize o status da gpu para `ocupada` e adicione um objeto ao array `allocations` com as seguintes propriedades:
   - `task`: título da tarefa
   - `memory`: memória exigida
   - `gpu`: nome da GPU
   - `status`: 'em_execucao'

Formato do objeto de alocação:

```json
{
    "task": "Render de animação",
    "memory": 12,
    "gpu": "RTX 4090",
    "status": "em_execucao"
}
```

6. Exiba um toast de sucesso.
7. Chame `renderDashboard()`.

## Resumo do fluxo

1. O usuário seleciona uma tarefa e uma GPU.
2. O sistema valida a seleção.
3. Se for válida, a tarefa é alocada na GPU, o status da GPU é atualizado para `ocupada`, e a alocação é exibida no painel.
4. Se a seleção for inválida, um toast de erro é mostrado.
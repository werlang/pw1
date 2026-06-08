# PWI - P1 - Questão 01

## Objetivo

Nesta questão, você irá implementar o cadastro de GPUs de um data center.

Cada GPU cadastrada deve ser adicionada ao array `gpus` com o seguinte formato:

```json
{
    "name": "RTX 4090",
    "sector": "Treinamento",
    "memory": 24,
    "power": 450,
    "status": "disponivel"
}
```

## O que você deve fazer

Edite somente o arquivo `script.js`.

### Parte 1 - Implementar `createGpu()`

1. Capture os valores dos campos:
   - `#gpu-name`
   - `#gpu-sector`
   - `#gpu-memory`
   - `#gpu-power`
2. Valide se todos os campos foram preenchidos.
3. Se algum campo estiver vazio, exiba:

```javascript
showToast('Preencha todos os campos da GPU.', 'error')
```

4. Crie um objeto GPU e adicione-o ao array `gpus`.
5. A propriedade `status` deve iniciar com o valor `disponivel`.
6. Limpe os campos do formulário.
7. Exiba um toast de sucesso.
8. Chame `renderGpuList()`.

### Parte 2 - Implementar `renderGpuList()`

1. Capture o elemento `#gpu-list`.
2. Limpe o conteúdo atual.
3. Se não houver GPUs cadastradas, exiba:

```html
<p class="empty-state">Nenhuma GPU cadastrada.</p>
```

4. Para cada GPU, monte um card com nome, setor, memória, consumo e status.

O card deve ter a classe `gpu-card`, e possuir o seguinte formato:

```html
<div class="gpu-card">
    <h3>RTX 4090</h3>
    <p><strong>Setor:</strong> Treinamento</p>
    <p><strong>Memória:</strong> 24 GB</p>
    <p><strong>Consumo:</strong> 450 W</p>
    <span class="status-pill">disponivel</span>
</div>
```

## Resumo do fluxo

1. O usuário preenche o formulário.
2. Clica em `Cadastrar GPU`.
3. A GPU é adicionada ao array.
4. A lista da tela é atualizada.
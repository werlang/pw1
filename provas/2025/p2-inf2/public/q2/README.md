# Renderização de Tarefas

Você deve implementar a função responsável por renderizar as tarefas na tela, separando-as entre pendentes e concluídas.

## Objetivo

Exibir as tarefas cadastradas, mostrando:
- Nome
- Data
- Hora
- Duração (em minutos)
- Status de conclusão (checkbox marcado/desmarcado)
- Botão para excluir tarefa

## Passo a Passo da Questão

### 0. Estrutura da Tarefa

Cada tarefa é um objeto com os seguintes campos:
```javascript
const task = {
	name: 'Nome da Tarefa',
	date: 'Data da Tarefa',
	time: 'Hora da Tarefa',
	duration: 'Duração da Tarefa em minutos',
	completed: false // Indica se a tarefa foi concluída
}
```

As tarefas devem ser obtidas do array `tasks` já existente no código. No sistema completo, as tarefas são carregadas do `localStorage`, mas para esta questão, você pode assumir que o array `tasks` já está preenchido com as tarefas existentes.

### 1. Função de Renderização

- Implemente a função `renderTasks(container, completed)` para exibir as tarefas no elemento HTML informado.
- O parâmetro `container` é o elemento onde as tarefas serão renderizadas. No código, os seletores para os contêineres de tarefas pendentes e concluídas já estão definidos.
- O parâmetro `completed` indica se devem ser exibidas tarefas concluídas (`true`) ou pendentes (`false`).

### 2. Estrutura do Item de Tarefa

Cada tarefa deve ser exibida conforme o modelo:
```html
<div class="task-item">
	<div class="task-header">
		<label class="task-checkbox">
			<input type="checkbox">
			<span class="task-name">Nome da Tarefa</span>
		</label>
		<button class="task-delete" title="Excluir tarefa">Excluir</button>
	</div>
	<div class="task-details">
		<div class="task-detail"><strong>Data:</strong> 2025-07-22</div>
		<div class="task-detail"><strong>Horário:</strong> 08:00</div>
		<div class="task-detail"><strong>Duração:</strong> 90 minutos</div>
	</div>
</div>
```

Caso a tarefa esteja concluída, adicione a classe `completed` ao elemento `task-item` para aplicar estilos diferenciados, e o checkbox deve estar marcado:
```html
<div class="task-item completed">
    <div class="task-header">
        <label class="task-checkbox">
            <input type="checkbox" checked>
            <span class="task-name">Nome da Tarefa</span>
        </label>
        <button class="task-delete" title="Excluir tarefa">Excluir</button>
    </div>
    <div class="task-details">
        <div class="task-detail"><strong>Data:</strong> 2025-07-22</div>
        <div class="task-detail"><strong>Horário:</strong> 08:00</div>
        <div class="task-detail"><strong>Duração:</strong> 90 minutos</div>
    </div>
</div>
```

Lembre-se que somente as tarefas pendentes devem ser exibidas no contêiner de tarefas pendentes, e as concluídas no contêiner de tarefas concluídas.

### 3. Mensagens para o Usuário

- Utilize a função `showToast` para exibir mensagens de sucesso toda vez que uma tarefa alterada ou excluída.
```javascript
showToast('Status da tarefa atualizado com sucesso!', 'success');
showToast('Tarefa excluída com sucesso!', 'success');
```
- A função `showToast` já está implementada e pronta para uso.
- O comportamento de alteração de status e exclusão de tarefas será implementado na próxima questão.

### 4. Atualização das Listas
- Após implementar a função de renderização, chame-a para exibir as tarefas pendentes e concluídas ao carregar a página.
- Utilize os contêineres já definidos no código:
```javascript
const tasksContainer = document.querySelector('#tasksContainer');
const completedContainer = document.querySelector('#completedTasksContainer');
```
const inputTask = document.querySelector('#input-tarefa');
const buttonAddTask = document.querySelector('#btn-adicionar');
const taskList = document.querySelector('#lista-tarefas');
const taskStatus = document.querySelector('#status');

function updateStatus() {
    const pendingTasks = taskList.querySelectorAll('.item-tarefa:not(.concluida)').length;

    if (pendingTasks === 0) {
        taskStatus.textContent = 'Nenhuma tarefa pendente.';
    } else {
        taskStatus.textContent = `${pendingTasks} tarefa(s) pendente(s).`;
    }
}

function createTaskItem(taskText) {
    const item = document.createElement('li');
    const label = document.createElement('span');
    const actions = document.createElement('div');
    const doneButton = document.createElement('button');
    const removeButton = document.createElement('button');

    item.classList.add('item-tarefa');
    actions.classList.add('acoes-item');
    removeButton.classList.add('remover');

    label.textContent = taskText;
    doneButton.textContent = 'Concluir';
    removeButton.textContent = 'Remover';

    doneButton.addEventListener('click', function() {
        item.classList.toggle('concluida');
        updateStatus();
    });

    removeButton.addEventListener('click', function() {
        item.remove();
        updateStatus();
    });

    actions.append(doneButton, removeButton);
    item.append(label, actions);
    return item;
}

buttonAddTask.addEventListener('click', function() {
    const taskText = inputTask.value.trim();

    if (taskText === '') {
        return;
    }

    taskList.append(createTaskItem(taskText));
    inputTask.value = '';
    inputTask.focus();
    updateStatus();
});

updateStatus();
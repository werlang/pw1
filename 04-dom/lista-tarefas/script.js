const inputTask = document.querySelector('#input-tarefa');
const buttonAddTask = document.querySelector('#btn-adicionar');
const taskList = document.querySelector('#lista-tarefas');
const taskStatus = document.querySelector('#status');

const tasks = [];

function updateStatus() {
    const pendingTasks = tasks.filter(function(task) {
        return !task.concluida;
    }).length;

    if (pendingTasks === 0) {
        taskStatus.textContent = 'Nenhuma tarefa pendente.';
    } else {
        taskStatus.textContent = `${pendingTasks} tarefa(s) pendente(s).`;
    }
}

function renderTasks() {
    taskList.innerHTML = '';

    tasks.forEach(function(task) {
        taskList.append(createTaskItem(task));
    });

    updateStatus();
}

function createTaskItem(task) {
    const item = document.createElement('li');
    const label = document.createElement('span');
    const actions = document.createElement('div');
    const doneButton = document.createElement('button');
    const removeButton = document.createElement('button');

    item.classList.add('item-tarefa');
    actions.classList.add('acoes-item');
    removeButton.classList.add('remover');
    if (task.concluida) {
        item.classList.add('concluida');
    }

    label.textContent = task.texto;
    doneButton.textContent = 'Concluir';
    removeButton.textContent = 'Remover';

    doneButton.addEventListener('click', function() {
        task.concluida = !task.concluida;
        renderTasks();
    });

    removeButton.addEventListener('click', function() {
        const position = tasks.findIndex(function(itemTask) {
            return itemTask.id === task.id;
        });

        tasks.splice(position, 1);
        renderTasks();
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

    tasks.push({
        id: Date.now(),
        texto: taskText,
        concluida: false
    });

    inputTask.value = '';
    inputTask.focus();
    renderTasks();
});

updateStatus();
const taskForm = document.querySelector('#taskForm');
const tasksContainer = document.querySelector('#tasksContainer');
const completedContainer = document.querySelector('#completedTasksContainer');

// Show toast notification
function showToast(message, type = 'success') {
    const toastMessage = document.querySelector('#toastMessage');
    toastMessage.textContent = message;
    const toast = document.querySelector('#toast');
    toast.className = `toast ${type} show`;

    setTimeout(() => {
        toast.classList.remove('show');
    }, 4000);
}

// Load tasks from localStorage
function loadTasksFromStorage() {
    const stored = localStorage.getItem('taskScheduler');
    return stored ? JSON.parse(stored) : [];
}

// Save tasks to localStorage
function saveTasksToStorage() {
    localStorage.setItem('taskScheduler', JSON.stringify(tasks));
}   

function getTaskStartEnd(task) {
    const start = new Date(`${task.date}T${task.time}`);
    const end = new Date(start.getTime() + task.duration * 60000);
    return { start, end };
}

const tasks = loadTasksFromStorage();

taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const task = {
        name: taskForm.querySelector('#taskName').value.trim(),
        date: taskForm.querySelector('#taskDate').value,
        time: taskForm.querySelector('#taskTime').value,
        duration: parseInt(taskForm.querySelector('#taskDuration').value) || 15,
        completed: false
    };

    const newTaskStartEnd = getTaskStartEnd(task);
    
    let isConflict = false
    tasks.forEach(existingTask => {
        // Só verifica conflito se a tarefa não estiver concluída
        if (!existingTask.completed) {
            const existingTaskStartEnd = getTaskStartEnd(existingTask);

            if (newTaskStartEnd.start < existingTaskStartEnd.end && existingTaskStartEnd.start < newTaskStartEnd.end) {
                isConflict = true;
            }
        }
    });

    // Check for conflicts
    if (isConflict) {
        showToast(`Conflito de horário detectado!`, 'error');
        return;
    }

    // Add task
    tasks.push(task);
    saveTasksToStorage();
    renderTasks(tasksContainer, false);
    renderTasks(completedContainer, true);
    taskForm.reset();
    showToast('Tarefa adicionada com sucesso!', 'success');
});

// Render all tasks
function renderTasks(container, completed = false) {
    container.innerHTML = '';

    // Filtra apenas tarefas não concluídas
    const filteredTasks = tasks.filter(task => task.completed === completed);

    if (filteredTasks.length === 0) {
        container.innerHTML = '<p class="no-tasks">Nenhuma tarefa agendada ainda.</p>';
        return;
    }

    filteredTasks.forEach((task, index) => {
        const item = document.createElement('div');
        item.className = `task-item ${completed ? 'completed' : ''}`;
        item.innerHTML = `
            <div class="task-header">
                <label class="task-checkbox">
                    <input type="checkbox" ${task.completed ? 'checked' : ''}>
                    <span class="task-name">${task.name}</span>
                </label>
                <button class="task-delete" title="Excluir tarefa">Excluir</button>
            </div>
            <div class="task-details">
                <div class="task-detail">
                    <strong>Data:</strong> ${task.date}
                </div>
                <div class="task-detail">
                    <strong>Horário:</strong> ${task.time}
                </div>
                <div class="task-detail">
                    <strong>Duração:</strong> ${task.duration} minutos
                </div>
            </div>
        `;

        container.appendChild(item);

        const deleteButton = item.querySelector('.task-delete');
        deleteButton.addEventListener('click', () => {
            removeTask(index);
        });

        const checkbox = item.querySelector('.task-checkbox input');
        checkbox.addEventListener('change', () => {
            toggleTaskCompletion(task);
        });
    });
}

renderTasks(tasksContainer, false);
renderTasks(completedContainer, true);

function toggleTaskCompletion(task) {
    const index = tasks.indexOf(task);
    tasks[index].completed = !tasks[index].completed;
    saveTasksToStorage();
    renderTasks(tasksContainer, false);
    renderTasks(completedContainer, true);
    const message = tasks[index].completed ? 'Tarefa marcada como concluída!' : 'Tarefa desmarcada!';
    showToast(message, 'success');
}

function removeTask(index) {
    tasks.splice(index, 1);
    saveTasksToStorage();
    renderTasks(tasksContainer, false);
    renderTasks(completedContainer, true);
    showToast('Tarefa excluída com sucesso!', 'success');
}
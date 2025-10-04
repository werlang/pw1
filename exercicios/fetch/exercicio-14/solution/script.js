import showToast from "./components/toast.js";

let tasks = [];

async function loadTasks() {
    try {
        const data = await fetch('/api/task/list.php').then(res => res.json());
        if (data.error) {
            showToast(data.message, 'error');
            return;
        }
        tasks = data.tasks;
        renderTasks();
        updateDeleteCompletedButton();
    } catch (error) {
        showToast('Erro ao carregar tarefas', 'error');
    }
}

function renderTasks() {
    const container = document.querySelector('#tasksList');
    container.innerHTML = '';
    
    if (!tasks || tasks.length === 0) {
        container.innerHTML = '<p class="no-tasks">Nenhuma tarefa cadastrada.</p>';
        return;
    }
    
    tasks.forEach(task => {
        const card = document.createElement('div');
        card.className = `task-card ${task.completed == 1 ? 'completed' : ''}`;
        card.innerHTML = `
            <div class="task-content">
                <input type="checkbox" class="task-checkbox" data-id="${task.id}" ${task.completed == 1 ? 'checked' : ''}>
                <div class="task-info">
                    <h3 class="task-title">${task.title}</h3>
                    <p class="task-description">${task.description || ''}</p>
                </div>
            </div>
            <button class="btn btn-delete" data-id="${task.id}">🗑️ Excluir</button>
        `;
        
        card.querySelector('.task-checkbox').addEventListener('change', (e) => toggleTask(task.id));
        card.querySelector('.btn-delete').addEventListener('click', () => deleteTask(task.id));
        
        container.appendChild(card);
    });
}

async function toggleTask(id) {
    const fd = new FormData();
    fd.append('id', id);
    
    try {
        const data = await fetch('/api/task/toggle.php', {
            method: 'POST',
            body: fd
        }).then(res => res.json());
        
        if (data.error) {
            showToast(data.message, 'error');
            return;
        }
        
        const index = tasks.findIndex(t => t.id == id);
        if (index !== -1) {
            tasks[index] = data.task;
            renderTasks();
            updateDeleteCompletedButton();
        }
    } catch (error) {
        showToast('Erro ao atualizar tarefa', 'error');
    }
}

async function deleteTask(id) {
    if (!confirm('Tem certeza que deseja excluir esta tarefa?')) {
        return;
    }
    
    const fd = new FormData();
    fd.append('id', id);
    
    try {
        const data = await fetch('/api/task/delete.php', {
            method: 'POST',
            body: fd
        }).then(res => res.json());
        
        if (data.error) {
            showToast(data.message, 'error');
            return;
        }
        
        showToast('Tarefa excluída com sucesso!', 'success');
        tasks = tasks.filter(t => t.id != id);
        renderTasks();
        updateDeleteCompletedButton();
    } catch (error) {
        showToast('Erro ao excluir tarefa', 'error');
    }
}

async function deleteCompletedTasks() {
    const completedCount = tasks.filter(t => t.completed == 1).length;
    
    if (completedCount === 0) {
        showToast('Não há tarefas concluídas para excluir', 'warning');
        return;
    }
    
    if (!confirm(`Excluir ${completedCount} tarefa(s) concluída(s)?`)) {
        return;
    }
    
    try {
        const data = await fetch('/api/task/delete-completed.php', {
            method: 'POST'
        }).then(res => res.json());
        
        if (data.error) {
            showToast(data.message, 'error');
            return;
        }
        
        showToast(data.message, 'success');
        loadTasks();
    } catch (error) {
        showToast('Erro ao excluir tarefas', 'error');
    }
}

function updateDeleteCompletedButton() {
    const btn = document.querySelector('#deleteCompletedBtn');
    const hasCompleted = tasks.some(t => t.completed == 1);
    btn.style.display = hasCompleted ? 'block' : 'none';
}

document.querySelector('#deleteCompletedBtn').addEventListener('click', deleteCompletedTasks);

loadTasks();

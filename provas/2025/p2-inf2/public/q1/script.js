const taskForm = document.querySelector('#taskForm');

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

// Pega o início e fim da tarefa
// Esta função recebe um objeto de tarefa e retorna um objeto com as datas de início e fim
function getTaskStartEnd(task) {
    const start = new Date(`${task.date}T${task.time}`);
    const end = new Date(start.getTime() + task.duration * 60000);
    return { start, end };
}

// Este é o array que armazena as tarefas
const tasks = [];

// Adiciona o evento de submit ao formulário de tarefas
taskForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Esta é uma tarefa de exemplo, substitua por valores do formulário
    const task = {
        name: 'Estudar para a prova de PW1',
        date: '2025-07-22',
        time: '08:00',
        duration: 90,
        completed: false
    };

    // Isto aqui é para obter o início e fim da tarefa. A função getTaskStartEnd está pronta
    const newTaskStartEnd = getTaskStartEnd(task);
});
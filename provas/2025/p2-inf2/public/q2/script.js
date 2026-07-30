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

// Algumas tarefas pré-existentes para teste
const tasks = [
    {
        name: 'Estudar para a prova de PW1',
        date: '2025-07-22',
        time: '08:00',
        duration: 90,
        completed: false
    },
    {
        name: 'Revisar exercícios de PW2',
        date: '2025-07-23',
        time: '10:00',
        duration: 60,
        completed: true
    },
    {
        name: 'Preparar apresentação de Banco de Dados',
        date: '2025-07-24',
        time: '14:00',
        duration: 120,
        completed: false
    },
    {
        name: 'Estudar para a prova de POO',
        date: '2025-07-25',
        time: '09:00',
        duration: 45,
        completed: true
    }
];

// Estrutura de cada item de tarefa
// <div class="task-item">
//     <div class="task-header">
//         <label class="task-checkbox">
//             <input type="checkbox">
//             <span class="task-name">${task.name}</span>
//         </label>
//         <button class="task-delete" title="Excluir tarefa">Excluir</button>
//     </div>
//     <div class="task-details">
//         <div class="task-detail">
//             <strong>Data:</strong> ${task.date}
//         </div>
//         <div class="task-detail">
//             <strong>Horário:</strong> ${task.time}
//         </div>
//         <div class="task-detail">
//             <strong>Duração:</strong> ${task.duration} minutos
//         </div>
//     </div>
// </div>


// Esta função deve renderizar as tarefas no container especificado
// container: o elemento onde as tarefas serão renderizadas
// completed: se true, renderiza as tarefas concluídas, caso contrário, renderiza as pendentes
function renderTasks(container, completed = false) {
}
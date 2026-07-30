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

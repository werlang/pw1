const taskInput = document.querySelector('#task-input');
const taskButton = document.querySelector('#task-button');
const clearButton = document.querySelector('#clear-button');
const taskList = document.querySelector('#task-list');
const totalTask = document.querySelector('#total-task'); 
const lastTask = document.querySelector('#last-task'); 
const joinTask = document.querySelector('#join-task'); 

let tasks = [];

function renderList() {
    if (tasks.length === 0) {
        taskList.innerHTML = 'Nenhuma tarefa cadastrada';
    }
    else {
        taskList.innerHTML = '';
        tasks.forEach((task, i) => {
            taskList.innerHTML += `<li>${ i+1 }: ${ task }</li>`;
        });
    }

    totalTask.textContent = tasks.length;
    lastTask.textContent = tasks[tasks.length - 1];
    joinTask.textContent = tasks.join(', ');
}
renderList();

taskButton.addEventListener('click', () => {
    tasks.push(taskInput.value);

    taskInput.value = '';
    taskInput.focus();

    renderList();
});

clearButton.addEventListener('click', () => {
    tasks = [];
    renderList();
});
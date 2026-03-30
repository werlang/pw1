const taskInput = document.querySelector('#task-input');
const taskButton = document.querySelector('#task-button');
const taskList = document.querySelector('#task-list');

let tasks = [];

function renderList() {
    taskList.textContent = '';

    tasks.forEach((task) => {
        taskList.innerHTML += task;
    });
}

taskButton.addEventListener('click', () => {
    const taskStr = `<li>${taskInput.value}</li>`;
    tasks.push(taskStr);
    renderList();

    taskInput.value = '';
    taskInput.focus();
});


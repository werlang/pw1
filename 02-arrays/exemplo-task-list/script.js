const taskInput = document.querySelector('#task-input');
const taskButton = document.querySelector('#task-button');
const taskList = document.querySelector('#task-list');

const tasks = [];

function renderList() {
    taskList.innerHTML = '';
    tasks.forEach((task, i) => {
        taskList.innerHTML += `<li>${ i+1 }: ${ task }</li>`;
    });
}

taskButton.addEventListener('click', () => {
    tasks.push(taskInput.value);

    taskInput.value = '';
    taskInput.focus();

    renderList();
});
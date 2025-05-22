const titleInput = document.querySelector('#title');
const descriptionInput = document.querySelector('#description');
const inputInput = document.querySelector('#input');
const outputInput = document.querySelector('#output');
const message = document.querySelector('#message');

const problems = [];

const button = document.querySelector('button');
button.addEventListener('click', () => {
    const problem = {
        title: titleInput.value,
        description: descriptionInput.value,
        input: inputInput.value,
        output: outputInput.value,
    };

    problems.push(problem);
    console.log(problems);

    titleInput.value = '';
    descriptionInput.value = '';
    inputInput.value = '';
    outputInput.value = '';

    message.innerHTML = `Problema <span id="problem-name">${problem.title}</span> cadastrado com sucesso!`;
});
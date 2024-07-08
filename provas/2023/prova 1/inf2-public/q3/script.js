let studentsList = [];

const name = document.querySelector('#name');
const age = document.querySelector('#age');
const add = document.querySelector('#add');
const oldest = document.querySelector('#oldest');
const result = document.querySelector('#result');

add.addEventListener('click', () => {
    const pessoa = {
        name: name.value,
        age: parseInt(age.value),
    }

    studentsList.push(pessoa);
});

oldest.addEventListener('click', () => {
    const maior = {
        nome: '',
        idade: 0,
    }

    studentsList.forEach(pessoa => {
        if (pessoa.age > maior.idade) {
            maior.idade = pessoa.age;
            maior.nome = pessoa.name;
        }
    });

    result.innerHTML = maior.nome;
});
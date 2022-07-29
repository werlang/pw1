const add = document.querySelector('#add');
const calc = document.querySelector('#calc');
const nome = document.querySelector('#nome');
const salario = document.querySelector('#salario');
const result = document.querySelector('#result');
const pessoas = [];

add.addEventListener('click', () => {
    const obj = {
        nome: nome.value,
        salario: parseFloat(salario.value),
    };
    pessoas.push(obj);
    console.log(pessoas);
});

calc.addEventListener('click', () => {
    let soma = 0;
    for (let i in pessoas) {
        soma += pessoas[i].salario;
    }
    let media = soma / pessoas.length;

    let texto = '';
    for (let i in pessoas) {
        if (pessoas[i].salario > media) {
            texto += `<div>
                <span>Nome: ${ pessoas[i].nome }</span>
                <span>Salário: ${ pessoas[i].salario }</span>
            </div>`;
        }
    }
    result.innerHTML = texto;
});

const carro = document.querySelector('#carro');
const placa = document.querySelector('#placa');
const insert = document.querySelector('#insert');
const remove = document.querySelector('#remove'); 

let carros = [];

insert.addEventListener('click', () => {
    const item = {
        modelo: carro.value,
        placa: placa.value
    };
    carros.push(item);
    refreshList();
});

remove.addEventListener('click', () => {
    carros.shift();
    // carros = carros.slice(1);
    refreshList();
});

function refreshList() {
    const listDOM = document.querySelector('#list');
    listDOM.innerHTML = '<div><span>Carro</span><span>Placa</span></div>';
    carros.forEach(item => {
        let element = document.createElement('div');
        element.innerHTML = `<span>${item.modelo}</span><span>${item.placa}</span>`;
        listDOM.appendChild(element);
    });
    carro.value = '';
    placa.value = '';
}

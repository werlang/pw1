const insertName = document.querySelector('#insertName');
const insertBtn = document.querySelector('#insertBtn');
const searchName = document.querySelector('#searchName');
const searchBtn = document.querySelector('#searchBtn');
const result = document.querySelector('#result');
const vetNames = [];

insertBtn.addEventListener('click', () => {
    console.log(insertName.value);
    vetNames.push(insertName.value);
    console.log(vetNames);

    result.innerHTML = vetNames.join('<br>');
});

searchBtn.addEventListener('click', () => {
    console.log(searchName.value);
    const pos = vetNames.indexOf(searchName.value);
    if(pos === -1){
        console.log('Não Achei!');
        result.innerHTML = 'Nome Não Encontrado!';
    } else {
        console.log('Achei!');
        result.innerHTML = `Nome Encontrado na posição ${pos}`;
    }
});
const names = [
    'Ana', 
    'Bruno', 
    'Carla', 
    'Daniel', 
    'Eduarda', 
    'Fabio', 
    'Gabriela', 
    'Helena', 
    'Igor', 
    'Julia',
];

const searchResult = document.querySelector('#search-result');
const searchInput = document.querySelector('#search');
const searchExact = document.querySelector('#search-exact');

searchInput.addEventListener('input', () => {
    const filterList = [];

    for (let name of names) {
        const nameLower = name.toLowerCase();
        const inputLower = searchInput.value.toLowerCase();
        if (nameLower.indexOf(inputLower) !== -1) {
            filterList.push(name);
        }
    }

    renderList(filterList);
});

function renderList(list) {
    if (list.length === 0) {
        searchResult.innerHTML = 'Nenhum nome encontrado';
    }
    else {
        searchResult.innerHTML = '';
        for (let name of list) {
            searchResult.innerHTML += `<div>${name}</div>`;
        }
    }
}

searchExact.addEventListener('click', () => {
    for (let name of names) {
        if (name === searchInput.value) {
            const index = names.indexOf(searchInput.value);
            searchResult.innerHTML = `O nome <strong>${name}</strong> está na posição <strong>${index}</strong>`;
            break;
        }
        else {
            searchResult.innerHTML = `O nome <strong>${name}</strong> não foi encontrado`;
        }
    }
});
const inputSearch = document.querySelector('#input-busca');
const buttonCheck = document.querySelector('#btn-verificar');
const buttonRestore = document.querySelector('#btn-restaurar');
const searchStatus = document.querySelector('#status-busca');
const indexStatus = document.querySelector('#status-indice');
const listNames = document.querySelector('#lista-nomes');
const counter = document.querySelector('#contador');

const names = ['Ana', 'Bruno', 'Carla', 'Daniel', 'Eduarda', 'Fabio', 'Gabriela', 'Helena', 'Igor', 'Julia'];

function renderNames(list) {
    listNames.innerHTML = '';

    if (list.length === 0) {
        listNames.innerHTML = '<li>Nenhum nome encontrado.</li>';
    } else {
        list.forEach(function(name) {
            listNames.innerHTML += `<li>${name}</li>`;
        });
    }

    counter.textContent = `${list.length} nome(s)`;
}

function filterNames() {
    const term = inputSearch.value.trim().toLowerCase();

    if (term === '') {
        searchStatus.textContent = 'Mostrando todos os nomes do array.';
        renderNames(names);
        return;
    }

    const filteredNames = names.filter(function(name) {
        return name.toLowerCase().includes(term);
    });

    if (filteredNames.length === 0) {
        searchStatus.textContent = 'Nenhum nome combina com a busca atual.';
    } else {
        searchStatus.textContent = `Busca parcial encontrou ${filteredNames.length} resultado(s).`;
    }

    renderNames(filteredNames);
}

inputSearch.addEventListener('input', function() {
    indexStatus.textContent = '';
    filterNames();
});

buttonCheck.addEventListener('click', function() {
    const term = inputSearch.value.trim().toLowerCase();

    if (term === '') {
        indexStatus.textContent = 'Digite um nome para fazer a busca exata.';
        inputSearch.focus();
        return;
    }

    const normalizedNames = names.map(function(name) {
        return name.toLowerCase();
    });

    const position = normalizedNames.indexOf(term);

    if (position === -1) {
        indexStatus.textContent = 'Busca exata: nome não encontrado no array.';
    } else {
        indexStatus.textContent = `Busca exata: ${names[position]} está no índice ${position}.`;
    }
});

buttonRestore.addEventListener('click', function() {
    inputSearch.value = '';
    searchStatus.textContent = 'Lista restaurada com todos os nomes.';
    indexStatus.textContent = '';
    renderNames(names);
    inputSearch.focus();
});

renderNames(names);
searchStatus.textContent = 'Mostrando todos os nomes do array.';
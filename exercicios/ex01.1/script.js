const n = prompt('Quantos itens deseja?');

let items = '';
for (let i=0 ; i<n ; i++) {
    items += `<li>Item ${ i + 1 }</li>`;
}

document.querySelector('#content').innerHTML = `<ul>${ items }</ul>`;
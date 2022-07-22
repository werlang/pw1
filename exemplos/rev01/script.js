var box = document.querySelector('#box');

let table = '';

table += '<table>';
let cont = 0;

for (let i=0 ; i<10 ; i++) {
    table += '<tr>';
    for (let j=0 ; j<5 ; j++) {
        cont++;
        table += `<td>${cont}</td>`;
    }
    table += '</tr>';
}

table += '</table>';

box.innerHTML = table;
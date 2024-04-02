const input = document.querySelector('input');
const button = document.querySelector('button');
const lista = document.querySelector('ul');

button.addEventListener('click', insertItem);

input.addEventListener('keypress', ev => {
    if (ev.key === 'Enter') {
        insertItem();
    }
});

function insertItem() {
    const item = document.createElement('li');
    item.innerHTML = `<span>X</span> ${ input.value }`;
    const remove = item.querySelector('span');
    lista.appendChild(item);
    input.value = '';

    remove.addEventListener('click', function() {
        item.remove();
    });
}
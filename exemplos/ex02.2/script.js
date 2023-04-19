const n1 = document.querySelector('#n1');
const n2 = document.querySelector('#n2');
const result = document.querySelector('#result');

function multiplica() {
    const vn1 = parseInt(n1.value);
    const vn2 = parseInt(n2.value);
    const mult = vn1 * vn2;

    result.innerHTML = mult;
    if (isNaN(mult)) {
        result.innerHTML = 'ERRO';
    }
}

n1.addEventListener('input', multiplica);
n2.addEventListener('input', multiplica);
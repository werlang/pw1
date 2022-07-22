const cadastro = [];

const button = document.querySelector('button');
button.addEventListener('click', () => {
    cadastro.push({
        nome: document.querySelector('#nome').value,
        valor: document.querySelector('#valor').value,
    });
    // console.log(cadastro);

    let text = '';
    for (let i in cadastro) {
        text += `<div>
            <span>${ cadastro[i].nome }</span>
            <span>${ cadastro[i].valor }</span>
        </div>`;
    }
    document.querySelector('#message').innerHTML = text;
});
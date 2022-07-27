let cadastro = [];

const nome = document.querySelector('#nome');
const valor = document.querySelector('#valor');

const inserir = document.querySelector('#inserir');
inserir.addEventListener('click', () => {
    cadastro.push({
        nome: nome.value,
        valor: valor.value,
    });
    // console.log(cadastro);

    atualizaDocumento();
});

const remove = document.querySelector('#remove');
remove.addEventListener('click', () => {
    let novoCadastro = [];
    for (let i in cadastro) {
        if (i != 0) {
            novoCadastro.push(cadastro[i]);
        }
    }
    cadastro = novoCadastro;

    atualizaDocumento();
});

function atualizaDocumento() {
    let texto = '';
    for (let i in cadastro) {
        texto += `<div>
            <span>${ cadastro[i].nome }</span>
            <span>${ cadastro[i].valor }</span>
        </div>`;
    }
    document.querySelector('#message').innerHTML = texto;
}
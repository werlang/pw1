import { showToast } from "../componentes/toast.js";

const form = document.querySelector('#form-edicao');
const carregando = document.querySelector('#carregando');

const id = new URLSearchParams(window.location.search).get('id');

async function carregarProduto() {
    if (!id) {
        carregando.textContent = 'Informe o id do produto na URL. Exemplo: editar/?id=5';
        return;
    }

    const resposta = await fetch(`/api/produto/?id=${id}`);
    const data = await resposta.json();

    if (data.erro) {
        carregando.textContent = data.mensagem;
        showToast(data.mensagem, 'error');
        return;
    }

    form.nome.value = data.produto.nome;
    form.categoria.value = data.produto.categoria;
    form.preco.value = data.produto.preco;
    form.descricao.value = data.produto.descricao;

    carregando.hidden = true;
    form.hidden = false;
}

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    if (!id) {
        showToast('Informe o id do produto na URL', 'error');
        return;
    }

    const dados = new FormData(form);
    const produto = {
        nome: dados.get('nome'),
        categoria: dados.get('categoria'),
        preco: Number(dados.get('preco')),
        descricao: dados.get('descricao'),
    };

    const resposta = await fetch(`/api/produto/?id=${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(produto),
    });
    const data = await resposta.json();

    showToast(data.mensagem, data.erro ? 'error' : 'success');
});

carregarProduto();

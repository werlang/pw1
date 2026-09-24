import { showToast } from "../componentes/toast.js";
import { confirmar } from "../componentes/modal.js";

const container = document.querySelector('#produtos-container');
const status = document.querySelector('#status');
const filtros = document.querySelector('#filtros');

function montarUrl() {
    const dados = new FormData(filtros);
    const parametros = new URLSearchParams();

    if (dados.get('categoria')) {
        parametros.set('categoria', dados.get('categoria'));
    }
    if (dados.get('precomin')) {
        parametros.set('precomin', dados.get('precomin'));
    }
    if (dados.get('precomax')) {
        parametros.set('precomax', dados.get('precomax'));
    }

    return `/api/produto/?${parametros}`;
}

async function carregarProdutos() {
    status.hidden = false;
    status.textContent = 'Carregando produtos...';
    container.innerHTML = '';

    const resposta = await fetch(montarUrl());
    const data = await resposta.json();

    if (data.erro) {
        status.textContent = data.mensagem;
        showToast(data.mensagem, 'error');
        return;
    }

    renderCards(data.produtos);
}

function renderCards(produtos) {
    if (produtos.length === 0) {
        container.innerHTML = '';
        status.hidden = false;
        status.textContent = 'Nenhum produto encontrado.';
        return;
    }

    status.hidden = true;

    produtos.forEach(produto => {
        const card = document.createElement('article');
        card.className = 'cartao';

        card.innerHTML = `
            <span class="categoria">${produto.categoria}</span>
            <h3>${produto.nome}</h3>
            <p class="descricao">${produto.descricao}</p>
            <div class="preco">R$ ${produto.preco.toFixed(2)}</div>
            <div class="acoes">
                <a class="botao" href="../detalhe/?id=${produto.id}">Detalhes</a>
                <a class="botao" href="../editar/?id=${produto.id}">Editar</a>
                <button type="button" class="botao botao-vermelho excluir">Excluir</button>
            </div>
        `;

        const botaoExcluir = card.querySelector('.excluir');

        botaoExcluir.addEventListener('click', () => excluirProduto(produto));

        container.append(card);
    });
}

async function excluirProduto(produto) {
    const confirmado = await confirmar(`Excluir o produto "${produto.nome}"?`);
    if (!confirmado) {
        return;
    }

    const resposta = await fetch(`/api/produto/?id=${produto.id}`, {
        method: 'DELETE',
    });
    const data = await resposta.json();

    showToast(data.mensagem, data.erro ? 'error' : 'success');

    if (!data.erro) {
        carregarProdutos();
    }
}

filtros.addEventListener('submit', (event) => {
    event.preventDefault();
    carregarProdutos();
});

carregarProdutos();

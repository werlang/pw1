import { showToast } from "../componentes/toast.js";
import { confirmar } from "../componentes/modal.js";

const container = document.querySelector('#produto-detalhe');

const id = new URLSearchParams(window.location.search).get('id');

async function carregarProduto() {
    if (!id) {
        container.textContent = 'Informe o id do produto na URL. Exemplo: detalhe/?id=5';
        return;
    }

    const resposta = await fetch(`/api/produto/?id=${id}`);
    const data = await resposta.json();

    if (data.erro) {
        container.textContent = data.mensagem;
        showToast(data.mensagem, 'error');
        return;
    }

    mostrarProduto(data.produto);
}

function mostrarProduto(produto) {
    // Cria o painel do produto...
    const painel = document.createElement('article');
    painel.className = 'painel-produto';

    // ...o conteúdo entra como HTML...
    painel.innerHTML = `
        <span class="categoria">${produto.categoria}</span>
        <h2>${produto.nome}</h2>
        <div class="preco">R$ ${produto.preco.toFixed(2)}</div>
        <p class="descricao">${produto.descricao}</p>
        <small>ID do produto: ${produto.id}</small>
        <div class="acoes">
            <a class="botao botao-azul" href="../editar/?id=${produto.id}">Editar</a>
            <button type="button" class="botao botao-vermelho excluir">Excluir</button>
            <a class="botao" href="../lista/">Voltar</a>
        </div>
    `;

    // ...e o painel entra no container, no lugar do aviso de carregamento.
    container.className = '';
    container.innerHTML = '';
    container.append(painel);

    const botaoExcluir = painel.querySelector('.excluir');

    botaoExcluir.addEventListener('click', () => excluirProduto(produto));
}

async function excluirProduto(produto) {
    // O confirmar() abre a caixinha na tela e só responde quando a pessoa escolhe.
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
        window.location.href = '../lista/';
    }
}

carregarProduto();

import { showToast } from "../componentes/toast.js";

const form = document.querySelector('form');

// POST /api/produto/ — o FormData chega no PHP em $_POST.
form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const resposta = await fetch('/api/produto/', {
        method: 'POST',
        body: new FormData(form),
    });
    const data = await resposta.json();

    showToast(data.mensagem, data.erro ? 'error' : 'success');

    // Limpa o formulário só quando a API aceitou.
    if (!data.erro) {
        form.reset();
    }
});

/**
 * Mostra uma caixa de confirmação no centro da tela e espera a resposta.
 * Uso: const ok = await confirmar("Excluir este item?");
 * @param {string} mensagem
 * @returns {Promise<boolean>} true quando a pessoa confirma, false quando cancela
 */
export function confirmar(mensagem) {
    return new Promise((resolve) => {
        const overlay = document.createElement('div');
        overlay.className = 'modal-overlay';

        overlay.innerHTML = `
            <div class="modal">
                <p class="modal-mensagem">${mensagem}</p>
                <div class="modal-acoes">
                    <button type="button" class="modal-cancelar">Cancelar</button>
                    <button type="button" class="modal-confirmar">Confirmar</button>
                </div>
            </div>
        `;

        document.body.append(overlay);

        const botaoCancelar = overlay.querySelector('.modal-cancelar');
        const botaoConfirmar = overlay.querySelector('.modal-confirmar');

        // Fecha a caixa e devolve a resposta para quem chamou o confirmar().
        function responder(valor) {
            overlay.remove();
            resolve(valor);
        }

        botaoCancelar.addEventListener('click', () => responder(false));
        botaoConfirmar.addEventListener('click', () => responder(true));

        botaoConfirmar.focus();
    });
}

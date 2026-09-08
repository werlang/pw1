// Seleção dos elementos do DOM
const formulario = document.querySelector('#form-ocorrencia');
const btnEnviar = document.querySelector('#btn-enviar');
const caixaFeedback = document.querySelector('#caixa-feedback');

/**
 * Atualiza o painel de feedback visual da interface.
 */
function exibirFeedback(mensagem, tipo) {
    caixaFeedback.textContent = mensagem;
    caixaFeedback.className = 'caixa-feedback feedback-' + tipo;
}

/**
 * Oculta o painel de feedback.
 */
function ocultarFeedback() {
    caixaFeedback.className = 'caixa-feedback oculta';
    caixaFeedback.textContent = '';
}

// Intercepta o envio do formulário
formulario.addEventListener('submit', async function(evento) {
    // 1. Fundamental: impede que o navegador recarregue a página inteira
    evento.preventDefault();

    // 2. Estado de CARREGANDO:
    // Trava o botão para impedir disparos acidentais múltiplos e avisa o usuário
    btnEnviar.disabled = true;
    btnEnviar.textContent = 'Registrando chamado...';
    exibirFeedback('Enviando dados da ocorrência ao servidor, aguarde...', 'carregando');

    try {
        // 3. Monta o pacote de dados a partir dos campos nomeados do formulário
        // Nota: nunca defina Content-Type manualmente aqui, o navegador cuidará disso!
        const dadosFormulario = new FormData(formulario);

        // 4. Executa a requisição assíncrona POST para o script PHP
        const response = await fetch('api.php', {
            method: 'POST',
            body: dadosFormulario
        });

        // 5. Decodifica o corpo da resposta em JSON
        const resultado = await response.json();

        // 6. Confere se o status HTTP foi de sucesso (200-299)
        // Lembrando: erros 422 ou 500 NÃO caem no bloco catch automaticamente!
        if (!response.ok) {
            throw new Error(resultado.message || `Erro no servidor (HTTP ${response.status})`);
        }

        // 7. Estado de SUCESSO:
        exibirFeedback(resultado.message, 'sucesso');

        // Limpa o formulário apenas quando a gravação foi confirmada com sucesso
        formulario.reset();

    } catch (erro) {
        // 8. Estado de ERRO:
        // Exibe a explicação amigável e preserva os campos preenchidos para correção
        exibirFeedback('Atenção: ' + erro.message, 'erro');
        console.error('Falha no envio da ocorrência:', erro);

    } finally {
        // 9. Estado de CONCLUSÃO:
        // O bloco finally executa SEMPRE (tanto no sucesso quanto no erro),
        // garantindo que o botão nunca permaneça desabilitado para o usuário!
        btnEnviar.disabled = false;
        btnEnviar.textContent = 'Registrar Ocorrência';
    }
});

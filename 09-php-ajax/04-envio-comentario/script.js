/**
 * Exercício 04: Envio de Formulário com FormData (POST)
 * 
 * Demonstra como interceptar o envio do formulário, empacotar
 * os dados automaticamente com FormData e enviar via fetch() POST.
 */

// 1. Seleção dos elementos do DOM
const formRecado = document.querySelector('#form-recado');
const btnEnviar = document.querySelector('#btn-enviar');
const statusEnvio = document.querySelector('#status-envio');

/**
 * Trata o evento de submissão do formulário.
 * @param {SubmitEvent} evento
 */
async function aoEnviar(evento) {
  // REGRA DE OURO: impede que o navegador recarregue a página!
  evento.preventDefault();

  // 1. Bloqueia a interface e altera o texto do botão
  btnEnviar.disabled = true;
  btnEnviar.textContent = 'Enviando...';
  statusEnvio.className = 'status status-carregando';
  statusEnvio.textContent = 'Enviando recado para o mural...';

  try {
    // 2. Cria o FormData diretamente a partir do elemento do formulário
    const dadosFormulario = new FormData(formRecado);

    // 3. Dispara a requisição POST via fetch (sem definir Content-Type manual!)
    const resposta = await fetch('api.php', {
      method: 'POST',
      body: dadosFormulario
    });

    const dados = await resposta.json();

    if (!resposta.ok) {
      throw new Error(dados.mensagem || 'Falha ao registrar recado.');
    }

    // 4. Sucesso: exibe mensagem positiva e limpa os campos do formulário
    statusEnvio.className = 'status status-sucesso';
    statusEnvio.textContent = `✓ ${dados.mensagem} (Protocolo #${dados.id} às ${dados.horario})`;

    formRecado.reset();

  } catch (erro) {
    statusEnvio.className = 'status status-erro';
    statusEnvio.textContent = `✕ Erro: ${erro.message}`;
  } finally {
    // 5. Garante que o botão seja reabilitado
    btnEnviar.disabled = false;
    btnEnviar.textContent = 'Publicar Recado';
  }
}

// 2. Registro do ouvinte no evento submit do formulário
formRecado.addEventListener('submit', aoEnviar);

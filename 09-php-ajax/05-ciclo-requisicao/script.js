/**
 * Exercício 05: Ciclo de Vida da Requisição e Tratamento de Erros
 * 
 * Demonstra como gerenciar os 4 estados da interface (Carregando,
 * Sucesso, Erro e Finalização com finally) e checar response.ok.
 */

// 1. Elementos da interface
const campoCarteirinha = document.querySelector('#campo-carteirinha');
const btnConsultar = document.querySelector('#btn-consultar');
const statusPainel = document.querySelector('#status-painel');

const cardSaldo = document.querySelector('#card-saldo');
const saldoNome = document.querySelector('#saldo-nome');
const saldoMatricula = document.querySelector('#saldo-matricula');
const saldoSituacao = document.querySelector('#saldo-situacao');
const saldoValor = document.querySelector('#saldo-valor');

/**
 * Consulta o saldo no servidor gerenciando os 4 estados do ciclo de vida.
 */
async function consultarSaldo() {
  const numeroCarteirinha = campoCarteirinha.value.trim();

  // 1. Validação simples no frontend
  if (!numeroCarteirinha) {
    statusPainel.className = 'status status-erro';
    statusPainel.textContent = 'Por favor, informe o número da carteirinha.';
    cardSaldo.style.display = 'none';
    return;
  }

  // ESTADO 1: CARREGANDO (Trava os controles e avisa o usuário)
  btnConsultar.disabled = true;
  campoCarteirinha.disabled = true;
  statusPainel.className = 'status status-carregando';
  statusPainel.textContent = 'Consultando cadastro escolar no servidor...';
  cardSaldo.style.display = 'none';

  try {
    const parametros = new URLSearchParams({ carteirinha: numeroCarteirinha });
    const resposta = await fetch(`api.php?${parametros.toString()}`);

    // Tentamos decodificar a resposta JSON do PHP
    const dados = await resposta.json();

    // IMPORTANTE: fetch() NÃO falha em erros 404/422/500!
    // Precisamos checar a propriedade booleana resposta.ok (status entre 200 e 299)
    if (!resposta.ok) {
      // Se não estiver ok, lançamos um erro com a mensagem explicativa que veio do PHP
      throw new Error(dados.mensagem || `Erro HTTP ${resposta.status}`);
    }

    // ESTADO 2: SUCESSO (Atualiza a interface com os dados válidos)
    const cart = dados.carteirinha;
    saldoNome.textContent = cart.nome;
    saldoMatricula.textContent = cart.matricula;
    saldoSituacao.textContent = cart.situacao;
    saldoSituacao.className = `badge-situacao ${cart.situacao === 'Bloqueada' ? 'badge-bloqueada' : ''}`;
    
    // Formata o número como moeda brasileira
    saldoValor.textContent = cart.saldo.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });

    cardSaldo.style.display = 'flex';
    statusPainel.className = 'status status-sucesso';
    statusPainel.textContent = `✓ Carteirinha ativa localizada com sucesso!`;

  } catch (erro) {
    // ESTADO 3: ERRO (Captura falhas de rede, 404, 422 ou exceções do throw)
    cardSaldo.style.display = 'none';
    statusPainel.className = 'status status-erro';
    statusPainel.textContent = `✕ ${erro.message}`;

  } finally {
    // ESTADO 4: FINALIZAÇÃO (Garante SEMPRE o destravamento da interface)
    btnConsultar.disabled = false;
    campoCarteirinha.disabled = false;
    campoCarteirinha.focus();
  }
}

// 2. Ouvintes de eventos
btnConsultar.addEventListener('click', consultarSaldo);

// Permite acionar com Enter
campoCarteirinha.addEventListener('keydown', (evento) => {
  if (evento.key === 'Enter') {
    consultarSaldo();
  }
});

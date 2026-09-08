/**
 * Busca no Acervo da Biblioteca - Script Didático
 * 
 * Demonstra o uso de:
 * 1. Debounce para esperar o usuário pausar a digitação.
 * 2. AbortController para cancelar requisições GET obsoletas em trânsito.
 * 3. Renderização no DOM com createElement e append.
 */

// 1. Seleção dos elementos da interface
const campoBusca = document.querySelector('#campo-busca');
const btnLimpar = document.querySelector('#btn-limpar');
const statusBusca = document.querySelector('#status-busca');
const gradeLivros = document.querySelector('#grade-livros');

// 2. Variáveis de controle de fluxo assíncrono
let temporizadorDebounce = null;
let controladorRequisicao = null;

// Tempo de espera após a última tecla digitada (em milissegundos)
const TEMPO_DEBOUNCE_MS = 300;

/**
 * Atualiza visualmente o painel de status da busca.
 * @param {string} mensagem Texto descritivo
 * @param {'inicial' | 'carregando' | 'sucesso' | 'vazio' | 'erro'} tipo Tipo visual do status
 */
function definirStatus(mensagem, tipo) {
  statusBusca.textContent = mensagem;
  statusBusca.className = `status-busca status-${tipo}`;
}

/**
 * Constrói e retorna um card DOM para exibição de um livro.
 * Não utiliza data-* nem innerHTML inseguro.
 * @param {Object} livro Dados do livro retornados pelo PHP
 * @returns {HTMLElement}
 */
function criarCardLivro(livro) {
  const card = document.createElement('article');
  card.className = 'card-livro';

  const corpo = document.createElement('div');
  corpo.className = 'card-corpo';

  const categoria = document.createElement('span');
  categoria.className = 'card-categoria';
  categoria.textContent = livro.categoria;

  const titulo = document.createElement('h2');
  titulo.className = 'card-titulo';
  titulo.textContent = livro.titulo;

  const autor = document.createElement('p');
  autor.className = 'card-autor';
  autor.textContent = `Por ${livro.autor}`;

  corpo.append(categoria, titulo, autor);

  const rodape = document.createElement('footer');
  rodape.className = 'card-rodape';

  const ano = document.createElement('span');
  ano.className = 'card-ano';
  ano.textContent = `Publicado em ${livro.ano}`;

  const badge = document.createElement('span');
  badge.className = `badge-status ${livro.disponivel ? 'badge-disponivel' : 'badge-emprestado'}`;
  badge.textContent = livro.disponivel ? 'Disponível' : 'Emprestado';

  rodape.append(ano, badge);
  card.append(corpo, rodape);

  return card;
}

/**
 * Dispara a consulta assíncrona ao backend com AbortController.
 * @param {string} termo Termo pesquisado
 */
async function buscarLivros(termo) {
  // Se já existe uma requisição em andamento, cancelamos ela antes de iniciar a nova!
  if (controladorRequisicao) {
    controladorRequisicao.abort();
  }

  // Cria uma nova instância de AbortController para a requisição atual
  controladorRequisicao = new AbortController();

  definirStatus(`Buscando livros com o termo "${termo}"...`, 'carregando');

  try {
    const parametros = new URLSearchParams({ busca: termo });
    const url = `api.php?${parametros.toString()}`;

    // Conecta o signal do controlador à requisição fetch
    const resposta = await fetch(url, {
      signal: controladorRequisicao.signal
    });

    const dados = await resposta.json();

    if (!resposta.ok) {
      throw new Error(dados.mensagem || 'Falha ao consultar o acervo.');
    }

    // Limpa a grade antes de renderizar os novos resultados
    gradeLivros.replaceChildren();

    if (dados.livros.length === 0) {
      definirStatus(`Nenhum livro encontrado para "${termo}". Tente outro assunto.`, 'vazio');
      return;
    }

    // Cria e insere cada card de livro
    for (const livro of dados.livros) {
      const card = criarCardLivro(livro);
      gradeLivros.append(card);
    }

    const plural = dados.livros.length === 1 ? 'livro encontrado' : 'livros encontrados';
    definirStatus(`${dados.livros.length} ${plural} para "${termo}".`, 'sucesso');

  } catch (erro) {
    // SE O ERRO FOR DE CANCELAMENTO (AbortError), NÃO É UM ERRO REAL!
    // Ele indica apenas que o usuário digitou uma nova letra e esta busca ficou obsoleta.
    if (erro.name === 'AbortError') {
      console.log(`[AbortController] Busca por "${termo}" cancelada para priorizar uma nova consulta.`);
      return;
    }

    // Se for uma falha real de rede ou servidor, reportamos ao usuário
    definirStatus(`Erro na consulta: ${erro.message}`, 'erro');
    gradeLivros.replaceChildren();
  }
}

/**
 * Trata as alterações no campo de texto aplicando o Debounce.
 */
function aoDigitar() {
  const termo = campoBusca.value.trim();

  // Controla exibição do botão de limpar campo
  btnLimpar.style.display = termo.length > 0 ? 'block' : 'none';

  // Cancela o temporizador anterior caso o usuário digite novamente antes dos 300ms
  clearTimeout(temporizadorDebounce);

  // Se o usuário apagou o texto ou tem menos de 2 caracteres:
  if (termo.length < 2) {
    // Se havia uma requisição em voo, cancela
    if (controladorRequisicao) {
      controladorRequisicao.abort();
      controladorRequisicao = null;
    }

    gradeLivros.replaceChildren();

    if (termo.length === 0) {
      definirStatus('Digite pelo menos 2 caracteres para pesquisar...', 'inicial');
    } else {
      definirStatus('Continue digitando... (mínimo de 2 caracteres)', 'inicial');
    }
    return;
  }

  // Agenda a busca para disparar somente se o usuário parar de digitar por 300ms
  temporizadorDebounce = setTimeout(() => {
    buscarLivros(termo);
  }, TEMPO_DEBOUNCE_MS);
}

// 3. Registro dos ouvintes de eventos
campoBusca.addEventListener('input', aoDigitar);

btnLimpar.addEventListener('click', () => {
  campoBusca.value = '';
  aoDigitar();
  campoBusca.focus();
});

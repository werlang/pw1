/**
 * Exercício 03: Consulta de Disciplinas com URLSearchParams (GET)
 * 
 * Demonstra como compor parâmetros de URL de forma segura com
 * new URLSearchParams() e enviar na consulta GET via fetch().
 */

// 1. Seleção dos elementos do DOM
const seletorDisciplina = document.querySelector('#seletor-disciplina');
const btnConsultar = document.querySelector('#btn-consultar');
const statusConsulta = document.querySelector('#status-consulta');

const cardDetalhes = document.querySelector('#card-detalhes');
const detalheSigla = document.querySelector('#detalhe-sigla');
const detalheNome = document.querySelector('#detalhe-nome');
const detalheCarga = document.querySelector('#detalhe-carga');
const detalheProfessor = document.querySelector('#detalhe-professor');
const detalheEmenta = document.querySelector('#detalhe-ementa');

/**
 * Dispara a consulta com o parâmetro selecionado.
 */
async function buscarDisciplina() {
  const siglaSelecionada = seletorDisciplina.value;

  // 1. Validação defensiva no frontend antes de fazer a requisição
  if (!siglaSelecionada) {
    statusConsulta.className = 'status status-alerta';
    statusConsulta.textContent = 'Por favor, selecione uma disciplina na lista antes de consultar.';
    cardDetalhes.style.display = 'none';
    return;
  }

  btnConsultar.disabled = true;
  statusConsulta.className = 'status status-carregando';
  statusConsulta.textContent = 'Buscando informações da disciplina no servidor...';

  try {
    // 2. Uso de URLSearchParams para criar a URL de forma segura
    const parametros = new URLSearchParams({ sigla: siglaSelecionada });
    const url = `api.php?${parametros.toString()}`;

    // 3. Execução da chamada GET
    const resposta = await fetch(url);
    const dados = await resposta.json();

    if (!resposta.ok) {
      throw new Error(dados.mensagem || 'Falha ao buscar disciplina.');
    }

    // 4. Preenchimento do card com os dados retornados
    const info = dados.disciplina;
    detalheSigla.textContent = info.sigla;
    detalheNome.textContent = info.nome;
    detalheCarga.textContent = info.carga_horaria;
    detalheProfessor.textContent = info.professor;
    detalheEmenta.textContent = info.ementa;

    // 5. Torna o card visível
    cardDetalhes.style.display = 'flex';
    statusConsulta.style.display = 'none';

  } catch (erro) {
    cardDetalhes.style.display = 'none';
    statusConsulta.style.display = 'block';
    statusConsulta.className = 'status status-alerta';
    statusConsulta.textContent = erro.message;
  } finally {
    btnConsultar.disabled = false;
  }
}

// 2. Ouvinte de evento no botão
btnConsultar.addEventListener('click', buscarDisciplina);

// Opcional: limpa o card caso o usuário mude a seleção
seletorDisciplina.addEventListener('change', () => {
  statusConsulta.style.display = 'block';
  statusConsulta.className = 'status status-inicial';
  statusConsulta.textContent = 'Clique em "Ver Detalhes" para carregar a disciplina selecionada.';
  cardDetalhes.style.display = 'none';
});

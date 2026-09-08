/**
 * Exercício 02: Horário Oficial do Campus com fetch() GET
 * 
 * Demonstra a chamada assíncrona com fetch('api.php'),
 * o parse de JSON com response.json() e a atualização de campos no DOM.
 */

// 1. Elementos da interface
const btnConsultar = document.querySelector('#btn-consultar');
const statusRequisicao = document.querySelector('#status-requisicao');

const infoCampus = document.querySelector('#info-campus');
const infoHorario = document.querySelector('#info-horario');
const infoData = document.querySelector('#info-data');
const infoTurno = document.querySelector('#info-turno');

/**
 * Consulta a API em PHP e preenche os campos na tela.
 */
async function consultarServidor() {
  btnConsultar.disabled = true;
  statusRequisicao.className = 'status status-carregando';
  statusRequisicao.textContent = 'Sincronizando com o servidor...';

  try {
    // 1. Dispara a requisição GET ao endpoint relativo
    const resposta = await fetch('api.php');

    // 2. Converte a resposta em texto JSON para objeto JavaScript
    const dados = await resposta.json();

    // 3. Atualiza os nós do DOM com os dados retornados
    infoCampus.textContent = dados.campus;
    infoHorario.textContent = dados.horario;
    infoData.textContent = dados.data;
    infoTurno.textContent = dados.turno;

    statusRequisicao.className = 'status status-sucesso';
    statusRequisicao.textContent = 'Dados do servidor sincronizados com sucesso!';

  } catch (erro) {
    statusRequisicao.className = 'status';
    statusRequisicao.textContent = `Erro ao comunicar com o servidor: ${erro.message}`;
  } finally {
    // 4. Reabilita o botão para novas consultas
    btnConsultar.disabled = false;
  }
}

// 2. Registro do ouvinte de evento
btnConsultar.addEventListener('click', consultarServidor);

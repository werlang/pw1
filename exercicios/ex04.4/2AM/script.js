const nomeInput = document.querySelector('#nome');
const idadeInput = document.querySelector('#idade');
const idadeTypeInput = document.querySelector('#idade-type');
const pesoInput = document.querySelector('#peso');
const descricaoInput = document.querySelector('#descricao');
const especieInput = document.querySelector('#especie');
const sexoInput = document.querySelector('#sexo');
const tableLista = document.querySelector('#lista-container');

const registroTab = document.querySelector('#registro-tab');
const consultaTab = document.querySelector('#consulta-tab');
const boxRegistro = document.querySelector('#registro-box');
const boxConsulta = document.querySelector('#consulta-box');

const filtroInput = document.querySelector('#filtro-animais');

registroTab.addEventListener('click', () => {
    registroTab.classList.add('active');
    consultaTab.classList.remove('active');
    boxRegistro.classList.add('active');
    boxConsulta.classList.remove('active');
});

consultaTab.addEventListener('click', () => {
    consultaTab.classList.add('active');
    registroTab.classList.remove('active');
    boxConsulta.classList.add('active');
    boxRegistro.classList.remove('active');

    listarAnimais();
});

const animais = [];

const cadastroButton = document.querySelector('#cadastro');
cadastroButton.addEventListener('click', () => {
    let idade;

    if (idadeTypeInput.value == 'm') {
        idade = Number(idadeInput.value);
    }
    else {
        idade = Number(idadeInput.value) * 12;
    }

    const animal = {
        nome: nomeInput.value,
        idade: idade,
        peso: Number(pesoInput.value),
        descricao: descricaoInput.value,
        especie: especieInput.value,
        sexo: sexoInput.value,
    };

    animais.push(animal);

    nomeInput.value = '';
    idadeInput.value = '';
    pesoInput.value = '';
    descricaoInput.value = '';

    console.log(animais);
});

function listarAnimais(busca = '') {
    tableLista.innerHTML = `<thead>
        <th>Nome</th>
        <th>Espécie</th>
        <th>Sexo</th>
        <th>Idade (meses)</th>
        <th>Peso (Kg)</th>
    </thead>`;

    let cont = 0;
    animais.forEach(animal => {
        const linha = document.createElement('tr');

        let especieObj = {
            c: 'Cachorro',
            g: 'Gato',
            a: 'Ave',
            o: 'Outro'
        }

        let sexoObj = {
            m: 'Macho',
            f: 'Fêmea'
        }

        if (
            animal.nome.toLowerCase().includes(busca.toLowerCase()) ||
            animal.descricao.toLowerCase().includes(busca.toLowerCase())
        ) {
            cont++;
            linha.innerHTML = `
                <td>${animal.nome}</td>
                <td>${especieObj[animal.especie]}</td>
                <td>${sexoObj[animal.sexo]}</td>
                <td>${animal.idade}</td>
                <td>${animal.peso}</td>
            `;
            tableLista.append(linha);
        }
    });

    if (cont == 0) {
        tableLista.innerHTML = `Nenhum animal encontrado`;
        return;
    }
}

filtroInput.addEventListener('input', () => {
    listarAnimais(filtroInput.value);
});
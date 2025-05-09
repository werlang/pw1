const nomeInput = document.querySelector('#nome');
const idadeInput = document.querySelector('#idade');
const idadeTypeInput = document.querySelector('#idade-type');
const pesoInput = document.querySelector('#peso');
const descricaoInput = document.querySelector('#descricao');
const especieInput = document.querySelector('#especie');
const sexoInput = document.querySelector('#sexo');
const tableLista = document.querySelector('#lista-container');

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

const listarButton = document.querySelector('#listar');
listarButton.addEventListener('click', () => {
    tableLista.innerHTML = `<thead>
        <th>Nome</th>
        <th>Espécie</th>
        <th>Sexo</th>
        <th>Idade (meses)</th>
        <th>Peso (Kg)</th>
    </thead>`;

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

        linha.innerHTML = `
            <td>${animal.nome}</td>
            <td>${especieObj[animal.especie]}</td>
            <td>${sexoObj[animal.sexo]}</td>
            <td>${animal.idade}</td>
            <td>${animal.peso}</td>
        `;
        tableLista.append(linha);
    });
});
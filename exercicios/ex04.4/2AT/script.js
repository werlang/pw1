const nomeInput = document.querySelector('#nome');
const pesoInput = document.querySelector('#peso');
const idadeInput = document.querySelector('#idade');
const idadeTypeInput = document.querySelector('#idade-type');
const especieInput = document.querySelector('#especie');
const descricaoInput = document.querySelector('#descricao');
const racaInput = document.querySelector('#raca');
const sexoInput = document.querySelector('#sexo');

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
        peso: Number(pesoInput.value),
        idade: idade,
        sexo: sexoInput.value,
        descricao: descricaoInput.value,
        especie: especieInput.value,
        raca: racaInput.value,
    }

    animais.push(animal);

    nomeInput.value = '';
    descricaoInput.value = '';
    idadeInput.value = '';
    pesoInput.value = '';
    racaInput.value = '';

    console.log(animais)
});

const buttonCadastro = document.querySelector('#cadastro-tab');
const buttonConsulta = document.querySelector('#consulta-tab');
const boxCadastro = document.querySelector('#box-cadastro');
const boxConsulta = document.querySelector('#box-consulta');

buttonCadastro.addEventListener('click', () => {
    boxConsulta.classList.remove('active');
    boxCadastro.classList.add('active');
    buttonCadastro.classList.add('active');
    buttonConsulta.classList.remove('active');
});

buttonConsulta.addEventListener('click', () => {
    boxConsulta.classList.add('active');
    boxCadastro.classList.remove('active');
    buttonCadastro.classList.remove('active');
    buttonConsulta.classList.add('active');
});


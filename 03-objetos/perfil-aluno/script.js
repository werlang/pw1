const inputStudentName = document.querySelector('#input-nome');
const inputClass = document.querySelector('#input-turma');
const inputCity = document.querySelector('#input-cidade');
const inputAge = document.querySelector('#input-idade');
const inputScholarship = document.querySelector('#input-bolsista');
const buttonSaveProfile = document.querySelector('#btn-salvar');
const profileCard = document.querySelector('#card-perfil');
const profileMessage = document.querySelector('#mensagem');

const studentProfile = {
    nome: 'Ana',
    turma: '2AT',
    cidade: 'Charqueadas',
    idade: 16,
    bolsista: true
};

function renderProfile() {
    profileCard.innerHTML = `
        <div class="linha"><strong>Nome:</strong> ${studentProfile.nome}</div>
        <div class="linha"><strong>Turma:</strong> ${studentProfile.turma}</div>
        <div class="linha"><strong>Cidade:</strong> ${studentProfile.cidade}</div>
        <div class="linha"><strong>Idade:</strong> ${studentProfile.idade}</div>
        <div class="linha"><strong>Bolsa:</strong> ${studentProfile.bolsista ? 'Sim' : 'Não'}</div>
    `;
}

buttonSaveProfile.addEventListener('click', function() {
    const age = Number(inputAge.value);

    if (inputStudentName.value.trim() === '' || inputClass.value.trim() === '' || inputCity.value.trim() === '' || Number.isNaN(age)) {
        profileMessage.textContent = 'Preencha todos os campos corretamente.';
        return;
    }

    studentProfile.nome = inputStudentName.value.trim();
    studentProfile.turma = inputClass.value.trim();
    studentProfile.cidade = inputCity.value.trim();
    studentProfile.idade = age;
    studentProfile.bolsista = inputScholarship.checked;

    profileMessage.textContent = 'O objeto do aluno foi atualizado.';
    renderProfile();
});

renderProfile();
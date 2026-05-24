const inputNome = document.querySelector('#input-nome');
const inputTurma = document.querySelector('#input-turma');
const inputCurso = document.querySelector('#input-curso');
const inputAno = document.querySelector('#input-ano');
const inputCor = document.querySelector('#input-cor');
const inputMonitoria = document.querySelector('#input-monitoria');
const buttonSave = document.querySelector('#btn-salvar');
const buttonClear = document.querySelector('#btn-limpar');
const message = document.querySelector('#mensagem');
const textYear = document.querySelector('#texto-ano');

const previewName = document.querySelector('#preview-nome');
const previewClassroom = document.querySelector('#preview-turma');
const previewCourse = document.querySelector('#preview-curso');
const previewYear = document.querySelector('#preview-ano');
const previewMonitoria = document.querySelector('#preview-monitoria');
const previewInitials = document.querySelector('#iniciais');
const profileCard = document.querySelector('#cartao-perfil');

const STORAGE_KEY = 'perfil-estudante';

// O perfil é carregado uma vez no início da aplicação.
let profile = loadProfile();

buttonSave.addEventListener('click', saveProfile);
buttonClear.addEventListener('click', clearProfile);
inputNome.addEventListener('input', renderPreview);
inputTurma.addEventListener('input', renderPreview);
inputCurso.addEventListener('change', renderPreview);
inputAno.addEventListener('input', renderPreview);
inputCor.addEventListener('input', renderPreview);
inputMonitoria.addEventListener('change', renderPreview);

function loadProfile() {
    const json = localStorage.getItem(STORAGE_KEY);

    if (!json) {
        return null;
    }

    return JSON.parse(json);
}

function saveProfile() {
    const name = inputNome.value.trim();
    const classroom = inputTurma.value.trim();
    const course = inputCurso.value;
    const schoolYear = Number(inputAno.value);
    const highlightColor = inputCor.value;
    const wantsMentoring = inputMonitoria.checked;

    if (name === '' || classroom === '' || course === '') {
        message.textContent = 'Preencha nome, turma e curso para salvar o perfil.';
        return;
    }

    // A memória recebe o novo estado antes de regravar o storage.
    profile = {
        name: name,
        classroom: classroom,
        course: course,
        schoolYear: schoolYear,
        highlightColor: highlightColor,
        wantsMentoring: wantsMentoring,
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    message.textContent = `Perfil de ${profile.name} salvo com sucesso.`;
    fillFormWithProfile();
    renderPreview();
}

function clearProfile() {
    profile = null;
    localStorage.removeItem(STORAGE_KEY);

    inputNome.value = '';
    inputTurma.value = '';
    inputCurso.value = '';
    inputAno.value = '1';
    inputCor.value = '#1f6feb';
    inputMonitoria.checked = false;

    message.textContent = 'O perfil salvo foi removido.';
    renderPreview();
}

function getYearLabel(year) {
    return `${year}º ano`;
}

function getInitials(name) {
    if (!name) {
        return 'ES';
    }

    const parts = name.split(' ').filter(function(part) {
        return part !== '';
    });

    if (parts.length === 1) {
        return parts[0].slice(0, 2).toUpperCase();
    }

    return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
}

function fillFormWithProfile() {
    if (!profile) {
        return;
    }

    inputNome.value = profile.name;
    inputTurma.value = profile.classroom;
    inputCurso.value = profile.course;
    inputAno.value = profile.schoolYear;
    inputCor.value = profile.highlightColor;
    inputMonitoria.checked = profile.wantsMentoring;
}

function renderPreview() {
    const name = inputNome.value.trim();
    const classroom = inputTurma.value.trim();
    const course = inputCurso.value;
    const schoolYear = Number(inputAno.value);
    const highlightColor = inputCor.value;
    const wantsMentoring = inputMonitoria.checked;

    textYear.textContent = getYearLabel(schoolYear);
    previewName.textContent = name || 'Estudante sem nome';
    previewClassroom.textContent = `Turma: ${classroom || '-'}`;
    previewCourse.textContent = `Curso: ${course || '-'}`;
    previewYear.textContent = `Ano: ${getYearLabel(schoolYear)}`;
    previewMonitoria.textContent = `Monitoria: ${wantsMentoring ? 'participa' : 'não participa'}`;
    previewInitials.textContent = getInitials(name);
    profileCard.style.borderColor = highlightColor;
    previewInitials.style.backgroundColor = highlightColor;
}

fillFormWithProfile();
renderPreview();
const inputPreviewName = document.querySelector('#input-nome');
const selectColor = document.querySelector('#select-cor');
const inputBold = document.querySelector('#input-negrito');
const buttonApplyPreferences = document.querySelector('#btn-aplicar');
const previewCard = document.querySelector('#card-preview');
const previewName = document.querySelector('#preview-nome');
const previewText = document.querySelector('#preview-texto');

const preferences = {
    nome: 'Visitante',
    cor: 'azul',
    destaque: false
};

function renderPreferences() {
    previewName.textContent = preferences.nome;
    previewText.textContent = `Destaque atual: ${preferences.cor}.`;

    previewCard.classList.remove('azul', 'verde', 'laranja');
    previewCard.classList.add(preferences.cor);

    if (preferences.destaque) {
        previewName.classList.add('forte');
    } else {
        previewName.classList.remove('forte');
    }
}

buttonApplyPreferences.addEventListener('click', function() {
    preferences.nome = inputPreviewName.value.trim() !== '' ? inputPreviewName.value.trim() : 'Visitante';
    preferences.cor = selectColor.value;
    preferences.destaque = inputBold.checked;

    renderPreferences();
});

renderPreferences();
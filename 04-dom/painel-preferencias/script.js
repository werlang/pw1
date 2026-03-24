const inputPreviewName = document.querySelector('#input-nome');
const selectColor = document.querySelector('#select-cor');
const inputBold = document.querySelector('#input-negrito');
const buttonApplyPreferences = document.querySelector('#btn-aplicar');
const previewCard = document.querySelector('#card-preview');
const previewName = document.querySelector('#preview-nome');
const previewText = document.querySelector('#preview-texto');

buttonApplyPreferences.addEventListener('click', function() {
    const name = inputPreviewName.value.trim();
    const selectedColor = selectColor.value;

    previewName.textContent = name !== '' ? name : 'Visitante';
    previewText.textContent = `Destaque atual: ${selectedColor}.`;

    previewCard.classList.remove('azul', 'verde', 'laranja');
    previewCard.classList.add(selectedColor);

    if (inputBold.checked) {
        previewName.classList.add('forte');
    } else {
        previewName.classList.remove('forte');
    }
});
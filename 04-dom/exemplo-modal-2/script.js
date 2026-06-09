import { createModal, closeModal } from "./modal.js";

const messageBox = document.createElement('p');
messageBox.textContent = 'Deseja salvar alterações?';

const button = document.querySelector('button');
button.addEventListener('click', () => {
    createModal(messageBox, {
        buttons: [
            { title: 'Sim', action: saveChanges },
            { title: 'Não', action: closeModal },
        ]
    });
});

function saveChanges() {
    console.log('Falta implementar');
    closeModal();
}
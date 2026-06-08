import { createModal, closeModal } from "./modal.js";

const button = document.querySelector('button');
button.addEventListener('click', () => {
    createModal('Deseja Confirmar a ação?', {
        buttons: [
            {
                title: 'Sim',
                action: actionConfirm
            },
            {
                title: 'Não',
                action: closeModal,
                // disabled: true,
            },
            
        ]
    });
});

function actionConfirm() {
    console.log('Confirmou ação')
    closeModal();
}
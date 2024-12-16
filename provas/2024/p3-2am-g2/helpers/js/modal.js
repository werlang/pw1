function createModal(title, content) {
    const fog = document.createElement('div');
    fog.classList.add('fog');

    fog.addEventListener('click', e => {
        if (e.target === fog) {
            fog.remove();
        }
    });

    const modal = document.createElement('div');
    modal.classList.add('modal');

    const modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');

    const modalHeader = document.createElement('div');
    modalHeader.classList.add('modal-header');
    modalHeader.innerHTML = `<h2>${title}</h2>`;

    const modalBody = document.createElement('div');
    modalBody.classList.add('modal-body');
    modalBody.innerHTML = content;

    modalContent.appendChild(modalHeader);
    modalContent.appendChild(modalBody);
    modal.appendChild(modalContent);
    document.body.appendChild(fog);
    fog.appendChild(modal);

    return modal;
}

export default createModal;
export function createModal(title, content, buttons) {
    const overlay = document.createElement('div');
    overlay.classList.add('overlay');
    overlay.innerHTML = `
        <div class="modal">
            <div class="title">${title}</div>
            <div class="body">${content}</div>
            <div class="actions">
                <button id="close">Fechar</button>
            </div>
        </div>
    `;
    document.body.append(overlay);
    
    overlay.addEventListener('click', (e) => {
        overlay.remove();
    })
    
    const modal = overlay.querySelector('.modal');
    modal.addEventListener('click', e => {
        e.stopPropagation();
    });
    
    const closeButton = overlay.querySelector('#close');
    closeButton.addEventListener('click', () => {
        overlay.remove();
    });

    const actions = overlay.querySelector('.actions');
    buttons.forEach(button => {
        const buttonDom = document.createElement('button');
        buttonDom.innerHTML = button.text;

        buttonDom.addEventListener('click', () => {
           button.clickEvent(); 
            overlay.remove();
        });
        actions.append(buttonDom);
    });

    return modal;
}

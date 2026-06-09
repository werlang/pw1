export function createModal(content, options = {}) {
    const fog = document.createElement('div');
    fog.classList.add('fog');
    fog.innerHTML = `<div class="modal"></div>`;
    document.body.append(fog);

    if (options.closeOnClick !== false) {
        fog.addEventListener('click', () => {
            fog.remove();
        });
    }

    const modal = fog.querySelector('.modal');
    modal.append(content);
    modal.addEventListener('click', (event) => {
        event.stopPropagation();
    });
    
    if (options.buttons) {
        const buttonContainer = document.createElement('div');
        buttonContainer.classList.add('button-container');
        for (const buttonObj of options.buttons) {
            const buttonText = buttonObj.title;
            const button = document.createElement('button');
            button.innerHTML = buttonText
            buttonContainer.append(button);

            button.addEventListener('click', () => {
                buttonObj.action();
            })
        }
        modal.append(buttonContainer);

    }
}

export function closeModal() {
    const fog = document.querySelector('.fog');
    fog.remove();
}
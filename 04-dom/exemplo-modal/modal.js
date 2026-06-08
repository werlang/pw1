export function createModal(content, options = {}) {
    const fog = document.createElement('div');
    fog.classList.add('fog');
    fog.innerHTML = `
        <div class="modal">
            ${content}
            <div class="button-container"></div>
        </div>
    `;
    document.body.append(fog);

    if (options.closeOnClick !== false) {
        fog.addEventListener('click', () => {
            closeModal();
        })
    }

    const modal = fog.querySelector('.modal');
    modal.addEventListener('click', (event) => {
        event.stopPropagation();
    });

    if (options.buttons) {
        const buttonContainer = modal.querySelector('.button-container');
        for (const buttonObj of options.buttons) {
            const buttonDOM = document.createElement('button');
            buttonDOM.innerHTML = buttonObj.title || 'Ação';
            buttonContainer.append(buttonDOM);

            if (buttonObj.disabled) {
                buttonDOM.disabled = true;
            }

            buttonDOM.addEventListener('click', () => {
                if (buttonObj.action) {
                    buttonObj.action();
                }
            })

        }
    }
}

export function closeModal() {
    const fog = document.querySelector('.fog');
    if (fog) {
        fog.remove();
    }
}
const inputCardTitle = document.querySelector('#input-titulo');
const inputCardDescription = document.querySelector('#input-descricao');
const buttonCreateCard = document.querySelector('#btn-criar');
const cardsCounter = document.querySelector('#contador');
const gallery = document.querySelector('#galeria');

function updateCounter() {
    cardsCounter.textContent = `${gallery.children.length} card(s)`;
}

buttonCreateCard.addEventListener('click', function() {
    const title = inputCardTitle.value.trim();
    const description = inputCardDescription.value.trim();

    if (title === '' || description === '') {
        return;
    }

    const article = document.createElement('article');
    const heading = document.createElement('h2');
    const paragraph = document.createElement('p');
    const removeButton = document.createElement('button');

    article.classList.add('card');
    heading.textContent = title;
    paragraph.textContent = description;
    removeButton.textContent = 'Remover';

    removeButton.addEventListener('click', function() {
        article.remove();
        updateCounter();
    });

    article.append(heading, paragraph, removeButton);
    gallery.append(article);

    inputCardTitle.value = '';
    inputCardDescription.value = '';
    inputCardTitle.focus();
    updateCounter();
});

updateCounter();
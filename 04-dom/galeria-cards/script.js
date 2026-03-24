const inputCardTitle = document.querySelector('#input-titulo');
const inputCardDescription = document.querySelector('#input-descricao');
const buttonCreateCard = document.querySelector('#btn-criar');
const cardsCounter = document.querySelector('#contador');
const gallery = document.querySelector('#galeria');

const cards = [];

function updateCounter() {
    cardsCounter.textContent = `${cards.length} card(s)`;
}

function renderCards() {
    gallery.innerHTML = '';

    cards.forEach(function(card) {
        const article = document.createElement('article');
        const heading = document.createElement('h2');
        const paragraph = document.createElement('p');
        const removeButton = document.createElement('button');

        article.classList.add('card');
        heading.textContent = card.titulo;
        paragraph.textContent = card.descricao;
        removeButton.textContent = 'Remover';

        removeButton.addEventListener('click', function() {
            const position = cards.findIndex(function(item) {
                return item.id === card.id;
            });

            cards.splice(position, 1);
            renderCards();
        });

        article.append(heading, paragraph, removeButton);
        gallery.append(article);
    });

    updateCounter();
}

buttonCreateCard.addEventListener('click', function() {
    const title = inputCardTitle.value.trim();
    const description = inputCardDescription.value.trim();

    if (title === '' || description === '') {
        return;
    }

    cards.push({
        id: Date.now(),
        titulo: title,
        descricao: description
    });

    inputCardTitle.value = '';
    inputCardDescription.value = '';
    inputCardTitle.focus();
    renderCards();
});

updateCounter();
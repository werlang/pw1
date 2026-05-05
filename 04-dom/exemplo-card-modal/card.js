export function createCard(title, content) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
        <div class="title">${title}</div>
        <div class="content">${content}</div>
    `;
    return card;
}
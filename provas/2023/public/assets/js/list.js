const select = document.querySelector('#category-select');
const container = document.querySelector('.property-list');

renderAll('todos');
select.addEventListener('change', () => renderAll(select.value));

function formatPrice(price) {
    price = parseFloat(price);
    if (!price) return '';
    return price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
}

function renderItem(item) {
    const category = item.category[0].toUpperCase() + item.category.slice(1);

    const div = document.createElement('div');
    div.classList.add('property-card');
    div.innerHTML = `
        <img src="uploads/${item.image}">
        <div class="property-description">${item.description}</div>
        <div class="property-category">${category}</div>
        <div class="property-price">${formatPrice(item.price)}</div>
    `;
    return div;
}

async function renderAll(category) {

    // requisição para o back/list.php
    // recebe resposta em list. Exemplo:
    const list = {
        properties: [{
            "id": 1,
            "description": "Descrição do imóvel 1",
            "price": 100000,
            "category": "apartamento",
            "image": "1.jpg"
        }]
    };
    console.log(list);

    container.innerHTML = '';
    list.properties.forEach(property => container.appendChild(renderItem(property)));
}
const items = [
    {
        name: 'Hambúrguer Clássico',
        description: 'Pão, carne e queijo, alface, tomate e maionese.',
        price: 21,
    },
    {
        name: 'Hambúrguer Vegetariano',
        description: 'Pão, hambúrguer de legumes, queijo, alface, tomate e molho especial.',
        price: 18,
    },
    {
        name: 'Hambúrguer Duplo',
        description: 'Pão, dois hambúrgueres, queijo, alface, tomate e maionese.',
        price: 26,
    },
    {
        name: 'Batata Frita',
        description: 'Batata frita com cheddar e bacon.',
        price: 8,
    },
    {
        name: 'Anéis de Cebola',
        description: 'Porção de anéis de cebola empanados e fritos.',
        price: 12,
    },
    {
        name: 'Milkshake',
        description: 'Milkshake de chocolate com chantilly.',
        price: 7,
    },
    {
        name: 'Refrigerante',
        description: 'Refrigerante de 500ml.',
        price: 4,
    },
]

let cart = [];
// QUESTÃO 2
// implementar a funcionalidade de carregar o carrinho do localStorage
// também implementar a funcionalidade de salvar o carrinho no localStorage quando ele for alterado (em alguma outra parte do código)

const ul = document.querySelector('ul');
items.forEach(item => {
    const li = document.createElement('li');
    li.innerHTML = `
        <h3>${item.name}</h3>
        <p>${item.description}</p>
        <p>R$ ${item.price}</p>
    `;

    const button = document.createElement('button');
    button.innerHTML = 'Adicionar ao carrinho';
    button.classList.add('add-to-cart');
    button.addEventListener('click', () => {
        const existing = cart.find(cartItem => cartItem.name === item.name);
        if (existing) {
            existing.quantity++;
        }
        else {
            cart.push({
                ...item,
                quantity: 1,
            });
        }
        showCart();
    });

    li.appendChild(button);
    ul.appendChild(li);
});

const fog = document.querySelector('#fog');
function showCart() {
    const cartMenu = document.querySelector('.cart-menu');
    cartMenu.innerHTML = `
        <h2>Carrinho</h2>
        <ul></ul>
    `;

    const ul = cartMenu.querySelector('ul');

    let total = 0;
    cart.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `
            <h3>${item.name}</h3>
            <p>${item.description}</p>
            <p class="price">R$ ${item.price * item.quantity}</p>
            <div>
                <button class="remove-button">-</button>
                <span class="quantity">${item.quantity}</span>
                <button class="add-button">+</button>
            </div>
        `;
        ul.appendChild(li);

        const price = li.querySelector('.price');

        // QUESTÃO 1
        const addButton = li.querySelector('.add-button');
        // implementar a funcionalidade de adicionar uma unidade ao item do carrinho
        const removeButton = li.querySelector('.remove-button');
        // implementar a funcionalidade de remover uma unidade do item do carrinho

        total += item.price * item.quantity;
    });

    const totalElement = document.createElement('p');
    totalElement.innerHTML = `Total: R$ ${total}`;
    cartMenu.appendChild(totalElement);

    // QUESTÃO 3
    const buyButton = document.createElement('button');
    // criar botão para finalizar a compra
    cartMenu.appendChild(buyButton);
    
    const closeButton = document.createElement('button');
    // criar botão para fechar o carrinho
    cartMenu.appendChild(closeButton);

    fog.classList.add('active');
}

const cartButton = document.querySelector('.cart-button');
cartButton.addEventListener('click', showCart);
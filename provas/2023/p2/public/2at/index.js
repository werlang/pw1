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

// let cart = ???
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
    // QUESTÃO 1
    // implementar a funcionalidade do botão de adicionar ao carrinho

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

        const addButton = li.querySelector('.add-button');
        addButton.addEventListener('click', () => {
            item.quantity++;
            price.innerHTML = `R$ ${item.price * item.quantity}`;
            showCart();
        });

        const removeButton = li.querySelector('.remove-button');
        removeButton.addEventListener('click', () => {
            item.quantity--;
            price.innerHTML = `R$ ${item.price * item.quantity}`;
            if (item.quantity <= 0) {
                cart = cart.filter(cartItem => cartItem.name !== item.name);
            }
            showCart();
        });
    });

    const totalElement = document.createElement('p');
    // QUESTÃO 3
    // Calcular o total do carrinho e mostrar na tela
    cartMenu.appendChild(totalElement);

    const buyButton = document.createElement('button');
    buyButton.classList.add('buy-button');
    buyButton.innerHTML = 'Finalizar compra';
    buyButton.addEventListener('click', () => {
        alert('Compra finalizada com sucesso!');
        cart = [];
        showCart();
    });
    cartMenu.appendChild(buyButton);

    const closeButton = document.createElement('button');
    closeButton.classList.add('close-button');
    closeButton.innerHTML = 'Fechar';
    closeButton.addEventListener('click', () => {
        fog.classList.remove('active');
    });
    cartMenu.appendChild(closeButton);

    fog.classList.add('active');
}

// QUESTÃO 4
// implementar a funcionalidade abrir o carrinho ao clicar no botão de carrinho
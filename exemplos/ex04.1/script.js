const plans = [
    { name: 'Básico', price: 0, description: 'Funcionalidades básicas' },
    { name: 'Pessoal', price: 9.99, description: 'Básico + Ferramentas avançadas' },
    { name: 'Profissional', price: 19.99, description: 'Pessoal + Suporte dedicado' },
    { name: 'Empresarial', price: 39.99, description: 'Pro + Armazenamento ilimitado' },
];
    
document.querySelectorAll('.box').forEach((e,i) => {
        e.innerHTML = `
        <div class="name">${plans[i].name}</div>
        <div class="price">R$ ${plans[i].price.toFixed(2)}</div>
        <div class="description">${plans[i].description}</div>
    `;
    e.addEventListener('click', () => {
        document.querySelectorAll('.box').forEach(t => {
            t.classList.remove('active');
        });
        e.classList.add('active');
    });

});

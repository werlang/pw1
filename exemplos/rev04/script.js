const button = document.querySelector('button');

button.addEventListener('click', () => {
    const fog = `
        <div id="fog">
            <div id="window">
                <h1>Olá</h1>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', fog);
    
    const fogEl = document.querySelector('#fog');
    fogEl.addEventListener('click', () => {
        fogEl.remove();
    });
    
    const window = document.querySelector('#window');
    window.addEventListener('click', (ev) => {
        ev.stopPropagation();
    });
    
    const pessoas = [
        {
            nome: "Pablo",
            email: "pablowerlang@ifsul.edu.br",
        },
        {
            nome: "Joao",
            email: "joao@ifsul.edu.br",
        },
        {
            nome: "Solano",
            email: "solano@ifsul.edu.br",
        },
    ];

    let texto = '';
    for (let i in pessoas) {
        texto += `<div class="row">
            <span class="name">${ pessoas[i].nome }</span>
            <span class="email">${ pessoas[i].email }</span>
        </div>`;
    }
    window.innerHTML = texto;
});

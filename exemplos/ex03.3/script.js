const pessoas = [
    {
        nome: 'João',
        idade: 16,
        email: 'joao.silva@gmail.com',
    },
    {
        nome: 'Marcelo',
        idade: 38,
        email: 'marcelozucca@gmail.com',
    },
    {
        nome: 'Maria',
        idade: 19,
        email: 'mama2001@gmail.com',
    },
    {
        nome: 'Rafaela',
        idade: 12,
        email: 'rafafanti@gmail.com',
    },
    {
        nome: 'Guilherme',
        idade: 24,
        email: 'guilhermecardoso@gmail.com',
    },
];

const message = document.querySelector('#message');
document.querySelector('button').addEventListener('click', () => {
    const input = document.querySelector('input');
    message.innerHTML = `<span>Pessoa não encontrada</span>`;
    pessoas.forEach(p => {
        if (input.value == p.nome){
            message.innerHTML = `
                <span>Nome: ${p.nome}</span>
                <span>Idade: ${p.idade}</span>
                <span>E-mail: ${p.email}</span>
            `;
        }
    });
});

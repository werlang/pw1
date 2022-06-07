const button = document.querySelector('button');

button.addEventListener('click', () => {
    const user = document.querySelector('#user').value;
    const pass = document.querySelector('#pass').value;

    // console.log(user, pass);
    if ((user == 'aluno' && pass == 'undererere123') || (user == 'professor' && pass == 'admin789')) {
        document.querySelector('#box').innerHTML = `<h2><span id="highlight">${user}</span> logado com sucesso.</h2>`;
    }
    else {
        document.querySelector('#message').innerHTML = 'Usuário ou senha inválidos';
    }
});
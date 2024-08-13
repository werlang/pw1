const name = document.querySelector('#name');
const email = document.querySelector('#email');
const pass = document.querySelector('#pass');
const button = document.querySelector('button');

const ls = localStorage.getItem('users');
let users = [];
if (ls) {
    users = JSON.parse(ls);
}

button.addEventListener('click', () => {
    const user = {
        name: name.value,
        email: email.value,
        password: pass.value,
    }
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));

    name.value = '';
    email.value = '';
    pass.value = '';

    document.querySelector('#message').innerHTML = `Usuário ${user.name} cadastrado com sucesso`;
});
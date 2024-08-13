const email = document.querySelector('#email');
const pass = document.querySelector('#pass');
const button = document.querySelector('button');
const message = document.querySelector('#message');

const ls = localStorage.getItem('users');
let users = [];
if (ls) {
    users = JSON.parse(ls);
}

button.addEventListener('click', () => {
    users.forEach(user => {
        if (user.email == email.value && user.password == pass.value) {
            localStorage.setItem('logged-user', JSON.stringify(user));
            location.href = 'profile.html';
        }
    });

    message.innerHTML = `Usuário não encontrado`;
});
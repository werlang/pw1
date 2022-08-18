const button = document.querySelector('button');
const user = document.querySelector('#name');
const pass = document.querySelector('#pass');
const email = document.querySelector('#email');

let users = localStorage.getItem('users');
if (!users) {
    users = [];
}
else {
    users = JSON.parse(users);
}
console.log(users);

button.addEventListener('click', () => {
    users.push({
        name: user.value,
        password: pass.value,
        email: email.value,
    });
    localStorage.setItem('users', JSON.stringify(users));
    document.querySelector('#message').innerHTML = `Usuário ${ user.value } cadastrado`;

    user.value = '';
    pass.value = '';
    email.value = '';
});
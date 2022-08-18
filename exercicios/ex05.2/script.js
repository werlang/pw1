const button = document.querySelector('button');
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
    let logged = false;
    for (let i in users) {
        if (users[i].email == email.value && users[i].password == pass.value) {
            logged = users[i];
            break;
        }
    }
    if (logged) {
        localStorage.setItem('logged', JSON.stringify(logged));
        location.href = 'profile.html';
    }
    else {
        document.querySelector('#message').innerHTML = 'Usuário não encontrado';
    }
});
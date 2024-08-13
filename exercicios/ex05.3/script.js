const name = document.querySelector('#name');
const email = document.querySelector('#email');
const pass = document.querySelector('#pass');
const button = document.querySelector('button');

const ls = localStorage.getItem('users');
let users = [];
if (ls) {
    users = JSON.parse(ls);
}

let autoSave = sessionStorage.getItem('auto-save');
if (autoSave) {
    autoSave = JSON.parse(autoSave);
    name.value = autoSave.name;
    email.value = autoSave.email;
    pass.value = autoSave.password;
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
    sessionStorage.removeItem('auto-save');

    document.querySelector('#message').innerHTML = `Usuário ${user.name} cadastrado com sucesso`;
});

name.addEventListener('input', save);
email.addEventListener('input', save);
pass.addEventListener('input', save);

function save() {
    const user = {
        name: name.value,
        email: email.value,
        password: pass.value,
    }
    sessionStorage.setItem('auto-save', JSON.stringify(user));
}
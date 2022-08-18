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
    sessionStorage.clear();

    document.querySelectorAll('input').forEach(e => e.value = '');
});

document.querySelectorAll('input').forEach(e => e.addEventListener('input', () => {
    const fields = {
        user: user.value,
        password: pass.value,
        email: email.value,
    };
    const json = JSON.stringify(fields);
    sessionStorage.setItem('autosave', json);
}));

let autosave = sessionStorage.getItem('autosave');
let fields;
if (!autosave) {
    fields = {
        user: "",
        password: "",
        email: "",
    };
}
else {
    fields = JSON.parse(autosave);
}

user.value = fields.user;
pass.value = fields.password;
email.value = fields.email;
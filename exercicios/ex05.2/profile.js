const button = document.querySelector('button');
const pass = document.querySelector('#pass');
const email = document.querySelector('#email');

let user = localStorage.getItem('logged');
if (!user) {
    location.href = 'index.html';
}
else {
    user = JSON.parse(user);
}
console.log(user);

document.querySelector('h1').innerHTML = `Bem-vindo <span id="highlight">${ user.name }</span>`;
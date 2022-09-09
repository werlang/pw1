let user = localStorage.getItem('logged');
if (!user) {
    location.href = 'index.html';
}
else {
    user = JSON.parse(user);
}
console.log(user);

document.querySelector('h1').innerHTML = `Bem-vindo <span id="highlight">${ user.name }</span>`;

document.querySelector('#logout').addEventListener('click', () => {
    localStorage.removeItem('logged');
    location.href = 'index.html';
})
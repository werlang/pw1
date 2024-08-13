let user = localStorage.getItem('logged-user');
if (!user) {
    location.href = 'index.html';
}

user = JSON.parse(user);
// console.log(user);

document.querySelector('h1').innerHTML = `Bem-vindo <span id="highlight">${user.name}</span>`;
document.querySelector('button').addEventListener('click', () => {
    localStorage.removeItem('logged-user');
    location.href = 'index.html';
});
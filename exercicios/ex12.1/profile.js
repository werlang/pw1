let user;

fetch('session.php').then(async res => {
    const data = await res.json();

    if (data.status == 'error') {
        location.href = 'index.html';
    }

    user = data.user;
    document.querySelector('#user').innerHTML = user.name;
});

const button = document.querySelector('button');
button.addEventListener('click', () => {
    fetch('logout.php');
    location.href = 'index.html';
});
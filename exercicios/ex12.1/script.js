const errorDiv = document.querySelector('.error');
const form = document.querySelector('#box');
form.addEventListener('submit', async e => {
    e.preventDefault();

    const data = await fetch('login.php', {
        method: 'POST',
        body: new FormData(form),
    }).then(res => res.json());
    console.log(data);

    if (data.status == 'error') {
        errorDiv.innerHTML = data.message;
        return;
    }

    location.href = 'profile.html';

});


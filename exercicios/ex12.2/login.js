const form = document.querySelector('form');
form.addEventListener('submit', async e => {
    e.preventDefault();

    const data = await fetch('login.php', {
        method: 'POST',
        body: new FormData(form)
    }).then(res => res.json());
    console.log(data);

    if (data.status == 'error') {
        document.querySelector('.error').innerHTML = data.message;
        return;
    }

    location.href = 'profile.html';
})
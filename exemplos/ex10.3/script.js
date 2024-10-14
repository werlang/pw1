const form = document.querySelector('form');
form.addEventListener('submit', async event => {
    event.preventDefault();

    const fd = new FormData(form);

    const data = await fetch('user.php', {
        method: 'POST',
        body: fd,
    }).then(res => res.json());
    console.log(data);

});
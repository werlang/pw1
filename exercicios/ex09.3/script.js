const form = document.querySelector('form');
form.addEventListener('submit', async e => {
    e.preventDefault();
    
    const data = await fetch('back.php', {
        method: `POST`,
        body: new FormData(form),
    }).then(res => res.json());

    console.log(data);

    const error = document.querySelector('.error');

    if (data.status == 'erro'){
        error.innerHTML = data.message;
    }
    else if (data.status == "sucesso"){
        window.location.href = 'profile.html';
    }
});
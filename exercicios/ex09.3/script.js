document.querySelector('button').addEventListener('click', async () => {
    const data = await post('back.php', {
        email: document.querySelector('#email').value,
        password: document.querySelector('#password').value,
    });
    console.log(data);

    const error = document.querySelector('.error');

    if (data.status == 'erro'){
        error.innerHTML = data.message;
    }
    else if (data.status == "sucesso"){
        window.location.href = 'profile.html';
    }
});

async function post(endpoint, body) {
    const res = await fetch(endpoint, {
        method: `POST`,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(body).toString(),
    });
    return await res.json();
}


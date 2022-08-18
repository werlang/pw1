(async () => {
    const res = await fetch('profile.php');
    const data = await res.json();
    // console.log(data)

    if (data.error && data.error == 'Session not set') {
        window.location.href = 'index.html';
    }

    document.querySelector('#user').innerHTML = data.nome;

})();

document.querySelector('button').addEventListener('click', async () => {
    await post('profile.php', { action: 'logout' });
    window.location.href = 'index.html';
});

async function post(endpoint, body) {
    const res = await fetch(endpoint, {
        method: `POST`,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(body).toString(),
    });
    return await res.json();
}


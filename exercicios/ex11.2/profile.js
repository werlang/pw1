import { setTheme, post } from './utils.js'

(async () => {
    const res = await fetch('profile.php');
    const data = await res.json();
    // console.log(data)

    if (data.error && data.error == 'Session not set') {
        window.location.href = 'index.html';
    }

    document.querySelector('#user').innerHTML = data.nome;

    setTheme();
})();

document.querySelector('button').addEventListener('click', async () => {
    await post('profile.php', { action: 'logout' });
    window.location.href = 'index.html';
});
import { request } from './utils';

async function main() {
    const data = await request('profile.php');
    console.log(data);

    if (data.error && data.error == 'Session not set') {
        window.location.href = 'index.html';
    }

    document.querySelector('#user').innerHTML = data.user.name;
}
main();

document.querySelector('button').addEventListener('click', async () => {
    await request('profile.php', { action: 'logout' }, 'POST');
    window.location.href = 'index.html';
});
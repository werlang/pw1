 import { getCookies, setTheme, post } from './utils.js'

document.querySelector('button').addEventListener('click', async () => {
    const data = await post('back.php', {
        email: document.querySelector('#email').value,
        password: document.querySelector('#password').value,
    });
    console.log(data);

    const error = document.querySelector('.error');

    if (data.error){
        error.innerHTML = data.error;
    }
    else if (data.status && data.status == "sucesso"){
        window.location.href = 'profile.html';
    }
});

document.querySelector('#theme').addEventListener('click', async () => {
    // let theme = getCookies().theme || 'dark';
    let theme = getCookies().theme;
    if (!theme) {
        theme = 'dark';
    }

    // theme = theme == 'dark' ? 'light' : 'dark';
    if (theme == 'dark') {
        theme = 'light';
    }
    else {
        theme = 'dark';
    }
    setTheme(theme);
});
setTheme();
function setCookie(key, value, expire = '1d') {
    let timeNumber = parseInt(expire.slice(0, -1));
    let timeUnit = expire.slice(-1);
    let unitMultiplier = { d: 24*60*60*1000, h: 60*60*1000, m: 60*1000, s: 1000 };
    let time = timeNumber * unitMultiplier[timeUnit];
    time = Date.now() + time;
    document.cookie = `${key}=${value}; expires=${ new Date(time).toUTCString() }; path=/`;
}

function getCookies(key) {
    const cookies = document.cookie.split('; ');
    const ckObj = {};
    for (let i in cookies){
        const [k, v] = cookies[i].split('=');
        ckObj[k] = v;
    }
    if (key) {
        return ckObj[key];
    }
    return ckObj;
}

let cookie = getCookies('theme');
if (!cookie) {
    setCookie('theme', 'dark', '12m');
    cookie = 'dark';
}

const buttonTheme = document.querySelector('#theme');

function changeTheme() {
    document.body.classList.remove('light', 'dark');
    if (cookie == 'dark') {
        buttonTheme.innerHTML = '☀️';
        document.body.classList.add('dark');
    }
    else {
        buttonTheme.innerHTML = '🌙';
        document.body.classList.add('light');
    }    
}
changeTheme();

console.log(cookie);

buttonTheme.addEventListener('click', () => {
    if (cookie == 'dark') {
        cookie = 'light';
    }
    else {
        cookie = 'dark';
    }

    setCookie('theme', cookie, '12m');
    changeTheme();
});
function setTheme(theme) {
    if (!theme) {
        theme = getCookies().theme || 'dark';
    }

    document.body.classList.remove('dark', 'light');
    document.body.classList.add(theme);

    const year = new Date().getTime() + 1000 * 3600 * 24 * 365; // 1 ano
    setCookie('theme', theme, year);
}

function getCookies() {
    const cookies = document.cookie.split('; ');
    const ckObj = {};
    for (let i in cookies){
        const [k, v] = cookies[i].split('=');
        ckObj[k] = v;
    }
    return ckObj;
}

function setCookie(key, value, expire) {
    document.cookie = `${key}=${value}; expires=${new Date(expire).toUTCString()}; path=/`;
}

async function post(endpoint, body) {
    const res = await fetch(endpoint, {
        method: `POST`,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(body).toString(),
    });
    return await res.json();
}

export { setTheme, getCookies, setCookie, post };
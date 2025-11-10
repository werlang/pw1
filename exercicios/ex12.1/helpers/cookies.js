function setCookie(key, value, expire = '1d') {
    let timeNumber = parseInt(expire.slice(0, -1));
    let timeUnit = expire.slice(-1);
    let unitMultiplier = { d: 24*60*60*1000, h: 60*60*1000, m: 60*1000, s: 1000 };
    let time = timeNumber * unitMultiplier[timeUnit];
    time = Date.now() + time;
    value = JSON.stringify(value);
    document.cookie = `${key}=${value}; expires=${ new Date(time).toUTCString() }; path=/`;
}

function getCookie(key) {
    const cookies = document.cookie.split('; ');
    const ckObj = {};
    for (let i in cookies){
        const [k, v] = cookies[i].split('=');
        try {
            ckObj[k] = JSON.parse(v);
        }
        catch(e) {
            ckObj[k] = v;
        }
    }
    if (key) {
        return ckObj[key];
    }
    return ckObj;
}

export { getCookie, setCookie };
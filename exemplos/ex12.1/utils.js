async function request(endpoint, args, method='GET') {
    let url = endpoint;
    const opt = { method: method };
    if (method == 'GET') {
        const query = new URLSearchParams(args).toString();
        url += `?${query}`;
    }
    else {
        opt.headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
        opt.body = new URLSearchParams(args).toString();
    }
    const res = await fetch(url, opt);
    return await res.json();
}

export { request };
async function request(endpoint, args, method='GET') {
    let url = endpoint;
    const opt = { method: method };
    if (method == 'GET') {
        const query = new URLSearchParams(args).toString();
        url += `?${query}`;
    }
    else {
        opt.body = new FormData(args);
    }
    return await fetch(url, opt).then(res => res.json());
}

export { request };
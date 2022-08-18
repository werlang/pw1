document.querySelector('button').addEventListener('click', async () => {
    const data = await post('register.php', {
        name: document.querySelector('#name').value,
        birth: document.querySelector('#birth').value,
        address: document.querySelector('#address').value,
    });
    console.log(data);

    updateTable();
});

async function post(endpoint, body) {
    const res = await fetch(endpoint, {
        method: `POST`,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(body).toString(),
    });
    return await res.json();
}

async function updateTable() {
    const res = await fetch('register.php', { method: 'GET' });
    const data = await res.json();
    console.log(data);

    if (data.records.length) {
        let content = '<table><thead><th>Nome</th><th>D.Nasc.</th><th>Endereço</th></thead><tbody>';
        data.records.forEach(e => {
            content += `<tr>
                <td>${e.name}</td>
                <td>${e.birth}</td>
                <td>${e.address}</td>
            </tr>`;
        });
        content += '</tbody></table>';
        document.querySelector('#table').innerHTML = content;
    }
};
updateTable();

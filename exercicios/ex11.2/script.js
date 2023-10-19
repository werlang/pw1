const form = document.querySelector('form');
const table = document.querySelector('#table');

form.addEventListener('submit', async e => {
    e.preventDefault();
    const data = await fetch('save.php', {
        method: 'POST',
        body: new FormData(form),
    }).then(res => res.json());
    console.log(data);
    updateTable();
});

async function updateTable() {
    const data = await fetch('get.php').then(res => res.json());
    console.log(data);
    table.innerHTML = ``;
    data.record.forEach(item => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${item.name}</td>
            <td>${item.address}</td>
            <td>${item.birth}</td>
        `;
        table.appendChild(tr);
    });
}
updateTable();
const select = document.querySelector('select');
const table = document.querySelector('#table');

async function main() {
    const data = await fetch('get-groups.php').then(res => res.json());
    // console.log(data);

    data.groups.forEach((group,i) => {
        const option = document.createElement('option');
        option.innerHTML = group;
        option.value = i;
        select.appendChild(option);
    });

    select.addEventListener('change', async () => {
        const data = await fetch(`get-food.php?group=${ select.value }`).then(res => res.json());
        // console.log(data);

        table.innerHTML = '';
        data.forEach(food => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${ food[0] }</td>
                <td>${ food[1] }</td>
                <td>${ food[2] }</td>
                <td>${ food[3] }</td>
            `;
            table.appendChild(row);
        });
    });
}
main();
const form = document.querySelector('form');
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = await fetch('insert_user.php', {
        method: 'POST',
        body: new FormData(form),
    }).then(res => res.json());

    if (data.error) {
        console.error(`ERRO: ${data.message}`);
    }
    else {
        console.log(data.message);
        console.log(data.user);
        form.reset();
        refreshList();
    }

});

const btnList = document.querySelector('#btn-list-users');
btnList.addEventListener('click', async () => {
    refreshList();
});

async function refreshList() {
    const data = await fetch('list_users.php').then(res => res.json());
    // console.log(data);

    const ul = document.querySelector('#list-users');
    ul.innerHTML = '';

    data.users.forEach(user => {
        const li = document.createElement('li');
        li.innerHTML = user.name;
        ul.append(li);
    });
}

refreshList();
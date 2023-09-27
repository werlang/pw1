const button = document.querySelector('button');
const input = document.querySelector('input');
const result = document.querySelector('#result');

button.addEventListener('click', async () => {
    const data = await fetch(`getusers.php?user=${ input.value }`).then(res => res.json());
    console.log(data);

    if (data.status === 'erro') {
        result.innerHTML = `<p>${ data.message }</p>`;
    }
    else {
        result.innerHTML = `
            <p>Nome: ${ data.result.name }</p>
            <p>Email: ${ data.result.email }</p>
        `;
    }
});
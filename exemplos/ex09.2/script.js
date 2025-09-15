// Show toast notification
function showToast(message, type = 'success') {
    const toastMessage = document.querySelector('#toastMessage');
    toastMessage.textContent = message;
    const toast = document.querySelector('#toast');
    toast.classList.add('show', type);

    setTimeout(() => {
        toast.classList.remove('show');
    }, 4000);
}


const form = document.querySelector('form');
form.addEventListener('submit', async e => {
    e.preventDefault();

    const data = await fetch('cadastro.php', {
        method: 'POST',
        body: new FormData(form),
    }).then(res => res.json());
    console.log(data);

    let type = 'success';
    if (data.error) {
        type = 'error';
    }
    showToast(data.message, type);
})
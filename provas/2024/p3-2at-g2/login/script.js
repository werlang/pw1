import createToast from "../helpers/js/toast.js";

const form = document.querySelector('form');
form.addEventListener('submit', async e => {
    e.preventDefault();
    const data = await fetch('login.php', {
        method: 'POST',
        body: new FormData(form)
    }).then(res => res.json());
    // console.log(data);

    createToast(data.message, data.error);

    if (!data.error) {
        setTimeout(() => location.href = '/tasks', 1500);
    }
});
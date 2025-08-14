// Use the createToast function
fetch('categories-list.php').then(async res => {
    const categories = await res.json();
    // console.log(categories);

    const select = document.querySelector('#categoria');
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category.id;
        option.innerHTML = category.name;
        select.appendChild(option);
    });

    const form = document.querySelector('form');
    form.addEventListener('submit', async e => {
        e.preventDefault();

        const data = await fetch('register.php', {
            method: 'POST',
            body: new FormData(form)
        }).then(res => res.json());
        console.log(data);
        
        createToast(data.message, data.status);
        if (data.status === 'success') {
            form.reset();
        }
    });
});

function createToast(message, type) {
    const toast = document.createElement('div');
    toast.classList.add('toast', type);
    toast.innerHTML = message;
    document.body.appendChild(toast);
    setTimeout(() => {
        toast.remove();
    }, 3000);
}
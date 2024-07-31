const menu = document.querySelector('#menu');
menu.querySelectorAll('.item').forEach((e,i) => {
    e.addEventListener('click', () => {
        const groups = document.querySelectorAll('.group');
        if (groups[i]) {
            groups[i].classList.add('active');
            menu.classList.add('hidden');
        }
        else {
            alert(`Abre link: ${e.innerHTML}`);
        }
    });
});

document.querySelectorAll('.group .item').forEach(e => {
    e.addEventListener('click', () => {
        document.querySelectorAll('.group').forEach(e => e.classList.remove('active'));
        menu.classList.remove('hidden');
        alert(`Abre link: ${e.innerHTML}`);
    });
});
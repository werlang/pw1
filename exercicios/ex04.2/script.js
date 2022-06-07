document.querySelectorAll('#menu .item').forEach((e,i) => e.addEventListener('click', () => {
    const groups = document.querySelectorAll('#sub-menu .group');
    if (groups[i]){
        document.querySelector('#menu').classList.add('hidden');
        groups[i].classList.add('active');
    }
    else {
        alert(`Abre link: ${e.innerHTML}`);
    }
}));

document.querySelectorAll('#sub-menu .item').forEach((e,i) => e.addEventListener('click', () => {
    document.querySelector('#menu').classList.remove('hidden');
    document.querySelector('#sub-menu .group.active').classList.remove('active');
    alert(`Abre link: ${e.innerHTML}`);
}));
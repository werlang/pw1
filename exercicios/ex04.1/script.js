let x = true;
document.querySelectorAll('.cell').forEach(e => e.addEventListener('click', () => {
    if (e.innerHTML == ''){
        if (x){
            e.innerHTML = '<span class="x">X</span>';
        }
        else {
            e.innerHTML = '<span class="o">O</span>';
        }
        x = !x
    }
}));

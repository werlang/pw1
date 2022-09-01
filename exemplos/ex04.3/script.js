const span = document.querySelector('span');

let toggle = true;
document.querySelector('button').addEventListener('click', () => {
    if (toggle){
        span.style = `background-color: #4141d4; color: #fea2a2; padding: 10px 20px`;
        span.innerHTML = 'Texto colorido';
    }
    else {
        span.removeAttribute('style');
        span.innerHTML = 'Texto chato';
    }
    toggle = !toggle;
});

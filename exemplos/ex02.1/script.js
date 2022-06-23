let state = 0;
const button = document.querySelector('button');
button.addEventListener('click', () => {
    if (state == 0){
        button.innerHTML = 'Fui clicado';
    }
    else if (state == 1){
        button.innerHTML = 'Já chega';
    }
    else {
        button.innerHTML = `Perdeu a graça. já clicou ${ state + 1 } vezes`;
    }
    state++;
});

let pontos = '';
let myInterval;
const buttonGo = document.querySelector('#go');
buttonGo.addEventListener('click', () => {
    buttonGo.setAttribute('disabled', true);
    myInterval = setInterval(() => {
        let texto = 'Aguarde';
        pontos += '.';
        if (pontos.length > 3) {
            pontos = '';
        }
        buttonGo.innerHTML = texto + pontos;
    }, 700);
});
const buttonStop = document.querySelector('#stop');
buttonStop.addEventListener('click', () => {
    buttonGo.removeAttribute('disabled');
    buttonGo.innerHTML = 'Clique';
    clearInterval(myInterval);
});

function bind(element) {
    element.addEventListener('input', () => {
        const n1 = document.querySelector('#n1');
        const n2 = document.querySelector('#n2');
        const result = parseInt(n1.value) * parseInt(n2.value);
        if (isNaN(result)){
            document.querySelector('#result').innerHTML = 'ERRO';
            return;
        }
        document.querySelector('#result').innerHTML = result;
    });
}
bind(document.querySelector('#n1'));
bind(document.querySelector('#n2'));
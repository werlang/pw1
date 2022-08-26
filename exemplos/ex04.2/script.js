const checkbox = document.querySelector('#checkbox');
checkbox.addEventListener('change', e => {
    if (checkbox.checked){
        document.querySelector('#text-box').setAttribute('disabled', true);
    }
    else {
        document.querySelector('#text-box').removeAttribute('disabled');
    }
}); 
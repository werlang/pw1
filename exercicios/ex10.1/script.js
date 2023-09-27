const form = document.querySelector('form');
const name = document.querySelector('#name');
const password = document.querySelector('#password');
const confirm = document.querySelector('#confirm');
const error = document.querySelector('.error');

form.addEventListener('submit', async e => {
    e.preventDefault();
    
    if (password.value != confirm.value){
        error.innerHTML = 'As senhas não coincidem';
        password.focus();
        return;
    }

    const data = await fetch('back.php', {
        method: `POST`,
        body: new FormData(form),
    }).then(res => res.json());

    console.log(data);
    error.innerHTML = data.message;

    if (data.status == 'erro'){
        document.querySelector(`#${ data.field }`).focus();
    }
    else if (data.status == "sucesso"){
        form.reset();
        name.focus();
    }
});
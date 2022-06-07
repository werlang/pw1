for (let i=0 ; i<10 ; i++) {
    document.body.insertAdjacentHTML('beforeend', `<div class="box">${5 * (i + 1)}</div>`);
}

document.body.insertAdjacentHTML('beforeend', '<span>👽</span>');
document.body.insertAdjacentHTML('afterbegin', '<span>👽</span>');

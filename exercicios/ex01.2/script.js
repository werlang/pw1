for (let i=0 ; i<10 ; i++) {
    let valor = (i+1) * 5;
    document.body.insertAdjacentHTML('beforeend', `<div class="box">${ valor }</div>`);
}

document.body.insertAdjacentHTML('beforeend', '<span>👽</span>');
document.body.insertAdjacentHTML('afterbegin', '<span>👽</span>');

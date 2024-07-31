let isX = true;
let winner = null;

document.querySelectorAll('.cell').forEach(cell => {
    cell.addEventListener('click', () => {
        if (cell.innerHTML != '') {
            return;
        }
        if (isX) {
            cell.classList.add('x');
            cell.innerHTML = 'X';
            isX = false;
        }
        else {
            cell.classList.add('o');
            cell.innerHTML = 'O';
            isX = true;
        }
        checkWinner();
    });
});

function checkWinner() {
    if (
        checkPlay(0,1,2) ||
        checkPlay(3,4,5) ||
        checkPlay(6,7,8) ||
        checkPlay(0,3,6) ||
        checkPlay(1,4,7) ||
        checkPlay(2,5,8) ||
        checkPlay(0,4,8) ||
        checkPlay(2,4,6)
    ) {
        alert(`Jogador ${winner} ganhou`);
    }
}

function checkPlay(i1, i2, i3) {
    cells = document.querySelectorAll('.cell');
    if (
        cells[i1].innerHTML != '' &&
        cells[i1].innerHTML == cells[i2].innerHTML && 
        cells[i1].innerHTML == cells[i3].innerHTML
    ) {
        winner = cells[i1].innerHTML;
        return true;
    }
    return false;
}
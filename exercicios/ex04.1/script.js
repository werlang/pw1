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
    });
});
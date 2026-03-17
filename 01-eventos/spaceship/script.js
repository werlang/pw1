const spaceship = document.querySelector('#spaceship');

let x = 230;
let y = 440;

const size_W = 500;
const size_H = 500;
const spaceship_W = 40;
const spaceship_H = 40;

moveSpaceship(x,y);
const speed = 10;

document.body.addEventListener('keydown', (e) => {
    // atualiza x e y de acordo com as teclas pressionadas
    if (e.key == 'w') {
        y -= speed;
    }
    else if (e.key == 's') {
        y += speed;
    }
    else if (e.key == 'a') {
        x -= speed;
    }
    else if (e.key == 'd') {
        x += speed;
    }

    // restrições da tela
    if (x < 0) {
        x = 0;
    }
    else if (x > size_W - spaceship_W) {
        x = size_W - spaceship_W;
    }
    if (y < 0) {
        y = 0;
    }
    else if (y > size_H - spaceship_H) {
        y = size_H - spaceship_H;
    }

    moveSpaceship(x,y);
});

function moveSpaceship(x, y) {
    spaceship.style.left = x + 'px';
    spaceship.style.top = y + 'px';
}
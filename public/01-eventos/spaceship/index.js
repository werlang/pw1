const spaceship = document.querySelector('img');

const increment = 10; // pixels to move per key press

let x = 200;
let y = 380;
spaceship.style.position = 'absolute';
spaceship.style.left = x + 'px';
spaceship.style.top = y + 'px';

document.body.addEventListener('keydown', (event) => {
    if (event.key === 'a') {
        x -= increment;
    } else if (event.key === 'd') {
        x += increment;
    } else if (event.key === 'w') {
        y -= increment;
    } else if (event.key === 's') {
        y += increment;
    }
    spaceship.style.left = x + 'px';
    spaceship.style.top = y + 'px';
});
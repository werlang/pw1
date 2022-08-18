const cron = document.querySelector('#cron');
const start = document.querySelector('#start');
const empty = document.querySelector('#empty');
const laps = document.querySelector('#laps');
let time = 0;
let paused = true;
let interval;

function formatTime() {
    if (time > 60) {
        const m = Math.floor(parseFloat(time) / 60);
        const s = (parseFloat(time) - m*60).toFixed(1);
        return `${m}m ${s}s`;
    }
    return `${ parseFloat(time).toFixed(1) }s`;
}

start.addEventListener('click', () => {
    if (paused) {
        interval = setInterval( () => {
            time += 0.1;
            cron.innerHTML = formatTime();
        }, 100);
        paused = false;
        start.innerHTML = 'Parar';
        empty.innerHTML = 'Volta';
    }
    else {
        clearInterval(interval);
        paused = true;
        start.innerHTML = 'Continuar';
        empty.innerHTML = 'Zerar';
    }
});

empty.addEventListener('click', () => {
    if (paused) {
        start.innerHTML = 'Iniciar';
        laps.innerHTML = '';
    }
    else {
        const t = laps.querySelectorAll('li').length;
        laps.insertAdjacentHTML('beforeend', `<li>Volta ${ t + 1 }: <span class="highlight">${ formatTime()}</span></li>`);
    }
    time = 0;
    cron.innerHTML = '0.0';;
});
const buttonStart = document.querySelector('#start');
const buttonEmpty = document.querySelector('#empty');
const cron = document.querySelector('#cron');
const laps = document.querySelector('#laps');

let time = 0;
let running = false;
let interval;

buttonStart.addEventListener('click', () => {
    if (running) {
        clearInterval(interval);
        buttonStart.innerHTML = 'Continua';
        buttonEmpty.innerHTML = 'Zerar';
        running = false;
    }
    else {
        interval = setInterval(() => {
            time += 0.1;
            let timeShow = `${time.toFixed(1)}s`;
            if (time >= 60) {
                const m = parseInt(time / 60);
                const s = parseInt(time) % 60;
                timeShow = `${m}m ${s}s`;
            }
            cron.innerHTML = timeShow;
        }, 100);
        buttonStart.innerHTML = 'Pausa';
        buttonEmpty.innerHTML = 'Volta';
        running = true;
    }
});

let voltas = 0;

buttonEmpty.addEventListener('click', () => {
    if (running) {
        const li = document.createElement('li');
        voltas++;
        li.innerHTML = `Volta ${voltas}: <span class="highlight">${cron.innerHTML}</span>`;

        laps.appendChild(li);
    }
    else {
        time = 0;
        cron.innerHTML = '0.0';
        buttonStart.innerHTML = 'Iniciar';
        buttonEmpty.innerHTML = 'Zerar';
        laps.innerHTML = '';
        voltas = 0;
    }
});
const events = [
    {
        "eventName": "V FEIRA DE CIÊNCIAS",
        "location": "Sala 1",
        "date": "01/01/2024",
        "time": "08:00"
    },
    {
        "eventName": "VII SEMANA DE INFORMÁTICA",
        "location": "Sala 2",
        "date": "01/02/2024",
        "time": "09:00"
    },
    {
        "eventName": "Workshop de Desenvolvimento Web",
        "location": "Auditório Central",
        "date": "05/03/2024",
        "time": "14:00"
    },
    {
        "eventName": "Maratona de Programação",
        "location": "Laboratório de Informática 3",
        "date": "12/04/2024",
        "time": "08:00"
    },
    {
        "eventName": "Feira de Tecnologias Sustentáveis",
        "location": "Pátio Externo",
        "date": "22/05/2024",
        "time": "09:00"
    },
    {
        "eventName": "Conferência de Segurança da Informação",
        "location": "Sala 5B",
        "date": "15/06/2024",
        "time": "10:00"
    },
    {
        "eventName": "Exposição de Startups",
        "location": "Hall de Entrada",
        "date": "07/07/2024",
        "time": "16:00"
    },
    {
        "eventName": "Seminário de Inteligência Artificial",
        "location": "Auditório B",
        "date": "25/08/2024",
        "time": "13:00"
    },
    {
        "eventName": "Workshop de UX/UI Design",
        "location": "Sala 9C",
        "date": "03/09/2024",
        "time": "15:00"
    },
    {
        "eventName": "Palestra sobre Blockchain",
        "location": "Sala de Conferências 2",
        "date": "17/10/2024",
        "time": "11:00"
    }
];

const eventDOM = document.querySelector('#events');
events.forEach(event => {
    const item = document.createElement('div');
    // item.classList.add('event');
    item.innerHTML = event.eventName;
    eventDOM.appendChild(item);

    item.addEventListener('click', () => {
        showEvent(event);
    });
});

function showEvent(event) {
    const janela = `<div id="fog">
        <div class="modal">
            <h1>${event.eventName}</h1>
            <h2>Onde?</h2>
            <div>${event.location}</div>
            <h2>Quando?</h2>
            <div><span class="date-time">${event.date}</span> às <span class="date-time">${event.time}</span></div>
            <div id="button-container"><button>OK</button></div>
        </div>
    </div>`;
    document.body.insertAdjacentHTML('beforeend', janela);
    const button = document.querySelector('button');
    button.addEventListener('click', () => {
        const fog = document.querySelector('#fog');
        fog.remove();
    });
}

// // teste da função
// const testEvent = {
//     eventName: "V FEIRA DE CIÊNCIAS",
//     location: "Sala 1",
//     date: "01/01/2024",
//     time: "08:00"
// }

// showEvent(testEvent);
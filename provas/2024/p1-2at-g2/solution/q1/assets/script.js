const button = document.querySelector('button');
const eventName = document.querySelector('#eventName');
const locationEvent = document.querySelector('#location');
const date = document.querySelector('#date');
const time = document.querySelector('#time');
const message = document.querySelector('#message');

const eventList = [];

button.addEventListener('click', () => {
    const event = {
        eventName: eventName.value,
        location: locationEvent.value,
        date: date.value,
        time: time.value,
    }
    eventList.push(event);
    console.log(eventList);
    
    eventName.value = '';
    locationEvent.value = '';
    date.value = '';
    time.value = '';

    message.innerHTML = `Evento <span id="event-name">${event.eventName}</span> cadastrado com sucesso!`
});
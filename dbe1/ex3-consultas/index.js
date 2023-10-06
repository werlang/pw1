const form = document.querySelector('form');
const selectDoctor = document.querySelector('#doctor-name');

// Fetch doctors and populate select
fetch('schedule.php?doctors').then(res => res.json()).then(doctors => {
    doctors.forEach(doctor => {
        const option = document.createElement('option');
        option.value = doctor.id;
        option.textContent = doctor.name;
        selectDoctor.appendChild(option);
    });
});

const scheduledAppointment = document.querySelector('#scheduled-appointment');

form.addEventListener('submit', async event => {
    event.preventDefault();

    const data = await fetch('schedule.php', {
        method: 'POST',
        body: new FormData(form),
    }).then(res => res.json());
    // console.log(data);

    if (data.error) {
        // Show error toast
        addToast(data.message, 'error');
        return;
    }

    // Show success toast
    addToast(data.message, 'success');
    // form.reset();

    // Render appointment
    const date = new Date(data.appointment.date + 'T' + data.appointment.time);
    const formattedDate = date.toLocaleDateString('pt-BR');

    scheduledAppointment.innerHTML = `
        <h3>${data.appointment.patient}</h3>
        <p>Dia ${formattedDate} às ${data.appointment.time}</p>
        <p>Médico(a): ${data.appointment.doctor}</p>
        <p>Observações: ${data.appointment.notes}</p>
    `;
});

function addToast(message, type) {
        // Remove all current toasts
        const currentToasts = document.querySelectorAll('.toast');
        currentToasts.forEach(toast => toast.remove());

        // Create and show new toast
        const toast = document.createElement('div');
        toast.classList.add('toast', type);
        toast.textContent = message;
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 3000);
}




import showToast from "../components/toast.js";

const data = await fetch('/api/users/get.php').then(res => res.json());
// console.log(data);

// usuario nao logado
if (data.error) {
    location.href = '/login';
}

const logout = document.querySelector('#logout');
logout.addEventListener('click', async () => {
    await fetch('/api/users/logout.php');
    location.href = '/login';
});

const formNote = document.querySelector('#form-note');
formNote.addEventListener('submit', async e => {
    e.preventDefault();
    const data = await fetch('/api/notes/add.php', {
        method: 'POST',
        body: new FormData(formNote),
    }).then(res => res.json());
    console.log(data);
    showToast(data.message, data.error ? 'error' : 'success');
    loadNotes();
});

const noteFileInput = document.querySelector('#note-file');
noteFileInput.addEventListener('change', async () => {
    const fd = new FormData();
    fd.append('note-file', noteFileInput.files[0]);
    const data = await fetch('/api/notes/upload.php', {
        method: 'POST',
        body: fd,
    }).then(res => res.json());
    console.log(data);
    showToast(data.message, data.error ? 'error' : 'success');
    loadNotes();
    noteFileInput.value = '';
});

async function loadNotes() {
    const data = await fetch(`/api/notes/get.php`).then(res => res.json());
    // console.log(data);
    const notesList = document.querySelector('#notes-list');
    notesList.innerHTML = '';
    data.notes.forEach(note => {
        const li = document.createElement('li');
        li.innerHTML = `
            <p>${note.note}</p>
            <small>Criado em: ${new Date(note.create_time).toLocaleString()}</small>
        `;
        notesList.appendChild(li);
    });
}
loadNotes();
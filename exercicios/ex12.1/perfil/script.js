import showToast from "../components/toast.js";
import { getCookie, setCookie } from "../helpers/cookies.js";


let savedNotes = { count: 0 };
if (getCookie('notes')) {
    savedNotes = getCookie('notes');
}
// console.log(savedNotes);



const data = await fetch('/api/users/get.php').then(res => res.json());
console.log(data);

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

    savedNotes.count++;
    setCookie('notes', savedNotes, '1d');
    showToast(`Você salvou ${savedNotes.count} anotações`);
});

const formUpload = document.querySelector('#form-upload');
formUpload.addEventListener('submit', async e => {
    e.preventDefault();

    const data = await fetch('/api/notes/upload.php', {
        method: 'POST',
        body: new FormData(formUpload),
    }).then(res => res.json());
    console.log(data);
    formUpload.reset();
    showToast(data.message, data.error ? 'error' : 'success');
})



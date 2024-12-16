import createToast from "../helpers/js/toast.js";
import createModal from "../helpers/js/modal.js";

// Questão 1
// Faça a requisição GET /core/session.php para receber a informação do usuário logado.
// Converta o resultado para do JSON retornado pela requisição para um objeto e guarde na variável data.
// Caso o PHP retornar um erro (data.error), redirecione o usuário para a página de login.
fetch('/core/session.php').then(res => res.json().then(data => {
    // console.log(data);

    if (data.error) {
        location.href = '/login';
    }
}))

const table = document.querySelector('#tasks-table');
fetch('tasks.php').then(async res => res.json()).then(data => {
    // console.log(data);
    if (data.error) {
        createToast(data.message, data.error);
        return;
    }

    table.innerHTML = `<tr>
        <th>Submetido</th>
        <th>Título</th>
        <th>Prazo</th>
    </tr>`;

    data.tasks.forEach(task => {
        // console.log(task);
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${task.submission !== false ? '✅' : '❌'}</td>
            <td>${task.title}</td>
            <td>${task.deadline}</td>
        `;
        table.appendChild(tr);

        tr.addEventListener('click', () => {
            const modal = createModal(task.title, task.description);
            const buttonContainer = document.createElement('div');
            buttonContainer.classList.add('button-container');
            const btn = document.createElement('button');
            if (task.submission) {
                btn.textContent = 'Visualizar resposta';
                btn.addEventListener('click', () => viewTask(task));
            }
            else {
                btn.textContent = 'Submeter resposta';
                btn.addEventListener('click', () => submitTask(task.id));
            }
            buttonContainer.appendChild(btn);
            modal.querySelector('.modal-body').appendChild(buttonContainer);
        });
    });
});

function viewTask(task) {
    if (!task.submission) {
        createToast('Nenhuma resposta enviada', true);
        return;
    }
    const a = document.createElement('a');
    const path = '/upload/'+ task.submission.file_name;
    a.href = path;
    a.download = task.submission.file_name;
    a.click();
}

function submitTask(taskId) {
    const modalContent = `
        <form id="submission-form">
            <label for="submission">Resposta:</label>
            <input type="file" name="submission" id="submission" required>
            <button type="submit">Enviar</button>
        </form>
    `;
    const modal = createModal('Submeter resposta', modalContent);

    const form = modal.querySelector('#submission-form');
    form.addEventListener('submit', async e => {
        e.preventDefault();

        // Questão 3
        // Faça a requisição POST submit_task.php para enviar a resposta do usuário.
        // Envie o formulário form como FormData na requisição, e também anexe a variável taskId no FormData com o nome task_id.
        // Armazene o resultado convertido para JSON na variável data.
        const fd = new FormData(form);
        fd.append('task_id', taskId);
        const data = await fetch('submit_task.php', {
            method: 'POST',
            body: fd
        }).then(res => res.json());

        createToast(data.message, data.error);

        if (data.error) {
            return;
        }

        setTimeout(() => location.reload(), 1500);
    });
}
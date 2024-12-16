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
}));

const select = document.querySelector('#class-selection select');
fetch('class-list.php').then(async res => res.json().then(data => {
    data.classes.forEach(cl => {
        const option = document.createElement('option');
        option.value = cl.id;
        option.textContent = cl.name;
        select.appendChild(option);
    });
}));

const tasksTable = document.querySelector('#tasks-table');
const submissionsTable = document.querySelector('#submissions-table');

select.addEventListener('change', async e => {
    // Questão 3
    // Faça uma requisição GET para o arquivo tasks.php passando o id da turma selecionada. Envie o id usando o campo class_id na query string.
    // Converta o JSON retornado pela requisição para um objeto e guarde na variável data.

    const data = await fetch(`/tasks/tasks.php?class_id=${select.value}`).then(res => res.json());

    // exemplo de retorno da requisição
    // const data = { tasks: [
    //     {
    //         title: 'Tarefa 1',
    //         description: 'Descrição da tarefa 1',
    //         deadline: '2021-09-30',
    //         submissions: [
    //             {
    //                 id: 1,
    //                 name: 'Aluno 1',
    //                 submission_date: '2021-09-29',
    //                 file_name: 'file1.txt',
    //                 grade: 10,
    //                 feedback: 'Muito bom!'
    //             },
    //             {
    //                 id: 2,
    //                 name: 'Aluno 2',
    //                 submission_date: '2021-09-30',
    //                 file_name: 'file2.txt',
    //                 grade: 9,
    //                 feedback: 'Bom!'
    //             }
    //         ]
    //     },
    // ]}

    showTasks(data.tasks);
});

function showTasks(tasks) {
    tasksTable.innerHTML = `<tr>
        <th>Título</th>
        <th>Descrição</th>
        <th>Prazo</th>
    </tr>`;
    submissionsTable.innerHTML = '';

    tasks.forEach(task => {
        // console.log(task);
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${task.title}</td>
            <td>${task.description}</td>
            <td>${task.deadline}</td>
        `;
        tasksTable.appendChild(tr);
        tr.addEventListener('click', () => showSubmission(task.submissions));
    });
}

function showSubmission(submissions) {
    submissionsTable.innerHTML = `<tr>
        <th>Aluno</th>
        <th>Submeteu em</th>
        <th>Arquivo</th>
        <th></th>
    </tr>`;
    submissions.forEach(submission => {
        const subTr = document.createElement('tr');
        subTr.innerHTML = `
            <td>${submission.name}</td>
            <td>${submission.submission_date}</td>
            <td><a href="/uploads/${submission.file_name}" target="_blank">Baixar 📥</a></td>
            <td> <button>Avaliar</button> </td>
        `;
        submissionsTable.appendChild(subTr);

        subTr.querySelector('button').addEventListener('click', () => showEvaluation(submission));
    });
}

function showEvaluation(submission) {
    const modal = createModal('Avaliar', `
        <form>
            <label for="student">Aluno: </label>
            <input type="text" name="student" id="student" value="${submission.name}" readonly>
            <label for="grade">Nota: </label>
            <input type="number" name="grade" id="grade" min="0" max="10" step="0.1" value="${submission.grade || 0}" required>
            <label for="feedback">Feedback: </label>
            <textarea name="feedback" id="feedback" rows="4" placeholder="Digite o seu comentário aqui..." required>${submission.feedback || ''}</textarea>
            <button type="submit">Avaliar</button>
        </form>
    `);

    const form = modal.querySelector('form');
    form.addEventListener('submit', async e => {
        e.preventDefault();

        // Questão 4
        // Faça uma requisição POST para o arquivo evaluate.php passando o formulário em um objeto FormData, bem como o id da submissão no campo submission_id.
        // Converta o JSON retornado pela requisição para um objeto e guarde na variável data.

        const fd = new FormData(form);
        fd.append('submission_id', submission.id);
        const data = await fetch('evaluate.php', {
            method: 'POST',
            body: fd
            
        }).then(res => res.json());


        // exemplo de retorno da requisição
        // const data = { 
        //     message: 'Avaliação salva com sucesso!',
        //     evaluation: {
        //         grade: 9,
        //         feedback: 'Muito bom!'
        //     }
        // }

        createToast(data.message, data.status);
        modal.parentElement.remove();

        submission.grade = data.evaluation.grade;
        submission.feedback = data.evaluation.feedback;
    });
}
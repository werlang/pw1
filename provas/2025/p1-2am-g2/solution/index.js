function showToast(options = {}) {
    const {
        message = '',
        type = 'info',
        duration = 3000
    } = options;

    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;

    // Add to document
    document.body.appendChild(toast);

    toast.classList.add('toast-visible');

    // Set timeout to remove toast
    setTimeout(() => {
        // Remove the visible class to trigger exit animation
        toast.classList.remove('toast-visible');

        // Remove from DOM after animation completes
        if (document.body.contains(toast)) {
            document.body.removeChild(toast);
        }
    }, duration);

    // Return toast element
    return toast;
}

const classes = [];

function renderClassList() {
    const container = document.querySelector('#classes-list');
    container.innerHTML = '';

    if (classes.length == 0) {
        container.innerHTML = `<p class="student-list-empty">Nenhuma turma cadastrada.</p>`;
        return;
    }

    classes.forEach((classs, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <div class="class-header">
                <div class="class-name-container">
                    <h4 class="class-name-display">${classs.name}</h4>
                </div>
                <p><strong>${classs.students.length}</strong> alunos</p>
            </div>
            <div class="class-actions">
                <button class="add-student-button">Adicionar Aluno</button>
                <button class="delete-button">Excluir Turma</button>
            </div>
            <ul class="student-list"></ul>
        `;

        const studentList = card.querySelector('.student-list');
        classs.students.forEach((student, index) => {
            const li = document.createElement('li');
            li.classList.add('student-list-item');
            li.innerHTML = `
                <div class="student-info">
                <span class="student-name">${student.name}</span>
                <span class="student-balance">R$ ${student.balance}</span>
                </div>
                <div class="student-actions">
                <button class="balance-action-button remove-student" title="Remover Aluno">x</button>
                </div>
            `;
            studentList.append(li);

            const removeStudentBtn = li.querySelector('.remove-student');
            removeStudentBtn.addEventListener('click', () => {
                classs.students.splice(index, 1);
                showToast({ message: 'Aluno removido com sucesso!', type: 'success' });
                renderClassList();
            });
        })

        const deleteButton = card.querySelector('.delete-button');
        deleteButton.addEventListener('click', () => {
            deleteClass(index);
        });

        const addButton = card.querySelector('.add-student-button');
        addButton.addEventListener('click', () => {
            const studentName = `Aluno ${classs.students.length}`;

            const student = {
                name: studentName,
                balance: 1000,
            };
            classs.students.push(student);
            showToast({ message: 'Aluno inserido com sucesso!', type: 'success' });
            renderClassList();

            console.log(classes);
        });

        container.append(card);
    });
}

function deleteClass(index) {
    classes.splice(index, 1);
    showToast({ message: 'Turma removida com sucesso!', type: 'success' });
    renderClassList();
}

function createClass() {
    const classNameInput = document.querySelector('#class-name');
    if (!classNameInput.value) {
        showToast({ message: 'Por favor, informe o nome da turma.', type: 'error' });
        return;
    }

    const classs = {
        name: classNameInput.value,
        students: [],
    }
    classes.push(classs);
    console.log(classes);

    showToast({ message: 'Turma criada com sucesso!', type: 'success' });
    classNameInput.value = '';
    renderClassList();
}

const createClassBtn = document.querySelector('#create-class-btn');
createClassBtn.addEventListener('click', () => {
    createClass();
});

renderClassList();
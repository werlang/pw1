const inputName = document.querySelector('#input-nome');
const inputGrade = document.querySelector('#input-nota');
const buttonAdd = document.querySelector('#btn-adicionar');
const buttonAnalyze = document.querySelector('#btn-analisar');
const message = document.querySelector('#mensagem');
const studentList = document.querySelector('#lista-alunos');
const classAverage = document.querySelector('#media-turma');
const highestGrade = document.querySelector('#maior-nota');
const approvedList = document.querySelector('#aprovados');

const students = [
    { name: 'Ana', grade: 8.5 },
    { name: 'Bruno', grade: 6.0 },
    { name: 'Carla', grade: 9.2 }
];

function renderStudents() {
    studentList.innerHTML = '';

    students.forEach(function(student) {
        const status = student.grade >= 7 ? 'Aprovado' : 'Reprovado';

        studentList.innerHTML += `
            <tr>
                <td>${student.name}</td>
                <td>${student.grade.toFixed(1)}</td>
                <td>${status}</td>
            </tr>
        `;
    });
}

function analyzeClass() {
    if (students.length === 0) {
        classAverage.textContent = '-';
        highestGrade.textContent = '-';
        approvedList.textContent = '-';
        return;
    }

    const totalGrades = students.reduce(function(accumulator, student) {
        return accumulator + student.grade;
    }, 0);

    const average = totalGrades / students.length;

    let topStudent = students[0];

    students.forEach(function(student) {
        if (student.grade > topStudent.grade) {
            topStudent = student;
        }
    });

    const approvedStudents = students
        .filter(function(student) {
            return student.grade >= 7;
        })
        .map(function(student) {
            return student.name;
        });

    classAverage.textContent = average.toFixed(2);
    highestGrade.textContent = `${topStudent.name} (${topStudent.grade.toFixed(1)})`;
    approvedList.textContent = approvedStudents.length > 0 ? approvedStudents.join(', ') : 'Nenhum aprovado';
}

buttonAdd.addEventListener('click', function() {
    const studentName = inputName.value.trim();
    const studentGrade = Number(inputGrade.value);

    if (studentName === '' || Number.isNaN(studentGrade)) {
        message.textContent = 'Preencha nome e nota corretamente.';
        return;
    }

    students.push({
        name: studentName,
        grade: studentGrade
    });

    message.textContent = `Aluno ${studentName} cadastrado com sucesso.`;
    inputName.value = '';
    inputGrade.value = '';
    inputName.focus();
    renderStudents();
    analyzeClass();
});

buttonAnalyze.addEventListener('click', function() {
    message.textContent = 'Análise atualizada com base no array da turma.';
    analyzeClass();
});

renderStudents();
analyzeClass();
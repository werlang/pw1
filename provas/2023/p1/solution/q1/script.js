const studentsList = [
    {
        name: "John",
        grade: 5.5
    },
    {
        name: "Alice",
        grade: 9.2
    },
    {
        name: "Mike",
        grade: 7.8
    },
    {
        name: "Emily",
        grade: 9.0
    },
    {
        name: "Daniel",
        grade: 8.7
    },
    {
        name: "Sarah",
        grade: 9.5
    },
    {
        name: "Alex",
        grade: 8.1
    },
    {
        name: "Olivia",
        grade: 8.9
    },
    {
        name: "William",
        grade: 9.3
    },
    {
        name: "Sophia",
        grade: 8.8
    }
];

const tbody = document.querySelector('#students-table tbody');
const button = document.querySelector('#calculate-average');
const result = document.querySelector('#average-div');

studentsList.forEach(student => {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${student.name}</td><td>${student.grade}</td>`;
    tbody.appendChild(tr);
});

button.addEventListener('click', () => {
    let sum = 0;
    let studentHigher =  {
        name: '',
        grade: 0
    }
    for (let i in studentsList) {
        const student = studentsList[i];
        sum += student.grade;

        if (student.grade > studentHigher.grade) {
            studentHigher = student;
        }
    }
    const average = sum / studentsList.length;
    result.innerHTML = `
        <div>Média: ${average.toFixed(1)}</div>
        <div>Aluno: ${studentHigher.name}</div>
        <div>Nota: ${studentHigher.grade}</div>
    `;
});
const studentsList = [
    {
        name: "John",
        grade: 8.5
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

const table = document.querySelector('#students-table tbody');

let content = '';
studentsList.forEach(student => {
    content += `<tr>
        <td>${ student.name }</td>
        <td>${ student.grade }</td>
    </tr>`;

});
table.innerHTML = content;


const button = document.querySelector('#calculate-average');
button.addEventListener('click', () => {
    let soma = 0;
    
    const maior = {
        nome: '',
        nota: 0,
    }

    studentsList.forEach(student => {
        soma += student.grade;

        if (student.grade > maior.nota) {
            maior.nome = student.name;
            maior.nota = student.grade;
        }
    });

    let media = soma / studentsList.length;

    document.querySelector('#average-div').innerHTML = `
        <div>Média: ${ media }</div>
        <div>Aluno: ${ maior.nome }</div>
        <div>Nota: ${ maior.nota }</div>
    `;
})
let studentsList = [];

const name = document.querySelector('#name');
const age = document.querySelector('#age');
const add = document.querySelector('#add');
const oldest = document.querySelector('#oldest');
const result = document.querySelector('#result');

add.addEventListener('click', () => {
    const student = {
        name: name.value,
        age: age.value,
    };
    studentsList.push(student);
    console.log(studentsList);
});

oldest.addEventListener('click', () => {
    let oldestStudent = {
        name: '',
        age: 0,
    }

    studentsList.forEach(student => {
        if (student.age > oldestStudent.age) {
            oldestStudent = student;
        }
    });

    result.innerHTML = oldestStudent.name;
})
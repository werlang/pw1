import showToast from "./components/toast.js";

const studentsBody = document.querySelector('#studentsBody');
const sortButtons = document.querySelectorAll('.sort-buttons .btn');

// TODO: Implemente aqui
// Crie loadStudents(orderBy = 'grade', order = 'desc') que:
// - Faz GET para /api/student/list.php?orderBy=X&order=Y
// - Preenche a tabela com os alunos

// Adicione event listeners nos botões para ordenação

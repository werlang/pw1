const nome = document.querySelector('#nome');
const nota = document.querySelector('#nota');
const buttonCadastro = document.querySelector('#cadastro');
const buttonMedia = document.querySelector('#media');
const result = document.querySelector('#result');

const alunos = [];

buttonCadastro.addEventListener('click', () => {
    const aluno = {
        nome: nome.value,
        nota: Number(nota.value),
    }
    alunos.push(aluno);

    nome.value = '';
    nota.value = '';

    result.innerHTML = `Aluno ${aluno.nome} cadastrado.`;
    // console.log(alunos);
});

buttonMedia.addEventListener('click', () => {
    let soma = 0;
    let topAluno = null;

    alunos.forEach((aluno, i) => {
        // console.log(`Repetição ${i}:`, aluno);
        soma += aluno.nota;

        if (!topAluno || aluno.nota > topAluno.nota) {
            topAluno = aluno;
        }
    });
    const media = soma / alunos.length;
    result.innerHTML = `
        <div>Média geral: ${media.toFixed(2)}</div>
        <div>O(a) aluno(a) ${topAluno.nome} tirou a maior nota</div>
    `;
});
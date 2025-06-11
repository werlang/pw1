// Função toast para exibir mensagens de feedback ao usuário.
// Já está implementada e pode ser utilizada em qualquer parte do código.
// Exemplo de uso:
// showToast({ message: 'Operação realizada com sucesso!', type: 'success' });
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

// Array para armazenar as turmas
const classes = [];
// Exemplo de estrutura de um array com 2 turmas, e 3 alunos cada:
// OBS: As turmas e alunos são adicionados/removidos usando a interface, não são fixas no código.
// const classes = [
//     { name: 'Turma A', students: [
//         { name: 'Aluno 1', balance: 1000 }, { name: 'Aluno 2', balance: 1000 }
//     ] },
//     { name: 'Turma B', students: [
//         { name: 'Aluno 1', balance: 1000 }, { name: 'Aluno 2', balance: 1000 }
//     ] }
// ];

// Função para renderizar a lista de turmas no DOM
// Cada vez que uma alteração for feita na lista de turmas, essa função deve ser chamada
function renderClassList() {
    showToast({
        message: 'Falta implementar tudo aqui',
        type: 'info',
    });

    // - Limpa o conteúdo do elemento com id `class-list`
    // - Se não houver turmas, exibe uma mensagem informando que não há turmas cadastradas
    // - Para cada turma no array `classes`, cria um card no HTML com a seguinte estrutura:
        // <div class="class-header">
        //     <div class="class-name-container">
        //         <h4 class="class-name-display">Turma Teste</h4> <!-- Substitua Turma Teste pelo nome da turma -->
        //     </div>
        //     <p><strong>X</strong> alunos</p> <!-- Substitua X pelo número de alunos -->
        // </div>
        // <div class="class-actions">
        //     <button class="add-student-button">Adicionar Aluno</button>
        //     <button class="delete-button">Excluir Turma</button>
        // </div>
        // <ul class="student-list"></ul>
    // - Quando clicar em "Excluir Turma", chama a função deleteClass() passando o índice da turma


    // - Quando clicar em "Adicionar Aluno":
    //   - Insere um objeto de aluno no array `students` da turma correspondente. O objeto deve ter a seguinte estrutura:
    //     {
    //       name: 'Nome do Aluno',
    //       balance: 1000
    //     }
    //   - O saldo é 1000 por padrão, e o nome do aluno deve ser um nome genérico provisório, como "Aluno 1", "Aluno 2", etc.
    //   - Mostra um toast de sucesso informando que o aluno foi adicionado.
    //   - Chame a função renderClassList() para atualizar a lista de turmas no DOM

    // - Para cada aluno adicionado, deve ser criado um item na lista de alunos `student-list` dentro do card da turma, com a seguinte estrutura:
    // <div class="student-info">
    //     <span class="student-name">Aluno 1</span>
    //     <span class="student-balance">R$ 1000.00</span>
    // </div>
    // <div class="student-actions">
    //     <button class="balance-action-button remove-student" title="Remover Aluno">x</button>
    // </div>

    // - Cada aluno deve um botão de ação "Remover Aluno".
    // - Mostre um toast de sucesso informando que o aluno foi removido quando o botão for clicado.
    // - Atualize a lista de turmas no DOM chamando renderClassList() após cada ação de adicionar ou remover aluno.
}

// Função para remover uma turma
function deleteClass() {
    // - A função receber um argumento, que é o índice da turma a ser removida no array classes
    // - Chama renderClassList() para atualizar a lista de turmas no DOM
    // - Mostra um toast de sucesso informando que a turma foi removida
}

// Função para criar uma nova turma
function createClass() {
    // - Captura o valor do campo de input com id `class-name`
    // - Valida se o nome da turma foi informado
    //   - Mostra um toast de erro se o nome não for informado
    //   - showToast({ message: 'Por favor, informe o nome da turma.', type: 'error' });
    // - Adiciona a nova turma à lista de turmas (array classes). Formato do objeto:
    //   {
    //     name: className,
    //     students: []
    //   }
    //  - Limpa o campo de input
    //  - Chama renderClassList() para atualizar a lista de turmas no DOM
    //  - Mostra um toast de sucesso informando que a turma foi criada
}

// Chama renderClassList para inicializar a lista de turmas quando a página é carregada
renderClassList();
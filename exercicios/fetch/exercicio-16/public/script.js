import showToast from "./components/toast.js";

// TODO: Implementar sistema de notas com operações em lote

let students = [];

async function loadStudents() {
    // TODO: Carregar de /api/student/list.php
    // TODO: Para cada estudante, adicionar:
    //   - selected: false
    //   - average: (grade1 + grade2 + grade3) / 3 formatado com .toFixed(2)
    // TODO: Chamar renderStudents()
}

function renderStudents() {
    // TODO: Obter container #studentsList
    // TODO: Limpar conteúdo
    
    // TODO: Criar cabeçalho com:
    // - Checkbox "Selecionar Todos"
    // - Colunas: Nome, Nota 1, Nota 2, Nota 3, Média
    
    // TODO: Para cada estudante, criar linha com:
    // - Checkbox individual (marcado se selected)
    // - Nome e 3 notas
    // - Média com classe 'approved' se >= 7, senão 'failed'
    
    // TODO: Adicionar eventos nos checkboxes
    // TODO: Chamar updateSelectAllCheckbox()
}

function updateSelectAllCheckbox() {
    // TODO: Marcar checkbox "Selecionar Todos" se todos estiverem marcados
    // Dica: Use students.every(s => s.selected)
}

function updateCalculateButton() {
    // TODO: Contar estudantes selecionados
    // TODO: Desabilitar botão se nenhum selecionado
    // TODO: Atualizar texto do botão mostrando quantidade
}

function calculateSelectedAverage() {
    // TODO: Filtrar estudantes selecionados
    // TODO: Se nenhum, mostrar warning
    // TODO: Calcular média das médias
    // TODO: Mostrar em #averageDisplay
    // TODO: Exibir toast com resultado
}

// TODO: Adicionar evento click no #calculateBtn

// TODO: Carregar estudantes ao iniciar


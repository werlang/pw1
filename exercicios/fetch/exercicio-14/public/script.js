import showToast from "./components/toast.js";

// TODO: Implementar gerenciamento de tarefas

let tasks = [];

async function loadTasks() {
    // TODO: Carregar tarefas de /api/task/list.php
    // TODO: Armazenar em 'tasks'
    // TODO: Chamar renderTasks() e updateDeleteCompletedButton()
}

function renderTasks() {
    // TODO: Obter container #tasksList
    // TODO: Limpar conteúdo
    
    // TODO: Se não houver tarefas, mostrar mensagem
    
    // TODO: Para cada tarefa, criar card com:
    // - task-card (adicionar classe 'completed' se concluída)
    // - Checkbox marcado se task.completed == 1
    // - Título e descrição
    // - Botão excluir
    
    // TODO: Adicionar eventos nos checkboxes e botões
}

async function toggleTask(id) {
    // TODO: Criar FormData com id
    // TODO: Enviar POST para /api/task/toggle.php
    // TODO: Atualizar tarefa no array local
    // TODO: Re-renderizar e atualizar botão
}

async function deleteTask(id) {
    // TODO: Pedir confirmação com confirm()
    // TODO: Enviar POST para /api/task/delete.php com id
    // TODO: Remover do array local
    // TODO: Re-renderizar
}

async function deleteCompletedTasks() {
    // TODO: Contar tarefas concluídas
    // TODO: Pedir confirmação mostrando quantidade
    // TODO: Enviar POST para /api/task/delete-completed.php
    // TODO: Recarregar lista
}

function updateDeleteCompletedButton() {
    // TODO: Mostrar botão apenas se houver tarefas concluídas
    // Dica: Use tasks.some(t => t.completed == 1)
}

// TODO: Adicionar evento click no #deleteCompletedBtn

// TODO: Carregar tarefas ao iniciar


import showToast from "./components/toast.js";

const tasksList = document.querySelector('#tasksList');

// TODO: Implemente aqui
// 1. Crie uma função loadTasks() que:
//    - Faz GET para /api/task/list.php
//    - Processa o array de tarefas
//    - Cria elementos <li> para cada tarefa
//    - Adiciona um botão de exclusão em cada tarefa
//
// 2. Crie uma função deleteTask(id) que:
//    - Confirma a exclusão com confirm()
//    - Faz DELETE para /api/task/delete.php?id=X
//    - Exibe mensagem de sucesso
//    - Recarrega a lista chamando loadTasks()
//
// 3. Chame loadTasks() quando a página carregar

// Estrutura sugerida para cada item da lista:
// <li class="task-item">
//     <span class="task-title">Título da tarefa</span>
//     <button class="btn-delete" onclick="deleteTask(id)">🗑️ Excluir</button>
// </li>

// loadTasks();

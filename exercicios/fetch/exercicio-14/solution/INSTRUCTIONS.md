# Gerenciamento de Tarefas com Exclusão

## Objetivo

Gerenciar tarefas com operações de exclusão e alteração de status.

## Funcionalidades a Implementar

### 1. Carregar e Renderizar Tarefas

- Carregar da API: `/api/task/list.php`
- Renderizar cards com checkbox de conclusão, título, descrição e botão excluir
- Aplicar classe `completed` quando tarefa estiver concluída

### 2. Alternar Status de Conclusão

- Ao marcar/desmarcar checkbox, enviar para: `/api/task/toggle.php`
- Método: POST com `id` da tarefa
- Atualizar tarefa no array local e re-renderizar

### 3. Excluir Tarefa Individual

- Ao clicar em "Excluir", pedir confirmação com `confirm()`
- Enviar para: `/api/task/delete.php`
- Método: POST com `id`
- Remover do array local e re-renderizar

### 4. Excluir Todas as Tarefas Concluídas

- Botão "Excluir Concluídas" só aparece se houver tarefas concluídas
- Pedir confirmação mostrando quantidade
- Enviar para: `/api/task/delete-completed.php`
- Método: POST (sem parâmetros)
- Recarregar lista após sucesso

## Dicas

- Use `task.completed == 1` para verificar se está concluída
- A API retorna booleano como 0/1
- Sempre use `confirm()` antes de deletar
- Atualize o botão "Excluir Concluídas" após cada mudança

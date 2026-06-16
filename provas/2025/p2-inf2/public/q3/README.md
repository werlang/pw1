# Eventos de Conclusão e Exclusão de Tarefas

Você deve implementar a lógica para gerenciar a conclusão e exclusão de tarefas na tela, garantindo que as alterações sejam refletidas no array `tasks` e no `localStorage`.

No documento HTML, você já tem a estrutura inserida para as tarefas, incluindo checkboxes e botões de exclusão. Agora, você precisa adicionar a funcionalidade para manipular esses elementos.

## Passo a Passo da Questão

### 0. Checkbox de Conclusão

- Ao marcar/desmarcar um checkbox em uma tarefa, atualize o status da tarefa. Utilize o evento `change` do checkbox para capturar a ação do usuário.
- Vecê deverá procurar dentro do array `tasks` a tarefa correspondente (com o mesmo nome) e alterar o campo `completed` para `true` ou `false`, conforme o estado do checkbox.
- Não esqueça de atualizar o `localStorage` após a alteração do status da tarefa (que estará dentro do array `tasks`).

### 1. Botão de Exclusão

- Ao clicar no botão "Excluir", remova a tarefa do array `tasks`.
- Você deverá procurar dentro do array `tasks` a tarefa correspondente (com o mesmo nome) e removê-la.
- Remova também o elemento HTML correspondente à tarefa da tela.
- Não esqueça de atualizar o `localStorage` após a exclusão da tarefa.

### 2. Mensagens para o Usuário

- Utilize a função `showToast` para exibir mensagens de sucesso toda vez que uma tarefa alterada ou excluída com sucesso.
```javascript
showToast('Status da tarefa atualizado com sucesso!', 'success');
showToast('Tarefa excluída com sucesso!', 'success');
```

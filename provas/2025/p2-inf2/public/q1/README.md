# Inserção de Tarefas

Você deve implementar um sistema simples para adicionar e gerenciar tarefas usando HTML, CSS e JavaScript.

## Objetivo

Permitir ao usuário cadastrar tarefas com:
- Nome
- Data
- Hora
- Duração (em minutos)
- Status de conclusão

## Passo a Passo da Questão

### 0. Carregar Tarefas Existentes

- Ao iniciar o sistema, carregue as tarefas já salvas no `localStorage`:

### 1. Estrutura da Tarefa

Cada tarefa deve ser um objeto com os seguintes campos:
```javascript
const task = {
    name: 'Nome da Tarefa',
    date: 'Data da Tarefa',
    time: 'Hora da Tarefa',
    duration: 'Duração da Tarefa em minutos',
    completed: false // Indica se a tarefa foi concluída
}
```

### 2. Adicionar Tarefa

- Ao enviar o formulário, obtenha os valores dos campos e crie um objeto `task`.
- Adicione esse objeto ao array `tasks` já existente no código.

### 3. Verificar Conflito de Horário

Antes de adicionar a tarefa:
- Utilize a função `getTaskStartEnd(task)` para obter o início e fim da nova tarefa.
  ```javascript
  const newTaskStartEnd = getTaskStartEnd(task);
  newTaskStartEnd.start; // Hora de início
  newTaskStartEnd.end;   // Hora de fim
  ```
- Compare com as tarefas já existentes no array `tasks` para garantir que não há sobreposição de horários.
- Se houver conflito, exiba a mensagem de erro:
  ```javascript
  showToast('Conflito de horário detectado!', 'error');
  ```
- Não adicione a tarefa em caso de conflito.

### 4. Persistência dos Dados

- Após adicionar uma tarefa (sem conflito), salve o array `tasks` no `localStorage` para garantir que as tarefas permaneçam após recarregar a página.

### 5. Limpar Formulário

- Limpe o formulário após adicionar a tarefa para facilitar o cadastro de novas tarefas.

### 6. Mensagens para o Usuário

- Ao adicionar com sucesso, exiba:
  ```javascript
  showToast('Tarefa adicionada com sucesso!', 'success');
  ```

## Resumo do Fluxo

1. Usuário preenche o formulário e envia.
2. Código cria o objeto da tarefa com os dados do formulário.
3. Verifica se há conflito de horário com tarefas existentes.
4. Se não houver conflito:
    - Adiciona ao array `tasks`
    - Salva no `localStorage`
    - Limpa o formulário
    - Mostra mensagem de sucesso
5. Se houver conflito:
    - Mostra mensagem de erro
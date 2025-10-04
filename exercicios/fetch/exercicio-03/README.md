# Exercício 3: Remover Tarefa da Lista

## Objetivo

Praticar requisições HTTP **DELETE** para remover itens individuais.

## Tema

Sistema de Gerenciamento de Tarefas (To-Do List)

## Descrição

Você deve implementar a funcionalidade de remover tarefas de uma lista de afazeres. Cada tarefa tem um botão de exclusão que, ao ser clicado, deve enviar uma requisição DELETE para a API.

## Tarefa do Aluno

Complete a função no arquivo `script.js` para:
1. Carregar as tarefas da API
2. Exibir as tarefas em uma lista
3. Remover tarefas quando o botão de exclusão for clicado

### API Endpoints

**Listar Tarefas:**
- **URL**: `/api/task/list.php`
- **Método**: `GET`
- **Resposta**:
```json
{
    "tasks": [
        {"id": 1, "title": "Estudar JavaScript", "completed": false},
        {"id": 2, "title": "Fazer exercícios", "completed": true}
    ]
}
```

**Remover Tarefa:**
- **URL**: `/api/task/delete.php?id=1`
- **Método**: `DELETE`
- **Resposta**:
```json
{
    "message": "Tarefa removida com sucesso"
}
```

## O Que Você Vai Aprender

- Como fazer requisições DELETE
- Como passar parâmetros em requisições DELETE
- Como atualizar a interface após uma operação
- Como confirmar ações destrutivas

## Instruções

1. Crie uma função `loadTasks()` que busca tarefas da API
2. Exiba as tarefas em uma lista (`<ul>`)
3. Adicione botões de exclusão em cada tarefa
4. Ao clicar no botão:
   - Confirme a ação com `confirm()`
   - Faça requisição DELETE com o ID da tarefa
   - Recarregue a lista após exclusão bem-sucedida

## Dicas

- Use `method: 'DELETE'` no fetch
- Confirme antes de excluir: `if (confirm('Tem certeza?'))`
- Recarregue a lista chamando `loadTasks()` após exclusão

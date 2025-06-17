# Prova PW1 - Sistema de Gerenciamento de Turmas

Nesta prova, você irá implementar um sistema simples de gerenciamento de turmas e alunos utilizando JavaScript. O sistema permitirá a criação e gerenciamento de turmas, adição e remoção de alunos, e controle do saldo de cada aluno.

Nota: O sistema de notificações (`showToast()`) já está implementado e você poderá utilizá-lo para exibir mensagens ao usuário. Não é necessário implementá-lo.

## [Questão 01](q1) - Gerenciamento de Turmas (3,0 pontos)

Implemente as seguintes funcionalidades relacionadas ao gerenciamento de turmas:

1. **(2,0)** A função `createClass()` que:
   - Captura o valor do campo de input com id `class-name`
   - Valida se o nome da turma foi informado
   - Adiciona a nova turma ao array `classes` com as propriedades:
     - `name`: nome da turma
     - `students`: array vazio para armazenar os alunos
   - Exibe uma notificação de sucesso usando a função `showToast()`
     - Exemplo: `showToast({ message: 'Turma criada com sucesso!', type: 'success' })`
   - Limpa o campo do input
   - Chama a função `renderClassList()` para atualizar a interface

2. **(1,0)** A função `deleteClass()` que:
   - Recebe o índice da turma a ser excluída
   - Remove a turma do array `classes`.
   - Chama a função `renderClassList()` para atualizar a interface
   - Exibe uma notificação de sucesso usando a função `showToast()`

## [Questão 02](q2) - Renderização de Turmas (3,0 pontos)

Implemente a função `renderClassList()` que atualiza a interface com a lista de turmas:

1. **(1,0)** Inicialização da lista:
   - Capture o elemento com id `classes-list`
   - Limpe o conteúdo atual do elemento
   - Verifique se o array `classes` está vazio e, em caso positivo, exiba uma mensagem informativa
     - Estrutura: `<p class="student-list-empty">Nenhuma turma cadastrada.</p>`.

2. **(2,0)** Para cada turma no array `classes`:
   - Crie um card (div com classe "card") para representar a turma, com a seguinte estrutura de conteúdo:
```html
<div class="class-header">
      <div class="class-name-container">
         <h4 class="class-name-display">Turma Teste</h4> <!-- Substitua Turma Teste pelo nome da turma -->
      </div>
      <p><strong>X</strong> alunos</p> <!-- Substitua X pelo número de alunos -->
</div>
<div class="class-actions">
      <button class="add-student-button">Adicionar Aluno</button>
      <button class="delete-button">Excluir Turma</button>
</div>
<ul class="student-list"></ul>
```
   - Substitua `Turma Teste` pelo nome da turma e `X` pelo número de alunos
   - Adicione a classe "card" ao elemento `div` do card
   - Configure o botão "Excluir Turma" para chamar a função `deleteClass()` passando o índice da turma no array `classes`.
   - Adicione o card ao elemento `classes-list`.

## [Questão 03](q3) - Gerenciamento de Alunos (5,0 pontos)

Implemente as seguintes funcionalidades relacionadas ao gerenciamento de alunos dentro da função `renderClassList()`:

1. **(2,0)** Adicionar alunos à turma:
   - Implemente a lógica do botão "Adicionar Aluno". Este botão estará dentro do card da turma.
   - Gere um nome automaticamente para o novo aluno (ex: "Aluno 1", "Aluno 2").
   - O aluno deve ser criado como um objeto contendo:
     - `name`: nome do aluno
     - `balance`: saldo inicial de 1000
   - Adicione o aluno ao array `students` da turma.
   - Exiba uma notificação de sucesso usando `showToast()`
   - Atualize a interface chamando `renderClassList()`

2. **(2,0)** Exibição da lista de alunos:
   - Para cada aluno da turma, crie um elemento de lista (`li`) com classe "student-list-item". Este elemento deverá ser adicionado à lista de alunos (`ul.student-list`) dentro do card da turma. O elemento deve conter:
   ```html
   <div class="student-info">
      <span class="student-name">Aluno 1</span>
      <span class="student-balance">R$ 1000.00</span>
   </div>
   <div class="student-actions">
      <button class="balance-action-button remove-student" title="Remover Aluno">x</button>
   </div>
   ```

3. **(1,0)** Remover alunos da turma:
   - Implemente a lógica do botão "x" (remove-student) para remover um aluno
      - O aluno deve ser removido do array `students` da turma.
      - Exiba uma notificação informando que o aluno foi removido usando `showToast()`
      - Atualize a interface chamando `renderClassList()`
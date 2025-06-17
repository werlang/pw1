# Prova PW1 - Sistema de Gestão de Empresas

Nesta prova, você irá implementar um sistema simples de gestão de empresas utilizando JavaScript. O sistema permitirá a criação e gerenciamento de empresas, controle de receitas e despesas, e visualização do saldo financeiro de cada empresa.

Nota: O sistema de notificações (`showToast()`) já está implementado e você poderá utilizá-lo para exibir mensagens ao usuário. Não é necessário implementá-lo.

## [Questão 01](q1) - Funções de Cálculo Financeiro (1.5 pontos)

Implemente as seguintes funções auxiliares para cálculos financeiros:

1. **(0.5)** A função `getTotalRevenue(index)` que:
   - Recebe o índice de uma empresa no array `companies`
   - Filtra apenas as transações positivas (receitas) da empresa
   - Retorna a soma total das receitas

2. **(0.5)** A função `getTotalExpense(index)` que:
   - Recebe o índice de uma empresa no array `companies`
   - Filtra apenas as transações negativas (despesas) da empresa
   - Retorna a soma total das despesas em valor absoluto (positivo)

3. **(0.5)** A função `getBalance(index)` que:
   - Recebe o índice de uma empresa no array `companies`
   - Retorna o saldo atual da empresa (soma de todas as transações)

## [Questão 02](q2) - Criação de Empresas (1.5 pontos)

1. **(0.5)** - Adicione o event listener para o botão de criar empresa
   - Capture o botão com id `create-company-btn`
   - Adicione um event listener para o evento `click` que chama a função `createCompany()`
   - Mostre um toast de sucesso ao clicar no botão, e atualize a lista de empresas usando `renderCompanyList()`.

Implemente a função `createCompany()` que gerencia a criação de novas empresas:

2. **(0.5)** Validação dos campos:
   - Capture o valor do select com id `company-class-select`
   - Capture o valor do input com id `company-name`
   - Valide se uma turma foi selecionada, caso contrário exiba um toast de erro:
     - `showToast({ message: 'Por favor, selecione uma turma.', type: 'error' })`
   - Valide se um nome foi informado, caso contrário exiba um toast de erro:
     - `showToast({ message: 'Por favor, insira um nome para a empresa.', type: 'error' })`

3. **(0.5)** Criação da empresa:
   - Adicione uma nova empresa ao array `companies` com a estrutura:
   ```javascript
   {
       name: companyName,
       transactions: []
   }
   ```
   - Exiba uma notificação de sucesso usando `showToast()`
   - Limpe os campos do formulário
   - Chame a função `renderCompanyList()` para atualizar a interface

## [Questão 03](q3) - Renderização e Gestão de Empresas (3.0 pontos)

Implemente a função `renderCompanyList()` que atualiza a interface com a lista de empresas:

1. **(0.5)** Inicialização da lista:
   - Capture o elemento com id `companies-list`
   - Limpe o conteúdo atual do elemento
   - Verifique se o array `companies` está vazio e, em caso positivo, exiba uma mensagem informativa:
     - `<p class="company-list-empty">Nenhuma empresa cadastrada.</p>`

2. **(1.0)** Para cada empresa no array `companies`, crie um card com a estrutura:
   ```html
   <div class="card company-card">
       <div class="company-header">
           <h4>Nome da Empresa</h4>
           <p><strong>Turma:</strong> INF-2AT</p>
           <p class="company-students"><strong>Alunos:</strong> Fulano Silva, Ciclano dos Santos, Beltrano Oliveira</p>
           <div class="company-finances">
               <div class="finance-item">
                   <div>Receitas</div>
                   <div class="finance-value budget">R$ X.XX</div>
               </div>
               <div class="finance-item">
                   <div>Despesas</div>
                   <div class="finance-value expenses">R$ X.XX</div>
               </div>
               <div class="finance-item">
                   <div>Caixa</div>
                   <div class="finance-value profit">R$ X.XX</div>
               </div>
           </div>
           <div class="company-actions">
               <button class="revenue-button">Adicionar Receita</button>
               <button class="expense-button">Adicionar Despesa</button>
           </div>
       </div>
       <button class="delete-company">Excluir Empresa</button>
   </div>
   ```
   - Use as funções de cálculo implementadas na Questão 01 para exibir os valores financeiros corretamente:
     - `getTotalRevenue` para receitas
     - `getTotalExpense` para despesas
     - `getBalance` para o saldo

3. **(1.5)** Funcionalidades dos botões:
   - **Botão "Adicionar Receita"**: Adiciona uma transação de valor +100 ao array `transactions` da empresa.
   - **Botão "Adicionar Despesa"**: 
     - Verifica se o saldo atual permite a despesa de 100
     - Se não permitir, exibe toast de erro: `'Saldo insuficiente para adicionar despesa de R$ 100.00.'`
     - Se permitir, adiciona uma transação de valor -100 ao array `transactions` da empresa
   - **Botão "Excluir Empresa"**: Remove a empresa do array `companies`
   - Todos os botões devem exibir toasts de sucesso apropriados e chamar `renderCompanyList()` após a ação.

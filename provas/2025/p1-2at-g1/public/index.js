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

// Array para armazenar as empresas
const companies = [];
// Exemplo de estrutura de um array com 2 empresas, e 3 transações cada:
// OBS: As empresas e transações são adicionadas/removidas usando a interface, não são fixas no código.
// const companies = [
//     { name: 'Empresa A', transactions: [100, -50, 200] },
//     { name: 'Empresa B', transactions: [-100, -200, 300] }
// ];

// Função para calcular o total de receitas de uma empresa
function getTotalRevenue() {
    // - Deve receber o índice de uma empresa no array companies
    // - Filtra apenas as transações positivas (receitas) da empresa
    // - Retorna a soma total das receitas
    showToast({
        message: 'Função getTotalRevenue() precisa ser implementada',
        type: 'info',
    });
}

// Função para calcular o total de despesas de uma empresa  
function getTotalExpense() {
    // - Deve receber o índice de uma empresa no array companies
    // - Filtra apenas as transações negativas (despesas) da empresa
    // - Retorna a soma total das despesas em valor absoluto (positivo)
    showToast({
        message: 'Função getTotalExpense() precisa ser implementada',
        type: 'info',
    });
}

// Função para calcular o saldo atual de uma empresa
function getBalance() {
    // - Deve receber o índice de uma empresa no array companies
    // - Retorna o saldo atual da empresa (soma de todas as transações)
    showToast({
        message: 'Função getBalance() precisa ser implementada',
        type: 'info',
    });
}

// Função para renderizar a lista de empresas no DOM
function renderCompanyList() {
    showToast({
        message: 'Função renderCompanyList() precisa ser implementada',
        type: 'info',
    });

    // - Capture o elemento com id companies-list
    // - Limpe o conteúdo atual do elemento
    // - Se não houver empresas, exiba: <p class="company-list-empty">Nenhuma empresa cadastrada.</p>
    
    // - Para cada empresa no array companies, crie um card com a estrutura:
    // <div class="card company-card">
    //     <div class="company-header">
    //         <h4>Nome da Empresa</h4>
    //         <p><strong>Turma:</strong> INF-2AT</p>
    //         <p class="company-students"><strong>Alunos:</strong> Fulano Silva, Ciclano dos Santos, Beltrano Oliveira</p>
    //         <div class="company-finances">
    //             <div class="finance-item">
    //                 <div>Receitas</div>
    //                 <div class="finance-value budget">R$ X.XX</div>
    //             </div>
    //             <div class="finance-item">
    //                 <div>Despesas</div>
    //                 <div class="finance-value expenses">R$ X.XX</div>
    //             </div>
    //             <div class="finance-item">
    //                 <div>Caixa</div>
    //                 <div class="finance-value profit">R$ X.XX</div>
    //             </div>
    //         </div>
    //         <div class="company-actions">
    //             <button class="revenue-button">Adicionar Receita</button>
    //             <button class="expense-button">Adicionar Despesa</button>
    //         </div>
    //     </div>
    //     <button class="delete-button">Excluir Empresa</button>
    // </div>

    // - Use as funções getTotalRevenue(), getTotalExpense() e getBalance() para calcular os valores
    // - O valor fixo das transações é R$ 100,00, ou seja, ao adicionar receita ou despesa, use este valor
    // - Adicione event listeners para os botões de receita, despesa e excluir
    // - Valide saldo suficiente antes de adicionar despesa
    // - Exiba toasts apropriados após cada ação
    // - chame renderCompanyList() para atualizar a interface após cada ação
}

// Função para criar uma nova empresa
function createCompany() {
    showToast({
        message: 'Função createCompany() precisa ser implementada',
        type: 'info',
    });

    // - Capture o valor do select com id company-class-select
    // - Capture o valor do input com id company-name
    // - Valide se uma turma foi selecionada, senão: showToast({ message: 'Por favor, selecione uma turma.', type: 'error' })
    // - Valide se um nome foi informado, senão: showToast({ message: 'Por favor, insira um nome para a empresa.', type: 'error' })
    // - Adicione nova empresa ao array companies com estrutura: { name: companyName, transactions: [] }
    // - Limpe os campos do formulário
    // - Exiba toast de sucesso
    // - Chame renderCompanyList() para atualizar a interface
}

// Crie um event listener para o botão de criar empresa
// que chama a função createCompany quando clicado

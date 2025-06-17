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
function getTotalRevenue(index) {
    const company = companies[index];
    let soma = 0;
    for (let i in company.transactions) {
        if (company.transactions[i] > 0) {
            soma += company.transactions[i];
        }
    }
    return soma;
}

// Função para calcular o total de despesas de uma empresa  
function getTotalExpense(index) {
    const company = companies[index];
    let soma = 0;
    for (let i in company.transactions) {
        if (company.transactions[i] < 0) {
            soma += company.transactions[i];
        }
    }
    return -soma;
}

// Função para calcular o saldo atual de uma empresa
function getBalance(index) {
    const company = companies[index];
    // const soma = 0;
    // for (let i in company.transactions) {
    //     soma += company.transactions[i];
    // }
    // return soma;
    const revenue = getTotalRevenue(index) - getTotalExpense(index);
    return revenue;
}

// const receitas = getTotalRevenue(1);
// const despesas = getTotalExpense(1);
// const saldo = getBalance(1);
// console.log(receitas, despesas, saldo);



// Função para renderizar a lista de empresas no DOM
function renderCompanyList() {
    // - Capture o elemento com id companies-list
    const companiesList = document.querySelector('#companies-list');

    // - Limpe o conteúdo atual do elemento
    companiesList.innerHTML = '';

    // - Se não houver empresas, exiba: <p class="company-list-empty">Nenhuma empresa cadastrada.</p>
    if (companies.length == 0) {
        companiesList.innerHTML = '<p class="company-list-empty">Nenhuma empresa cadastrada.</p>';
    }
    
    // - Para cada empresa no array companies, crie um card com a estrutura:

    companies.forEach((company, index) => {
        const card = document.createElement('div');
        card.classList.add('card', 'company-card');
        card.innerHTML = `
            <div class="company-header">
                <h4>${company.name}</h4>
                <p><strong>Turma:</strong> INF-2AT</p>
                <p class="company-students"><strong>Alunos:</strong> Fulano Silva, Ciclano dos Santos, Beltrano Oliveira</p>
                <div class="company-finances">
                    <div class="finance-item">
                        <div>Receitas</div>
                        <div class="finance-value budget">R$ ${getTotalRevenue(index)}</div>
                    </div>
                    <div class="finance-item">
                        <div>Despesas</div>
                        <div class="finance-value expenses">R$ ${getTotalExpense(index)}</div>
                    </div>
                    <div class="finance-item">
                        <div>Caixa</div>
                        <div class="finance-value profit">R$ ${getBalance(index)}</div>
                    </div>
                </div>
                <div class="company-actions">
                    <button class="revenue-button">Adicionar Receita</button>
                    <button class="expense-button">Adicionar Despesa</button>
                </div>
            </div>
            <button class="delete-button">Excluir Empresa</button>
        `;
        companiesList.append(card);

        const addRevenueBtn = card.querySelector('.revenue-button');
        addRevenueBtn.addEventListener('click', () => {
            company.transactions.push(100);
            renderCompanyList();
        });

        const addExpenseBtn = card.querySelector('.expense-button');
        addExpenseBtn.addEventListener('click', () => {
            if (getBalance(index) < 100) {
                showToast({ message: 'Saldo insuficiente.', type: 'error' });
                return;
            }
            
            company.transactions.push(-100);
            renderCompanyList();
        });

        const deleteCompanyBtn = card.querySelector('.delete-button');
        deleteCompanyBtn.addEventListener('click', () => {
            companies.splice(index, 1);
            showToast({ message: 'Empresa removida com sucesso.', type: 'success' });
            renderCompanyList();
        });
    });

    // - Use as funções getTotalRevenue(), getTotalExpense() e getBalance() para calcular os valores
    // - O valor fixo das transações é R$ 100,00, ou seja, ao adicionar receita ou despesa, use este valor
    // - Adicione event listeners para os botões de receita, despesa e excluir
    // - Valide saldo suficiente antes de adicionar despesa
    // - Exiba toasts apropriados após cada ação
    // - chame renderCompanyList() para atualizar a interface após cada ação
}

renderCompanyList();

// Função para criar uma nova empresa
function createCompany() {
    // - Capture o valor do select com id company-class-select
    // - Capture o valor do input com id company-name
    // - Valide se uma turma foi selecionada, senão: showToast({ message: 'Por favor, selecione uma turma.', type: 'error' })
    // - Valide se um nome foi informado, senão: showToast({ message: 'Por favor, insira um nome para a empresa.', type: 'error' })
    // - Adicione nova empresa ao array companies com estrutura: { name: companyName, transactions: [] }
    // - Limpe os campos do formulário
    // - Exiba toast de sucesso
    // - Chame renderCompanyList() para atualizar a interface

    const companySelect = document.querySelector('#company-class-select');
    const companyName = document.querySelector('#company-name');

    if (companySelect.value == '') {
        showToast({ message: 'Por favor, selecione uma turma.', type: 'error' });
        return;
    }
    if (companyName.value == '') {
        showToast({ message: 'Por favor, insira um nome para a empresa.', type: 'error' });
        return;
    }

    const company = {
        name: companyName.value,
        transactions: []
    }
    companies.push(company);

    companyName.value = '';
    companySelect.value = '';

    showToast({ message: 'Empresa criada com sucesso.', type: 'success' });
    renderCompanyList();

    console.log(companies);
}

// Crie um event listener para o botão de criar empresa
// que chama a função createCompany quando clicado

const createCompanyBtn = document.querySelector('#create-company-btn');
createCompanyBtn.addEventListener('click', () => {
    createCompany();
});
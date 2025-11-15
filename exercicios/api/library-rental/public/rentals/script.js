import showToast from "../components/toast.js";

const rentalsListContainer = document.querySelector('#rentalsList');
const filterButtons = document.querySelectorAll('.btn-filter');
const searchInput = document.querySelector('#searchInput');
const btnLogout = document.querySelector('#btnLogout');

let currentFilter = 'all';
let currentSearch = '';

// Função para carregar aluguéis
async function loadRentals(status = null, search = '') {
    try {
        let url = '../api/rentals/list.php?';
        const params = [];
        
        if (status && status !== 'all') {
            params.push(`status=${status}`);
        }
        
        if (search && search.trim() !== '') {
            params.push(`search=${encodeURIComponent(search)}`);
        }
        
        url += params.join('&');
        
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.error) {
            showToast(data.message, 'error');
            // Se não autenticado, redirecionar para login
            if (data.message.includes('autenticado')) {
                setTimeout(() => {
                    window.location.href = '../login';
                }, 1500);
            }
            return;
        }
        
        renderRentals(data.rentals);
        
    } catch (error) {
        showToast('Erro ao carregar aluguéis', 'error');
    }
}

// Função para renderizar aluguéis
function renderRentals(rentals) {
    rentalsListContainer.innerHTML = '';
    
    if (!rentals || rentals.length === 0) {
        rentalsListContainer.innerHTML = '<p class="no-rentals">Nenhum aluguel encontrado.</p>';
        return;
    }
    
    rentals.forEach(rental => {
        const rentalCard = document.createElement('div');
        rentalCard.className = 'rental-card';
        
        const statusLabels = {
            'active': 'Ativo',
            'returned': 'Devolvido',
            'overdue': 'Atrasado'
        };
        
        const rentalDate = new Date(rental.rental_date);
        const dueDate = new Date(rental.due_date);
        
        const formattedRentalDate = rentalDate.toLocaleDateString('pt-BR');
        const formattedDueDate = dueDate.toLocaleDateString('pt-BR');
        
        rentalCard.innerHTML = `
            <div class="rental-header">
                <div>
                    <h3 class="rental-book-title">${rental.book_title}</h3>
                    <p class="rental-author">por ${rental.author}</p>
                </div>
                <span class="rental-status status-${rental.status}">${statusLabels[rental.status]}</span>
            </div>
            <p class="rental-info"><strong>ISBN:</strong> ${rental.isbn}</p>
            <span class="rental-genre">${rental.genre}</span>
            <div class="rental-footer">
                <div class="rental-dates">
                    <div class="rental-date"><strong>Alugado em:</strong> ${formattedRentalDate}</div>
                    <div class="rental-date"><strong>Devolução:</strong> ${formattedDueDate}</div>
                </div>
                <div class="rental-actions">
                    <a href="../update-rental/?id=${rental.id}" class="btn btn-primary btn-small">Atualizar Status</a>
                </div>
            </div>
        `;
        
        rentalsListContainer.appendChild(rentalCard);
    });
}

// Event listeners para os filtros
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remover a classe active de todos os botões
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Adicionar a classe active ao botão clicado
        button.classList.add('active');
        
        const status = button.dataset.status;
        currentFilter = status;
        loadRentals(status === 'all' ? null : status, currentSearch);
    });
});

// Event listener para busca
let searchTimeout;
searchInput.addEventListener('input', (e) => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
        currentSearch = e.target.value;
        loadRentals(currentFilter === 'all' ? null : currentFilter, currentSearch);
    }, 500); // Espera 500ms após parar de digitar
});

// Logout
btnLogout.addEventListener('click', async () => {
    try {
        const response = await fetch('../api/auth/logout.php');
        const data = await response.json();
        
        showToast(data.message, 'success');
        
        setTimeout(() => {
            window.location.href = '../login';
        }, 1000);
        
    } catch (error) {
        showToast('Erro ao fazer logout', 'error');
    }
});

// Carregar aluguéis ao iniciar
loadRentals();

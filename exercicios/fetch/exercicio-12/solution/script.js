import showToast from "./components/toast.js";

let debounceTimer;

async function loadContacts() {
    const searchTerm = document.querySelector('#searchInput').value;
    const category = document.querySelector('#categoryFilter').value;
    
    // Build query string
    const params = new URLSearchParams();
    if (searchTerm) params.append('search', searchTerm);
    if (category) params.append('category', category);
    
    const queryString = params.toString();
    const url = queryString ? `/api/contact/list.php?${queryString}` : '/api/contact/list.php';
    
    try {
        const data = await fetch(url).then(res => res.json());
        
        if (data.error) {
            showToast(data.message, 'error');
            return;
        }
        
        renderContacts(data.contacts);
    } catch (error) {
        showToast('Erro ao carregar contatos', 'error');
    }
}

function renderContacts(contacts) {
    const container = document.querySelector('#contactsList');
    container.innerHTML = '';
    
    if (!contacts || contacts.length === 0) {
        container.innerHTML = '<p class="no-contacts">Nenhum contato encontrado.</p>';
        return;
    }
    
    contacts.forEach(contact => {
        const card = document.createElement('div');
        card.className = 'contact-card';
        card.innerHTML = `
            <div class="contact-header">
                <h3 class="contact-name">${contact.name}</h3>
                <span class="contact-category ${contact.category.toLowerCase()}">${contact.category}</span>
            </div>
            <div class="contact-info">
                <p class="contact-email">📧 ${contact.email}</p>
                <p class="contact-phone">📱 ${contact.phone}</p>
            </div>
        `;
        container.appendChild(card);
    });
}

// Search with debounce
document.querySelector('#searchInput').addEventListener('input', () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
        loadContacts();
    }, 300);
});

// Category filter
document.querySelector('#categoryFilter').addEventListener('change', loadContacts);

// Load contacts on page load
loadContacts();

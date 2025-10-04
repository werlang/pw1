import showToast from "./components/toast.js";

// TODO: Implemente a funcionalidade de listar e buscar contatos

let debounceTimer;

async function loadContacts() {
    // TODO: Obter valores dos campos de busca e filtro
    // Dica: Use document.querySelector('#searchInput').value
    // Dica: Use document.querySelector('#categoryFilter').value
    
    // TODO: Construir query string com URLSearchParams
    // Dica: Adicione 'search' e 'category' apenas se tiverem valor
    
    // TODO: Fazer requisição para /api/contact/list.php com parâmetros
    // Dica: Use fetch com GET
    
    // TODO: Verificar se há erro na resposta
    
    // TODO: Chamar renderContacts com os dados recebidos
}

function renderContacts(contacts) {
    // TODO: Obter container #contactsList
    // TODO: Limpar conteúdo do container
    
    // TODO: Se não houver contatos, exibir mensagem
    // Dica: Use <p class="no-contacts">Nenhum contato encontrado.</p>
    
    // TODO: Para cada contato, criar um card com:
    // - contact-card (div principal)
    // - contact-header (nome + categoria)
    // - contact-info (email + telefone)
    // Dica: Use innerHTML com template string
}

// TODO: Adicionar evento 'input' no #searchInput
// Dica: Use setTimeout com clearTimeout para debounce (300ms)

// TODO: Adicionar evento 'change' no #categoryFilter

// TODO: Carregar contatos ao iniciar a página


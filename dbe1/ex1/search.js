const form = document.querySelector('form');
const searchInput = document.querySelector('#product-name');
const table = document.querySelector('#results-table');

searchInput.addEventListener('input', async event => {
    const searchQuery = searchInput.value.trim();
    // if (searchQuery.length < 3) {
    //     return;
    // }

    const url = `search.php?product=${encodeURIComponent(searchQuery)}`;
    const data = await fetch(url).then(res => res.json());
    console.log(data);

    if (data.error) {
        // Show error toast
        addToast(data.message, 'error');
        return;
    }

    // Clear table
    table.innerHTML = '';

    // Add table rows
    data.products.forEach(product => {
        const row = document.createElement('tr');
        const nameCell = document.createElement('td');
        nameCell.textContent = product.name;
        const descriptionCell = document.createElement('td');
        descriptionCell.textContent = product.description;
        const priceCell = document.createElement('td');
        priceCell.textContent = product.price;
        row.appendChild(nameCell);
        row.appendChild(descriptionCell);
        row.appendChild(priceCell);
        table.appendChild(row);
    });

    // Show success toast
    addToast(data.message, 'success');
});

function addToast(message, type) {
    // Remove all current toasts
    const currentToasts = document.querySelectorAll('.toast');
    currentToasts.forEach(toast => toast.remove());

    // Create and show new toast
    const toast = document.createElement('div');
    toast.classList.add('toast', type);
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

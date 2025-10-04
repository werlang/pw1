import showToast from "./components/toast.js";

const productForm = document.querySelector('#productForm');
productForm.addEventListener('submit', async event => {
    event.preventDefault();
    const fd = new FormData(productForm);

    const data = await fetch('/api/product/add.php', {
        method: 'POST',
        body: fd
    }).then(res => res.json());

    if (data.error) {
        showToast(data.message, 'error');
        return;
    }

    showToast('Produto adicionado com sucesso!', 'success');
    productForm.reset();
});

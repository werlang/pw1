import showToast from "./components/toast.js";

const eventForm = document.querySelector('#eventForm');

// TODO: Implemente aqui
// 1. Adicione event listener no submit do formulário
// 2. Valide se a data não está no passado
// 3. Envie POST para /api/event/add.php com FormData
// 4. Exiba mensagem de sucesso ou erro

// Dica para validar data:
// const today = new Date().toISOString().split('T')[0];
// if (dateInput.value < today) { showToast('Data inválida', 'error'); }

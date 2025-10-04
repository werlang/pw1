import showToast from "./components/toast.js";

const emailsBody = document.querySelector('#emailsBody');
const markReadBtn = document.querySelector('#markReadBtn');
const selectAllCheckbox = document.querySelector('#selectAll');

// TODO: Implemente aqui
// 1. Crie loadEmails() para carregar e-mails não lidos de /api/email/list.php
// 2. Adicione checkboxes em cada linha
// 3. Implemente "Selecionar Todos"
// 4. Ao clicar no botão "Marcar como Lidos":
//    - Colete IDs dos e-mails marcados
//    - Faça GET para /api/email/mark-read.php?ids=1,2,3
//    - Recarregue a lista

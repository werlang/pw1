import showToast from "./components/toast.js";

const profileForm = document.querySelector('#profileForm');
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const bioInput = document.querySelector('#bio');

// TODO: Implemente aqui
// 1. Crie uma função loadUser() que:
//    - Faz GET para /api/user/get.php?id=1
//    - Preenche os campos do formulário com os dados retornados
//    - Exemplo: nameInput.value = data.user.name
//
// 2. Adicione event listener no submit do formulário
//    - Previna o comportamento padrão
//    - Crie um objeto com os dados: { id, name, email, bio }
//    - Faça PUT para /api/user/update.php
//    - Use JSON.stringify() para converter o objeto
//    - Adicione header: 'Content-Type': 'application/json'
//    - Exiba mensagem de sucesso
//
// 3. Chame loadUser() quando a página carregar

// Exemplo de requisição PUT com JSON:
// const data = { id: 1, name: 'João', email: 'joao@email.com', bio: 'Dev' };
// fetch('/api/user/update.php', {
//     method: 'PUT',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(data)
// })

// loadUser();

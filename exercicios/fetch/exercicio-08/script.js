import showToast from "./components/toast.js";

const searchInput = document.querySelector('#searchInput');
const recipesContainer = document.querySelector('#recipesContainer');

// TODO: Implemente aqui
// 1. Adicione event listener no input (evento 'input')
// 2. Ao digitar, faça GET para /api/recipe/search.php?ingredient=X
// 3. Exiba as receitas encontradas em cards
// BÔNUS: Implemente debounce para não fazer requisição a cada tecla

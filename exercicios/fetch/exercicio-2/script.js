import showToast from "./components/toast.js";

const productsBody = document.querySelector('#productsBody');
const filterButtons = document.querySelectorAll('.btn-filter');

// TODO: Implemente aqui
// 1. Crie uma função loadProducts(category = '') que:
//    - Faz uma requisição GET para /api/product/list.php
//    - Se category for informada, adicione ?category=categoria na URL
//    - Processa a resposta JSON
//    - Preenche a tabela com os produtos retornados
//    - Se não houver produtos, exiba "Nenhum produto encontrado"
//
// 2. Adicione event listeners nos botões de filtro
//    - Ao clicar, pegue o data-category do botão
//    - Chame loadProducts() com a categoria
//    - Adicione classe 'active' no botão clicado
//
// 3. Chame loadProducts() quando a página carregar

// Estrutura da linha da tabela (exemplo):
// <tr>
//     <td>${product.id}</td>
//     <td>${product.name}</td>
//     <td>${product.category}</td>
//     <td>R$ ${product.price.toFixed(2)}</td>
//     <td>${product.stock}</td>
// </tr>

// Carrega todos os produtos ao iniciar
// loadProducts();

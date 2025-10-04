import showToast from "./components/toast.js";

const postsContainer = document.querySelector('#postsContainer');

// TODO: Implemente aqui
// 1. Crie loadPosts() para GET /api/post/list.php
// 2. Exiba posts com botão de curtir
// 3. Ao clicar no botão:
//    - Envie POST para /api/post/toggle-like.php
//    - Body: FormData com post_id e action ('like' ou 'unlike')
//    - Atualize o botão e contador baseado na resposta (liked, likes)

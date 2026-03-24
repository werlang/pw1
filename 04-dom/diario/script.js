const inputPost = document.querySelector('#input-postagem');
const buttonPublish = document.querySelector('#btn-publicar');
const buttonClearPosts = document.querySelector('#btn-limpar');
const postMessage = document.querySelector('#mensagem');
const postsList = document.querySelector('#lista-postagens');

const posts = [];

function renderPosts() {
  postsList.innerHTML = '';

  posts.forEach(function(post) {
    postsList.append(createPostCard(post));
  });
}

function createPostCard(post) {
  const article = document.createElement('article');
  const content = document.createElement('p');
  const time = document.createElement('small');
  const actions = document.createElement('div');
  const editButton = document.createElement('button');
  const deleteButton = document.createElement('button');

  article.classList.add('postagem');
  actions.classList.add('acoes-card');
  deleteButton.classList.add('secundario');

  content.textContent = post.texto;
  time.textContent = `Atualizado em ${post.data}`;
  editButton.textContent = 'Editar';
  deleteButton.textContent = 'Remover';

  editButton.addEventListener('click', function() {
    const newText = window.prompt('Edite o texto da postagem:', post.texto);

    if (newText === null) {
      return;
    }

    const trimmedText = newText.trim();

    if (trimmedText === '') {
      postMessage.textContent = 'A postagem não pode ficar vazia.';
      return;
    }

    post.texto = trimmedText;
    post.data = new Date().toLocaleString('pt-BR');
    postMessage.textContent = 'Postagem editada com sucesso.';
    renderPosts();
  });

  deleteButton.addEventListener('click', function() {
    const position = posts.findIndex(function(item) {
      return item.id === post.id;
    });

    posts.splice(position, 1);
    postMessage.textContent = 'Postagem removida.';
    renderPosts();
  });

  actions.append(editButton, deleteButton);
  article.append(content, time, actions);
  return article;
}

buttonPublish.addEventListener('click', function() {
  const text = inputPost.value.trim();

  if (text === '') {
    postMessage.textContent = 'Digite uma postagem antes de publicar.';
    inputPost.focus();
    return;
  }

  posts.unshift({
    id: Date.now(),
    texto: text,
    data: new Date().toLocaleString('pt-BR')
  });

  postMessage.textContent = 'Postagem publicada com sucesso.';
  inputPost.value = '';
  inputPost.focus();
  renderPosts();
});

buttonClearPosts.addEventListener('click', function() {
  posts.length = 0;
  postMessage.textContent = 'Todas as postagens foram removidas.';
  renderPosts();
});
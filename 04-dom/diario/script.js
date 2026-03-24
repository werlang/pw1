const inputPost = document.querySelector('#input-postagem');
const buttonPublish = document.querySelector('#btn-publicar');
const buttonClearPosts = document.querySelector('#btn-limpar');
const postMessage = document.querySelector('#mensagem');
const postsList = document.querySelector('#lista-postagens');

function createPostCard(text, dateText) {
  const article = document.createElement('article');
  const content = document.createElement('p');
  const time = document.createElement('small');
  const actions = document.createElement('div');
  const editButton = document.createElement('button');
  const deleteButton = document.createElement('button');

  article.classList.add('postagem');
  actions.classList.add('acoes-card');
  deleteButton.classList.add('secundario');

  content.textContent = text;
  time.textContent = `Atualizado em ${dateText}`;
  editButton.textContent = 'Editar';
  deleteButton.textContent = 'Remover';

  editButton.addEventListener('click', function() {
    const newText = window.prompt('Edite o texto da postagem:', content.textContent);

    if (newText === null) {
      return;
    }

    const trimmedText = newText.trim();

    if (trimmedText === '') {
      postMessage.textContent = 'A postagem não pode ficar vazia.';
      return;
    }

    content.textContent = trimmedText;
    time.textContent = `Atualizado em ${new Date().toLocaleString('pt-BR')}`;
    postMessage.textContent = 'Postagem editada com sucesso.';
  });

  deleteButton.addEventListener('click', function() {
    article.remove();
    postMessage.textContent = 'Postagem removida.';
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

  const dateText = new Date().toLocaleString('pt-BR');
  const postCard = createPostCard(text, dateText);

  postsList.prepend(postCard);
  postMessage.textContent = 'Postagem publicada com sucesso.';
  inputPost.value = '';
  inputPost.focus();
});

buttonClearPosts.addEventListener('click', function() {
  postsList.innerHTML = '';
  postMessage.textContent = 'Todas as postagens foram removidas.';
});
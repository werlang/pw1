const mensagem = document.querySelector('#status'); 
const itensLista = document.querySelectorAll('.item-tarefa');
for (let i = 0; i < itensLista.length; i++) {
  const item = itensLista[i];
  item.addEventListener('click', function() {
    item.remove();
    mensagem.textContent = `Tarefa "${item.textContent}" removida!`;
  });
}
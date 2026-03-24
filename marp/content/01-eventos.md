---
marp: true
theme: ifsul
header: ' '
footer: 'Instituto Federal Sul-rio-grandense | Campus Charqueadas'
---

<!-- _class: lead -->

# Programacao Web I
## Eventos em JavaScript

Prof. Pablo Werlang
pablowerlang@ifsul.edu.br

---

# Eventos em JavaScript
## O que é um evento?

<div class="grid grid-cols-3 h-full">
<div class="media flex h-full">
  <img class="h-full" src="/marp/assets/01-events.png">
</div>
<div class="col-span-2 flex items-center h-full">

- O navegador detecta interacoes e avisa o codigo
- JavaScript reage no momento certo
- Eventos sao a base de interfaces interativas
- Hoje: clique, teclado, formularios e fluxo do DOM

</div>
</div>



---

# Eventos em JavaScript
## Roteiro da Aula

- O que é um evento
- Como registrar os _listeners_
- O que vem no objeto `event`
- Tipos mais comuns e quando usar
- `preventDefault()` e `stopPropagation()`
- Exercícios

---

<!-- _class: divider -->

# Conceito Base

---

# Eventos em JavaScript
## Definição

### O Que é um Evento?

<div class="grid grid-cols-3">
<div class="col-span-2">

- Um acontecimento detectado pelo navegador
- Pode vir do usuário, da página ou da janela
- O código não fica rodando "sem motivo"
- Ele executa uma resposta quando algo acontece

Exemplos: `click`, `keydown`, `input`, `submit`, `load`

</div>

<div>
<div class="media ml-auto">
  <img src="/marp/assets/01-listening.png">
</div>
</div>

---

# Eventos em JavaScript
## Fluxo Mental

1. Selecionar o elemento
2. Escolher o tipo do evento
3. Definir a função tratadora
4. Registrar com `addEventListener()`

```js
const botao = document.querySelector('button');

function clicar() {
  botao.textContent = 'Fui clicado';
}

botao.addEventListener('click', clicar);
```

---

# Eventos em JavaScript
## Criando Tratadores de Evento

- `addEventListener()`:  Forma recomendada para associar eventos
- **Função nomeada: quando for reutilizar**

```js
elemento1.addEventListener('nomeDoEvento', funcao);
elemento2.addEventListener('nomeDoEvento', funcao);

function funcao() {
  // logica a ser executada quando o evento acontecer
}
```

---

# Eventos em JavaScript
## Função anônima e Arrow Function

- `addEventListener()`:  Forma recomendada para associar eventos

<div class="grid grid-cols-2">
<div>

- **Função anônima: lógica curta**

```js
// Funcao anonima
botao.addEventListener('click', function() {
  botao.textContent = 'Fui clicado';
});
```

</div>
<div>

- **Arrow function: sintaxe mais curta**

```js
// Arrow function
botao.addEventListener('click', () => {
  botao.textContent = 'Fui clicado';
});
```

</div>
</div>

<div class="media mx-auto">
    <!-- Imagem sugerida: comparação visual entre função nomeada, função anônima e arrow function -->
</div>

---

# Eventos em JavaScript
## O Objeto `event`

- Traz informações sobre o acontecimento
- Permite inspecionar origem, tipo e dados da interação

```js
campo.addEventListener('input', (event) => {
  console.log(event.key);
});
```

- `event.target`: onde o evento aconteceu
- `event.currentTarget`: quem executa o tratador
- `event.type`: tipo do evento
- `event.key`: tecla pressionada
- `event.clientX`, `event.clientY`: coordenadas do mouse

---

<!-- _class: divider -->

# Tipos de Evento

---

# Eventos em JavaScript
## Categorias Mais Comuns

<div class="grid grid-cols-2">
<div>

**Mouse**

- `click`: clique simples
- `dblclick`: clique duplo
- `mouseenter`: mouse entra no elemento
- `mouseleave`: mouse sai do elemento

**Teclado**

- `keydown`: tecla pressionada
- `keyup`: tecla liberada

</div>
<div>

**Formulario**

- `input`: a cada alteracao
- `change`: ao concluir a alteracao
- `focus` / `blur`: foco e perda de foco
- `submit`: envio do formulario

**Pagina e janela**

- `DOMContentLoaded` / `load`: a página está pronta
- `resize`: janela redimensionada
- `scroll`: pagina é rolada

</div>
</div>

---

<!-- _class: divider -->

# Fluxo no DOM

---

# Eventos em JavaScript
## `target` x `currentTarget`

<div class="grid grid-cols-3">
<div class="col-span-2">

```html
<div id="card">
  <button id="botao">Clique</button>
</div>
```

```javascript
const card = document.querySelector('#card');
const botao = document.querySelector('#botao');
card.addEventListener('click', (event) => {
  console.log('target:', event.target.id);
  console.log('currentTarget:', event.currentTarget.id);
});
``` 

</div>
<div>

<div class="flex flex-col gap-8">
<div>

- `target`: elemento original do evento
- `currentTarget`: elemento com o tratador atual

</div>
<div>

Se a `div` tratar o clique do botao:

- `target` sera o `button`
- `currentTarget` sera a `div`

</div>

</div>
</div>

---

# Eventos em JavaScript
## Propagacao de Eventos

- No bubbling, o evento sobe do filho para os pais
- Um clique no botão pode chegar ao card
- Isso explica tratadores disparando em cadeia

<div class="grid grid-cols-2">
<div>

```js
card.addEventListener('click', () => {
  console.log('card');
});
botao.addEventListener('click', () => {
  console.log('botao');
});
```

</div>
<div>
  <div class="media flex">
      <img class="h-full" src="/marp/assets/01-propagation.webp">
  </div>
</div>
</div>

---

# Eventos em JavaScript
## `preventDefault()` x `stopPropagation()`

<div class="flex gap-8 h-full items-center">
<div>

**`preventDefault()`**

- Bloqueia a ação padrão do navegador
- Ex.: impedir envio do formulário
- Ex.: impedir navegação do link

<div class="media mx-auto">
    <!-- Imagem sugerida: animal impedindo o comportamento padrao de outro animal -->
</div>

</div>
<div>

**`stopPropagation()`**

- Impede que o evento continue subindo
- Afeta o fluxo entre elementos
- Use so quando houver necessidade clara

<div class="media mx-auto">
    <!-- Imagem sugerida: animal com um escudo bloqueando a propagacao do evento -->
</div>

</div>
</div>

---

<!-- _class: divider -->

# Exercícios

---

# Eventos em JavaScript
## Exercício: Clique básico

- Crie um jogo com 2 botões
- Use ids nos botões para selecionar no JS
- Selecione cada um com `document.querySelector('#id')`
- Quando o primeiro for clicado, adiciona 1 ponto
- Quando o segundo for clicado:
    - Remova 10 pontos
    - Pontos não podem ser negativos
- Exiba a pontuação atualizada no `textContent` do próprio botão
- [Veja um exemplo de como pode ficar](https://werlang.github.io/pw1/01-eventos/clique-basic/)

---

# Eventos em JavaScript
## Exercício: Clique com upgrade

- Crie um jogo com 2 botões
    - Parecido ao exercício anterior
- O primeiro botão quando clicado adiciona 1 ponto
- O segundo botão quando clicado:
    - Remove uma quantidade de pontos que aumenta a cada clique
    - Aumenta a produção de pontos do primeiro botão em 1 ponto a cada clique
    - Aumenta o custo da próxima melhoria
- Exiba a pontuação atualizada no `textContent` de um elemento separado
- [Veja um exemplo de como pode ficar](https://werlang.github.io/pw1/01-eventos/clique/)

---

# Eventos em JavaScript
## Exercício: Nave espacial

<div class="grid grid-cols-3">
<div class="col-span-2">

- Crie um jogo onde o usuário controla uma nave com as setas do teclado
- Use o evento `keydown` para detectar as teclas pressionadas:
    - `document.body.addEventListener('keydown', (event) => {...});`
    - `event.key` traz a tecla pressionada
- Atualize a posição da nave usando `style.left` e `style.top`
    - `nave.style.left = novaPosicaoX + 'px';`
- Use [esta imagem](https://werlang.github.io/pw1/01-eventos/spaceship/spaceship.png) para a nave
- [Veja um exemplo de como pode ficar](https://werlang.github.io/pw1/01-eventos/spaceship/)

</div>
<div>

<div class="media ml-auto">
    <img class="h-full" src="/marp/assets/01-spaceship.png">
</div>

</div>
</div>

---

# Eventos em JavaScript
## Exercício: Nave espacial

<div class="grid grid-cols-3">
<div class="col-span-2">

- **[Bônus]** Implemente limites para que a nave não saia da tela
- **[Bônus 2]** Adicione um plano de fundo estrelado que se move para dar a sensação de voo
- **[Bônus 3]** Use funções de tempo para criar um movimento mais fluido

</div>
<div>

<div class="media ml-auto">
    <!-- Imagem sugerida: nave espacial do exemplo -->
</div>

</div>
</div>
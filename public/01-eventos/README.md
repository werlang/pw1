# Programação Web I - Eventos

## O que são Eventos?

Na linguagem JavaScript, eventos são atividades desempenhadas pelo código quando um determinado gatilho ocorre. A programação orientada a eventos permite que a sua página responda a ações do usuário. Para estruturar um evento, é necessário compreender três etapas básicas:

* Determinar um ou mais elementos como alvo, que serão os responsáveis por engatilhar o evento.
* Escolher a atividade específica que irá acionar o evento (o gatilho).
* Definir uma função que será executada quando o evento disparar.

### Associando um Evento a um Elemento

A abordagem padrão e considerada melhor prática no desenvolvimento moderno para associar eventos é a utilização do método `addEventListener`. Observe o exemplo abaixo, no qual selecionamos um botão na página e alteramos seu texto ao ser clicado:

```javascript
// Seleciona o botão na página
const button = document.querySelector('button');

// Função que será executada
function myFunc() {
    button.textContent = 'Fui Clicado!';
}

// Associa o gatilho 'click' à função
button.addEventListener('click', myFunc);
```

## Estrutura de Funções em JavaScript

Ao desenvolver em JavaScript, é importante saber que existem múltiplas maneiras válidas de declarar uma função. A escolha geralmente depende do escopo e do padrão do projeto:

1. Modo Clássico: A declaração padrão e nominal.
2. Função Anônima: Uma função sem nome atribuída diretamente a uma variável.
3. Arrow Function: Uma sintaxe mais moderna, introduzida em versões recentes do JavaScript.

```javascript
// 1. Modo clássico
function myFunction(a,b) {
    return a + b;
}

// 2. Função anônima atribuída à variável
const myFunction = function(a,b) {
    return a + b;
}

// 3. Arrow function
const myFunction = (a,b) => {
    return a + b;
}
```

## Mapeamento dos Principais Eventos

Existem diversos gatilhos (eventos) que podem ser mapeados, categorizados pela forma como o usuário interage com o navegador.

1. **Eventos de Mouse**
   - `click`: Dispara exatamente quando o elemento alvo é clicado pelo usuário.
   - `mouseenter`: Dispara quando o ponteiro do mouse entra na área delimitada do elemento.
   - `mouseleave`: Dispara no momento em que o ponteiro do mouse sai da área delimitada do elemento.

2. **Eventos de Entrada e Formulários**
   - `input`: Dispara de forma contínua enquanto digitamos ou alteramos informações diretamente no elemento (como um campo de texto).
   - `change`: Dispara apenas quando o elemento perde o foco (por exemplo, ao clicar fora dele) e somente se o seu conteúdo tiver sido alterado.

3. **Eventos de Teclado**
   Os eventos de teclado dependem do foco do navegador ou do elemento:
   - `keydown`: Dispara imediatamente quando é detectado o pressionar de uma tecla, se o elemento possuir foco. Você pode inspecionar a propriedade `event.key` para descobrir exatamente qual tecla foi pressionada.
   - `keypress`: Dispara quando pressionamos uma tecla enquanto o elemento possui foco. Este evento segue disparando repetidamente enquanto não tirarmos o dedo da tecla.
   - `keyup`: Dispara quando o sistema deixa de detectar o pressionar da tecla, ou seja, ao soltar o botão.

**Observação técnica**: Se desejar capturar comandos de teclado independentemente de onde o usuário clicou, você pode aplicar o evento ao `document.body` (que seleciona a tag body da página). Dessa forma, você cria um escutador global, em vez de atrelá-lo a um elemento específico.

## Manipulação Dinâmica de Estilo (CSS)

Além de controlar lógicas de interação, os eventos frequentemente disparam alterações visuais. Para mudar propriedades visuais via JavaScript, utilizamos a sintaxe `<object>.style`, que modifica diretamente as propriedades CSS do elemento.

Veja como alterar dimensões de uma imagem de maneira programática:

```javascript
const imagem = document.querySelector('img');

// Modificando as propriedades width e height do CSS
imagem.style.width = '200px';
imagem.style.height = '200px';
```
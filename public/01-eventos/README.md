# Programação Web I - Eventos

## O que são eventos?

Em JavaScript, um evento é um acontecimento detectado pelo navegador. Esse acontecimento pode ser causado pelo usuário, pela própria página ou pelo ciclo de vida do documento.

Exemplos comuns:

- clicar em um botão
- digitar em um campo de texto
- mover o mouse sobre um elemento
- enviar um formulário
- carregar a página

A programação orientada a eventos permite que o código reaja a esses acontecimentos no momento em que eles ocorrem.

## Estrutura básica de um evento

Para trabalhar com eventos, normalmente seguimos três passos:

1. selecionar o elemento que será observado
2. definir qual evento queremos escutar
3. criar a função que será executada quando o evento acontecer

Exemplo:

```javascript
const botao = document.querySelector('button');

function clicarNoBotao() {
    botao.textContent = 'Fui clicado';
}

botao.addEventListener('click', clicarNoBotao);
```

Nesse exemplo:

- `botao` é o alvo do evento
- `'click'` é o tipo do evento
- `clicarNoBotao` é a função executada quando o evento dispara

## `addEventListener()`

O método mais recomendado para associar eventos a elementos é `addEventListener()`.

Sintaxe geral:

```javascript
elemento.addEventListener('nomeDoEvento', funcao);
```

Exemplo com função anônima:

```javascript
const botao = document.querySelector('#btn-enviar');

botao.addEventListener('click', function() {
    console.log('Botão pressionado');
});
```

Exemplo com arrow function:

```javascript
const botao = document.querySelector('#btn-enviar');

botao.addEventListener('click', () => {
    console.log('Botão pressionado');
});
```

## Formas de declarar funções

Em eventos, qualquer função compatível pode ser usada como tratadora do evento.

### 1. Função declarada

```javascript
function somar(a, b) {
    return a + b;
}
```

### 2. Função anônima atribuída a variável

```javascript
const somar = function(a, b) {
    return a + b;
};
```

### 3. Arrow function

```javascript
const somar = (a, b) => {
    return a + b;
};
```

Para eventos, normalmente escolhemos:

- função nomeada quando a lógica será reutilizada
- função anônima ou arrow function quando a lógica for curta e local

## O objeto `event`

Sempre que um evento ocorre, o navegador pode fornecer um objeto com informações sobre ele. Esse objeto costuma ser chamado de `event`, mas o nome da variável pode ser outro.

Exemplo:

```javascript
const campo = document.querySelector('#nome');

campo.addEventListener('input', function(event) {
    console.log(event.target.value);
});
```

Algumas propriedades úteis:

- `event.target`: elemento onde o evento aconteceu
- `event.currentTarget`: elemento que possui o `addEventListener()` atual
- `event.type`: nome do evento
- `event.key`: tecla pressionada em eventos de teclado
- `event.clientX` e `event.clientY`: posição do mouse na janela

Exemplo com teclado:

```javascript
document.body.addEventListener('keydown', function(event) {
    console.log('Tecla pressionada:', event.key);
});
```

## Principais categorias de eventos

### 1. Eventos de mouse

São disparados quando o usuário interage com o mouse ou com o ponteiro.

- `click`: ocorre ao clicar no elemento
- `dblclick`: ocorre ao dar duplo clique
- `mousedown`: ocorre quando o botão do mouse é pressionado
- `mouseup`: ocorre quando o botão do mouse é solto
- `mouseenter`: ocorre quando o ponteiro entra no elemento
- `mouseleave`: ocorre quando o ponteiro sai do elemento
- `mousemove`: ocorre enquanto o ponteiro se move sobre a área observada

Exemplo:

```javascript
const caixa = document.querySelector('.caixa');

caixa.addEventListener('mouseenter', () => {
    caixa.style.backgroundColor = 'tomato';
});

caixa.addEventListener('mouseleave', () => {
    caixa.style.backgroundColor = 'steelblue';
});
```

### 2. Eventos de teclado

Esses eventos dependem do foco da página ou do elemento.

- `keydown`: dispara quando a tecla é pressionada
- `keyup`: dispara quando a tecla é solta

Observação importante: `keypress` existiu por muito tempo, mas hoje é considerado obsoleto em muitos contextos. Em exemplos novos, prefira `keydown` e `keyup`.

Exemplo:

```javascript
document.body.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        console.log('O usuário pressionou Enter');
    }
});
```

### 3. Eventos de formulário e entrada de dados

São muito usados com `input`, `textarea`, `select` e `form`.

- `input`: dispara sempre que o valor é alterado
- `change`: dispara quando a alteração é concluída
- `focus`: dispara quando o elemento recebe foco
- `blur`: dispara quando o elemento perde foco
- `submit`: dispara quando o formulário é enviado

Exemplo com `input`:

```javascript
const campoNome = document.querySelector('#nome');
const saida = document.querySelector('#saida');

campoNome.addEventListener('input', function(event) {
    saida.textContent = event.target.value;
});
```

Exemplo com `submit`:

```javascript
const formulario = document.querySelector('form');

formulario.addEventListener('submit', function(event) {
    event.preventDefault();
    console.log('Formulário interceptado pelo JavaScript');
});
```

### 4. Eventos da página e da janela

São úteis para detectar o carregamento do documento ou alterações na janela do navegador.

- `load`: ocorre quando a página termina de carregar
- `DOMContentLoaded`: ocorre quando o HTML foi carregado e convertido em DOM
- `resize`: ocorre quando a janela muda de tamanho
- `scroll`: ocorre quando a página é rolada

Exemplo:

```javascript
document.addEventListener('DOMContentLoaded', function() {
    console.log('O HTML foi carregado');
});
```

## `target` e `currentTarget`

Essas duas propriedades costumam gerar dúvida.

- `event.target`: elemento original que disparou o evento
- `event.currentTarget`: elemento onde o tratador atual foi registrado

Exemplo conceitual: se uma `div` contém um `button` e o clique é detectado na `div`, mas o usuário clicou no botão, então:

- `target` será o `button`
- `currentTarget` será a `div`

Isso é importante principalmente quando trabalhamos com propagação de eventos.

## Propagação de eventos

Quando um evento acontece, ele pode percorrer a árvore do DOM. Em termos práticos, o evento pode afetar não só o elemento clicado, mas também seus elementos ancestrais.

O comportamento mais comum no dia a dia é o bubbling, em que o evento sobe do elemento mais interno para os elementos externos.

Exemplo:

```html
<div id="card">
    <button id="botao">Clique</button>
</div>
```

```javascript
const card = document.querySelector('#card');
const botao = document.querySelector('#botao');

card.addEventListener('click', () => {
    console.log('Clique no card');
});

botao.addEventListener('click', () => {
    console.log('Clique no botão');
});
```

Ao clicar no botão, o evento primeiro atinge o botão e depois pode subir até a `div`.

Se for necessário interromper essa subida, podemos usar:

```javascript
event.stopPropagation();
```

Esse recurso deve ser usado com cuidado, porque pode dificultar a manutenção do código quando aplicado sem necessidade.

## `preventDefault()`

Alguns elementos possuem comportamentos padrão do navegador.

Exemplos:

- um link navega para outra página
- um formulário recarrega a página ao ser enviado
- uma caixa de seleção muda de estado ao ser clicada

Quando queremos impedir esse comportamento padrão, usamos `event.preventDefault()`.

Exemplo com link:

```javascript
const link = document.querySelector('a');

link.addEventListener('click', function(event) {
    event.preventDefault();
    console.log('A navegação foi bloqueada');
});
```

## Removendo eventos

Também é possível remover um escutador com `removeEventListener()`. Para isso, a função precisa estar armazenada em uma referência.

```javascript
const botao = document.querySelector('#btn-contador');

function exibirMensagem() {
    console.log('Clique detectado');
}

botao.addEventListener('click', exibirMensagem);
botao.removeEventListener('click', exibirMensagem);
```

Isso é útil quando queremos ativar ou desativar interações em momentos específicos da aplicação.

## Alterando CSS com eventos

Eventos frequentemente disparam mudanças visuais. Uma maneira simples de alterar o estilo é usar a propriedade `style`.

```javascript
const imagem = document.querySelector('img');

imagem.addEventListener('click', function() {
    imagem.style.width = '200px';
    imagem.style.height = '200px';
});
```

Apesar disso, em muitos casos é mais organizado adicionar ou remover classes CSS:

```javascript
const caixa = document.querySelector('.caixa');

caixa.addEventListener('click', function() {
    caixa.classList.toggle('ativa');
});
```

Essa abordagem costuma separar melhor comportamento e apresentação.

## Boas práticas

- prefira `addEventListener()` em vez de atributos HTML como `onclick`
- use nomes de funções claros quando a lógica não for trivial
- mantenha a lógica de cada evento pequena e objetiva
- use `preventDefault()` somente quando houver motivo real
- use `stopPropagation()` com critério
- prefira manipular classes CSS em vez de muitas alterações diretas em `style`
- escolha eventos coerentes com a necessidade do problema

## Resumo

Ao estudar eventos em JavaScript, é importante dominar estes pontos:

- como selecionar o elemento correto
- como registrar um evento com `addEventListener()`
- como usar o objeto `event`
- como distinguir `target` de `currentTarget`
- como impedir comportamentos padrão com `preventDefault()`
- como entender a propagação de eventos

Esses conceitos formam a base da interação em páginas web e serão reutilizados em formulários, menus, validações, animações e interfaces mais complexas.
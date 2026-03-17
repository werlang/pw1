# Programacao Web I - Eventos em JavaScript

## 1. O que este guia ensina

Este README funciona como um guia de referencia sobre eventos no JavaScript. O objetivo e entender como o navegador detecta interacoes e como o codigo reage a elas para atualizar a interface.

Ao final desta leitura, voce deve conseguir:

- identificar o que e um evento;
- registrar tratadores com `addEventListener()`;
- usar o objeto `event` de forma correta;
- escolher o tipo de evento adequado para cada situacao;
- distinguir `target` de `currentTarget`;
- entender `preventDefault()` e `stopPropagation()`;
- aplicar esses conceitos em exemplos como clique, teclado e formularios.

## 2. O que sao eventos

Em JavaScript, um evento e um acontecimento detectado pelo navegador. Esse acontecimento pode ser provocado pelo usuario, pelo carregamento do documento ou por mudancas no proprio ambiente da pagina.

Exemplos comuns:

- clicar em um botao;
- digitar em um campo;
- mover o mouse;
- enviar um formulario;
- carregar a pagina;
- redimensionar a janela.

A programacao orientada a eventos existe para que o codigo seja executado no momento em que algo acontece, em vez de rodar sem motivo o tempo todo.

## 3. Estrutura mental de um evento

Quase todo uso de eventos segue este fluxo:

1. selecionar o elemento que sera observado;
2. escolher qual acontecimento sera escutado;
3. definir a funcao que executara a resposta;
4. registrar essa funcao com `addEventListener()`.

Exemplo minimo:

```js
const botao = document.querySelector('button');

function clicarNoBotao() {
    botao.textContent = 'Fui clicado';
}

botao.addEventListener('click', clicarNoBotao);
```

Neste exemplo:

- `botao` e o elemento observado;
- `click` e o tipo do evento;
- `clicarNoBotao` e a funcao tratadora;
- `addEventListener()` conecta o acontecimento a resposta.

## 4. `addEventListener()`

`addEventListener()` e a forma mais recomendada de associar eventos a elementos.

Sintaxe basica:

```js
elemento.addEventListener('nomeDoEvento', funcao);
```

Exemplo com funcao nomeada:

```js
const botao = document.querySelector('#btn-enviar');

function exibirMensagem() {
    console.log('Botao pressionado');
}

botao.addEventListener('click', exibirMensagem);
```

Exemplo com funcao anonima:

```js
const botao = document.querySelector('#btn-enviar');

botao.addEventListener('click', function() {
    console.log('Botao pressionado');
});
```

Exemplo com arrow function:

```js
const botao = document.querySelector('#btn-enviar');

botao.addEventListener('click', () => {
    console.log('Botao pressionado');
});
```

### Quando usar cada forma

- funcao nomeada: quando a logica sera reutilizada ou removida depois;
- funcao anonima: quando a logica e curta e local;
- arrow function: quando voce quer uma sintaxe curta e nao precisa de uma referencia separada.

## 5. O objeto `event`

Quando um evento acontece, o navegador envia um objeto com informacoes sobre esse acontecimento. Esse objeto costuma ser chamado de `event`.

Exemplo:

```js
const campo = document.querySelector('#nome');

campo.addEventListener('input', function(event) {
    console.log(event.target.value);
});
```

Algumas propriedades importantes:

- `event.target`: elemento onde o evento aconteceu;
- `event.currentTarget`: elemento que possui o tratador atual;
- `event.type`: nome do evento;
- `event.key`: tecla pressionada;
- `event.clientX` e `event.clientY`: coordenadas do mouse na janela.

Exemplo com teclado:

```js
document.body.addEventListener('keydown', function(event) {
    console.log('Tecla pressionada:', event.key);
});
```

## 6. Principais categorias de eventos

### Eventos de mouse

Sao eventos disparados por interacao com mouse, trackpad ou ponteiro.

- `click`;
- `dblclick`;
- `mousedown`;
- `mouseup`;
- `mouseenter`;
- `mouseleave`;
- `mousemove`.

Exemplo:

```js
const caixa = document.querySelector('.caixa');

caixa.addEventListener('mouseenter', function() {
    caixa.classList.add('ativa');
});

caixa.addEventListener('mouseleave', function() {
    caixa.classList.remove('ativa');
});
```

Esse tipo de padrao aparece em efeitos visuais, menus e estados de destaque.

### Eventos de teclado

Esses eventos dependem do foco do documento ou do elemento correto.

- `keydown`: dispara quando a tecla e pressionada;
- `keyup`: dispara quando a tecla e solta.

`keypress` existiu por muito tempo, mas hoje e considerado obsoleto para varios cenarios. Em exemplos novos, prefira `keydown` e `keyup`.

Exemplo:

```js
document.body.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        console.log('O usuario pressionou Enter');
    }
});
```

Na pasta `spaceship/`, esse tipo de evento aparece no controle de movimento por teclado.

### Eventos de formulario e entrada de dados

Sao comuns em `input`, `textarea`, `select` e `form`.

- `input`;
- `change`;
- `focus`;
- `blur`;
- `submit`.

Comparacao importante:

- `input` dispara a cada alteracao do valor;
- `change` dispara quando a alteracao e concluida.

Exemplo com `input`:

```js
const campoNome = document.querySelector('#nome');
const saida = document.querySelector('#saida');

campoNome.addEventListener('input', function(event) {
    saida.textContent = event.target.value;
});
```

Exemplo com `submit`:

```js
const formulario = document.querySelector('form');

formulario.addEventListener('submit', function(event) {
    event.preventDefault();
    console.log('Formulario interceptado pelo JavaScript');
});
```

### Eventos de pagina e janela

Sao uteis para observar o estado geral do documento ou da janela.

- `DOMContentLoaded`;
- `load`;
- `resize`;
- `scroll`.

Exemplo:

```js
document.addEventListener('DOMContentLoaded', function() {
    console.log('O HTML foi carregado');
});
```

Comparacao importante:

- `DOMContentLoaded`: dispara quando o HTML ja virou DOM;
- `load`: espera recursos adicionais, como imagens e outros arquivos.

## 7. `target` e `currentTarget`

Essa diferenca e central para entender a propagacao.

- `event.target`: elemento original onde o evento ocorreu;
- `event.currentTarget`: elemento que esta executando o tratador atual.

Exemplo conceitual:

```html
<div id="card">
    <button id="botao">Clique</button>
</div>
```

Se o clique do botao for tratado pela `div`, o `target` sera o botao e o `currentTarget` sera a `div`.

Isso faz diferenca quando voce quer saber exatamente em que ponto da arvore o evento comecou e em que ponto ele esta sendo tratado.

## 8. Propagacao de eventos

Quando um evento acontece, ele pode percorrer a arvore do DOM.

No uso mais comum da disciplina, o comportamento mais observado e o bubbling, em que o evento sobe do elemento mais interno para os elementos externos.

Exemplo:

```js
const card = document.querySelector('#card');
const botao = document.querySelector('#botao');

card.addEventListener('click', function() {
    console.log('Clique no card');
});

botao.addEventListener('click', function() {
    console.log('Clique no botao');
});
```

Ao clicar no botao, o clique pode atingir o botao e depois subir ate o card.

Para interromper essa subida:

```js
botao.addEventListener('click', function(event) {
    event.stopPropagation();
});
```

Use isso com criterio. Interromper propagacao sem necessidade pode tornar o comportamento da interface mais dificil de entender.

## 9. `preventDefault()`

Alguns elementos possuem comportamentos padrao do navegador.

Exemplos:

- links navegam para outra pagina;
- formularios enviam dados e podem recarregar a pagina;
- alguns controles possuem acoes automaticas de interface.

Quando queremos impedir esse comportamento padrao, usamos `event.preventDefault()`.

Exemplo:

```js
const link = document.querySelector('a');

link.addEventListener('click', function(event) {
    event.preventDefault();
    console.log('A navegacao foi bloqueada');
});
```

Regra pratica:

- use `preventDefault()` quando voce quiser substituir o comportamento do navegador por uma logica propria;
- nao use apenas por habito.

## 10. Removendo eventos

Tambem e possivel remover um evento com `removeEventListener()`.

Para isso, a funcao precisa existir como referencia reutilizavel.

```js
const botao = document.querySelector('#btn-contador');

function exibirMensagem() {
    console.log('Clique detectado');
}

botao.addEventListener('click', exibirMensagem);
botao.removeEventListener('click', exibirMensagem);
```

Isso e util quando uma interacao precisa ser ativada so em certos momentos.

## 11. Eventos e alteracao visual

Muitas vezes um evento existe para alterar a interface.

Voce pode fazer isso diretamente com `style`:

```js
const imagem = document.querySelector('img');

imagem.addEventListener('click', function() {
    imagem.style.width = '200px';
});
```

Mas, em geral, e mais organizado usar classes CSS:

```js
const caixa = document.querySelector('.caixa');

caixa.addEventListener('click', function() {
    caixa.classList.toggle('ativa');
});
```

Essa abordagem separa melhor comportamento e apresentacao.

## 12. Relacao com os exemplos desta pasta

As subpastas desta secao ajudam a enxergar os eventos em contextos diferentes:

- `clique-basic/`: clique simples para alterar pontuacao e estado;
- `clique/`: clique com evolucao de estado e logica de progressao;
- `spaceship/`: teclado para controlar movimento na tela.

Esses tres cenarios mostram que evento nao e so "clicar em botao". Ele e a base de praticamente toda interacao de interface.

## 13. Erros comuns de iniciantes

### Registrar o evento no elemento errado

Se voce seleciona o elemento errado, o evento pode nunca disparar.

### Esquecer o objeto `event` quando ele e necessario

Sem ele, voce nao consegue acessar propriedades como `target`, `key` ou chamar `preventDefault()`.

### Usar `preventDefault()` sem precisar

Isso pode bloquear comportamentos normais da interface sem motivo claro.

### Confundir `input` com `change`

Eles parecem parecidos, mas disparam em momentos diferentes.

### Usar `stopPropagation()` sem entender o fluxo

Isso pode quebrar interacoes de componentes maiores.

## 14. Boas praticas

- prefira `addEventListener()` em vez de atributos como `onclick`;
- use nomes claros para tratadores reutilizaveis;
- mantenha cada tratador pequeno e objetivo;
- escolha o evento mais adequado ao problema;
- use `preventDefault()` e `stopPropagation()` com justificativa;
- para alteracoes visuais frequentes, prefira classes CSS;
- teste o comportamento no navegador e observe o console.

## 15. Resumo final

Os pontos fundamentais sobre eventos sao:

- um evento e um acontecimento detectado pelo navegador;
- `addEventListener()` liga um elemento a uma resposta em JavaScript;
- o objeto `event` carrega dados importantes sobre a interacao;
- mouse, teclado, formulario e pagina sao categorias centrais;
- `target` e `currentTarget` nao significam a mesma coisa;
- `preventDefault()` impede comportamentos padrao;
- `stopPropagation()` interrompe a subida do evento;
- eventos sao a base das interfaces interativas desta disciplina.

Com esse repertorio, voce tera base suficiente para entender melhor DOM, formularios, validacoes e interfaces mais dinamicas.
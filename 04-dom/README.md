# Programação Web I - DOM com JavaScript

## 1. O que este guia ensina

Esta seção funciona como uma referência prática sobre DOM no JavaScript. Neste ponto da disciplina, você já viu eventos, arrays e objetos. Agora a ideia é juntar tudo isso para controlar a interface de forma consciente.

Ao final deste guia, você deve conseguir:

- entender o que é DOM e por que ele importa;
- localizar elementos com seletores claros;
- ler e alterar textos, valores, atributos e classes;
- criar, inserir e remover elementos dinamicamente;
- renderizar listas a partir de arrays e arrays de objetos;
- organizar pequenas interfaces baseadas em estado;
- evitar erros comuns de manipulação da página.

## 2. O que é DOM

DOM significa *Document Object Model*. Em termos práticos, é a estrutura de objetos que o navegador cria a partir do HTML.

Quando a página é carregada, o navegador transforma o documento em uma árvore. Cada tag vira um nó dessa árvore. O JavaScript não altera o HTML original em disco: ele altera essa representação em memória.

Exemplo:

```html
<body>
    <h1>Minha página</h1>
    <p>Olá, turma.</p>
</body>
```

Esse trecho vira uma estrutura parecida com:

- `document`
- `html`
- `body`
- `h1`
- `p`

É justamente essa árvore que o JavaScript consulta e modifica.

## 3. Relação com as seções anteriores

Até aqui, a disciplina já trabalhou três ideias importantes:

- eventos dizem *quando* algo acontece;
- arrays ajudam a guardar listas;
- objetos ajudam a representar entidades com propriedades.

O DOM entra como a camada visual dessas estruturas.

Fluxo mental comum:

1. o usuário interage com a página;
2. um evento dispara;
3. o JavaScript altera variáveis, arrays ou objetos;
4. a interface é atualizada no DOM.

Por isso, o DOM raramente aparece sozinho. Quase sempre ele conversa com eventos e dados.

## 4. Como acessar o DOM

O ponto de entrada mais comum é o objeto `document`.

```js
const titulo = document.querySelector('h1');
titulo.textContent = 'Novo título';
```

Nesse exemplo:

- `document` representa a página carregada;
- `querySelector('h1')` encontra o primeiro `h1`;
- `textContent` altera o texto visível.

## 5. Selecionando elementos

### `querySelector()`

É o método mais usado nesta disciplina porque aceita seletores CSS.

```js
const titulo = document.querySelector('h2');
const botao = document.querySelector('#btn-finalizar');
const card = document.querySelector('.card');
```

Regras importantes:

- se nada for encontrado, o retorno será `null`;
- se houver vários elementos compatíveis, apenas o primeiro será retornado.

### `querySelectorAll()`

Quando você precisa de vários elementos, use `querySelectorAll()`.

```js
const itens = document.querySelectorAll('.item');
```

O retorno é uma coleção de elementos, que pode ser percorrida com `for`, `for...of` ou `forEach()`.

```js
itens.forEach(function(item) {
    console.log(item.textContent);
});
```

### Quando usar cada um

- use `querySelector()` quando precisar de um elemento;
- use `querySelectorAll()` quando quiser trabalhar com uma lista de elementos.

## 6. Lendo e alterando conteúdo

### `textContent`

Use `textContent` para trabalhar com texto puro.

```js
const status = document.querySelector('#status');
status.textContent = 'Tarefa removida com sucesso.';
```

Se você passar uma string com tags HTML, elas aparecerão como texto.

```js
status.textContent = '<strong>Olá</strong>';
```

### `innerHTML`

Use `innerHTML` quando você realmente quiser inserir HTML.

```js
status.innerHTML = '<strong>Olá</strong>';
```

Regra prática:

- prefira `textContent` quando a intenção for mostrar texto;
- use `innerHTML` quando precisar montar estrutura HTML.

## 7. Propriedades e atributos importantes

Depois de selecionar um elemento, você pode ler ou alterar propriedades úteis como:

- `value` em campos de formulário;
- `checked` em checkbox e radio;
- `disabled` em botões e inputs;
- `src` em imagens;
- `href` em links.

Exemplo:

```js
const campoNome = document.querySelector('#nome');
const botao = document.querySelector('#salvar');

campoNome.value = 'Maria';
botao.disabled = true;
```

## 8. Classes CSS com `classList`

Em vez de trocar vários estilos em linha, prefira adicionar ou remover classes.

Métodos principais:

- `add()`;
- `remove()`;
- `toggle()`;
- `contains()`.

```js
const mensagem = document.querySelector('#status');

mensagem.classList.add('sucesso');

if (mensagem.classList.contains('sucesso')) {
    console.log('A classe foi aplicada.');
}
```

Essa abordagem separa melhor comportamento e aparência.

## 9. Criando elementos dinamicamente

### Com `innerHTML`

```js
const lista = document.querySelector('.lista-tarefas');
lista.innerHTML += '<li class="item-tarefa">Nova tarefa</li>';
```

### Com `createElement()`

```js
const lista = document.querySelector('.lista-tarefas');
const novoItem = document.createElement('li');

novoItem.textContent = 'Nova tarefa';
novoItem.classList.add('item-tarefa');

lista.append(novoItem);
```

Para iniciantes, `createElement()` costuma ser mais fácil de explicar, porque o elemento é montado passo a passo.

## 10. Removendo elementos

Para remover um elemento, use `remove()`.

```js
const aviso = document.querySelector('.aviso');

if (aviso) {
    aviso.remove();
}
```

A verificação evita erro quando o seletor não encontra nada.

## 11. DOM e arrays

Depois da seção de arrays, uma ideia importante é esta: o DOM geralmente exibe o que está em um array.

```js
const nomes = ['Ana', 'Bruno', 'Carla'];
const lista = document.querySelector('#lista');

lista.innerHTML = '';

nomes.forEach(function(nome) {
    lista.innerHTML += `<li>${nome}</li>`;
});
```

Aqui, o array guarda os dados e o DOM mostra esses dados na tela.

## 12. DOM e arrays de objetos

Depois da seção de objetos, a aplicação fica ainda mais parecida com um sistema real.

```js
const alunos = [
    { nome: 'Ana', nota: 8 },
    { nome: 'Bruno', nota: 6 }
];

const tabela = document.querySelector('#tabela');

tabela.innerHTML = '';

alunos.forEach(function(aluno) {
    tabela.innerHTML += `
        <tr>
            <td>${aluno.nome}</td>
            <td>${aluno.nota}</td>
        </tr>
    `;
});
```

Essa é uma das ideias centrais desta etapa da disciplina: o DOM se torna a camada de apresentação dos dados.

## 13. Quando o JavaScript pode manipular a página

O script precisa rodar depois que os elementos existem no documento. Por isso, nesta disciplina é comum usar:

```html
<script src="script.js" defer></script>
```

Assim o navegador monta o HTML e depois executa o JavaScript.

## 14. Erros comuns de iniciantes

### Selecionar um elemento inexistente

```js
const caixa = document.querySelector('#nao-existe');
caixa.textContent = 'Teste';
```

Esse código quebra porque `caixa` será `null`.

### Confundir `querySelector()` com `querySelectorAll()`

- um retorna um elemento;
- o outro retorna uma coleção.

### Usar `innerHTML` quando só precisava de texto

Isso aumenta o risco de erro na montagem da interface.

### Alterar visual demais pelo `style`

Se a mudança é recorrente, o melhor caminho costuma ser aplicar uma classe CSS.

### Atualizar a tela sem atualizar os dados

Se a interface mostra uma lista, mas o array continua desatualizado, o comportamento tende a ficar confuso.

## 15. Boas práticas

- guarde elementos importantes em variáveis com nomes claros;
- prefira seletores simples;
- verifique se o elemento existe antes de manipular;
- prefira `textContent` para texto;
- prefira `classList` para mudanças visuais;
- use funções de renderização quando a interface depende de arrays ou objetos.

## 16. Relação com as práticas desta pasta

As práticas desta seção estão organizadas para avançar do DOM mais direto até o DOM integrando dados:

- `diario/`: criação, edição e remoção de postagens com timestamp;
- `painel-preferencias/`: leitura de campos, classes CSS e atualização de atributos;
- `galeria-cards/`: criação e remoção de cards dinâmicos;
- `lista-tarefas/`: lista com marcação de concluído, remoção e atualização de status.

## 17. Resumo final

Os pontos centrais sobre DOM são:

- o navegador transforma o HTML em uma árvore de objetos;
- o JavaScript acessa essa árvore pelo `document`;
- `querySelector()` e `querySelectorAll()` localizam elementos;
- `textContent`, `innerHTML`, `value` e `checked` ajudam a ler e alterar conteúdo;
- `createElement()`, `append()` e `remove()` permitem montar interfaces dinâmicas;
- o DOM conversa o tempo todo com eventos, arrays e objetos.

Se você dominar esses pontos, começa a sair do “script solto” e passa a construir interfaces organizadas e explicáveis.
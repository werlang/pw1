# Programação Web I - DOM com JavaScript

## 1. O que este guia ensina

Esta seção funciona como uma referência sobre DOM no JavaScript. A ideia é entender como o navegador representa o HTML em memória e como o JavaScript pode consultar, alterar, criar, remover e reorganizar elementos da página.

Ao final, você deve conseguir:

- localizar elementos no documento;
- ler e alterar textos, atributos e valores;
- criar novos componentes dinamicamente;
- remover elementos com segurança;
- aplicar classes CSS via JavaScript;
- percorrer listas de elementos;
- evitar erros comuns de manipulação do DOM.

## 2. O que é DOM

DOM significa *Document Object Model*. Em termos práticos, é a representação em forma de árvore que o navegador cria a partir do HTML.

Quando a página é carregada, o navegador lê o arquivo HTML e monta uma estrutura de objetos. Cada tag vira um nó da árvore. A partir disso, o JavaScript pode acessar esses nós, inspecionar propriedades e modificar a interface em tempo real.

Exemplo de ideia mental:

```html
<body>
	<h1>Minha página</h1>
	<p>Olá, turma.</p>
</body>
```

Esse HTML não é tratado pelo navegador apenas como texto. Ele vira uma estrutura parecida com:

- `document`
- `html`
- `body`
- `h1`
- `p`

Essa árvore permite que o JavaScript faça operações como:

- trocar o texto de um título;
- esconder ou mostrar elementos;
- adicionar itens em uma lista;
- remover componentes da tela;
- responder a cliques, digitação e outras interações.

## 3. DOM, HTML, CSS e JavaScript

Uma forma simples de entender a separação de responsabilidades é esta:

- HTML define a estrutura;
- CSS define a aparência;
- JavaScript define o comportamento;
- DOM é a ponte que permite ao JavaScript agir sobre a estrutura e a aparência.

Por isso, quando o JavaScript altera uma propriedade de um elemento, o resultado aparece imediatamente no navegador.

## 4. Estrutura básica de acesso ao DOM

Normalmente, o primeiro passo é selecionar um elemento do documento e guardar essa referência em uma variável.

```js
const titulo = document.querySelector('h1');
titulo.textContent = 'Novo título';
```

Neste exemplo:

- `document` representa a página carregada;
- `querySelector('h1')` procura o primeiro `h1` da página;
- `textContent` troca o texto exibido pelo elemento.

## 5. Como selecionar elementos

### `querySelector()`

É o método mais usado neste repositório porque aceita seletores CSS.

Exemplos:

```js
const titulo = document.querySelector('h2');
const botao = document.querySelector('#btn-finalizar');
const item = document.querySelector('.item-tarefa');
```

Regras importantes:

- se nada for encontrado, o retorno será `null`;
- se houver vários elementos compatíveis, apenas o primeiro será retornado.

### `querySelectorAll()`

Quando você quer todos os elementos que atendem a um seletor, use `querySelectorAll()`.

```js
const itens = document.querySelectorAll('.item-tarefa');
```

O retorno é uma coleção de elementos. Essa coleção pode ser percorrida com `for`, `for...of` ou `forEach`.

```js
itens.forEach(function(item) {
	console.log(item.textContent);
});
```

### Quando usar cada um

- use `querySelector()` quando precisar de um único elemento;
- use `querySelectorAll()` quando precisar trabalhar com vários elementos ao mesmo tempo.

## 6. Nós, elementos e textos

Ao manipular o DOM, é comum ouvir a palavra nó. Um nó é uma parte da árvore do documento. Em aulas iniciais, o mais importante é diferenciar:

- elemento: uma tag HTML, como `div`, `p`, `button`;
- texto: o conteúdo textual dentro de um elemento;
- atributo: informações extras no elemento, como `id`, `class`, `src`, `href`.

Na prática, boa parte do trabalho desta disciplina envolve selecionar elementos e mudar suas propriedades.

## 7. Lendo e alterando conteúdo

### `textContent`

Use `textContent` quando a intenção for trabalhar com texto puro.

```js
const status = document.querySelector('#status');
status.textContent = 'Tarefa removida com sucesso.';
```

Se você passar uma string com tags HTML, elas serão exibidas como texto, não serão interpretadas.

```js
status.textContent = '<strong>Olá</strong>';
```

Resultado na tela: `<strong>Olá</strong>`

### `innerHTML`

Use `innerHTML` quando você realmente quiser inserir HTML dentro do elemento.

```js
status.innerHTML = '<strong>Olá</strong>';
```

Resultado na tela: o texto aparecerá em negrito, porque a tag será interpretada pelo navegador.

### Regra prática

- prefira `textContent` para textos simples;
- use `innerHTML` apenas quando for necessário montar HTML dinamicamente.

Essa preferência existe porque `textContent` é mais simples, mais previsível e evita vários erros de montagem de interface.

## 8. Atributos e propriedades importantes

Depois de selecionar um elemento, você pode acessar ou modificar várias propriedades úteis.

Exemplos frequentes:

- `id`: identificador do elemento;
- `value`: valor de campos de formulário;
- `checked`: estado de checkbox e radio;
- `disabled`: ativa ou desativa um campo ou botão;
- `src`: endereço de uma imagem;
- `href`: destino de um link.

Exemplo:

```js
const campoNome = document.querySelector('#nome');
const botao = document.querySelector('#salvar');

campoNome.value = 'Maria';
botao.disabled = true;
```

## 9. Classes CSS com `classList`

Em vez de alterar `style` muitas vezes no JavaScript, é melhor aplicar ou remover classes CSS. Isso mantém a lógica no JavaScript e a aparência no CSS.

Principais métodos de `classList`:

- `add()`: adiciona uma classe;
- `remove()`: remove uma classe;
- `toggle()`: adiciona se não existir e remove se já existir;
- `contains()`: verifica se a classe está aplicada.

Exemplo:

```js
const mensagem = document.querySelector('#status');

mensagem.classList.add('sucesso');

if (mensagem.classList.contains('sucesso')) {
	console.log('A classe foi aplicada.');
}
```

### `style` ainda existe, mas use com critério

É possível fazer isto:

```js
mensagem.style.color = 'red';
```

Funciona, mas para mudanças recorrentes de aparência o ideal é deixar a regra no CSS e apenas trocar classes no JavaScript.

## 10. Criando elementos dinamicamente

Existem duas formas comuns de colocar novos elementos na página.

### Opção 1: montar HTML com `innerHTML`

```js
const lista = document.querySelector('.lista-tarefas');
lista.innerHTML += '<li class="item-tarefa">Nova tarefa</li>';
```

Essa forma é curta, mas exige cuidado com a montagem da string.

### Opção 2: criar o elemento com `createElement()`

```js
const lista = document.querySelector('.lista-tarefas');
const novoItem = document.createElement('li');

novoItem.textContent = 'Nova tarefa';
novoItem.classList.add('item-tarefa');

lista.append(novoItem);
```

Essa abordagem costuma ser mais organizada para quem está aprendendo, porque o elemento é criado como objeto, configurado passo a passo e só depois inserido na tela.

### `append()`

O método `append()` adiciona um elemento ao final de outro elemento. Em geral, você cria o filho e o anexa ao elemento pai.

## 11. Removendo elementos

Para remover um elemento do DOM, use `remove()`.

```js
const aviso = document.querySelector('.aviso');

if (aviso) {
	aviso.remove();
}
```

A verificação é importante. Se `querySelector()` não encontrar nada, o retorno será `null`, e tentar chamar `.remove()` em `null` causará erro.

## 12. Trabalhando com listas de elementos

Ao usar `querySelectorAll()`, você normalmente precisará percorrer a coleção retornada.

Exemplo inspirado na atividade da pasta:

```js
const mensagem = document.querySelector('#status');
const itensLista = document.querySelectorAll('.item-tarefa');

for (let i = 0; i < itensLista.length; i++) {
	const item = itensLista[i];

	item.addEventListener('click', function() {
		item.remove();
		mensagem.textContent = `Tarefa "${item.textContent}" removida!`;
	});
}
```

O que esse código faz:

- seleciona a área de mensagem;
- seleciona todos os itens da lista;
- percorre cada item;
- adiciona um evento de clique em cada um;
- remove o item clicado;
- atualiza o texto de status.

Esse padrão é muito comum em interfaces com listas, tabelas, cards e menus.

## 13. Template strings

Template strings ajudam a montar textos dinâmicos com mais clareza.

```js
const nome = 'Ana';
const mensagem = `Bem-vinda, ${nome}!`;
```

Use aspas invertidas para escrever a string e `${variavel}` para interpolar valores.

Elas são especialmente úteis quando você precisa:

- montar mensagens de status;
- exibir valores digitados pelo usuário;
- criar trechos de HTML com dados variáveis.

## 14. Relação entre DOM e eventos

O DOM raramente é manipulado sozinho. Na prática, quase sempre há um evento disparando a alteração da interface.

Exemplos de eventos comuns:

- clique em botão;
- digitação em campo;
- envio de formulário;
- mudança em checkbox ou select.

Fluxo típico:

1. o usuário interage com a página;
2. o JavaScript captura o evento com `addEventListener()`;
3. o código seleciona elementos do DOM;
4. o conteúdo da interface é atualizado.

Exemplo:

```js
const botao = document.querySelector('#btn-finalizar');
const status = document.querySelector('#status');

botao.addEventListener('click', function() {
	status.textContent = 'Ação executada.';
});
```

## 15. Quando o JavaScript pode acessar o DOM

O script só consegue manipular elementos depois que o navegador já leu a parte correspondente do HTML.

Por isso, é comum usar:

- `<script src="script.js" defer></script>`;
- ou colocar a tag `<script>` ao final do `body`.

Na pasta desta seção, há exemplos usando `type="module"` com `defer`, o que permite carregar o script sem bloquear a montagem inicial da página.

## 16. Erros comuns de iniciantes

### 1. Tentar usar um elemento que não foi encontrado

```js
const caixa = document.querySelector('#nao-existe');
caixa.textContent = 'Teste';
```

Esse código quebra porque `caixa` será `null`.

Forma mais segura:

```js
const caixa = document.querySelector('#nao-existe');

if (caixa) {
	caixa.textContent = 'Teste';
}
```

### 2. Confundir `querySelector()` com `querySelectorAll()`

- `querySelector()` retorna um único elemento;
- `querySelectorAll()` retorna uma coleção.

### 3. Usar `innerHTML` quando só precisava trocar texto

Isso aumenta a chance de erro na montagem do conteúdo e dificulta a manutenção.

### 4. Misturar muita regra visual no JavaScript

Evite várias alterações de `style` em sequência quando uma classe CSS resolveria melhor.

### 5. Esquecer que elementos criados depois podem exigir novos eventos

Se você cria elementos dinamicamente, talvez também precise associar comportamento a eles.

## 17. Boas práticas para esta disciplina

- guarde elementos importantes em variáveis com nomes claros;
- prefira seletores simples e fáceis de entender;
- verifique se o elemento existe antes de manipular;
- use `textContent` para texto simples;
- use `classList` para mudanças visuais;
- crie elementos com `createElement()` quando quiser mais clareza;
- mantenha HTML, CSS e JavaScript em arquivos separados sempre que possível.

## 18. Exemplo completo e pequeno

```js
const botao = document.querySelector('#btn-finalizar');
const primeiraTarefa = document.querySelector('.item-tarefa');
const status = document.querySelector('#status');

botao.addEventListener('click', function() {
	if (primeiraTarefa) {
		status.textContent = `Tarefa "${primeiraTarefa.textContent}" removida.`;
		primeiraTarefa.remove();
	} else {
		status.textContent = 'Nenhuma tarefa encontrada.';
	}
});
```

Esse exemplo reúne vários pontos do guia:

- seleção de elementos;
- uso de evento;
- leitura de texto com `textContent`;
- remoção com `remove()`;
- atualização da interface de forma dinâmica.

## 19. Material desta pasta

Nesta seção, o foco é praticar manipulação de elementos no navegador. A subpasta `diario/` funciona como atividade prática para exercitar seleção, clique, remoção de itens e atualização de mensagens na tela.

Ao estudar, vale observar como a lógica do JavaScript conversa com a estrutura HTML e como pequenas mudanças no DOM já produzem interfaces interativas.

## 20. Resumo final

Os pontos centrais sobre DOM são:

- o navegador transforma o HTML em uma árvore de objetos;
- o JavaScript acessa essa árvore por meio do objeto `document`;
- `querySelector()` e `querySelectorAll()` são as principais portas de entrada para localizar elementos;
- `textContent`, `innerHTML`, `value` e outros atributos permitem atualizar o conteúdo da página;
- `createElement()`, `append()` e `remove()` permitem montar interfaces dinâmicas;
- `classList` é a forma mais organizada de alterar aparência com CSS;
- quase toda manipulação do DOM aparece junto com eventos do usuário.

Se você dominar esses pontos, terá a base necessária para construir páginas interativas com JavaScript vanilla.
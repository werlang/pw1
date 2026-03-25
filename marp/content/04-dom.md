---
marp: true
theme: ifsul
header: ' '
footer: 'Instituto Federal Sul-rio-grandense | Campus Charqueadas'
---

<!-- _class: lead -->

# Programação Web I
## DOM com JavaScript

Prof. Pablo Werlang
pablowerlang@ifsul.edu.br

---

# DOM com JavaScript
## Para que isso serve na prática?

- Fazer a página reagir sem recarregar tudo
- Atualizar textos, listas, cards, estados visuais e formulários
- Conectar eventos com arrays, objetos e interface
- Sair do HTML parado e entrar no HTML que conversa com o usuário

<div class="media mx-auto">
    <img src="../../marp/assets/04-dom.png" alt="Ilustração didática e levemente bem-humorada de um quadro de controle cheio de botões, cartões e etiquetas sendo reorganizados por uma mão invisível, representando o DOM sendo manipulado em tempo real, composição horizontal para slide educacional">
</div>

---

# DOM com JavaScript
## Roteiro da aula

- O que é DOM e como ele se relaciona com HTML
- Como selecionar elementos da página
- Leitura e alteração de texto, valores, atributos e classes
- Criação, inserção e remoção de elementos
- DOM como camada visual de arrays e objetos
- Erros comuns, boas práticas e exercícios da seção

---

<!-- _class: divider -->

# Conceito Base

---

# DOM com JavaScript
## O que é DOM?

```html
<body>
    <h1>Minha página</h1>
    <p>Olá, turma.</p>
</body>
```

- DOM significa `Document Object Model`
- O navegador transforma o HTML em uma árvore de objetos
- O JavaScript não altera o arquivo em disco: altera a página em memória
- Cada tag vira um nó que pode ser lido e modificado

---

# DOM com JavaScript
## Relação com as seções anteriores

<div class="grid grid-cols-2 gap-6 h-full">
<div>

1. O usuário interage com a página
2. Um evento dispara
    - Eventos dizem quando agir
3. O JavaScript altera variáveis, arrays ou objetos
    - Arrays e objetos guardam os dados
4. O DOM mostra o novo estado na tela
    - DOM entrega a parte visual

</div>
<div class="media flex h-full items-center justify-end">
    <img class="h-full" src="../../marp/assets/04-dom-relacao.png" alt="Diagrama de fluxo vertical explicando o 'Event-Driven JavaScript'. Demonstra a jornada desde o clique do usuário até a atualização da tela. O destaque final mostra a relação entre a 'DOM Tree' (com tags HTML) e a 'Browser Page', onde um novo item de tarefa aparece como resultado do processamento de dados.">
</div>
</div>


---

# DOM com JavaScript
## O ponto de entrada: `document`

```js
const titulo = document.querySelector('h1');
titulo.textContent = 'Novo título';
```

- `document` representa a página carregada
- A partir dele, você encontra e manipula elementos
- Na maioria das vezes, ele é a porta de entrada para o DOM

---

<!-- _class: divider -->

# Seleção e Leitura

---

# DOM com JavaScript
## `querySelector()` e `querySelectorAll()`

<div class="grid grid-cols-2 gap-6 h-full">
<div>

**`querySelector()`**

```js
const botao = document.querySelector('#btn-salvar');
const card = document.querySelector('.card');
```

- Retorna o **primeiro** elemento compatível
- Se não achar nada, retorna `null`

</div>
<div>

**`querySelectorAll()`**

```js
const itens = document.querySelectorAll('.item');

itens.forEach((item) => {
    console.log(item.textContent);
});
```

- Retorna uma **coleção de elementos**
- Funciona bem para listas e grupos

</div>
</div>

---

# DOM com JavaScript
## Seletores CSS que aparecem toda hora

```js
document.querySelector('#status');
document.querySelector('.card');
document.querySelector('button');
document.querySelector('nav a');
document.querySelector('ul > li');
document.querySelector('input[type="text"]');
```

<div class="flex">
<div class="grow">

- `#status` busca pelo `id`
- `.card` busca pela classe
- `button` busca pela tag

</div>
<div class="grow">

- `nav a` pega links dentro de `nav`
- `ul > li` pega `li` filho direto de `ul`
- `input[type="text"]` combina tag com atributo

</div>
</div>

---

# DOM com JavaScript
## Seleção a partir de um elemento

<div class="flex">
<div class="grow">

```js
function highlightCard(card) {
    const titulo = card.querySelector('h3');
    const botoes = card.querySelectorAll('button');
    titulo.textContent = 'Produto em destaque';
    botoes.forEach((botao) => {
        botao.disabled = true;
    });
}

const allCards = document.querySelectorAll('.card');
allCards.forEach((card) => {
    card.addEventListener('click', () => highlightCard(card));
});
```

</div>
<div class="grow">

- `document` não é o único ponto de partida
- `querySelector()` e `querySelectorAll()` funcionam a partir de qualquer elemento
- A busca acontece só dentro dele, como se ele virasse o _mini documento_ da vez
- Isso ajuda a **procurar a partir do pai** e evita seletores gigantes

</div>
</div>

---

# DOM com JavaScript
## `textContent` ou `innerHTML`?

<div class="grid grid-cols-2 gap-6 h-full">
<div>

**`textContent`**

```js
status.textContent = '<strong>Olá</strong>';
```

- Trata como **texto puro**
- É a escolha mais segura para mensagens e rótulos

</div>
<div>

**`innerHTML`**

```js
status.innerHTML = '<strong>Olá</strong>';
```

- Interpreta a string como **HTML**
- Útil quando a estrutura precisa ser montada por código

</div>
</div>

---

# DOM com JavaScript
## Valores, estados e atributos

```js
const campoNome = document.querySelector('#nome');
const destaque = document.querySelector('#destaque');
const botao = document.querySelector('#salvar');

console.log(campoNome.value);
console.log(destaque.checked);

botao.disabled = true;
```

- `value` lê ou altera campos de formulário
- `checked` indica o estado de checkbox e radio
- `disabled`, `src` e `href` também aparecem bastante

---

# DOM com JavaScript
## Classes com `classList`

```js
const mensagem = document.querySelector('#status');
mensagem.classList.add('sucesso');
mensagem.classList.remove('oculto');
mensagem.classList.toggle('destaque');
```

<div class="flex">
<div class="grow">

- `classList` é a forma mais prática de lidar com classes CSS
    - Melhor do que espalhar `style` pelo JavaScript
    - Ajuda a separar comportamento e aparência
- `add()` adiciona uma classe

</div>
<div class="grow">

- `remove()` tira uma classe
- `contains()` retorna `true` ou `false` se a classe estiver presente, útil para condições
- `toggle()` alterna a presença da classe (liga ou desliga)
    - Também pode receber um segundo argumento booleano para forçar um estado específico

</div>
</div>

---

<!-- _class: divider -->

# Criando Interface

---

# DOM com JavaScript
## Criando elementos dinamicamente

<div class="flex gap-2">
<div class="grow">

**Com `innerHTML`**

```js
lista.innerHTML += '<li class="item">Nova tarefa</li>';
```

- Mais rápido de escrever
- Bom para estrutura curta

</div>
<div class="grow">

**Com `createElement()`**

```js
const item = document.createElement('li');
item.textContent = 'Nova tarefa';
item.classList.add('item');
lista.append(item);
```

- Montagem passo a passo
- Mais didático para entender o processo

</div>
</div>

---

# DOM com JavaScript
## Template literals

<div class="flex gap-2 items-center">
<div class="grow">

```js

function newCard(nome, nota) {
    const card = `
        <div class="card">
            <h3>${nome}</h3>
            <p>Nota: ${nota}</p>
        </div>
    `;
    return card;
}

container.innerHTML += newCard('Ana', 8);
container.innerHTML += newCard('Bruno', 6);
```

</div>
<div class="grow">

- Template literals são strings entre crases (`` ` ``)
- Permitem interpolar variáveis com `${variavel}`
- Mantêm a formatação, mesmo com quebras de linha, o que facilita a construção de HTML complexo
- Facilitam a construção de HTML complexo a partir de dados

</div>
</div>

---

# DOM com JavaScript
## Inserindo e removendo

<div class="flex gap-2">
<div class="grow">

```js
function addAviso(texto) {
    const aviso = document.createElement('div');
    aviso.classList.add('aviso');
    aviso.textContent = texto;
    document.body.append(aviso);
}
function removeAviso() {
    const aviso = document.querySelector('.aviso');
    if (!aviso) return; // Evita erro se não existir
    aviso.remove();
}
```

</div>
<div class="grow">

- `append()` insere no final do elemento pai
- `remove()` tira o elemento da tela
- Verificar se o elemento existe evita erro na execução

</div>
</div>


---

# DOM com JavaScript
## DOM e arrays

```js
const nomes = ['Ana', 'Bruno', 'Carla'];
function renderizarLista() {
    const lista = document.querySelector('#lista');
    lista.innerHTML = ''; // Limpa a lista antes de renderizar
    nomes.forEach((nome) => {
        lista.innerHTML += `<li>${nome}</li>`;
    });
}
```

- O array guarda os dados
- O DOM mostra esses dados
- **Renderizar de novo** a partir da fonte de dados é uma prática comum para manter tudo sincronizado

---

# DOM com JavaScript
## DOM e arrays de objetos

<div class="flex gap-2">
<div class="grow">

```js
const alunos = [
    { nome: 'Ana', nota: 8 },
    { nome: 'Bruno', nota: 6 },
    { nome: 'Carla', nota: 9 },
];
```

- Aqui a interface vira camada de apresentação dos dados
- Esse é o ponto em que o JavaScript começa a parecer sistema de verdade


</div>
<div class="grow">

```js
function renderizarTabela() {
    const tabela = document.querySelector('#tabela');
    tabela.innerHTML = '';
    alunos.forEach((aluno) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${aluno.nome}</td>
            <td>${aluno.nota}</td>
        `;
        tabela.append(row);
    });
}
```

</div>
</div>

---

# DOM com JavaScript
## Erros comuns de iniciantes

<div class="grid grid-cols-2 gap-6 h-full">
<div>

**Elemento inexistente**

```js

const caixa = document.querySelector('#nao-existe');
caixa.textContent = 'Teste';
```

- Se o seletor não acha nada, vem `null`
- Tentar acessar `textContent` de `null` gera erro e para o script

</div>
<div>

**Confusões frequentes**

- Usar `innerHTML` quando só precisava de texto
- Atualizar a tela, mas esquecer de atualizar o array ou objeto de origem
- Esquecer de limpar a tela antes de renderizar de novo, causando **duplicação**
- Recriar elementos usando `innerHTML` e **perder eventos associados**
</div>
</div>

---

# DOM com JavaScript
## Boas práticas

- Guardar elementos importantes em variáveis com nomes claros
- Preferir seletores simples
- Conferir se o elemento existe antes de manipular
- Usar `textContent` para texto e `classList` para visual
- Criar função de renderização quando a tela depende de arrays ou objetos
- Usar `createElement()` e `append()` para estruturas mais complexas
    - Evita perder eventos quando a função de renderização é chamada várias vezes

---

<!-- _class: divider -->

# Exercícios

---

# DOM com JavaScript
## Exercício: Painel de preferências

- Ler nome, cor e destaque a partir do formulário
- Atualizar um objeto de preferências e refletir isso no card da página
- Treinar `value`, `checked`, `textContent` e `classList`
- Bom para mostrar que DOM nem sempre significa criar elementos do zero

- [Veja um exemplo de como pode ficar](https://werlang.github.io/pw1/04-dom/painel-preferencias/)

---

# DOM com JavaScript
## Exercício: Galeria de cards

- Criar cards a partir de objetos guardados em um array
- Renderizar a galeria com base nos dados atuais
- Remover cards e atualizar o contador visual
- Excelente para fixar `createElement()`, `append()` e renderização

- [Veja um exemplo de como pode ficar](https://werlang.github.io/pw1/04-dom/galeria-cards/)

---

# DOM com JavaScript
## Exercício: Lista de tarefas

- Cadastrar tarefas como objetos com texto e estado de conclusão
- Marcar como concluída, remover e recalcular pendências
- Fazer a classe visual refletir o estado real do array
- Aqui eventos, objetos, arrays e DOM finalmente sentam na mesma mesa

- [Veja um exemplo de como pode ficar](https://werlang.github.io/pw1/04-dom/lista-tarefas/)

---

# DOM com JavaScript
## Exercício: Diário virtual

- Publicar, editar e remover postagens a partir de um array de objetos
- Exibir cards com texto e data em formato local
- Limpar tudo e reconstruir a tela sempre a partir do estado atual
- É o exercício mais completo da seção e já tem cara de miniaplicação

- [Veja um exemplo de como pode ficar](https://werlang.github.io/pw1/04-dom/diario/)

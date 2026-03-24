# Programação Web I - Arrays em JavaScript

## 1. O que este guia ensina

Esta seção funciona como uma referência prática sobre arrays no JavaScript. A ideia é entender como armazenar vários valores em uma única estrutura, percorrer esses dados, buscar informações, transformar listas e usar arrays para controlar a interface de uma página.

Ao final deste guia, você deve conseguir:

- entender o que é um array e quando ele faz sentido;
- criar arrays com valores simples;
- acessar elementos por índice;
- adicionar, remover e substituir itens;
- percorrer arrays com `for`, `for...of` e `forEach()`;
- usar métodos como `push()`, `pop()`, `includes()`, `indexOf()`, `slice()`, `splice()`, `filter()`, `map()` e `reduce()`;
- aplicar arrays em cenários reais como listas e buscas.

## 2. O que é um array

Um array é uma estrutura que guarda vários valores em uma única variável.

Em vez de criar várias variáveis soltas:

```js
const nome1 = 'Ana';
const nome2 = 'Bruno';
const nome3 = 'Carla';
```

Você pode organizar tudo em uma lista:

```js
const nomes = ['Ana', 'Bruno', 'Carla'];
```

Isso facilita várias tarefas:

- percorrer todos os valores;
- buscar um item específico;
- adicionar novos dados sem criar novas variáveis;
- exibir uma lista na tela;
- fazer cálculos com coleções de números.

## 3. Estrutura mental de um array

Pense no array como uma sequência de posições.

```js
const frutas = ['maca', 'banana', 'uva'];
```

Nesse caso:

- `frutas[0]` vale `'maca'`;
- `frutas[1]` vale `'banana'`;
- `frutas[2]` vale `'uva'`.

O detalhe mais importante para iniciantes é este: arrays começam no índice `0`, não no índice `1`.

## 4. Criando arrays

### Array vazio

```js
const tarefas = [];
```

Esse padrão é comum quando a lista será preenchida depois.

### Array com strings

```js
const cidades = ['Porto Alegre', 'Pelotas', 'Charqueadas'];
```

### Array com números

```js
const notas = [7.5, 8.0, 6.5, 9.0];
```

### Array misto

O JavaScript permite misturar tipos, mas em exercícios e projetos iniciais isso costuma dificultar a leitura.

```js
const dados = ['Ana', 16, true];
```

Em geral, prefira arrays com dados do mesmo tipo. Objetos serão tratados em uma seção própria logo depois desta.

## 5. Acessando elementos

Para acessar um item, use colchetes com o índice.

```js
const cores = ['azul', 'verde', 'vermelho'];

console.log(cores[0]);
console.log(cores[2]);
```

Também é possível alterar um valor diretamente:

```js
const cores = ['azul', 'verde', 'vermelho'];
cores[1] = 'amarelo';
```

Depois disso, o array passa a ser:

```js
['azul', 'amarelo', 'vermelho']
```

## 6. `length`

A propriedade `length` informa quantos elementos o array possui.

```js
const alunos = ['Ana', 'Bruno', 'Carla'];
console.log(alunos.length);
```

Isso é muito útil para:

- contar itens;
- montar laços;
- verificar se a lista está vazia.

Exemplo de verificação:

```js
if (alunos.length === 0) {
    console.log('Nenhum aluno cadastrado.');
}
```

## 7. Adicionando e removendo itens

### `push()`

Adiciona um item no final do array.

```js
const compras = ['arroz', 'feijao'];
compras.push('leite');
```

Resultado:

```js
['arroz', 'feijao', 'leite']
```

### `pop()`

Remove o último item do array.

```js
const compras = ['arroz', 'feijao', 'leite'];
compras.pop();
```

Resultado:

```js
['arroz', 'feijao']
```

### `unshift()`

Adiciona um item no início do array.

```js
const fila = ['Bruno', 'Carla'];
fila.unshift('Ana');
```

### `shift()`

Remove o primeiro item.

```js
const fila = ['Ana', 'Bruno', 'Carla'];
fila.shift();
```

## 8. Buscando informações

### `includes()`

Verifica se um valor existe no array e retorna `true` ou `false`.

```js
const linguagens = ['HTML', 'CSS', 'JavaScript'];
console.log(linguagens.includes('CSS'));
```

### `indexOf()`

Retorna a posição do item encontrado. Se não encontrar, retorna `-1`.

```js
const linguagens = ['HTML', 'CSS', 'JavaScript'];
console.log(linguagens.indexOf('JavaScript'));
console.log(linguagens.indexOf('PHP'));
```

Regra prática:

- `includes()` responde se existe;
- `indexOf()` informa onde está.

## 9. Cortando e alterando partes do array

### `slice()`

Cria uma cópia de parte do array sem alterar o original.

```js
const numeros = [10, 20, 30, 40, 50];
const parte = numeros.slice(1, 4);
```

Resultado de `parte`:

```js
[20, 30, 40]
```

### `splice()`

Altera o array original. Ele pode remover, substituir ou inserir itens.

```js
const numeros = [10, 20, 30, 40, 50];
numeros.splice(2, 1);
```

Resultado:

```js
[10, 20, 40, 50]
```

Exemplo substituindo um item:

```js
const nomes = ['Ana', 'Bruno', 'Carla'];
nomes.splice(1, 1, 'Beatriz');
```

Resultado:

```js
['Ana', 'Beatriz', 'Carla']
```

## 10. Percorrendo arrays

### `for`

Bom quando você precisa do índice e quer controle total.

```js
const frutas = ['maca', 'banana', 'uva'];

for (let i = 0; i < frutas.length; i++) {
    console.log(i, frutas[i]);
}
```

### `for...of`

Mais simples quando você quer apenas os valores.

```js
const frutas = ['maca', 'banana', 'uva'];

for (const fruta of frutas) {
    console.log(fruta);
}
```

### `forEach()`

Muito usado para executar uma ação para cada item.

```js
const frutas = ['maca', 'banana', 'uva'];

frutas.forEach((fruta, indice) => {
    console.log(indice, fruta);
});
```

### Quando usar cada um

- `for`: quando o índice é importante ou quando você quer mais controle;
- `for...of`: quando o foco é só o valor;
- `forEach()`: quando você quer percorrer e executar uma tarefa para todos.

## 11. Transformando e filtrando dados

### `map()`

Cria um novo array transformando cada item do original.

```js
const notas = [6, 7, 8];
const notasDobro = notas.map((nota) => {
    return nota * 2;
});
```

Resultado:

```js
[12, 14, 16]
```

### `filter()`

Cria um novo array apenas com os itens que passam em uma condição.

```js
const notas = [6, 7, 8, 4, 9];
const aprovadas = notas.filter((nota) => {
    return nota >= 7;
});
```

Resultado:

```js
[7, 8, 9]
```

### `find()`

Retorna o primeiro item que atende à condição.

```js
const notas = [6, 7, 8, 4, 9];
const primeiraNotaAlta = notas.find((nota) => {
    return nota >= 8;
});
```

Resultado:

```js
8
```

## 12. Resumindo valores com `reduce()`

`reduce()` serve para condensar o array em um único resultado.

Exemplo somando números:

```js
const valores = [10, 20, 30];

const soma = valores.reduce((acumulador, valorAtual) => {
    return acumulador + valorAtual;
}, 0);

console.log(soma);
```

O valor inicial do acumulador, nesse caso, é `0`.

Esse método aparece muito para:

- somar valores;
- calcular média;
- contar itens em certas condições;
- montar textos a partir de uma lista.

## 13. Juntando valores com `join()`

`join()` transforma um array em string usando um separador.

```js
const nomes = ['Ana', 'Bruno', 'Carla'];
console.log(nomes.join(', '));
```

Resultado:

```js
Ana, Bruno, Carla
```

Isso é útil para mostrar listas no documento sem precisar criar muitos elementos HTML.

## 14. Relação com o DOM

Em projetos web, arrays quase sempre aparecem junto com o DOM.

Fluxo comum:

1. o usuário interage com a página;
2. o JavaScript adiciona ou altera dados no array;
3. uma funcao percorre o array;
4. a interface é atualizada com os valores atuais.

Exemplo simples:

```js
const nomes = [];
const lista = document.querySelector('#lista');

function renderizarLista() {
    lista.innerHTML = '';

    nomes.forEach(function(nome) {
        lista.innerHTML += `<li>${nome}</li>`;
    });
}
```

Essa ideia aparece em praticamente toda interface que mostra coleções de dados.

## 15. Erros comuns de iniciantes

### Esquecer que o índice começa em `0`

Esse é um dos erros mais frequentes nas primeiras aulas.

### Tentar acessar posições inexistentes

```js
const nomes = ['Ana', 'Bruno'];
console.log(nomes[5]);
```

Nesse caso, o retorno será `undefined`.

### Confundir `slice()` com `splice()`

- `slice()` copia parte do array;
- `splice()` altera o array original.

### Usar `map()` quando a intenção era só percorrer

Se você não quer gerar um novo array, `forEach()` costuma fazer mais sentido.

### Esquecer de converter números recebidos de `input`

Valores de campos HTML costumam chegar como string.

```js
const nota = Number(inputNota.value);
```

Sem essa conversão, operações numéricas podem se comportar de forma errada.

## 16. Boas praticas

- use nomes claros para os arrays, como `nomes`, `produtos`, `tarefas`;
- mantenha o array com uma responsabilidade clara;
- renderize a interface a partir do array, em vez de espalhar estado em várias variáveis;
- converta valores numéricos quando vierem de formulários;
- escolha o método de array pela intenção do código, não por moda.

## 17. Relação com as práticas desta pasta

As subpastas desta seção mostram arrays em níveis diferentes:

- `lista-basica/`: cadastro simples, exibição e contagem de itens;
- `busca-nomes/`: busca parcial, verificação exata e filtragem.

Esses dois cenários mostram uma progressão útil:

1. primeiro você aprende a guardar valores;
2. depois aprende a buscar e filtrar.

Na próxima seção, `03-objetos/`, o foco passa a ser representar entidades com propriedades e combinar isso com arrays.

## 18. Roteiro de estudo sugerido

Se este for seu primeiro contato sério com arrays, siga esta ordem:

1. crie um array vazio e use `push()`;
2. acesse itens por índice;
3. percorra com `for` e `forEach()`;
4. teste `includes()` e `indexOf()`;
5. filtre resultados com `filter()`;
6. conecte isso ao DOM;
7. depois avance para a seção de objetos.

## 19. Resumo final

Os pontos centrais sobre arrays são estes:

- arrays guardam vários valores em uma única estrutura;
- o índice do primeiro item é `0`;
- `length` informa o tamanho da lista;
- `push()` e `pop()` alteram o final do array;
- `includes()` e `indexOf()` ajudam na busca;
- `for`, `for...of` e `forEach()` percorrem a lista;
- `map()`, `filter()` e `reduce()` transformam e resumem dados;
- arrays e DOM aparecem juntos o tempo todo em interfaces dinâmicas.

Com esse repertório, você passa a ter uma base muito mais forte para formulários, DOM, fetch e qualquer página que trabalhe com coleções de dados.
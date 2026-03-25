# Programação Web I - Objetos em JavaScript

## 1. O que este guia ensina

Esta seção funciona como uma referência prática sobre objetos no JavaScript. O foco agora deixa de ser apenas listas de valores e passa a ser a representação de entidades com propriedades bem definidas.

Ao final deste guia, você deve conseguir:

- entender o que é um objeto e quando ele faz sentido;
- criar objetos com propriedades e valores;
- acessar, alterar, adicionar e remover propriedades;
- percorrer objetos quando necessário;
- usar objetos dentro de arrays;
- aplicar objetos em cenários reais como cadastros, boletins e listas de registros.

## 2. O que é um objeto

Um objeto é uma estrutura que agrupa informações relacionadas usando pares de chave e valor.

Exemplo:

```js
const aluno = {
    nome: 'Ana',
    nota: 8.5,
    turma: '2AT'
};
```

Nesse caso:

- `nome` é uma propriedade;
- `'Ana'` é o valor dessa propriedade;
- o mesmo vale para `nota` e `turma`.

Objetos são úteis quando um único valor já não basta.

## 3. Quando usar objeto em vez de array

Use array quando a ideia principal for uma lista de itens.

```js
const nomes = ['Ana', 'Bruno', 'Carla'];
```

Use objeto quando a ideia principal for descrever uma entidade com várias características.

```js
const aluno = {
    nome: 'Ana',
    nota: 8.5,
    cidade: 'Charqueadas'
};
```

Regra prática:

- array organiza coleções;
- objeto organiza atributos de uma entidade.

## 4. Criando objetos

### Objeto literal

```js
const produto = {
    nome: 'Caderno',
    preco: 18.9,
    estoque: 12
};
```

### Objeto vazio

```js
const usuario = {};
```

Depois, as propriedades podem ser adicionadas.

```js
usuario.nome = 'Marina';
usuario.idade = 17;
```

## 5. Acessando propriedades

### Notação com ponto

É a forma mais comum.

```js
const filme = {
    titulo: 'Wall-E',
    ano: 2008
};

console.log(filme.titulo);
```

### Notação com colchetes

Útil quando o nome da propriedade vem de uma variável.

```js
const filme = {
    titulo: 'Wall-E',
    ano: 2008
};

console.log(filme['ano']);
```

## 6. Alterando e adicionando propriedades

```js
const aluno = {
    nome: 'Ana',
    nota: 8
};

aluno.nota = 9;
aluno.cidade = 'São Jerônimo';
```

Depois disso, o objeto passa a ter a nova nota e também a nova propriedade `cidade`.

## 7. Removendo propriedades

Para remover uma propriedade, use `delete`.

```js
const aluno = {
    nome: 'Ana',
    nota: 8,
    cidade: 'São Jerônimo'
};

delete aluno.cidade;
```

## 8. Métodos úteis de objetos

Quando você precisa inspecionar um objeto, três métodos aparecem bastante:

- `Object.keys(objeto)`: devolve um array com as chaves;
- `Object.values(objeto)`: devolve um array com os valores;
- `Object.entries(objeto)`: devolve um array de pares `[chave, valor]`.

Exemplo:

```js
const aluno = {
    nome: 'Ana',
    nota: 8.5,
    turma: '2AT'
};

console.log(Object.keys(aluno));
console.log(Object.values(aluno));
console.log(Object.entries(aluno));
```

Saída esperada:

```js
['nome', 'nota', 'turma']
['Ana', 8.5, '2AT']
[
    ['nome', 'Ana'],
    ['nota', 8.5],
    ['turma', '2AT']
]
```

Esses métodos são úteis para:

- listar propriedades de um objeto;
- montar tabelas ou resumos na tela;
- percorrer chave e valor juntos.

Exemplo com `entries`:

```js
Object.entries(aluno).forEach(function([chave, valor]) {
    console.log(chave, valor);
});
```

## 9. Objetos com arrays

Muitas estruturas reais usam os dois juntos.

Exemplo:

```js
const turma = {
    nome: '2AT',
    alunos: ['Ana', 'Bruno', 'Carla']
};
```

Aqui:

- `turma` é um objeto;
- `alunos` é uma propriedade desse objeto;
- o valor de `alunos` é um array.

## 10. Arrays de objetos

Este é um dos formatos mais importantes em aplicações web.

```js
const alunos = [
    { nome: 'Ana', nota: 8 },
    { nome: 'Bruno', nota: 6 },
    { nome: 'Carla', nota: 9 }
];
```

Agora temos uma lista de entidades completas.

Isso permite:

- exibir tabelas;
- filtrar aprovados;
- calcular médias;
- buscar usuários, produtos, tarefas ou filmes;
- renderizar cards no DOM.

## 11. Percorrendo array + objetos

```js
const alunos = [
    { nome: 'Ana', nota: 8 },
    { nome: 'Bruno', nota: 6 },
    { nome: 'Carla', nota: 9 }
];

alunos.forEach(function(aluno) {
    console.log(aluno.nome, aluno.nota);
});
```

Esse padrão é muito comum porque combina a ideia de lista com a ideia de entidade.

## 12. Filtrando e transformando arrays de objetos

### Filtrando aprovados

```js
const aprovados = alunos.filter(function(aluno) {
    return aluno.nota >= 7;
});
```

### Pegando apenas os nomes

```js
const nomes = alunos.map(function(aluno) {
    return aluno.nome;
});
```

### Somando notas

```js
const somaNotas = alunos.reduce(function(acumulador, aluno) {
    return acumulador + aluno.nota;
}, 0);
```

## 13. Objetos e DOM

Em interfaces web, objetos aparecem o tempo todo para representar dados da tela.

Exemplo:

```js
const aluno = {
    nome: 'Ana',
    nota: 8.5
};

const saida = document.querySelector('#saida');
saida.textContent = `${aluno.nome} tirou ${aluno.nota}`;
```

Quando existe uma lista de objetos, o JavaScript costuma percorrer essa lista e montar a interface dinamicamente.

## 14. Erros comuns de iniciantes

### Confundir array com objeto

```js
const aluno = { nome: 'Ana' };
console.log(aluno[0]);
```

Isso não faz sentido porque o objeto não está organizado por índice.

### Acessar propriedade que não existe

```js
console.log(aluno.idade);
```

O retorno será `undefined`.

### Misturar nomes de propriedades sem padrão

Exemplo ruim:

```js
const aluno = {
    nome: 'Ana',
    NotaFinal: 8,
    cidade_aluno: 'Pelotas'
};
```

Prefira padrões consistentes.

## 15. Boas práticas

- use nomes claros para propriedades;
- mantenha o mesmo padrão de escrita nas chaves;
- use objeto quando os dados pertencem a uma mesma entidade;
- use `keys`, `values` e `entries` quando precisar inspecionar ou percorrer um objeto;
- use array de objetos quando houver várias entidades do mesmo tipo;
- renderize a interface com base no array principal de objetos.

## 16. Relação com as práticas desta pasta

As práticas desta seção mostram objetos em uso real:

- `perfil-aluno/`: criação e atualização de um objeto único com dados de formulário;
- `vitrine-produtos/`: renderização de um array de objetos em cards e resumo de preços;
- `agenda-contatos/`: cadastro e busca de contatos representados por objetos;
- `boletim/`: cadastro de alunos, cálculo de média, aprovados e maior nota usando array de objetos.

Essa seção serve como ponte entre fundamentos de JavaScript e interfaces mais completas com DOM, formulários e persistência.

## 17. Resumo final

Os pontos centrais sobre objetos são estes:

- objeto representa uma entidade com propriedades;
- propriedades podem ser lidas, alteradas, adicionadas e removidas;
- `Object.keys()`, `Object.values()` e `Object.entries()` ajudam a inspecionar objetos;
- objetos e arrays se combinam com muita frequência;
- arrays de objetos são muito comuns em aplicações reais;
- esse formato aparece em tabelas, cards, cadastros, buscas e APIs.

Quando você domina objetos e arrays de objetos, fica muito mais fácil construir aplicações web mais próximas de sistemas reais.
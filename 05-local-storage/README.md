# Programação Web I - Local Storage no JavaScript

## 1. O que este guia ensina

Esta seção funciona como uma referência prática sobre armazenamento no navegador com `localStorage` e `sessionStorage`. O foco agora é entender como a aplicação pode lembrar dados entre recargas da página e como esse estado deve ser organizado de forma limpa.

Ao final deste guia, você deve conseguir:

- entender o que é Web Storage;
- diferenciar `localStorage` de `sessionStorage`;
- explicar o que é JSON e por que ele aparece junto com storage;
- salvar e recuperar objetos e arrays com `JSON.stringify()` e `JSON.parse()`;
- trabalhar com cadastro em memória e persistência no navegador sem misturar responsabilidades;
- aplicar o padrão correto de leitura inicial e regravação do cadastro;
- reconhecer limites e cuidados de segurança ao usar armazenamento local.

## 2. Relação com as seções anteriores

Esta seção junta conteúdos que já apareceram antes na disciplina:

- arrays ajudam a guardar listas de registros;
- objetos ajudam a representar cada entidade cadastrada;
- DOM mostra na tela o que existe na memória;
- eventos disparam as ações de cadastrar, remover, limpar ou salvar rascunho.

Em outras palavras: storage não substitui arrays, objetos e DOM. Ele complementa essas estruturas para que a página consiga lembrar o estado depois que for atualizada.

## 3. O que é Web Storage

Web Storage é uma API do navegador que guarda pares de chave e valor no lado do cliente.

Isso permite salvar dados simples sem depender de banco de dados ou back-end.

Os dois tipos mais usados são estes:

- `localStorage`: os dados continuam disponíveis mesmo depois de fechar a aba ou o navegador;
- `sessionStorage`: os dados existem apenas enquanto a sessão da aba continuar aberta.

Pense assim:

- `localStorage` é uma gaveta que continua no lugar depois da aula;
- `sessionStorage` é um papel de apoio que some quando a sala fecha.

## 4. `localStorage` x `sessionStorage`

Os dois usam praticamente a mesma API. A diferença principal está no tempo de vida dos dados.

### `localStorage`

- persiste entre recargas;
- persiste entre fechamentos e novas aberturas do navegador;
- funciona bem para listas locais, preferências e cadastros simples.

### `sessionStorage`

- persiste durante a navegação atual da aba;
- some quando a sessão termina;
- funciona bem para rascunhos e estados temporários.

Regra prática:

- quer manter o dado por mais tempo: `localStorage`;
- quer manter o dado só durante a navegação atual: `sessionStorage`.

## 5. Antes de `stringify()` e `parse()`: o que é JSON

JSON é um formato de texto usado para representar dados estruturados.

O nome vem de **JavaScript Object Notation**, mas ele não serve apenas para JavaScript. Em várias linguagens e ferramentas, JSON aparece como uma forma padronizada de organizar informações em texto.

Na prática, JSON aparece quando precisamos:

- trocar dados entre front-end e back-end;
- salvar configurações ou estados de uma aplicação;
- representar objetos e listas em um formato que possa ser enviado, salvo ou lido depois;
- manter a estrutura dos dados mesmo fora da memória do programa.

Exemplo de JSON:

```json
{
    "nome": "Ana",
    "turma": "2AT",
    "ativo": true
}
```

Esse texto representa uma estrutura com propriedades e valores. A ideia importante aqui é esta: o navegador consegue guardar texto no storage, então JSON entra como uma ponte entre o texto salvo e a estrutura JavaScript que usamos na memória.

Por isso, antes de pensar em `JSON.stringify()` e `JSON.parse()`, o mais importante é entender o papel do JSON: ele não é um método do storage, e sim um formato intermediário que ajuda a transportar ou armazenar dados estruturados.

Em resumo:

- na memória, trabalhamos com arrays e objetos;
- no storage, guardamos texto;
- JSON ajuda a transformar uma coisa na outra.

## 6. Por que JSON aparece junto com storage

Quando o valor já é texto simples, como `'claro'` ou `'Ana'`, ele pode ser salvo diretamente.

```js
localStorage.setItem('tema', 'claro');
```

Mas, quando queremos guardar algo como um objeto ou um array de objetos, precisamos converter antes.

Exemplo de estrutura em memória:

```js
const alunos = [
    { nome: 'Ana', turma: '2AT' },
    { nome: 'Bruno', turma: '2AT' }
];
```

Essa estrutura não deve ser salva diretamente. Primeiro ela precisa virar JSON.

## 7. `JSON.stringify()` e `JSON.parse()`

### `JSON.stringify()`

Transforma um objeto ou array em texto JSON.

```js
const json = JSON.stringify(alunos);
localStorage.setItem('cadastro-alunos', json);
```

### `JSON.parse()`

Lê o texto JSON e reconstrói a estrutura JavaScript.

```js
const json = localStorage.getItem('cadastro-alunos');
let alunos = [];

if (json) {
    alunos = JSON.parse(json);
}
```

Regra prática:

- `stringify()` vai da memória para o storage;
- `parse()` volta do storage para a memória.

## 8. Métodos principais do storage

### `setItem()`

Salva ou sobrescreve o valor de uma chave.

```js
localStorage.setItem('tema', 'claro');
```

### `getItem()`

Lê o valor salvo na chave informada.

```js
const tema = localStorage.getItem('tema');
```

Se a chave não existir, o retorno será `null`.

### `removeItem()`

Remove apenas uma chave específica.

```js
localStorage.removeItem('tema');
```

### `clear()`

Apaga todas as chaves daquele storage.

```js
localStorage.clear();
```

Em geral, `clear()` deve ser usado com cautela, porque ele remove tudo e não apenas o dado daquela funcionalidade.

## 9. O padrão correto para cadastro com `localStorage`

Este é o ponto mais importante da seção.

Quando a aplicação trabalha com cadastro, o padrão esperado é este:

1. ler o storage **uma vez**, no início da aplicação;
2. guardar esse resultado em uma variável de memória, como um array;
3. usar essa variável como fonte principal da verdade;
4. sempre que o cadastro em memória mudar, regravar o storage inteiro;
5. redesenhar a interface a partir da memória atual.

Exemplo do fluxo:

```js
const STORAGE_KEY = 'cadastro-alunos';
let alunos = carregarAlunos();

function carregarAlunos() {
    const json = localStorage.getItem(STORAGE_KEY);

    if (!json) {
        return [];
    }

    return JSON.parse(json);
}

function salvarAlunos() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(alunos));
}

function cadastrarAluno(aluno) {
    alunos.push(aluno);
    salvarAlunos();
    renderizarAlunos();
}
```

O que **não** deve virar hábito:

- chamar `getItem()` toda vez que o usuário clicar no botão de cadastrar;
- usar o DOM como fonte principal dos dados;
- alterar a tela e esquecer de regravar a lista atualizada.

Regra prática para decorar:

- lê uma vez no começo;
- atualiza a memória;
- reescreve o storage quando a memória mudar.

## 10. Exercício 1: Perfil do Estudante

Pasta: [perfil-estudante](./perfil-estudante/)

Este primeiro exercício trabalha com um único objeto salvo no `localStorage`, mas agora com uma proposta visual de cartão escolar com prévia em tempo real.

Ele é útil para introduzir três ideias:

- o storage guarda texto;
- um objeto precisa virar JSON para ser salvo;
- a interface pode ser reconstruída a partir do objeto já carregado.

Conceitos em foco:

- objeto único;
- mistura de inputs (`select`, `range`, `color` e `checkbox`);
- `JSON.stringify()`;
- `JSON.parse()`;
- `removeItem()` para limpar o perfil salvo.

## 11. Exercício 2: Cadastro de Alunos

Pasta: [cadastro-alunos](./cadastro-alunos/)

Este exercício mantém o padrão central da seção, mas em um cenário de conselho de classe: um array de objetos com três notas, média calculada e situação final.

Conceitos em foco:

- array de objetos;
- leitura inicial com `getItem()`;
- escrita consistente com `setItem()`;
- cálculo de média e situação na renderização;
- painel de indicadores + tabela do boletim.

Se o aluno entender bem esse exercício, ele já entendeu o coração do uso de `localStorage` em cadastros simples.

## 12. Exercício 3: Agenda de Contatos

Pasta: [agenda-contatos](./agenda-contatos/)

Aqui a lista continua sendo a fonte principal da verdade, mas o exercício vira um mural com categorias e destaque de favoritos.

Conceitos em foco:

- atualização de lista em memória;
- regravação do storage depois de adicionar, remover ou favoritar;
- renderização em cards a partir do array filtrado;
- separação entre dados e interface.

## 13. Exercício 4: Inscrição com Rascunho

Pasta: [inscricao-com-rascunho](./inscricao-com-rascunho/)

Este exercício junta os dois tipos de storage:

- `localStorage` guarda as inscrições confirmadas;
- `sessionStorage` guarda apenas o rascunho do formulário.

Conceitos em foco:

- persistência duradoura para o cadastro confirmado;
- persistência temporária para o formulário em andamento;
- recuperação de rascunho com `checkbox` e `textarea`;
- contador de caracteres para apoiar preenchimento;
- limpeza do rascunho ao concluir a inscrição.

## 14. Exercícios extras no formato de prova

Os exercícios abaixo foram pensados para ter dificuldade próxima das provas de P1: o HTML e o CSS já estão prontos, o `script.js` possui funções com comentários de orientação, e o estudante precisa implementar validação, arrays, renderização, eventos e persistência.

Eles evitam repetir apenas o padrão simples de cadastro. Cada um trabalha um fluxo diferente e força uma decisão específica sobre o formato do estado que será salvo.

### 14.1 Mapa de Sala

Pasta: [mapa-sala](./mapa-sala/)

Foco principal:

- usar objeto como mapa de assentos;
- gerar uma grade de lugares com loops;
- montar chaves compostas como `A-1`;
- ocupar e liberar posições persistidas.

### 14.2 Urna de Prioridades

Pasta: [urna-prioridades](./urna-prioridades/)

Foco principal:

- distribuir exatamente 10 pontos entre propostas;
- impedir voto duplicado por código;
- salvar votos compostos;
- calcular ranking agregado a partir dos votos persistidos.

### 14.3 Sessão de Foco

Pasta: [sessao-foco](./sessao-foco/)

Foco principal:

- salvar uma sessão de timer em andamento;
- recalcular tempo restante depois de recarregar a página;
- trabalhar com `Date.now()`;
- pausar, retomar, concluir e reiniciar o estado salvo.

### 14.4 Trilha de Leitura

Pasta: [trilha-leitura](./trilha-leitura/)

Foco principal:

- persistir livro escolhido e capítulo atual;
- navegar por índice;
- salvar anotações diferentes por capítulo;
- renderizar barra de progresso a partir do estado salvo.

### 14.5 Ranking de Quiz

Pasta: [ranking-quiz](./ranking-quiz/)

Foco principal:

- controlar uma tentativa de quiz em memória;
- salvar apenas o resultado consolidado no ranking;
- calcular percentual de acertos;
- ordenar resultados persistidos.

## 15. Exemplos anteriores do curso

Os materiais antigos do curso ainda podem ajudar como referência de raciocínio, mas não fazem parte desta nova série de exercícios.

Entre os exemplos anteriores, vale observar estes padrões:

- ex05.1 mostrava um cadastro simples persistido em `localStorage`;
- ex05.2 usava `localStorage` para um login didático e uma tela de perfil;
- ex05.3 combinava `localStorage` com `sessionStorage` para trabalhar cadastro e rascunho.

Eles são úteis como comparação histórica, mas a prática principal desta seção deve ficar concentrada nos exercícios de `05-local-storage`.

## 16. Erros comuns de iniciantes

- esquecer que `getItem()` pode retornar `null`;
- tentar salvar objeto ou array sem `JSON.stringify()`;
- chamar `JSON.parse()` sem verificar se existe valor salvo;
- misturar chaves diferentes para salvar e ler;
- recarregar os dados do storage a cada clique em vez de trabalhar com memória;
- alterar a lista em memória e esquecer de regravar o storage;
- tratar `localStorage` como solução segura para credenciais ou dados sensíveis.

## 17. Boas práticas para não virar bagunça

- use nomes de chave claros, como `perfil-estudante`, `cadastro-alunos` e `rascunho-inscricao`;
- mantenha uma responsabilidade por chave;
- carregue os dados no início da aplicação;
- trate arrays e objetos em memória como estado principal;
- sempre que esse estado mudar, regrave o storage inteiro com consistência;
- renderize a interface a partir da memória atual;
- use `sessionStorage` quando o dado for temporário.

## 18. Resumo final

As ideias centrais desta seção são estas:

- storage guarda texto;
- JSON é a ponte entre texto e estrutura JavaScript;
- `localStorage` persiste por mais tempo;
- `sessionStorage` dura apenas na sessão atual;
- em cadastros, o storage deve ser lido no início da aplicação;
- depois disso, a memória passa a ser a fonte principal da verdade;
- sempre que o cadastro mudar em memória, o storage deve ser reescrito.

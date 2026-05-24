---
marp: true
theme: ifsul
header: ' '
footer: 'Instituto Federal Sul-rio-grandense | Campus Charqueadas'
---

<!-- _class: lead -->

# Programação Web I
## Local Storage no JavaScript

Prof. Pablo Werlang
pablowerlang@ifsul.edu.brr

---

# Local Storage no JavaScript
## Para que isso serve na prática?

<div class="grid grid-cols-2 flex h-full">
    <div>
    
- Fazer a página lembrar dados depois do recarregamento
- Persistir cadastros simples no navegador
- Guardar preferências e estados locais
- Usar rascunho temporário sem perder o que já foi digitado

    </div>
    <div class="flex h-full items-center justify-center">
        <img class="" alt="Ilustração didática mostrando as utilidades do Local Storage" src="../../marp/assets/05-ls-intro.png">
    </div>
</div>



---

# Local Storage no JavaScript
## Roteiro da aula

- O que é Web Storage
- Diferença entre `localStorage` e `sessionStorage`
- O que é JSON e por que ele aparece aqui
- Padrão certo para cadastro com memória + storage
- Quatro exercícios da seção
- Erros comuns e boas práticas

---

<!-- _class: divider -->

# Conceito Base

---

# Local Storage no JavaScript
## Web Storage

### O que é Web Storage?

- É uma API do navegador para guardar pares de chave e valor
- Funciona no lado do cliente
- O valor salvo fica associado ao site atual
- O navegador devolve esses dados em formato de texto

```js
localStorage.setItem('nome', 'Ana');
const nome = localStorage.getItem('nome');
```

---

# Local Storage no JavaScript
## `localStorage` ou `sessionStorage`?

<div class="grid grid-cols-2 gap-6 h-full">
<div>

**`localStorage`**

- Persiste depois de fechar a aba
- Serve para cadastros e preferências
- Bom para dados locais não sensíveis

</div>
<div>

**`sessionStorage`**

- Dura só na sessão da aba
- Serve para rascunhos e estado temporário
- Bom para não perder o formulário em andamento

</div>
</div>

---

# Local Storage no JavaScript
## Regra rápida para decidir

- ### Quer lembrar depois? `localStorage`
- ### Quer lembrar só nesta navegação? `sessionStorage`
- ### Quer guardar credencial real? storage não resolve segurança sozinho

---

<!-- _class: divider -->

# JSON e Texto

---

# Local Storage no JavaScript
## O que é JSON?

- É um formato de texto para representar dados estruturados
- Organiza informações com chaves e valores
- É muito usado para troca e armazenamento de dados

```json
{
    "nome": "Ana",
    "turma": "2AT"
}
```

---

# Local Storage no JavaScript
## Para que JSON é usado?

- Para trocar dados entre sistemas e APIs
- Para salvar estados e configurações em texto
- Para manter a estrutura de objetos e listas fora da memória
- Para servir de ponte entre o que o programa usa e o que precisa ser salvo

JSON não é um recurso do storage em si. Ele entra aqui porque storage guarda texto, não objetos prontos.

---

# Local Storage no JavaScript
## Por que JSON aparece aqui?

- Na memória, trabalhamos com arrays e objetos
- No storage, o navegador guarda texto
- JSON faz a ponte entre essas duas formas

```js
const aluno = { nome: 'Ana', turma: '2AT' };
```

Esse objeto precisa virar texto antes de ser salvo.

---

# Local Storage no JavaScript
## `JSON.stringify()` para salvar

```js
const alunos = [
    { nome: 'Ana', turma: '2AT' },
    { nome: 'Bruno', turma: '2AT' }
];

localStorage.setItem('cadastro-alunos', JSON.stringify(alunos));
```

- Vai da memória para o storage
- Converte a estrutura em texto JSON

---

# Local Storage no JavaScript
## `JSON.parse()` para reconstruir

```js
const json = localStorage.getItem('cadastro-alunos');
let alunos = [];

if (json) {
    alunos = JSON.parse(json);
}
```

- Vai do storage para a memória
- Reconstrói o array ou objeto original

---

<!-- _class: divider -->

# Padrão de Cadastro

---

# Local Storage no JavaScript
## O fluxo correto para cadastro

1. Ler o storage no início da aplicação
2. Guardar o resultado em memória
3. Trabalhar com a memória durante a interação
4. Reescrever o storage quando a memória mudar
5. Renderizar a interface a partir da memória atual

---

# Local Storage no JavaScript
## Leia uma vez no começo

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
```

Esse carregamento acontece na inicialização, não a cada clique.

---

# Local Storage no JavaScript
## Atualizou a memória? Reescreva o storage

```js
function salvarAlunos() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(alunos));
}

function cadastrarAluno(aluno) {
    alunos.push(aluno);
    salvarAlunos();
    renderizarAlunos();
}
```

- A memória é a fonte principal da verdade
- O storage acompanha a memória atual

---

# Local Storage no JavaScript
## Cuidados

### Hábitos que você deve evitar

- Reler o storage a cada cadastro
- Usar o DOM como lugar principal dos dados
- Atualizar a lista/objeto e esquecer de salvar de novo

**Regra prática: lê no início, mantém em memória, regrava quando mudar.**

---

<!-- _class: divider -->

# Erros e Prática

---

# Local Storage no JavaScript
## Erros comuns de iniciantes

- Esquecer que `getItem()` pode devolver `null`
- Salvar objeto sem `JSON.stringify()`
- Fazer `JSON.parse()` sem validação
- Misturar chaves diferentes
- Ler storage de novo a cada clique

---

# Local Storage no JavaScript
## Boas práticas para não virar bagunça

- Use chaves claras e consistentes
- Carregue o storage na inicialização
- Trate a memória como fonte principal da verdade
- Regrave o storage sempre que o cadastro mudar
- Use `sessionStorage` quando o dado for temporário

---

<!-- _class: divider -->

# Exercícios da Seção

---

# Local Storage no JavaScript
## Exercício 1: Perfil do Estudante

- Salva um objeto único no `localStorage`
- Introduz o uso de JSON com um caso pequeno
- Mostra como preencher a interface a partir do valor salvo
- Pasta: `05-local-storage/perfil-estudante/`

---

# Local Storage no JavaScript
## Exercício 2: Cadastro de Alunos

- Trabalha com array de objetos
- Lê o storage no início da aplicação
- Reescreve o storage sempre que a lista mudar
- Pasta: `05-local-storage/cadastro-alunos/`

---

# Local Storage no JavaScript
## Exercício 3: Agenda de Contatos

- Persiste uma lista com remoção individual
- Mostra filtro visual sem alterar a fonte principal
- Reforça o padrão memória primeiro, storage depois
- Pasta: `05-local-storage/agenda-contatos/`

---

# Local Storage no JavaScript
## Exercício 4: Inscrição com Rascunho

- Guarda inscrições confirmadas no `localStorage`
- Guarda o formulário em andamento no `sessionStorage`
- Compara persistência duradoura e temporária na mesma prática
- Pasta: `05-local-storage/inscricao-com-rascunho/`

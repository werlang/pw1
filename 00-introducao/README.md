# Programacao Web I - Introducao ao Desenvolvimento Web

## 1. O que este guia apresenta

Este README funciona como um guia de referencia para o inicio da disciplina. O objetivo e organizar o vocabulario basico do desenvolvimento web e explicar como as partes de uma aplicacao se conectam.

Ao estudar esta secao, o mais importante e entender:

- o que acontece quando uma pagina web e aberta no navegador;
- qual e a diferenca entre front-end e back-end;
- qual e o papel de HTML, CSS e JavaScript;
- por que separar estrutura, estilo e comportamento;
- como os arquivos de um projeto simples se relacionam.

## 2. O que e uma aplicacao web

Uma aplicacao web e um sistema acessado por meio do navegador. Quando o usuario abre uma URL, o navegador solicita arquivos e dados a um servidor, interpreta o que recebeu e apresenta a interface na tela.

Em uma visao inicial, pense no fluxo assim:

1. o navegador faz uma requisicao;
2. o servidor responde com arquivos ou dados;
3. o navegador monta a interface;
4. o usuario interage com a pagina;
5. novas requisicoes podem acontecer conforme a aplicacao precisa de mais dados.

Nem toda interacao exige contato imediato com o servidor. Muitas acoes simples podem ser resolvidas diretamente no navegador com JavaScript.

## 3. Front-end e back-end

O desenvolvimento web costuma ser dividido em duas grandes areas.

### Front-end

O front-end e a parte que roda no navegador do usuario. E a camada visivel e interativa da aplicacao.

Exemplos do que pertence ao front-end:

- textos, titulos, imagens e links;
- cores, fontes, espacamentos e alinhamentos;
- botoes, menus e formularios;
- interacoes locais, como abrir um menu ou validar um campo.

Em geral, o front-end precisa responder rapidamente ao usuario e tornar a interface clara e utilizavel.

### Back-end

O back-end e a parte que roda no servidor. Ele fica responsavel por processar regras de negocio, armazenar dados e responder as requisicoes feitas pelo front-end ou por outros clientes.

Exemplos do que pertence ao back-end:

- autenticacao de usuarios;
- consulta e gravacao em banco de dados;
- validacao central das regras do sistema;
- fornecimento de dados por API.

### Diferenca pratica

- front-end lida com a interface e a experiencia do usuario;
- back-end lida com processamento, persistencia de dados e logica central.

Essas duas partes trabalham juntas. O navegador exibe a interface, mas muitas vezes precisa consultar o servidor para carregar ou salvar informacoes.

## 4. As tres tecnologias basicas do front-end

No inicio da disciplina, as tres tecnologias principais do navegador sao estas:

### HTML

HTML define a estrutura do documento.

Exemplos de elementos estruturais:

- titulos;
- paragrafos;
- listas;
- formularios;
- imagens;
- botoes.

Pense no HTML como o esqueleto da pagina.

### CSS

CSS define a aparencia da pagina.

Com CSS, controlamos:

- cor;
- fonte;
- tamanho;
- espacamento;
- bordas;
- posicionamento;
- responsividade.

Pense no CSS como a camada visual da interface.

### JavaScript

JavaScript define o comportamento da pagina.

Com JavaScript, podemos:

- reagir a cliques;
- validar formularios;
- alterar textos e estilos dinamicamente;
- criar elementos na tela;
- fazer requisicoes para o servidor.

Pense no JavaScript como a camada de interacao e logica no navegador.

## 5. Separacao de responsabilidades

Uma regra central em programacao web e separar responsabilidades. Isso significa evitar misturar toda a aplicacao em um unico lugar.

Em um projeto simples:

- o HTML organiza a estrutura;
- o CSS controla a apresentacao;
- o JavaScript controla o comportamento.

Essa separacao ajuda em varios pontos:

- facilita manutencao;
- melhora leitura do codigo;
- reduz repeticao;
- torna o projeto mais facil de testar e evoluir.

## 6. Exemplo minimo de estrutura de arquivos

Um exemplo inicial de projeto pode ter tres arquivos:

- `index.html`
- `style.css`
- `script.js`

### HTML

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Minha primeira pagina</title>
    <link rel="stylesheet" href="style.css">
    <script src="script.js" defer></script>
</head>
<body>
    <h1>Hello World!</h1>
    <p>Primeiro exemplo da disciplina.</p>
</body>
</html>
```

Esse arquivo define a estrutura e referencia os arquivos de estilo e script.

### CSS

```css
body {
    font-family: sans-serif;
}

h1 {
    color: red;
}
```

Esse arquivo controla a aparencia dos elementos.

### JavaScript

```js
console.log('Hello World!');
```

Esse arquivo contem o comportamento da pagina. No inicio, pode apenas exibir mensagens no console, mas depois passa a manipular o DOM e interagir com o usuario.

## 7. O papel do atributo `defer`

No exemplo anterior, a tag `script` usa o atributo `defer`.

```html
<script src="script.js" defer></script>
```

Isso indica ao navegador que o arquivo JavaScript deve ser carregado sem bloquear a leitura do HTML e executado somente depois que o documento estiver pronto.

Na pratica, isso ajuda a evitar erros como tentar acessar elementos que ainda nao foram carregados na pagina.

## 8. Como navegador e servidor se comunicam

Em uma aplicacao web, a comunicacao entre cliente e servidor acontece por requisicoes e respostas.

Exemplo de fluxo simples:

1. o usuario acessa a pagina;
2. o navegador solicita o HTML ao servidor;
3. o servidor responde com o HTML;
4. o navegador encontra referencias ao CSS e ao JavaScript e faz novas requisicoes;
5. depois de montar a interface, o usuario passa a interagir com ela.

Em aplicacoes mais completas, o JavaScript tambem pode fazer novas requisicoes para buscar dados, cadastrar usuarios, autenticar acesso e atualizar partes da tela.

## 9. Tipos comuns de arquivos em um projeto web inicial

Em um projeto didatico como os desta disciplina, voce encontrara com frequencia:

- arquivos `.html` para estrutura;
- arquivos `.css` para estilo;
- arquivos `.js` para comportamento no navegador;
- arquivos `.php` em atividades com servidor;
- scripts SQL em exemplos com banco de dados.

Cada arquivo tem uma responsabilidade principal. Entender essa divisao desde o inicio evita confusao nas proximas aulas.

## 10. O que acontece no navegador quando o usuario clica

Mesmo em uma pagina simples, ha um fluxo interno importante:

1. o HTML ja foi carregado e virou DOM;
2. o JavaScript registra eventos nos elementos;
3. o usuario clica, digita ou envia um formulario;
4. o JavaScript executa a logica correspondente;
5. a interface pode ser atualizada sem recarregar toda a pagina.

Essa ideia sera aprofundada nas proximas secoes sobre eventos e DOM.

## 11. Erros comuns de quem esta comecando

### Misturar tudo no HTML

No inicio, e comum tentar colocar estrutura, estilo e comportamento no mesmo arquivo. Isso funciona em exemplos muito pequenos, mas dificulta a organizacao do projeto.

### Confundir front-end com back-end

Nem todo codigo da aplicacao roda no navegador. Regras de autenticacao, banco de dados e processamento central normalmente ficam no servidor.

### Achar que JavaScript substitui HTML e CSS

JavaScript nao substitui essas tecnologias. Ele complementa a estrutura e o estilo com comportamento.

### Ignorar a ordem de carregamento

Se o script for executado antes de o HTML estar pronto, muitas manipulacoes da interface falham.

## 12. Boas praticas para esta etapa

- use nomes de arquivos simples e consistentes;
- mantenha HTML, CSS e JavaScript separados;
- comece com exemplos pequenos e testaveis;
- use o console do navegador para observar o comportamento do script;
- entenda primeiro o fluxo geral antes de tentar projetos maiores.

## 13. Resumo final

Os pontos fundamentais desta introducao sao:

- uma aplicacao web envolve navegador, servidor e troca de dados;
- front-end e a camada da interface e da interacao;
- back-end e a camada de processamento e armazenamento;
- HTML estrutura, CSS estiliza e JavaScript adiciona comportamento;
- separar responsabilidades melhora organizacao e manutencao;
- o atributo `defer` ajuda o JavaScript a executar no momento correto.

Com essa base, fica mais facil entender as proximas secoes da disciplina, especialmente eventos, DOM, formularios e comunicacao com APIs.
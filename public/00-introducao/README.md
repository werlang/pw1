# Programação Web I - Introdução

---

## Bem-vindo à Programação Web I!

Nesta disciplina, o objetivo principal é aprender a desenvolver aplicações para a Web de ponta-a-ponta. O desenvolvimento web moderno é como a construção de uma engrenagem complexa, que reúne diversos conceitos trabalhando em conjunto. 

Para que um site ou aplicativo funcione perfeitamente, o dividimos em duas grandes áreas de responsabilidade: o **Front-end** e o **Back-end**.

---

## 1. O que é o Front-End?

O Front-end é a parte da aplicação que executa diretamente na máquina do usuário (no seu navegador, como Chrome, Firefox ou Edge). Pense no Front-end como a "vitrine" de uma loja: é tudo aquilo com o qual o usuário interage visualmente.

A grande vantagem do Front-end é que tudo que executa no navegador é praticamente "instantâneo", pois não requer consulta constante aos dados armazenados em um servidor externo para ações simples.

Ele é composto por três tecnologias fundamentais, onde cada arquivo possui uma finalidade específica:

* **HTML (Linguagem de Marcação de Hipertexto):** Responsável pela estrutura inicial do documento. É como o esqueleto do site, definindo onde ficam os títulos, parágrafos e imagens.
* **CSS (Folhas de Estilo em Cascata):** Define a aparência do documento e da aplicação. É como as "roupas" e o design do site, controlando cores, fontes e posicionamento.
* **JavaScript (JS):** Controla a interação com o usuário e a lógica da aplicação local. É o "comportamento", permitindo que menus abram, animações ocorram e cálculos sejam feitos na máquina do usuário.

---

## 2. O que é o Back-End?

Enquanto o Front-end é a vitrine, o Back-end é o "estoque e a gerência" da loja. Ele executa em um servidor remoto ou na nuvem, longe dos olhos do usuário. 

Suas principais responsabilidades incluem:
* **Controle Central:** Gerencia o fluxo dos dados e a lógica da aplicação central.
* **Armazenamento:** Controla o armazenamento das informações de forma segura.
* **Comunicação por API:** O Back-end se comunica com aplicações (como o próprio Front-end ou um aplicativo de celular), e não diretamente com pessoas.
* **Processamento:** Recebe informações (requisições), aplica a lógica do sistema e se comunica com o banco de dados.
* **Resposta:** Após processar tudo, entrega dados estruturados (geralmente no formato JSON) de volta para o Front-end.

No Back-end, utilizamos bancos de dados e linguagens de programação de servidor, como PHP, Java, Python ou C++.

---

## 3. A Separação de Conceitos na Prática

Uma das regras de ouro na Programação Web é a **separação de conceitos**. Nunca misturamos tudo no mesmo lugar. Abaixo, veja um exemplo prático de como conectamos a estrutura (HTML), o estilo (CSS) e o comportamento (JS) de forma organizada.

### Estrutura HTML (`index.html`)
O arquivo HTML atua como a base. Observe como ele "chama" os outros arquivos de estilo e script:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="style.css">
    <script src="script.js" defer></script>
</head>
<body>
    <h1>Hello World!</h1>
</body>
</html>
```

### Aparência CSS (style.css)

Este arquivo dita como o elemento `<h1>` do HTML acima deve se parecer:


```css
h1 {
    color: red;
}
```

### Comportamento JavaScript (script.js)

Este arquivo contém a lógica. No HTML, utilizamos o atributo defer na tag `<script>`. Isso é uma excelente prática, pois garante que o script execute somente após o documento HTML ser totalmente carregado, evitando erros.

```javascript
console.log('Hello World!');
```
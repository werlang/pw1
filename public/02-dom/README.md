# Programação Web I - JavaScript e DOM

---

## 1. Entendendo o DOM

A sigla DOM refere-se ao *Document Object Model* (Modelo de Objeto de Documento). Em termos práticos, é a representação estruturada que o navegador faz do seu código HTML. 

Um dos pilares do desenvolvimento web moderno é a separação de responsabilidades. Isso significa que devemos manter a estrutura visual (HTML), a estilização (CSS) e o comportamento lógico (JavaScript) em arquivos distintos. O DOM funciona exatamente como a ponte que permite ao JavaScript interagir com a estrutura e o estilo, modificando a página em tempo real.

---

## 2. Como Selecionar Elementos

Antes de alterar qualquer coisa na tela, o JavaScript precisa localizar o elemento desejado.

### O Método `querySelector`
Esta é a ferramenta mais versátil para buscar itens no DOM, pois utiliza as mesmas regras de seletores do CSS:
* **Busca por Tag:** Usa-se apenas o nome do elemento (exemplo: `'h2'`).
* **Busca por ID:** Utiliza-se a cerquilha (exemplo: `'#btn-finalizar'`).
* **Busca por Classe:** Emprega-se o ponto final (exemplo: `'.item-tarefa'`).

*Regras de retorno:* Se o elemento não existir, a função retornará nulo (`null`). Se houver vários elementos que correspondam à busca, ela retornará **apenas o primeiro** que encontrar.

### O Método `querySelectorAll`
Quando o objetivo é capturar **todos** os elementos que compartilham uma mesma característica (como vários itens de uma mesma lista), usamos o `querySelectorAll`. Ele devolve um agrupamento de elementos. Para manipular cada um deles individualmente, é necessário percorrer essa lista utilizando estruturas de repetição, como o método `.forEach()`.

---

## 3. Modificando Atributos e Propriedades

Uma vez que o elemento está selecionado pelo JavaScript, é possível alterar seus atributos dinamicamente. Eis os mais utilizados:

* **`id`:** Altera o identificador único do componente.
* **`value`:** Acessa ou modifica o texto preenchido em campos de formulário.
* **`disabled`:** Ativa ou desativa a interação do usuário com o componente.
* **`checked`:** Marca ou desmarca caixas de seleção.
* **`src`:** Muda o endereço de origem de uma imagem.
* **`href`:** Modifica o destino de um link.
* **`style`:** Permite aplicar regras de CSS inline diretamente no componente, sobrepondo o arquivo de estilo externo.

---

## 4. Trabalhando com Textos e HTML Interno

Existem diferentes formas de injetar dados na tela:

### Template Strings (Interpolação de Texto)
No JavaScript moderno, o uso de aspas invertidas (`` ` ``) facilita a montagem de frases dinâmicas. Esse recurso, chamado de *Template String*, permite embutir variáveis diretamente dentro do texto através da sintaxe `${variavel}`, além de possibilitar a quebra de linhas no código sem gerar erros de sintaxe.

### `textContent` versus `innerHTML`
* **`textContent`:** Trata o conteúdo estritamente como texto bruto. Se você tentar enviar uma tag HTML (como `<h1>Título</h1>`) por este método, o navegador exibirá as próprias tags escritas na tela, em vez de formatá-las.
* **`innerHTML`:** Instrui o navegador a interpretar o conteúdo. Se você enviar tags HTML por meio desta propriedade, elas serão convertidas em novos elementos visuais reais na página.

---

## 5. Adicionando e Removendo Elementos

### Removendo Elementos
Para apagar algo da tela, primeiro localize o elemento (com o `querySelector`, por exemplo) e, em seguida, aplique a função `.remove()`. É uma excelente prática verificar se o elemento realmente existe na página antes de tentar removê-lo; caso contrário, a tentativa de exclusão gerará um erro no seu script.

### Criando Elementos com `createElement`
Enquanto o `innerHTML` injeta HTML a partir de uma string de texto, o DOM oferece uma via mais orientada a objetos:
* **`createElement`:** Fabrica um elemento HTML novo e limpo na memória do navegador.
* **`append`:** Anexa este elemento recém-criado a um elemento "pai" (container) que já esteja visível no documento.

---

## 6. Alterando o Visual com Classes (`classList`)

A forma mais recomendada de alterar a aparência de um componente não é alterando sua propriedade `style` repetidamente, mas sim adicionando ou removendo classes CSS previamente configuradas. Isso é feito através da propriedade `classList`.

Principais ações disponíveis:
* **`add`:** Inclui uma nova classe CSS ao elemento.
* **`remove`:** Retira uma classe específica.
* **`toggle`:** Funciona como um interruptor. Se a classe já estiver aplicada, o comando a remove; se não estiver, o comando a adiciona.
* **`contains`:** Verifica se o elemento possui determinada classe no momento, retornando verdadeiro ou falso.
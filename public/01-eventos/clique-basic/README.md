# Exercício Prático: Jogo Clique-Basic

---

## Objetivo da Atividade

O propósito deste exercício é fixar os conceitos de manipulação do DOM e a escuta de eventos através da construção de um jogo interativo simples. A dinâmica consiste em gerenciar o estado de uma variável de pontuação por meio de interações com a interface.

## Requisitos do Sistema

Para a execução bem-sucedida desta atividade, sua aplicação deve cumprir as seguintes diretrizes lógicas e estruturais:

* **Estrutura de Interação:** Desenvolva a interface contendo dois botões distintos. Atribua um atributo de identificação (`id`) único para cada um deles no seu arquivo HTML.
* **Captura de Elementos:** No seu script, utilize o método `document.querySelector` passando os respectivos IDs para referenciar os botões criados na interface.
* **Mecânica de Ganho:** O primeiro botão atuará como o gerador principal de recursos. Ao receber o evento de clique, ele deve incrementar o valor da pontuação do jogador em exato um ponto.
* **Mecânica de Custo/Penalidade:** O segundo botão terá uma função de decréscimo ou compra. Ao ser acionado pelo clique, ele deve subtrair dez pontos do montante atual armazenado.
* **Regra de Limite de Valor:** É obrigatório implementar uma validação condicional lógica para garantir que o valor da pontuação nunca fique abaixo de zero, mesmo que o botão de decréscimo seja clicado consecutivamente.

---

*Dica de desenvolvimento: Construa o código por etapas. Teste o funcionamento do primeiro botão utilizando o `console.log` antes de aplicar a lógica de pontuação visual e, em seguida, parta para o segundo botão.*
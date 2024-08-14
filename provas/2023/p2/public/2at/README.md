## Instruções:

Resolva a prova nos computadores da instituição. Durante a prova não será permitida consulta à internet. Isto inclui dispositivos móveis pessoais. O uso de material de apoio está sujeito à aprovação do professor. Este material é de uso pessoal. Conforme descrito nas questões, utilize os arquivos fornecidos pelo professor para auxiliar no desenvolvimento das questões.

A página apresentada nos códigos fornecidos representa um sistema de pedidos online de uma hamburgueria. Neste sistema o usuário pode:
- Visualizar os itens do cardápio e clicar nos itens do seu interesse para adicioná-los a um carrinho de compras.
- Aumentar ou reduzir a quantidade de um determinado item adicionado ao carrinho através dos botões `+` e `-` disponibilizados no carrinho.
- Visualizar o total de suas compras dentro do carrinho.
- Finalizar a compra ou fechar o carrinho clicando nos respectivos botões dentro da janela do carrinho.

Tomando por base os códigos fornecidos, resolva as seguintes questões:

## Questão 1

**(Peso 2) Linha 54** - Implemente a ação do elemento selecionado na constante button em cada item do array do cardápio. Ao clicar no botão, um novo item deverá ser adicionado ao carrinho:
Caso este item já exista no carrinho, sua quantidade deverá ser incrementada.
Caso não exista, adicione o item com uma quantidade 1.
Não esqueça de chamar a função que atualiza a visualização do carrinho.

## Questão 2

**(Peso 2) Linha 40** - O carrinho deverá ser carregado e salvo automaticamente no localStorage. Ao recarregar a página, o conteúdo do carrinho deve persistir.

## Questão 3

**(Peso 1) Linha 106** - O valor total do carrinho deverá ser mostrado a cada item adicionado ou removido. Adicione trechos de código que façam este cálculo. O valor deverá ser mostrado no elemento selecionado pela constante totalElement.

## Questão 4

**(Peso 1) Linha 131** - Ao clicar no elemento #cart-button do html o carrinho deverá ser mostrado. Implemente essa funcionalidade.

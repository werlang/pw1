## Instruções:

Resolva a prova nos computadores da instituição. Durante a prova não será permitida consulta à internet. Isto inclui dispositivos móveis pessoais. O uso de material de apoio está sujeito à aprovação do professor. Este material é de uso pessoal. Conforme descrito nas questões, utilize os arquivos fornecidos pelo professor para auxiliar no desenvolvimento das questões.

A página apresentada nos códigos fornecidos representa um sistema de pedidos online de uma hamburgueria. Neste sistema o usuário pode:
- Visualizar os itens do cardápio e clicar nos itens do seu interesse para adicioná-los a um carrinho de compras.
- Aumentar ou reduzir a quantidade de um determinado item adicionado ao carrinho através dos botões `+` e `-` disponibilizados no carrinho.
- Visualizar o total de suas compras dentro do carrinho.
- Finalizar a compra ou fechar o carrinho clicando nos respectivos botões dentro da janela do carrinho.

Tomando por base os códigos fornecidos, resolva as seguintes questões:

## Questão 1
**Linha 101** - 
Os elementos `addButton` e `removeButton` são usados para adicionar/remover uma unidade de um item já adicionado ao carrinho. Implemente a funcionalidade de ambos, levando em consideração:
- Ao clicar no botão de adicionar, deverá contabilizar uma unidade a mais do item do carrinho, bem como o valor do item deverá ser atualizado de acordo com a quantidade.
- Ao clicar no botão de remover, além de subtrair uma unidade do carrinho e atualizar o valor, caso a nova quantidade seja 0, o item do carrinho deve ser removido.

## Questão 2

**Linha 40** -
O carrinho deverá ser carregado e salvo automaticamente no `localStorage`. Ao recarregar a página, o conteúdo do carrinho deve persistir.

## Questão 3

**Linha 114** - 
Crie a funcionalidade para finalizar a compra dentro do carrinho, bem como fechar a janela do carrinho:
- Ao clicar em finalizar a compra, um `alert` deverá ser mostrado (simulando a finalização da compra), o conteúdo do carrinho deve ser limpo, e a visualização do carrinho deve ser atualizada.
- Ao clicar em fechar o carrinho, a janela do carrinho deverá sumir (use a classe CSS que foi criada para isso e está disponível no arquivo CSS).
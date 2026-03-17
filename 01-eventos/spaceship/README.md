# Exercício Prático: Movimentação de Nave Espacial

---

## Objetivo da Atividade

O objetivo deste exercício é aplicar os conceitos de captura de eventos de teclado e manipulação direta de propriedades visuais via JavaScript (DOM). O aluno desenvolverá a lógica interativa para movimentar um elemento gráfico (uma nave espacial) bidimensionalmente pela tela do navegador.

## Especificações Técnicas do Sistema

O aplicativo deve ser estruturado cumprindo os seguintes requisitos:

- *Estrutura Visual*: A interface deve conter um elemento de imagem representando a nave, preparado e posicionado de forma absoluta na tela.

- *Captura de Teclas (Keydown)*: É necessário registrar um ouvinte de eventos global acoplado ao document.body. Este ouvinte deve interceptar o evento keydown para detectar o exato momento em que uma tecla é pressionada pelo usuário.

- *Identificação do Comando*: Dentro da lógica disparada pelo evento, o sistema deve inspecionar a propriedade event.key para identificar qual tecla direcional foi acionada. Recomenda-se o uso da ferramenta console.log para depurar e descobrir as nomenclaturas exatas das teclas capturadas.

- *Manipulação de Coordenadas*: O código deve atualizar a posição do elemento na tela alterando diretamente as propriedades style.left (eixo X horizontal) e style.top (eixo Y vertical). O valor numérico calculado na lógica deve ser obrigatoriamente concatenado com a unidade de medida visual em pixels (exemplo: x + 'px').

- *Restrição de Cenário (Bônus)*: Implementar lógicas condicionais para monitorar a posição atual e impedir que as coordenadas da nave ultrapassem as dimensões limite da área útil do jogo.

- *Animação Contínua (Bônus Master)*: Evoluir o algoritmo para que o movimento da nave seja contínuo e perfeitamente fluido. Isso exige que o código transcenda a repetição padrão do sistema operacional, utilizando o gerenciamento de eventos de teclado em conjunto com lógicas de temporização de quadros, como o setTimeout.
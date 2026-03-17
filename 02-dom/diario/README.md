# Exercício Prático: Diário Virtual 

---

## Objetivo da Atividade

O objetivo desta atividade é construir uma aplicação web de registro de textos baseada em eventos. O aluno praticará a extração de valores de campos de texto multilinhas, a formatação de objetos de data nativos do JavaScript e a inserção e remoção dinâmica de elementos no DOM para visualização em tempo real.

## Especificações Técnicas do Sistema

O aplicativo deve ser estruturado com base na entrada de dados pelo usuário e na manipulação de listas no documento, cumprindo os seguintes requisitos:

- *Estrutura de Entrada de Dados*: A interface da aplicação deve utilizar uma tag textarea para permitir que o usuário informe o texto que deseja registrar.

- *Mecânica de Publicação*: O sistema deve possuir um botão de submissão (ex: "POSTAR"). Quando este botão for acionado por um evento de clique, o texto capturado deve ser formatado e inserido na página para visualização imediata.

- *Registro de Data e Hora (Timestamp)*: Cada nova postagem inserida na tela deve, obrigatoriamente, exibir a data e a hora exatas do momento da ação. Para esta funcionalidade, o sistema deve instanciar a classe de data e utilizar o método `new Date().toLocaleString('pt-BR')` para garantir a formatação no padrão brasileiro.

- *Mecânica de Limpeza*: A interface deve conter um segundo botão com a finalidade exclusiva de "resetar" a aplicação, ou seja, ao ser clicado, ele deve limpar todo o conteúdo das postagens visíveis na página.

- *Remoção de Postagens (Bônus)*: A interface deve permitir a remoção individual de cada postagem publicada, utilizando um botão de exclusão associado a cada elemento de visualização.

- *Edição de Postagens (Bônus Plus++)*: A interface deve permitir a edição do conteúdo de cada postagem publicada, utilizando um botão de edição associado a cada elemento de visualização. A lógica de edição deve permitir que o usuário modifique o texto e atualize a data/hora para refletir a última modificação.
# Exercício Prático: Agenda de Contatos

## Objetivo da Atividade

O objetivo desta prática é criar um mural de contatos da escola com categorias, destaque de favorito e filtro por busca, sempre mantendo a lista em memória e persistida no `localStorage`.

## Conceitos trabalhados

- array de objetos;
- `localStorage` como persistência do cadastro;
- categorização por tipo de contato;
- destaque visual de favorito;
- remoção individual;
- filtro visual da lista;
- renderização baseada no estado atual da aplicação.

## Especificações Técnicas do Sistema

O aplicativo deve atender aos seguintes pontos:

- o usuário informa nome, telefone e categoria (colega, professor(a), administrativo, terceirizado);
- cada contato deve ser salvo em um array de objetos;
- o array deve ser persistido na chave `agenda-contatos`;
- a lista deve ser carregada ao abrir a página;
- cada contato deve ter um botão para marcar/desmarcar favorito;
- cada contato deve ter um botão para remoção;
- um campo de busca deve filtrar visualmente os contatos pelo nome.

## O que observar durante a prática

- o filtro não precisa alterar a lista principal em memória;
- remover um contato muda a memória e exige regravação do storage;
- marcar favorito também muda a memória e exige regravação;
- na renderização dinâmica, prefira criar elementos com `createElement` e ligar eventos diretamente, sem `data-*`;
- a tela deve sempre ser reconstruída a partir do estado atual.
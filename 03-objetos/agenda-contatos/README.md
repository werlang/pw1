# Exercício Prático: Agenda de Contatos

## Objetivo da Atividade

O objetivo desta prática é cadastrar contatos como objetos e pesquisar informações dentro de um array de registros estruturados.

## Conceitos trabalhados

- array de objetos;
- `push()`;
- `filter()`;
- `find()`;
- renderização de lista;
- busca por propriedade.

## Especificações Técnicas do Sistema

O sistema deve manter uma agenda em array, em que cada contato seja um objeto com múltiplas propriedades.

O aplicativo deve permitir:

- cadastrar nome, telefone e cidade de um contato;
- guardar cada contato em um objeto;
- inserir novos objetos em um array principal;
- listar todos os contatos cadastrados;
- filtrar contatos por nome;
- destacar o primeiro contato encontrado na busca.

## Estrutura mínima esperada

- campos para nome, telefone e cidade;
- um botão para cadastrar;
- um campo de busca por nome;
- uma área para listar os contatos;
- uma área para destacar um resultado principal, quando houver.

## Regras de funcionamento

- cada novo cadastro deve virar um objeto antes de ser enviado ao array;
- a busca deve analisar pelo menos a propriedade `nome` de cada contato;
- `filter()` pode ser usado para montar a lista filtrada;
- `find()` pode ser usado para destacar o primeiro resultado correspondente;
- se não houver resultados, a interface deve informar isso claramente.

## O que observar durante a prática

- quando cada item tem várias informações, objetos deixam o código mais organizado;
- arrays de objetos combinam bem com pesquisas e listagens;
- a interface deixa de depender de texto solto e passa a depender das propriedades de cada contato.
---
name: criador-exercicios
description: Use esta skill ao criar ou revisar exercícios práticos deste repositório, especialmente em seções didáticas de HTML, CSS, JavaScript, DOM, arrays, objetos e PHP. Ela ajuda a produzir enunciados concretos em PT-BR, com objetivos claros, requisitos operacionais, reaproveitamento de conteúdos anteriores e estrutura compatível com a organização pedagógica do projeto.
---

# Criador de Exercícios

Use esta skill quando o pedido envolver criar, expandir, revisar ou reorganizar exercícios práticos em qualquer seção do curso.

## Objetivo

Produzir exercícios que sejam:

- claros para estudantes iniciantes;
- práticos e verificáveis;
- coerentes com o conteúdo já estudado;
- locais à pasta da seção ou do exercício;
- escritos em PT-BR correto, com acentuação adequada no texto didático e nos rótulos visíveis.

## Regras do repositório

- Prefira soluções simples, explícitas e fáceis de explicar em aula.
- Mantenha as mudanças locais à pasta do exercício.
- Não introduza frameworks ou dependências novas sem pedido explícito.
- Preserve nomes em português quando o contexto já estiver em português.
- Em textos didáticos, use ortografia correta em PT-BR.

## Fluxo recomendado

1. Identifique a seção e o que já foi estudado antes dela.
2. Leia o README da seção para manter continuidade pedagógica.
3. Verifique exemplos vizinhos para copiar o nível de dificuldade e o formato esperado.
4. Defina um problema concreto do mundo real ou escolar.
5. Escolha o estado da aplicação de forma didática:
	- arrays simples para listas lineares;
	- objetos para representar uma entidade;
	- arrays de objetos para coleções estruturadas;
	- DOM como camada de exibição e interação.
6. Crie ou revise o README do exercício com requisitos observáveis.
7. Implemente HTML, CSS e JavaScript de forma consistente com o enunciado.
8. Valide se o exercício realmente exige os conceitos da seção e, quando fizer sentido, reutiliza conteúdos anteriores.

## Como escrever o README do exercício

Use uma estrutura parecida com esta:

1. Título do exercício.
2. Objetivo da atividade.
3. Conceitos trabalhados.
4. Especificações técnicas do sistema.
5. Estrutura mínima esperada.
6. Regras de funcionamento.
7. O que observar durante a prática.

## Critérios de qualidade do enunciado

O README não deve ficar só em descrições genéricas como "crie um sistema" ou "manipule dados".

O enunciado deve deixar claro:

- quais dados existem;
- onde esses dados ficam armazenados;
- quais ações o usuário pode fazer;
- o que deve mudar na interface após cada ação;
- quais validações mínimas precisam existir;
- quais conceitos da seção estão sendo exercitados.

## Continuidade pedagógica

Sempre que for conveniente, reaproveite conteúdos anteriores.

Exemplos:

- em DOM, use arrays ou objetos como estado da interface;
- em objetos, use formulários simples para atualizar propriedades;
- em arrays, transforme listas em resumos, filas, rankings ou coleções visuais;
- em exercícios posteriores, trate o DOM como exibição dos dados e não como única fonte de verdade.

## Padrões por tipo de exercício

### Arrays

- Use problemas com ordem, coleção, busca, filtro, soma, média, contagem ou fila.
- Faça a interface refletir exatamente o conteúdo do array.
- Evite depender de variáveis soltas quando o array pode ser a fonte principal.

### Objetos

- Use objetos para representar entidades como aluno, produto, contato, postagem ou tarefa.
- Garanta que propriedades tenham propósito visível na tela.
- Se houver vários registros, prefira array de objetos.

### DOM

- Deixe claro quais elementos serão atualizados ou criados dinamicamente.
- Se o exercício ficar melhor com estado explícito, use array ou objeto para controlar a renderização.
- Eventos devem ter efeito observável e imediato na interface.

## Implementação

- HTML: estrutura enxuta, nomes claros, rótulos em português.
- CSS: suficiente para distinguir áreas, estados e ações.
- JavaScript: funções pequenas, nomes autoexplicativos, fluxo direto.
- Comentários: apenas quando ajudarem a explicar algo menos óbvio.

## Checklist final

Antes de concluir, confirme:

- o exercício está compatível com a seção e com os conhecimentos anteriores;
- o README diz com precisão o que o aluno deve construir;
- a interface implementada corresponde ao enunciado;
- o texto está em PT-BR correto;
- a solução está simples o bastante para uso em aula.

Se precisar de um modelo enxuto de estrutura para README, leia [./references/readme-modelo.md](./references/readme-modelo.md).

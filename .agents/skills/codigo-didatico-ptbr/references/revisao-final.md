# Revisão Final de Código Didático

Use este checklist antes de concluir qualquer tarefa de código neste repositório.

## Checklist

1. O código está compatível com o nível de ensino médio?
2. A solução evita abstrações e atalhos desnecessários?
3. Os nomes de variáveis, funções e elementos ajudam a entender o fluxo?
4. O arquivo mostra a lógica em passos visíveis e explicáveis?
5. Os comentários em PT-BR aparecem nos pontos de dúvida real?
6. Os comentários explicam intenção, regra ou consequência, e não apenas repetem a linha de código?
7. O exemplo usa dados concretos e fáceis de reconhecer?
8. A mudança ficou local à pasta alvo e consistente com o restante da seção?
9. O item dinâmico é criado com `createElement`, recebe o conteúdo por `innerHTML` dentro dele e tem o evento ligado no mesmo laço?
10. As mensagens e confirmações passam pelos componentes do projeto (`showToast()`, `confirmar()`), e não por `alert()` ou `confirm()` nativos?
11. O código evita `try/catch` sem motivo e helpers que só existem para organizar?

## Sinais de alerta

- funções grandes demais para explicar em aula de forma tranquila;
- lógica compacta demais para iniciantes;
- nomes genéricos como `data`, `item`, `handleThing`, `tmp`;
- comentários em inglês;
- comentários excessivos que poluem mais do que ajudam;
- dependências ou padrões novos sem necessidade pedagógica;
- HTML de lista montado numa string e atribuído de uma vez no container;
- `querySelectorAll` + índice para descobrir qual item foi clicado;
- `alert()` ou `confirm()` nativos em código novo;
- `try/catch` em toda chamada, exatamente o visual de código gerado sem contexto de aula.

## Ajustes comuns

- quebrar um bloco grande em etapas menores;
- trocar nomes vagos por nomes mais concretos;
- mover uma regra importante para um comentário curto acima do bloco;
- transformar uma expressão esperta em uma sequência mais explícita;
- simplificar a renderização para facilitar a leitura do DOM e do estado.

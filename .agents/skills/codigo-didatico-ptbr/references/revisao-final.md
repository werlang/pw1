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

## Sinais de alerta

- funções grandes demais para explicar em aula de forma tranquila;
- lógica compacta demais para iniciantes;
- nomes genéricos como `data`, `item`, `handleThing`, `tmp`;
- comentários em inglês;
- comentários excessivos que poluem mais do que ajudam;
- dependências ou padrões novos sem necessidade pedagógica.

## Ajustes comuns

- quebrar um bloco grande em etapas menores;
- trocar nomes vagos por nomes mais concretos;
- mover uma regra importante para um comentário curto acima do bloco;
- transformar uma expressão esperta em uma sequência mais explícita;
- simplificar a renderização para facilitar a leitura do DOM e do estado.

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
- criativos entre si, com fluxos de interação realmente diferentes quando o pedido envolver mais de um exercício;
- escritos em PT-BR correto, com acentuação adequada no texto didático e nos rótulos visíveis.

## Regras do repositório

- Prefira soluções simples, explícitas e fáceis de explicar em aula.
- Mantenha as mudanças locais à pasta do exercício.
- Não introduza frameworks ou dependências novas sem pedido explícito.
- Preserve nomes em português quando o contexto já estiver em português.
- Em textos didáticos, use ortografia correta em PT-BR.
- Em enunciados de exercícios e questões de prova, escreva com voz humana,
  frases naturais e transições claras. A precisão deve aparecer em dados,
  regras e critérios verificáveis, não em um texto burocrático ou truncado.
- Prefira verbos de ação e explique o contexto antes de listar exigências.
  Use listas para dados, limites e critérios; use frases completas para
  explicar a situação e o que o estudante precisa compreender.
- Faça uma leitura final como se fosse um estudante: elimine repetições,
  referências vagas, palavras desnecessariamente formais e frases que
  precisem ser relidas para fazer sentido. Não infantilize nem transforme o
  enunciado em conversa informal demais.
- Quando criar uma sequência de exercícios, não produza variações superficiais do mesmo fluxo com outro tema. Cada exercício deve mudar de forma observável o tipo de estado, a interação central ou a regra de negócio.
- Respeite o teto pedagógico da seção. Conteúdos anteriores podem ser reutilizados; conteúdos apresentados apenas em seções posteriores não podem ser exigidos.
- Trate exemplos e exercícios como categorias diferentes: exemplos podem continuar citados como referência; uma nova lista de exercícios deve substituir referências a listas antigas quando esse for o pedido.
- Para estudantes iniciantes, separe exercícios introdutórios de desafios de integração. Um exercício introdutório deve ter um conceito central, dados simples, uma saída principal e no máximo uma extensão opcional; marque os desafios que combinam várias regras para que eles não sejam o primeiro contato.
- Em exercícios de frontend, evite atributos `data-*` e `dataset`.
- Para ações em elementos criados dinamicamente, use criação explícita de nós (`createElement`), montagem com `append` / `appendChild` e eventos ligados diretamente com `addEventListener`.

## Fluxo recomendado

1. Identifique a seção, o que já foi estudado e o primeiro conteúdo que ainda não pode ser exigido.
2. Leia o README da seção para manter continuidade pedagógica.
3. Verifique exemplos vizinhos para copiar o nível de dificuldade e o formato esperado.
4. Quando houver múltiplos exercícios, monte antes uma matriz com: estado, ação principal, validação, saída e conceito novo de cada proposta.
5. Defina um problema concreto do mundo real ou escolar.
6. Planeje como os exercícios serão diferentes entre si. Varie a interação principal antes de trocar tema:
	- grade ou mapa visual;
	- votação, ranking ou agregação;
	- fluxo por etapas, wizard ou navegação por índice;
	- estado temporal com pausa, retomada ou expiração;
	- simulação, jogo, tentativa ou desafio;
	- rascunho, preferências, progresso ou histórico.
7. Escolha o estado da aplicação de forma didática:
	- arrays simples para listas lineares;
	- objetos para representar uma entidade;
	- arrays de objetos para coleções estruturadas;
	- objetos indexados por chave para mapas, grades e estados de lookup;
	- objetos de sessão para fluxos em andamento;
	- DOM como camada de exibição e interação.
8. Crie ou revise o README do exercício com requisitos observáveis.
9. Implemente o material solicitado. Se o pedido for apenas elaborar enunciados, não invente uma solução completa; deixe claros os arquivos esperados e os critérios de verificação.
10. Valide se o exercício realmente exige os conceitos da seção e, quando fizer sentido, reutiliza conteúdos anteriores.
11. Faça uma crítica professoral individual: identifique o que ainda soa genérico, previsível ou copiável de um tutorial e adapte a regra, o estado ou o fluxo.
12. Revise o conjunto completo e substitua exercícios que compartilhem o mesmo esqueleto, mesmo que os temas sejam diferentes.
13. Se guias ou slides citarem a prática, atualize os dois com os nomes e caminhos finais e procure referências antigas restantes.

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

## Variedade entre exercícios

Quando o usuário pedir vários exercícios novos, trate variedade como requisito, não como acabamento.

Evite entregar uma sequência em que todos seguem o mesmo esqueleto "formulário -> array -> lista", mudando apenas o assunto. Esse padrão pode aparecer em um exercício, mas os demais devem explorar fluxos distintos.

Bons sinais de variedade:

- o formato do estado muda entre exercícios, por exemplo array, objeto único, objeto indexado, sessão em andamento ou ranking consolidado;
- a ação principal muda, por exemplo ocupar posição, distribuir pontos, avançar etapa, pausar tempo, responder tentativa ou recuperar progresso;
- a validação muda de natureza, por exemplo conflito, soma exata, limite temporal, bloqueio de duplicidade, índice válido ou cálculo final;
- a renderização muda de estrutura, por exemplo grade, painel, ranking, tela por etapa, barra de progresso ou controle de timer.

Antes de aceitar o conjunto, compare cada par de exercícios. Trocar apenas nomes, cores, entidades ou contexto não conta como diferença. Duas propostas só podem permanecer quando o caminho mental necessário para resolvê-las for observavelmente diferente.

## Teto pedagógico

Para cada seção, registre mentalmente:

- conteúdos permitidos porque já foram apresentados;
- conteúdo central que deve ser praticado agora;
- conteúdos futuros que não podem virar requisito.

Não antecipe uma abstração apenas porque ela deixaria a solução mais elegante. Em uma sequência de PHP, por exemplo, uma aula de linguagem pode usar variáveis, decisões e laços sem exigir funções próprias; sessões não devem resolver um fluxo de formulários antes da seção de sessões.

## Crítica com olhar de professor

Critique cada exercício com perguntas concretas:

- ele aparece facilmente em uma busca como tutorial pronto?
- o aluno precisa tomar decisões ou apenas copiar uma receita?
- o enunciado torna visível o motivo de usar o conceito da seção?
- a validação revela um problema real do domínio?
- a saída permite conferir se a regra foi implementada?
- ele repete o mesmo estado e a mesma sequência de ações de outra proposta?

Se a resposta revelar genericidade, não tente corrigir apenas com outro tema. Mude uma regra estrutural: conflito, empate, retomada, expiração, transação, auditoria, compensação de falha, índice, agregação ou contrato.

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
- Não dependa de `data-*` para identificar ação ou item; prefira closures ou funções que recebam o objeto/ID no momento da criação do elemento.

## Implementação

- HTML: estrutura enxuta, nomes claros, rótulos em português.
- CSS: suficiente para distinguir áreas, estados e ações.
- JavaScript: funções pequenas, nomes autoexplicativos, fluxo direto.
- PHP: mantenha dados, cálculos, decisões e laços em blocos contínuos; quando
  um fluxo gerar HTML, use `echo` dentro do bloco e reserve `<?= $variavel ?>`
  para impressões inline curtas. Evite alternar várias vezes entre PHP e HTML
  dentro da mesma decisão ou repetição.
- Comentários: apenas quando ajudarem a explicar algo menos óbvio.

## Checklist final

Antes de concluir, confirme:

- o exercício está compatível com a seção e com os conhecimentos anteriores;
- o README diz com precisão o que o aluno deve construir;
- a interface implementada corresponde ao enunciado;
- o texto está em PT-BR correto;
- o enunciado é fluido quando lido em voz alta e continua preciso;
- a solução está simples o bastante para uso em aula.

Se precisar de um modelo enxuto de estrutura para README, leia [./references/readme-modelo.md](./references/readme-modelo.md).

---
name: guia-readme-para-slides
description: "Transform a didactic README guide into a concise Marp slide deck for class, aligned with the ifsul theme and the pattern of marp/content/00-introducao.md. Use when Agent needs to create, revise, or expand lecture slides from a README, summarize a long guide for aula, montar apresentacao Marp, criar slide de apoio para o professor, or produce a short teaching deck with image placeholders."
---

# Guia README para Slides

Esta skill serve para transformar um README-guia extenso em uma apresentação Marp curta, clara, envolvente e utilizável em aula.

O resultado esperado não é um texto corrido repartido em telas. O objetivo é produzir slides que:

- resumam o conteúdo essencial
- apoiem a apresentação oral do professor
- também funcionem como material resumido de consulta
- sigam o padrão visual da disciplina em `marp/content/00-introducao.md`
- respeitem o limite visual de cada slide
- tenham voz didática própria, com mais personalidade e mais apelo visual

## Quando usar

Use esta skill quando o pedido envolver:

- criar slides a partir de um README de uma secao
- converter um guia de referencia em apresentacao Marp
- resumir uma aula teorica em slides curtos
- montar material de apoio para apresentacao do professor
- padronizar slides de um novo assunto conforme o estilo do repositorio

## Objetivo

Produzir um arquivo Markdown para Marp com foco didático. Cada slide deve carregar uma ideia central, evitar excesso de texto e ajudar a manter a turma engajada.

O deck final deve equilibrar:

- síntese do conteúdo
- precisão técnica
- ritmo de apresentacao
- legibilidade em projetor
- reutilização posterior pelo professor
- linguagem mais viva e mais próxima dos estudantes

## Recursos desta skill

Use estes arquivos durante a execucao:

- `MARP-TEMPLATE.md` para iniciar o deck no formato da disciplina
- `CHECKLIST.md` para revisar densidade visual, estrutura e consistencia final

## Entradas esperadas

Antes de escrever os slides, identifique:

1. o README-guia que sera resumido
2. o nome do assunto e da secao
3. o local do arquivo de saida em `marp/content/`
4. se há exemplos práticos na pasta que merecem menção curta
5. se há exercícios, demos ou páginas publicadas que devam ser linkados

Se existir material complementar na pasta do assunto, use-o para calibrar exemplos, vocabulário, exercícios e links úteis. O README continua sendo a fonte principal, mas o deck deve conversar com a prática da seção.

## Regras do repositório

Antes de gerar os slides, respeite estas convenções:

- siga o padrao do arquivo `marp/content/00-introducao.md`
- use `theme: ifsul`
- mantenha `header: ' '` e o mesmo footer institucional
- preserve o tom didático em português
- use acentuação correta no texto dos slides; só deixe sem acento quando for código, identificador, caminho, URL ou citação literal
- mantenha o conteúdo claro para estudantes iniciantes, especialmente ensino médio
- trate o slide como apoio de aula, não como apostila completa
- se precisar de imagens, deixe apenas a descrição do que deve ser ilustrado
- quando o deck ainda nao tiver asset final, prefira um bloco `media` com comentario HTML no formato `Prompt de IA: ...` em vez de usar tag `img`
- em `marp/content/`, use apenas a nomenclatura utilitária atual de `marp/themes/positioning.css`
- nao use classes legadas como `grid-2`, `grid-3`, `span-2`, `vcenter`, `vbottom`, `vfill`, `align-center`, `align-left` ou `align-right`

## Convenções de layout Marp

Para layouts e posicionamento, trate `marp/themes/positioning.css` como a API oficial do tema.

Classes mais comuns:

- estrutura: `grid`, `grid-cols-2`, `grid-cols-3`, `col-span-2`, `gap-4`, `gap-6`
- flex: `flex`, `flex-row`, `flex-col`, `items-center`, `items-end`, `justify-between`, `justify-center`
- alinhamento por margem: `mx-auto`, `ml-auto`, `mr-auto`
- tamanho e ocupacao: `w-full`, `h-full`, `size-full`
- posicionamento: `relative`, `absolute`, `inset-0`, `top-0`, `right-0`, `bottom-0`, `left-0`
- midia: `object-cover`, `object-contain`, `object-center`
- sangria: `bleed-bottom`

Regra pratica:

- se o slide pede comparacao lado a lado, comece com `grid grid-cols-2 gap-6`
- se o slide pede texto com imagem lateral, comece com `grid grid-cols-3 gap-6` e use `col-span-2` para o texto
- se o conteudo precisa centralizar verticalmente, use `flex items-center`
- se a imagem precisa ir para a direita, use `ml-auto`
- se a imagem ou bloco precisa centralizar, use `mx-auto`
- se um bloco precisa sair do fluxo, combine `relative` e `absolute`

## Tom e linguagem

O tom esperado não é neutro demais. Prefira uma linguagem:

- didática, leve e conversada
- compatível com estudantes do ensino médio
- com humor pontual, sem virar piada interna o tempo todo
- tecnicamente correta, mas sem formalismo excessivo
- com vocabulário que soe próximo da aula ao vivo

Boas direções de tom:

- usar frases como “quando algo acontece”, “o navegador avisa”, “esse evento sobe pelo DOM”
- usar exemplos que soem concretos e familiares
- incluir títulos ou chamadas com energia quando isso melhorar o ritmo da apresentação

Evite:

- texto burocrático demais
- linguagem universitária excessivamente formal
- humor que dependa de humilhação do aluno ou de referência muito obscura

## Padrão de títulos

Quando fizer sentido para a fluidez do deck, prefira reforçar o assunto principal no `#` de cada slide e usar o `##` para o foco da tela.

Exemplo:

- `# Eventos em JavaScript`
- `## O objeto event`

Esse padrão ajuda a manter contexto visual constante durante a aula.

## Uso de imagens e apelo visual

As imagens sugeridas não precisam ser apenas literais. Prefira descrições de imagens que:

- ilustrem o conceito de forma figurativa
- chamem atenção e ajudem a engajar
- possam ser engraçadas, inesperadas ou memoráveis
- usem animais, memes, situações absurdas leves ou comparações visuais quando isso ajudar a aula

Exemplos de boas descrições:

- “animal protegendo a entrada para representar `preventDefault()`”
- “meme de reação para representar um evento sendo disparado”
- “imagem engraçada de algo escalando para ilustrar bubbling no DOM”

Se a imagem tiver função mais didática do que técnica, isso é aceitável. O objetivo é apoiar a explicação e prender atenção.

## Fluxo de trabalho

### 1. Ler e decompor o README

Antes de escrever qualquer slide:

- leia o README inteiro
- identifique objetivos de aprendizagem
- separe conceitos centrais de detalhes secundários
- marque trechos que devem virar fala do professor, não texto de slide
- observe o vocabulário da seção para aproximar o tom da aula
- procure exemplos, demos, exercícios e links publicados relacionados ao tema
- confira os decks ja existentes em `marp/content/` para manter ritmo, divisores e densidade visual compatíveis com o estado atual do projeto

### 2. Extrair a espinha dorsal do assunto

Monte um roteiro curto com 5 a 10 blocos, por exemplo:

1. abertura do assunto
2. definicao principal
3. fluxo mental ou mecanismo
4. partes importantes da API ou sintaxe
5. comparacoes relevantes
6. erros comuns
7. boas praticas
8. fechamento
9. exercícios ou próximos passos práticos

Nem todo assunto precisa usar todos esses blocos. Prefira cortar do que condensar demais um slide.

### 3. Converter topicos em slides

Cada slide deve responder a uma pergunta clara, como:

- o que e isso?
- para que serve?
- como funciona?
- quando usar?
- qual erro evitar?

Se um trecho exigir explicacao longa, divida em dois ou mais slides.

### 4. Ajustar para apresentação

Ao resumir:

- mantenha apenas palavras-chave, listas curtas e exemplos pequenos
- remova frases redundantes e explicações completas que pertencem ao README
- troque paragrafos extensos por bullets ou comparacoes lado a lado
- use slide divisor para separar blocos grandes do assunto
- prefira formulações com mais personalidade do que descrições excessivamente neutras
- preserve a energia de aula: clareza primeiro, secura nunca por padrão

### 5. Mapear prática, exercícios e links

Quando a seção tiver subpastas com exemplos, exercícios ou demos:

- inclua um bloco final de exercícios ou aplicações
- diga brevemente o que o aluno vai construir
- cite a pasta ou exercício correspondente
- inclua o link da versão publicada em GitHub Pages quando existir ou quando puder ser inferido com segurança a partir do padrão do repositório
- neste repositório, quando a secao estiver publicada no padrão atual, os links normalmente seguem `https://werlang.github.io/pw1/<secao>/<subpasta>/`
- quando útil, inclua também links de assets relevantes usados pelo exercício

O slide de exercício deve funcionar como ponte entre teoria e prática, não como mera lista de links.

### 6. Revisar o espaço visual

Antes de concluir, confira se cada slide cabe confortavelmente na area util.

Se houver risco de excesso:

- quebre o slide em dois
- reduza exemplos
- substitua texto por uma imagem sugerida
- use layout em grade quando fizer sentido
- considere dividir o conteúdo em duas telas: conceito e exercício, teoria e meme visual, definição e exemplo

## Estrutura recomendada do deck

Adapte ao assunto, mas em geral siga esta ordem:

1. slide de abertura com titulo da disciplina e do assunto
2. slide inicial com visao geral ou objetivos
3. slides de conceitos principais
4. slides de mecanismo, fluxo ou sintaxe
5. slides de exemplos minimos ou comparacoes
6. slide de erros comuns ou boas praticas
7. bloco final de exercícios, demos ou aplicações práticas
8. slide final de resumo

## Padrão visual esperado

Use o padrão do exemplo fornecido:

- frontmatter Marp no topo
- slide inicial com `<!-- _class: lead -->`
- separadores com `<!-- _class: divider -->` quando houver mudanca de bloco
- uso moderado de `grid`, `media`, `grid-cols-*`, `col-span-*`, `flex`, `items-*`, `justify-*`, `mx-auto`, `ml-auto`, `mr-auto`, `bleed-bottom`, `relative`, `absolute`, `size-full`
- imagens quando realmente ajudarem o professor a explicar ou quando deixarem o conceito mais memorável
- preferência por placeholders de imagem com intenção visual clara, não descrições genéricas demais

## Regras de densidade por slide

Estas regras sao obrigatorias para manter legibilidade:

- 1 ideia principal por slide
- preferencialmente 3 a 5 bullets por slide
- no maximo 6 bullets curtos quando a tela for simples
- evite bullets com mais de 2 linhas
- evite paragrafos longos
- codigo apenas quando for essencial e com no maximo 6 a 10 linhas visiveis
- comparacoes com muito texto devem usar grade em 2 colunas ou virar 2 slides
- se um slide parece apertado no editor, ele esta grande demais
- links podem aparecer no slide quando fizerem parte da condução prática da aula

## Como resumir conteudo extenso

Ao transformar texto longo em slide:

- converta definicoes em uma frase curta + 3 bullets
- converta explicacoes de fluxo em sequencias numeradas curtas
- converta listas extensas em grupos tematicos
- converta detalhes menos importantes em fala do professor, nao em texto na tela
- preserve termos tecnicos indispensaveis, mas reduza exemplos repetidos

## Uso de imagens e diagramas

Quando uma imagem for desejável, não invente um arquivo real. Use apenas a estrutura visual com descrição da ilustração.

Padrao recomendado:

```html
<div class="media mx-auto">
    <!-- Prompt de IA: fluxo do evento saindo do elemento filho e subindo pela arvore DOM, em estilo de infografico didatico -->
</div>
```

Prompts bons de imagem:

- dizem o que precisa ser ilustrado
- ajudam o professor a produzir o material depois
- evitam ser vagas como "imagem sobre o tema"
- podem indicar humor, contraste visual ou atmosfera da tela
- podem indicar estilo visual, enquadramento e composicao quando isso ajudar a gerar a imagem depois

## Tratamento de exemplos e código

Exemplos em slide devem obedecer a estas regras:

- mostrar apenas o trecho indispensavel
- caber confortavelmente na tela
- reforcar um conceito que acabou de ser apresentado
- evitar duplicar exemplos muito parecidos
- soar relevantes para quem vai praticar logo depois

Se o README tiver muitos exemplos, escolha apenas:

- o exemplo minimo correto
- um contraste importante
- um erro comum pequeno, se isso ajudar a aula
- um exemplo prático ou exercício que dê vontade de testar

## Exercícios, demos e links

Se houver exercícios ou demos associados à seção, isso deve aparecer explicitamente no deck.

Preferências para esse bloco:

- incluir uma explicação curta do que cada exercício pede
- apontar a pasta ou nome do exercício
- incluir o link da demo rodando, quando existir
- usar formulações motivadoras, por exemplo jogos, nave, clique, bônus, desafios extras
- quando fizer sentido, separar um exercício principal e um slide só de bônus ou extensões

## Conteúdos que costumam virar fala, não slide

Evite despejar no slide:

- definicoes completas em varios periodos
- explicacoes historicas longas
- listas muito extensas de propriedades ou eventos
- detalhes de excecao que nao sao centrais para a aula

Esses itens podem permanecer no README e serem apenas mencionados na apresentação.

## Template

Use o arquivo `MARP-TEMPLATE.md` desta skill como ponto de partida e revise com o apoio de `CHECKLIST.md`.

## Revisão final

Antes de concluir, releia `CHECKLIST.md` slide a slide. Se um slide parecer apertado no editor, reescreva ou divida.

## Saída esperada

Ao aplicar esta skill, o agente deve:

1. ler o README-guia por inteiro
2. extrair os conceitos realmente essenciais
3. montar um roteiro curto de apresentacao
4. gerar um arquivo Marp no padrao da disciplina
5. revisar a densidade visual slide a slide
6. deixar placeholders de imagem como comentarios `Prompt de IA: ...` quando eles fizerem falta
7. usar português com acentuação correta
8. adotar um tom mais vivo, leve e compatível com ensino médio
9. incluir exercícios, demos e links publicados quando houver material correspondente
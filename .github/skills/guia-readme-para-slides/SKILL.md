---
name: guia-readme-para-slides
description: "Use when creating, revising, or expanding Marp slides from a README guide for a class topic. Trigger for requests like: criar slide a partir do README, transformar guia em slides, resumir README para aula, montar apresentacao Marp, criar material resumido para o professor, converter guia em slide de apoio."
---

# Guia README para Slides

Esta skill serve para transformar um README-guia extenso em uma apresentacao Marp curta, clara e utilizavel em aula.

O resultado esperado nao e um texto corrido repartido em telas. O objetivo e produzir slides que:

- resumam o conteudo essencial
- apoiem a apresentacao oral do professor
- tambem funcionem como material resumido de consulta
- sigam o padrao visual da disciplina em `marp/content/00-introducao.md`
- respeitem o limite visual de cada slide

## Quando usar

Use esta skill quando o pedido envolver:

- criar slides a partir de um README de uma secao
- converter um guia de referencia em apresentacao Marp
- resumir uma aula teorica em slides curtos
- montar material de apoio para apresentacao do professor
- padronizar slides de um novo assunto conforme o estilo do repositorio

## Objetivo

Produzir um arquivo Markdown para Marp com foco didatico. Cada slide deve carregar uma ideia central e evitar excesso de texto.

O deck final deve equilibrar:

- sintese do conteudo
- precisao tecnica
- ritmo de apresentacao
- legibilidade em projetor
- reutilizacao posterior pelo professor

## Entradas esperadas

Antes de escrever os slides, identifique:

1. o README-guia que sera resumido
2. o nome do assunto e da secao
3. o local do arquivo de saida em `marp/content/`
4. se ha exemplos praticos na pasta que merecem mencao curta

Se existir material complementar na pasta do assunto, use-o apenas para calibrar exemplos e vocabulario. O README continua sendo a fonte principal.

## Regras do repositorio

Antes de gerar os slides, respeite estas convencoes:

- siga o padrao do arquivo `marp/content/00-introducao.md`
- use `theme: ifsul`
- mantenha `header: ' '` e o mesmo footer institucional
- preserve o tom didatico em portugues
- mantenha o conteudo claro para estudantes iniciantes
- trate o slide como apoio de aula, nao como apostila completa
- se precisar de imagens, deixe apenas a descricao do que deve ser ilustrado

## Fluxo de trabalho

### 1. Ler e decompor o README

Antes de escrever qualquer slide:

- leia o README inteiro
- identifique objetivos de aprendizagem
- separe conceitos centrais de detalhes secundarios
- marque trechos que devem virar fala do professor, nao texto de slide

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

Nem todo assunto precisa usar todos esses blocos. Prefira cortar do que condensar demais um slide.

### 3. Converter topicos em slides

Cada slide deve responder a uma pergunta clara, como:

- o que e isso?
- para que serve?
- como funciona?
- quando usar?
- qual erro evitar?

Se um trecho exigir explicacao longa, divida em dois ou mais slides.

### 4. Ajustar para apresentacao

Ao resumir:

- mantenha apenas palavras-chave, listas curtas e exemplos pequenos
- remova frases redundantes e explicacoes completas que pertencem ao README
- troque paragrafos extensos por bullets ou comparacoes lado a lado
- use slide divisor para separar blocos grandes do assunto

### 5. Revisar o espaco visual

Antes de concluir, confira se cada slide cabe confortavelmente na area util.

Se houver risco de excesso:

- quebre o slide em dois
- reduza exemplos
- substitua texto por uma imagem sugerida
- use layout em grade quando fizer sentido

## Estrutura recomendada do deck

Adapte ao assunto, mas em geral siga esta ordem:

1. slide de abertura com titulo da disciplina e do assunto
2. slide inicial com visao geral ou objetivos
3. slides de conceitos principais
4. slides de mecanismo, fluxo ou sintaxe
5. slides de exemplos minimos ou comparacoes
6. slide de erros comuns ou boas praticas
7. slide final de resumo

## Padrao visual esperado

Use o padrao do exemplo fornecido:

- frontmatter Marp no topo
- slide inicial com `<!-- _class: lead -->`
- separadores com `<!-- _class: divider -->` quando houver mudanca de bloco
- uso moderado de `grid`, `media`, `align-right`, `align-center`, `align-bottom`, `size-v`
- imagens apenas quando realmente ajudarem o professor a explicar

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

## Como resumir conteudo extenso

Ao transformar texto longo em slide:

- converta definicoes em uma frase curta + 3 bullets
- converta explicacoes de fluxo em sequencias numeradas curtas
- converta listas extensas em grupos tematicos
- converta detalhes menos importantes em fala do professor, nao em texto na tela
- preserve termos tecnicos indispensaveis, mas reduza exemplos repetidos

## Uso de imagens e diagramas

Quando uma imagem for desejavel, nao invente um arquivo real. Use apenas a estrutura visual com descricao da ilustracao.

Padrao recomendado:

```html
<div class="media align-center">
    <!-- Imagem sugerida: fluxo do evento saindo do elemento filho e subindo pela arvore DOM -->
</div>
```

Descricoes boas de imagem:

- dizem o que precisa ser ilustrado
- ajudam o professor a produzir o material depois
- evitam ser vagas como "imagem sobre o tema"

## Tratamento de exemplos e codigo

Exemplos em slide devem obedecer a estas regras:

- mostrar apenas o trecho indispensavel
- caber confortavelmente na tela
- reforcar um conceito que acabou de ser apresentado
- evitar duplicar exemplos muito parecidos

Se o README tiver muitos exemplos, escolha apenas:

- o exemplo minimo correto
- um contraste importante
- um erro comum pequeno, se isso ajudar a aula

## Conteudos que costumam virar fala, nao slide

Evite despejar no slide:

- definicoes completas em varios periodos
- explicacoes historicas longas
- listas muito extensas de propriedades ou eventos
- detalhes de excecao que nao sao centrais para a aula

Esses itens podem permanecer no README e serem apenas mencionados na apresentacao.

## Checklist de revisao

Antes de entregar:

- confirme que o deck segue o tema e a estrutura do exemplo
- confirme que o texto foi resumido de verdade, e nao apenas copiado
- confirme que nao ha slide visualmente apertado
- confirme que cada slide sustenta uma fala do professor
- confirme que o material ainda funciona como resumo posterior

## Template

Use o arquivo `MARP-TEMPLATE.md` desta skill como ponto de partida e revise com o apoio de `CHECKLIST.md`.

## Saida esperada

Ao aplicar esta skill, o agente deve:

1. ler o README-guia por inteiro
2. extrair os conceitos realmente essenciais
3. montar um roteiro curto de apresentacao
4. gerar um arquivo Marp no padrao da disciplina
5. revisar a densidade visual slide a slide
6. deixar descricoes de imagens quando elas fizerem falta
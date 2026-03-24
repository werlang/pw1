# Checklist de Slides

Use esta lista antes de concluir um deck gerado a partir de README.

## Estrutura geral

- o arquivo esta em Markdown para Marp
- o frontmatter usa `marp: true`
- o tema e `ifsul`
- `header: ' '` e o footer institucional foram mantidos
- existe slide de abertura no padrao da disciplina
- existe slide final de resumo

## Qualidade didatica

- o deck resume o README em vez de copiar blocos grandes de texto
- cada slide sustenta uma explicacao oral clara
- a ordem dos slides vai do basico ao importante
- os termos tecnicos foram mantidos apenas quando necessarios
- exemplos foram reduzidos ao minimo util
- o texto usa acentuacao correta quando nao for codigo ou URL
- o tom soa proximo da fala em sala, sem ficar burocratico demais
- a linguagem conversa bem com estudantes do ensino medio

## Densidade visual

- cada slide tem uma ideia principal
- a maioria dos slides tem de 3 a 5 bullets
- nao ha bullets longos quebrando varias linhas
- nao ha paragrafos extensos na tela
- nao ha bloco de codigo maior do que o necessario
- nao ha combinacao de lista longa + imagem + codigo no mesmo slide
- os links presentes na tela sao poucos e entram como parte da aula, nao como excesso visual

## Layout

- grades foram usadas apenas quando ajudam a comparar informacoes
- layouts usam a nomenclatura utilitaria atual de `marp/themes/positioning.css`
- nao ha classes legadas como `grid-2`, `grid-3`, `span-2`, `vcenter`, `vbottom`, `vfill`, `align-center`, `align-left` ou `align-right`
- slides divisores foram usados para separar blocos grandes
- imagens foram substituidas por descricoes claras quando necessario
- quando nao houver asset final, os placeholders de imagem usam comentario HTML com `Prompt de IA: ...`
- os prompts de imagem tem intencao visual clara e, quando util, um toque bem-humorado ou memoravel
- nenhum slide parece apertado no editor

## Consistencia com o repositorio

- o estilo segue `marp/content/00-introducao.md`
- o texto esta em portugues e com tom didatico
- o slide funciona como apoio ao professor e como resumo posterior
- ha bloco de exercicios, demos ou aplicacoes quando a secao pede isso
- os exercicios explicam rapidamente o que fazer e trazem link da demonstracao quando houver
- os links publicados seguem o padrao atual do repositorio quando ele puder ser inferido com seguranca
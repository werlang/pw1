---
name: "Gerar Guia e Slides da Secao"
description: "Gerar ou atualizar o README-guia, a apresentacao Marp e a pagina slide/index.html de uma secao no mesmo padrao de 00-introducao, 01-eventos, 02-arrays, 03-objetos e 04-dom."
argument-hint: "Informe a secao, pasta ou assunto. Ex.: 05-fetch, 04-dom/lista-tarefas ou 'conteudo sobre fetch'"
agent: "agent"
---

Gere o pacote didatico completo de uma secao deste repositorio com o minimo possivel de contexto extra do usuario.

## Objetivo

Produza ou atualize estes artefatos, mantendo o mesmo nivel de qualidade, completude, estilo didatico, estetica e padrao tecnico das secoes ja existentes:

- `README.md` da secao como guia de referencia didatico
- `marp/content/<secao>.md` como apresentacao Marp da aula
- `<secao>/slide/index.html` gerado a partir do build real do repositorio

## Fontes obrigatorias

Antes de editar, leia e siga estes arquivos como fonte de verdade:

- [guia-readme](../skills/guia-readme/SKILL.md)
- [guia-readme-para-slides](../skills/guia-readme-para-slides/SKILL.md)
- [copilot-instructions](../copilot-instructions.md)
- [guia Marp](../../marp/README.md)
- [slide 00-introducao](../../marp/content/00-introducao.md)
- [slide 01-eventos](../../marp/content/01-eventos.md)
- [slide 02-arrays](../../marp/content/02-arrays.md)
- [slide 03-objetos](../../marp/content/03-objetos.md)
- [slide 04-dom](../../marp/content/04-dom.md)
- [guia 00-introducao](../../00-introducao/README.md)
- [guia 01-eventos](../../01-eventos/README.md)
- [guia 02-arrays](../../02-arrays/README.md)

Se houver um README e um slide ja existentes para a secao alvo, eles tem prioridade sobre qualquer suposicao. Use o restante como calibracao de estilo, profundidade e organizacao.

## Como descobrir o alvo com minimo de contexto

Use esta ordem e so faca pergunta se ainda restar ambiguidade real:

1. argumento fornecido pelo usuario
2. arquivo atual aberto no editor
3. pasta do arquivo atual
4. secoes top-level existentes do repositorio
5. README ou pasta mais proxima semanticamente do assunto pedido

Se o usuario informar apenas o assunto, inferira a secao mais provavel pelo padrao do repositorio. Pergunte apenas quando houver mais de uma secao igualmente plausivel.

## Fluxo obrigatorio

1. Leia a secao alvo inteira antes de escrever.
2. Identifique exemplos, exercicios, demos publicadas e arquivos reais que devem aparecer no guia e nos slides.
3. Aplique primeiro o fluxo da skill [guia-readme](../skills/guia-readme/SKILL.md) para criar ou revisar o `README.md` da secao.
4. Em seguida, aplique o fluxo da skill [guia-readme-para-slides](../skills/guia-readme-para-slides/SKILL.md) para gerar ou revisar `marp/content/<secao>.md` a partir do guia final, nao de um rascunho.
5. Rode o build real em [marp/build.sh](../../marp/build.sh) para gerar ou atualizar `<secao>/slide/index.html`.
6. Valide o resultado final antes de encerrar.

## Requisitos do README-guia

O `README.md` deve seguir o mesmo padrao observado nas secoes atuais:

- PT-BR correto, claro e didatico
- tom de material de referencia para ensino medio
- progressao do simples para o importante
- secoes bem separadas, com titulos claros e reutilizaveis
- exemplos pequenos, corretos e alinhados com os arquivos reais da secao
- diferencas importantes, erros comuns, boas praticas e resumo final
- nenhuma dependencia nova e nenhuma abstracao desnecessaria

Nao escreva um texto generico. O guia precisa conversar com a pasta real da secao, com os exemplos reais e com os exercicios existentes.

## Requisitos dos slides

Os slides devem seguir exatamente o padrao visual e estrutural de [00-introducao](../../marp/content/00-introducao.md), [01-eventos](../../marp/content/01-eventos.md), [02-arrays](../../marp/content/02-arrays.md), [03-objetos](../../marp/content/03-objetos.md) e [04-dom](../../marp/content/04-dom.md):

- frontmatter com `marp: true`, `theme: ifsul`, `header: ' '` e o footer institucional atual
- slide inicial com titulo da disciplina, titulo do assunto, professor e email
- ritmo de aula parecido com o material ja criado: abertura, roteiro, blocos conceituais, divisores, exemplos, erros comuns, boas praticas, exercicios e ponte para pratica quando fizer sentido
- uma ideia central por slide
- texto enxuto, proprio para aula, sem virar apostila
- linguagem didatica, leve e natural, sem burocracia
- exemplos concretos e imediatamente legiveis
- links para demos e exercicios quando existirem no padrao publicado do repositorio
- placeholders de imagem no formato definido pelo guia Marp e pela skill de slides quando o asset final ainda nao existir
- uso exclusivo das classes utilitarias atuais de `marp/themes/positioning.css`
- proibido reintroduzir classes legadas como `grid-2`, `grid-3`, `span-2`, `vcenter`, `vbottom`, `vfill`, `align-center`, `align-left` e `align-right`

## Requisitos de estilo tecnico

Todo codigo mostrado ou gerado deve manter o mesmo estilo pedagogico do repositorio:

- JavaScript, HTML e CSS explicitos e simples
- nomes legiveis e coerentes com o assunto
- exemplos pensados para estudantes iniciantes
- comentarios apenas quando ajudarem de verdade a leitura
- sem frameworks e sem atalhos que escondam o raciocinio

## Regras de qualidade

- Extraia o maximo possivel de contexto do repositorio antes de perguntar qualquer coisa.
- Preserve e reaproveite o material real da secao alvo; nao sobrescreva a organizacao local sem motivo.
- Se houver lacunas no assunto, complete com conteudo coerente com a disciplina, mas sem inventar arquivos, demos ou assets inexistentes.
- Se a secao ainda nao tiver slides ou README, crie ambos no padrao atual, sem inaugurar um estilo novo.
- Se nao for possivel gerar `slide/index.html` por falta de ambiente para o build, informe isso explicitamente e diga qual comando faltou executar.

## Entrega esperada

Ao concluir:

1. informe quais arquivos foram criados ou atualizados
2. diga como o padrao atual foi preservado
3. relate a validacao executada
4. aponte qualquer limitacao real encontrada no build ou em assets
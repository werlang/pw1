---
name: guia-readme
description: "Transform section, lesson, topic, or mini-project README files into clear didactic reference guides in Portuguese, with consistent structure, small examples, and student-friendly explanations. Use when Agent needs to create, expand, rewrite, or standardize a README for aula, material de apoio, referencia conceitual, guia pratico, enunciado de exercicio, documentacao de API, or when requests mention: melhorar README, transformar slide em guia, criar guia de JS/DOM/eventos/PHP/fetch, padronizar documentacao didatica."
---

# Guia READMEs

Esta skill serve para transformar READMEs de secoes do repositorio em guias de referencia: materiais mais completos, corretos, didaticos e reutilizaveis em aula.

## Quando usar

Use esta skill quando o pedido envolver:

- melhorar um README para virar guia
- expandir conteudo de uma secao didatica
- padronizar material de apoio de uma pasta em `public/`, `exemplos/` ou `exercicios/`
- converter texto curto de slide em material de referencia
- revisar explicacoes tecnicas para ficarem mais precisas e mais uteis para estudantes

## Objetivo

Produzir um README que funcione como material de consulta. O texto deve equilibrar:

- clareza para estudantes iniciantes
- precisao tecnica suficiente para servir de referencia
- exemplos pequenos e concretos
- organizacao que facilite leitura posterior

## Recursos desta skill

Use estes arquivos quando precisar acelerar a execucao:

- `README-TEMPLATE.md` para partir de uma estrutura base
- `CHECKLIST.md` para revisar clareza, profundidade e consistencia final

## Regras do repositorio

Antes de editar, respeite estas convencoes:

- priorize explicacoes claras para estudantes, sem abstrair demais
- mantenha as mudancas locais a pasta alvo
- preserve termos em portugues quando esse ja for o padrao do material
- para frontend, use JavaScript vanilla e DOM direto
- para backend em PHP, mantenha o padrao de JSON ja usado no repositorio
- nao introduza frameworks ou dependencias novas
- se o README for servir de base para slides em `marp/content/`, organize o conteudo em blocos claros que possam virar telas curtas sem depender de classes legadas de layout

## Compatibilidade com slides da disciplina

Quando o README tiver alta chance de virar slides para aula, organize o texto em blocos claros que possam virar telas curtas. Siga as regras de estrutura e escrita de `CHECKLIST.md` para garantir que o material seja facilmente resumido em bullets e exemplos pequenos, e que os conceitos mais importantes possam ser destacados em telas separadas.

- mantenha secoes com uma ideia central por bloco
- prefira comparacoes curtas e exemplos pequenos
- destaque exercicios, demos e links de apoio de forma objetiva
- escreva subtitulos que possam ser resumidos facilmente em `#` e `##`
- evite estruturas que dependam de nomenclatura antiga de layout; a base atual dos slides e utilitaria

## Fluxo de trabalho

### 1. Levantar contexto minimo

Antes de reescrever o README:

- leia o arquivo atual por inteiro
- examine a pasta da secao para entender exemplos, arquivos e foco da aula
- procure um ou dois READMEs proximos para calibrar tom e profundidade

### 2. Identificar o tipo de material

Classifique o README em uma destas categorias:

1. referencia conceitual
2. guia pratico de implementacao
3. enunciado de exercicio
4. documentacao de API ou backend

Essa classificacao define a estrutura final.

### 3. Escolher a profundidade correta

O README deve ser mais forte que um slide, mas sem virar livro.

Priorize:

- definicoes objetivas
- explicacao de sintaxe e fluxo mental
- exemplos pequenos e corretos
- observacoes sobre erros comuns
- resumo dos pontos essenciais

Evite:

- texto inflado so para parecer completo
- jargao sem explicacao
- exemplos excessivamente longos
- repetir a mesma ideia em secoes diferentes

## Estrutura recomendada

Adapte conforme o assunto, mas em geral use esta ordem:

1. titulo claro da secao
2. introducao curta explicando o que o conteudo ensina
3. conceitos fundamentais
4. sintaxe ou mecanismo principal
5. exemplos comentados e pequenos
6. variacoes comuns ou comparacoes importantes
7. erros frequentes, armadilhas ou observacoes tecnicas
8. boas praticas
9. resumo final

## Estrutura por tipo

### A. Referencia conceitual

Boa para temas como eventos, DOM, arrays, fetch, sessoes, formularios.

Use preferencialmente:

- o que e
- para que serve
- estrutura basica
- propriedades, metodos ou partes importantes
- exemplos diretos
- observacoes tecnicas
- boas praticas
- resumo

### B. Guia pratico de implementacao

Boa para uma pratica passo a passo.

Use preferencialmente:

- objetivo da pratica
- o que ja existe pronto
- o que precisa ser implementado
- passos de implementacao
- trechos de codigo de apoio
- criterios de funcionamento esperado
- erros comuns

### C. Enunciado de exercicio

Boa para pastas de exercicios.

Use preferencialmente:

- contexto
- objetivo
- requisitos obrigatorios
- regras e restricoes
- entradas e saidas esperadas
- criterios de avaliacao ou checklist
- dicas sem entregar a solucao inteira

### D. Documentacao de API ou backend

Boa para PHP, endpoints e autenticacao.

Use preferencialmente:

- objetivo do endpoint ou modulo
- arquivos envolvidos
- dados recebidos
- validacoes necessarias
- formato da resposta JSON
- codigos e cenarios de erro
- sequencia logica da implementacao
- observacoes de seguranca e sessao

## Padrao de escrita

Ao escrever:

- use frases diretas e didaticas
- apresente primeiro o conceito e depois o exemplo
- prefira listas quando estiver enumerando comportamentos, eventos, regras ou requisitos
- use nomes de variaveis legiveis e coerentes com o assunto
- explique diferencas importantes, como `input` vs `change`, `target` vs `currentTarget`, `include` vs `require`, quando isso fizer sentido

## Padrao para exemplos

Exemplos devem seguir estas regras:

- curtos o suficiente para caber em uma leitura rapida
- corretos tecnicamente
- alinhados com os arquivos reais da secao
- sem depender de bibliotecas externas
- preferencialmente em portugues quando os identificadores da pasta ja estiverem em portugues

Sempre que possivel, mostre:

- um exemplo minimo
- uma explicacao linha a linha ou por blocos
- uma observacao sobre quando usar aquele padrao

## O que revisar tecnicamente

Antes de concluir, confira:

- se nao ha afirmacoes desatualizadas ou imprecisas
- se APIs obsoletas foram evitadas ou marcadas como legado
- se o texto diferencia comportamento padrao do navegador e comportamento controlado por JavaScript
- se os exemplos nao contradizem o restante do repositorio
- se a progressao vai do simples para o importante

## Template

Use o arquivo `README-TEMPLATE.md` desta skill como ponto de partida. Adapte a estrutura ao tipo de secao, sem seguir o template de forma rigida.

## Revisao final

Antes de concluir, releia `CHECKLIST.md` e confirme que o README ficou realmente melhor como guia, e nao apenas maior.

## Saida esperada

Ao aplicar esta skill, o agente deve:

1. ler o README atual e a pasta alvo
2. identificar o tipo de material
3. reescrever ou expandir o README com estrutura de guia
4. manter o texto claro, correto e reutilizavel
5. validar se o Markdown final ficou consistente
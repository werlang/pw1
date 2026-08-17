---
name: guia-readme-para-slides
description: Transforme um README-guia em apresentação Marp concisa para aula, alinhada ao tema IFSul e à progressão pedagógica do repositório. Use ao criar, revisar, resumir ou expandir slides em `marp/content/`, incluindo exemplos reais, exercícios atuais, links corretos, layouts utilitários e placeholders visuais quando necessário.
---

# Guia README para Slides

Crie slides que apoiem a explicação oral e continuem úteis como resumo. Não reparta o README em telas: selecione o que precisa ser visto enquanto o professor explica.

## Fontes obrigatórias

Antes de editar:

1. leia o README-guia inteiro;
2. inspecione exemplos, exercícios e links da seção;
3. confira `marp/content/00-introducao.md`;
4. consulte `marp/README.md` e `marp/themes/positioning.css`;
5. localize todas as referências antigas a exercícios.

O README é a fonte conceitual principal. O sistema de arquivos confirma nomes e caminhos. Preserve menções válidas a exemplos; substitua o inventário de exercícios quando ele tiver sido renovado.

## Estrutura da apresentação

Use somente os blocos necessários:

1. abertura no padrão da disciplina;
2. visão geral;
3. conceitos centrais;
4. mecanismo, sintaxe ou fluxo;
5. contraste ou erro importante;
6. exemplos reais;
7. exercícios atuais;
8. fechamento, se acrescentar síntese.

Prefira cortar conteúdo secundário a comprimir uma tela.

## Frontmatter e vocabulário visual

Mantenha:

```yaml
---
marp: true
theme: ifsul
header: ' '
footer: 'Instituto Federal Sul-rio-grandense | Campus Charqueadas'
---
```

Use as classes atuais de `marp/themes/positioning.css`:

- grade: `grid`, `grid-cols-*`, `col-span-*`, `gap-*`;
- flex: `flex`, `flex-row`, `flex-col`, `items-*`, `justify-*`;
- margens: `mx-auto`, `ml-auto`, `mr-auto`;
- tamanho: `w-full`, `h-full`, `size-full`;
- posição: `relative`, `absolute`, `inset-*`, `top-*`, `right-*`, `bottom-*`, `left-*`;
- mídia: `media`, `object-contain`, `object-cover`, `bleed-bottom`.

Não use `grid-2`, `grid-3`, `span-2`, `vcenter`, `vbottom`, `vfill`, `align-center`, `align-left` ou `align-right`.

## Densidade

Cada slide deve sustentar uma ideia principal.

- Use normalmente de 3 a 5 bullets.
- Não ultrapasse 6 bullets curtos.
- Limite código ao trecho indispensável, em geral de 6 a 10 linhas.
- Separe conceito e exemplo quando os dois disputarem espaço.
- Use duas colunas somente quando a comparação for real.
- Se a tela parecer apertada no Markdown, divida antes de gerar.

Para cinco exercícios, prefira dois slides: três propostas no primeiro e duas no segundo. Descreva o raciocínio distintivo, não apenas o tema.

## Tom e precisão

- Escreva em PT-BR correto, com acentuação.
- Use linguagem próxima da aula, sem infantilizar.
- Prefira exemplos concretos a nomes abstratos.
- Preserve termos técnicos indispensáveis.
- Não transforme humor em distração.
- Não antecipe conteúdos de seções futuras nos exercícios ou exemplos.
- Quando um slide apresentar um enunciado de exercício, prova ou questão,
  escreva uma situação curta e humana antes das exigências técnicas.
- Use frases naturais, verbos de ação e conectivos claros. Reserve bullets
  para dados, regras e critérios; não comprima uma explicação inteira em
  fragmentos nominais.
- Revise o texto para leitura fluida em voz alta: remova burocratês,
  repetições e referências vagas, mas preserve números, limites e condições
  que permitam verificar a resposta.

## Código

Mostre apenas o trecho que demonstra a ideia do slide. Um exemplo deve:

- estar correto;
- corresponder ao guia;
- usar dados legíveis;
- indicar o resultado quando isso evitar ambiguidade;
- não depender de biblioteca ausente.

Se vários métodos precisarem de exemplos próprios, repita a estrutura visual em slides separados.

## Imagens e placeholders

Na criação inicial, quando o asset ainda não existir, reserve o espaço com:

```html
<div class="media mx-auto">
    <img class="placeholder" alt="Prompt de IA: descrição completa da ilustração, da composição e da função didática no slide">
</div>
```

O `alt` deve começar com `Prompt de IA:` e explicar o que precisa ser visualizado. Não invente `src`.

Quando o asset real já existir e a tarefa incluir refinamento visual:

```html
<div class="media mx-auto h-full">
    <img class="h-full" src="../../marp/assets/exemplo.png" alt="Descrição objetiva da imagem">
</div>
```

## Exemplos e exercícios

Para exemplos:

- mantenha o nome e o caminho reais;
- diga o que observar;
- não apresente padrão inseguro sem aviso explícito.

Para exercícios:

- cite somente a lista atual;
- use o caminho final da seção;
- resuma a ação ou dificuldade que diferencia cada proposta;
- não produza cinco variações “formulário → lista” com temas trocados;
- divida a lista em mais de um slide quando necessário.

Após editar, pesquise no Markdown por caminhos antigos, títulos removidos, `exercicios/ex` e classes legadas.

## Validação

1. Leia [CHECKLIST.md](./CHECKLIST.md) slide a slide.
2. Execute `marp/build.sh`.
3. Confira se o HTML correspondente foi gerado.
4. Procure avisos de conteúdo excedente.
5. Inspecione visualmente slides alterados, especialmente os mais densos.

Use [MARP-TEMPLATE.md](./MARP-TEMPLATE.md) como base, não como roteiro obrigatório.

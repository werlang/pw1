# Marp da Disciplina

Este diretório concentra o material de slides da disciplina em Marp.

## Estrutura

- `content/`: arquivos Markdown fonte das apresentacoes
- `themes/ifsul.css`: tema visual principal
- `themes/positioning.css`: utilitários de layout e posicionamento usados nos slides
- `build.sh`: gera os HTMLs e publica cada apresentacao em sua pasta `../<nome>/slide/index.html`
- `watch.sh` e `watch.mjs`: apoio para fluxo de observação local

## Fonte de verdade para layout

O arquivo `themes/positioning.css` deve ser tratado como a API oficial de layout dos slides.

As apresentacoes em `content/` devem usar apenas a nomenclatura utilitária atual.

## Classes recomendadas

### Estrutura

- `grid`
- `grid-cols-2`, `grid-cols-3`, `grid-cols-4`
- `col-span-2`, `col-span-3`
- `gap-2`, `gap-4`, `gap-6`, `gap-8`

### Flex e alinhamento

- `flex`, `flex-row`, `flex-col`
- `items-start`, `items-center`, `items-end`
- `justify-start`, `justify-center`, `justify-between`, `justify-end`
- `mx-auto`, `ml-auto`, `mr-auto`

### Tamanho e posicionamento

- `w-full`, `h-full`, `size-full`
- `relative`, `absolute`
- `inset-0`, `inset-x-0`, `inset-y-0`
- `top-0`, `right-0`, `bottom-0`, `left-0`

### Mídia e sangria

- `object-contain`, `object-cover`, `object-center`
- `bleed-bottom`
- `media` como contêiner visual simples para imagens e placeholders
- `placeholder` para imagens temporárias que precisam renderizar espaço no slide sem asset real

## Classes que não devem voltar

Não reintroduza aliases legados. Evite:

- `grid-2`, `grid-3`
- `span-2`
- `vcenter`, `vbottom`, `vfill`
- `align-center`, `align-left`, `align-right`

Esses nomes foram removidos para manter um vocabulário previsível, escalável e fácil de ensinar.

## Receitas rápidas

### Comparação em duas colunas

```html
<div class="grid grid-cols-2 gap-6">
    <div>coluna A</div>
    <div>coluna B</div>
</div>
```

### Texto com imagem lateral

```html
<div class="grid grid-cols-3 gap-6 h-full">
    <div class="col-span-2">
        <ul>
            <li>ponto principal</li>
            <li>mais um ponto</li>
        </ul>
    </div>
    <div class="media ml-auto">
        <img src="..../../marp/assets/exemplo.webp" alt="Exemplo">
    </div>
</div>
```

### Placeholder de imagem com prompt de IA

```html
<div class="media mx-auto">
    <img class="placeholder" alt="Prompt de IA: ilustração didática e levemente bem-humorada do conceito principal, com composição horizontal para slide educacional">
</div>
```

Use esse padrão na criação inicial da apresentacao, quando o slide precisa reservar o espaço visual da imagem e o asset final ainda não existe.

Quando o asset final existir, ele pode substituir o placeholder em uma etapa posterior de refinamento.

Regras práticas:

- o prompt vai no atributo `alt`
- comece o `alt` com `Prompt de IA:`
- adicione outras classes na `img` só quando ajudarem no layout, como `h-full`, `w-full`, `object-contain` ou `ml-auto`
- não use `src` vazio nem comentário HTML como placeholder oficial

### Imagem real em asset local

```html
<div class="media mx-auto h-full">
    <img class="h-full" alt="Ilustração didática do conceito" src="../../marp/assets/exemplo.png">
</div>
```

Regra prática:

- placeholder serve como formato padrão de criação inicial dos slides
- se a imagem já foi produzida depois, use `src` real e um `alt` descritivo normal na etapa de refinamento
- para conceitos extensos, prefira quebrar em mais slides com exemplos concretos em vez de condensar métodos demais na mesma tela

### Centralização vertical simples

```html
<div class="flex items-center h-full">
    <p>Conteúdo centralizado no eixo vertical.</p>
</div>
```

### Imagem de fundo com texto por cima

```html
<div class="relative h-full overflow-hidden">
    <img class="absolute inset-0 size-full object-cover object-center" src="..../../marp/assets/fundo.webp" alt="Fundo">
    <div class="relative grid h-full place-items-center">
        <div class="w-full">
            <h3>Título</h3>
            <p>Texto acima da imagem.</p>
        </div>
    </div>
</div>
```

## Fluxo de trabalho recomendado

1. Criar ou editar a apresentacao em `content/`.
2. Reusar a linguagem didática da disciplina e o padrão estrutural de `content/00-introducao.md`.
3. Usar apenas classes utilitárias atuais de `themes/positioning.css`.
4. Executar `./build.sh` dentro de `marp/`.
5. Conferir o resultado em `../<nome-da-apresentacao>/slide/index.html`.

## Para agentes

Se você estiver gerando ou revisando slides:

- consulte este arquivo antes de inventar classes de layout
- prefira combinações pequenas e explícitas
- trate utilitário legado como regressão
- se precisar de um novo padrão visual recorrente, documente primeiro e só depois espalhe o uso pelas apresentacoes
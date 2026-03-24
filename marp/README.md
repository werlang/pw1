# Marp da Disciplina

Este diretório concentra o material de slides da disciplina em Marp.

## Estrutura

- `content/`: arquivos Markdown fonte dos decks
- `themes/ifsul.css`: tema visual principal
- `themes/positioning.css`: utilitários de layout e posicionamento usados nos slides
- `build.sh`: gera os HTMLs e publica cada deck em sua pasta `../<nome>/slide/index.html`
- `watch.sh` e `watch.mjs`: apoio para fluxo de observação local

## Fonte de verdade para layout

O arquivo `themes/positioning.css` deve ser tratado como a API oficial de layout dos slides.

Os decks em `content/` devem usar apenas a nomenclatura utilitária atual.

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
        <img src="/marp/assets/exemplo.webp" alt="Exemplo">
    </div>
</div>
```

### Centralização vertical simples

```html
<div class="flex items-center h-full">
    <p>Conteúdo centralizado no eixo vertical.</p>
</div>
```

### Imagem de fundo com texto por cima

```html
<div class="relative h-full overflow-hidden">
    <img class="absolute inset-0 size-full object-cover object-center" src="/marp/assets/fundo.webp" alt="Fundo">
    <div class="relative grid h-full place-items-center">
        <div class="w-full">
            <h3>Título</h3>
            <p>Texto acima da imagem.</p>
        </div>
    </div>
</div>
```

## Fluxo de trabalho recomendado

1. Criar ou editar o deck em `content/`.
2. Reusar a linguagem didática da disciplina e o padrão estrutural de `content/00-introducao.md`.
3. Usar apenas classes utilitárias atuais de `themes/positioning.css`.
4. Executar `./build.sh` dentro de `marp/`.
5. Conferir o resultado em `../<nome-do-deck>/slide/index.html`.

## Para agentes

Se você estiver gerando ou revisando slides:

- consulte este arquivo antes de inventar classes de layout
- prefira combinações pequenas e explícitas
- trate utilitário legado como regressão
- se precisar de um novo padrão visual recorrente, documente primeiro e só depois espalhe o uso pelos decks
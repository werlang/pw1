---
marp: true
theme: ifsul
header: ' '
footer: 'Instituto Federal Sul-rio-grandense | Campus Charqueadas'
---

<!-- _class: lead -->

# Guia Rápido
## Utilitários de layout no tema Marp

Grid, flex e alinhamento sem sofrer com CSS novo a cada slide.

---

# Ideia geral
## O que mudou

- O arquivo [marp/themes/positioning.css](marp/themes/positioning.css) agora oferece classes utilitárias no estilo Tailwind
- O foco é montagem rápida de layout dentro do slide
- A ideia e usar apenas a nomenclatura utilitária nova

```html
<div class="grid grid-cols-3 gap-6">
    <div class="col-span-2">conteudo</div>
    <div>imagem</div>
</div>
```

---

# Grid
## Estrutura base

<div class="grid grid-cols-3 gap-4 h-full">
<div>

- Use `grid`
- Defina colunas com `grid-cols-*`
- Controle espacamento com `gap-*`

</div>
<div class="col-span-2">

```html
<div class="grid grid-cols-3 gap-4">
    <div>A</div>
    <div class="col-span-2">B</div>
</div>
```

</div>
</div>

---

# Grid
## Colunas e spans

<div class="grid grid-cols-4 gap-2 h-full">
    <div class="col-span-1">`col-span-1`</div>
    <div class="col-span-2">`col-span-2`</div>
    <div class="col-span-1">`col-span-1`</div>
    <div class="col-span-4">`col-span-4` ocupa tudo</div>
</div>

---

# Flex
## Linha e coluna

<div class="grid grid-cols-2 gap-6 h-full">
<div>

```html
<div class="flex flex-row gap-4 items-center">
    <div>icone</div>
    <div>texto</div>
</div>
```

</div>

- `flex` ativa o Flexbox
- `flex-row` organiza na horizontal
- `flex-col` organiza na vertical
- `grow` faz o item expandir

</div>

---

# Alinhamento
## Eixo principal e eixo cruzado

<div class="grid grid-cols-2 gap-6 h-full">
<div>

- `justify-*` controla o eixo principal
- `items-*` controla o eixo cruzado
- `place-items-*` resolve os dois de uma vez no grid

</div>
<div>

```html
<div class="flex justify-between items-center">
    <div>esquerda</div>
    <div>direita</div>
</div>
```

</div>
</div>

---

# Auto posicionamento
## Centralizar sem gambiarra

<div class="grid grid-cols-2 gap-6 h-full">
    <div>

```html
<div class="w-full">
    <img class="mx-auto" src="...">
</div>
```

    </div>
    <div>

- `mx-auto` centraliza horizontalmente
- `ml-auto` empurra para a direita
- `mr-auto` empurra para a esquerda
- Prefira os utilitários novos em todos os slides

    </div>
</div>

---

# Receita rápida
## Texto grande + imagem lateral

```html
<div class="grid grid-cols-3 gap-6 h-full">
    <div class="col-span-2 flex flex-col justify-center">
        <ul>
            <li>explicacao principal</li>
            <li>mais um ponto importante</li>
        </ul>
    </div>
    <div class="media self-center ml-auto">
        <img src="/marp/assets/exemplo.webp" alt="Exemplo">
    </div>
</div>
```

---

# Combinações úteis
## Padrões que resolvem bem

| Objetivo | Combinação sugerida |
| --- | --- |
| Duas colunas | `grid grid-cols-2 gap-6` |
| Texto + imagem | `grid grid-cols-3` + `col-span-2` |
| Centralizar conteúdo | `flex items-center justify-center` |
| Centralizar bloco | `mx-auto` |
| Card vertical | `flex flex-col gap-4` |
| Ocupar toda a altura | `h-full` |

---

# Resumo
## Regra prática

- Para estrutura: `grid`, `grid-cols-*`, `col-span-*`, `gap-*`
- Para fluxo: `flex`, `flex-row`, `flex-col`, `grow`
- Para alinhamento: `justify-*`, `items-*`, `place-*`
- Para margem automática: `mx-auto`, `ml-auto`, `mr-auto`

Se a classe parece nome de utilitário, a ideia está certa.
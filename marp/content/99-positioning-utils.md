---
marp: true
theme: ifsul
header: ' '
footer: 'Instituto Federal Sul-rio-grandense | Campus Charqueadas'
---

<!-- _class: lead -->

# Guia Rápido
## Posicionamento, tamanho e mídia

Classes utilitárias para controlar o slide com mais precisão.

---

# Tamanho
## O trio mais usado

<div class="grid grid-cols-2 gap-6 h-full">
<div>

- `w-full` ocupa toda a largura disponível
- `h-full` ocupa toda a altura disponível
- `size-full` faz os dois ao mesmo tempo

</div>
<div>

```html
<div class="grid h-full">
    <div class="size-full">bloco</div>
</div>
```

</div>
</div>

---

# Position
## Relative e absolute

<div class="grid grid-cols-2 gap-6 h-full">
<div>

```html
<div class="relative h-full">
    <img class="absolute right-0 bottom-0" src="...">
</div>
```

</div>
<div>

- `relative` cria o contexto de posicionamento
- `absolute` tira o elemento do fluxo normal
- Use junto com `top-0`, `right-0`, `bottom-0`, `left-0`

</div>
</div>

---

# Inset
## Preencher uma área inteira

```html
<div class="relative h-full overflow-hidden">
    <img class="absolute inset-0 size-full object-cover" src="...">
    <div class="relative">texto por cima</div>
</div>
```

- `inset-0` cola nas quatro bordas
- `inset-x-0` controla esquerda e direita
- `inset-y-0` controla topo e base

---

# Overflow
## Quando cortar e quando deixar escapar

<div class="grid grid-cols-3 gap-4 h-full">
<div class="col-span-1">

- `overflow-hidden` corta o excesso
- `overflow-auto` cria rolagem se precisar
- `overflow-visible` deixa vazar

</div>
<div class="col-span-2">

```html
<div class="relative overflow-hidden">
    <img class="absolute inset-0 object-cover">
</div>
```

</div>
</div>

---

# Mídia
## object-fit e object-position

<div class="grid grid-cols-2 gap-6 h-full">
<div>

- `object-contain` mostra tudo da imagem
- `object-cover` preenche a caixa
- `object-center`, `object-left`, `object-right` ajustam o foco

</div>
<div>

```html
<img class="w-full h-full object-cover object-center" src="...">
```

</div>
</div>

---

# Sangria
## Empurrar para baixo com controle

<div class="grid grid-cols-2 gap-6 h-full">
<div>

```html
<div class="media bleed-bottom">
    <img src="...">
</div>
```

</div>
<div>

- `bleed-bottom` aplica a sangria inferior do bloco
- Usa a variável `--bleed-bottom`
- Valor padrão: `100px`

</div>
</div>

---

# Receita
## Imagem de fundo com texto por cima

```html
<div class="relative h-full overflow-hidden">
    <img
        class="absolute inset-0 size-full object-cover object-center"
        src="../../marp/assets/fundo.webp"
        alt="Imagem de fundo"
    >

    <div class="relative grid h-full place-items-center">
        <div class="w-full">
            <h3>Título</h3>
            <p>Texto em cima da imagem.</p>
        </div>
    </div>
</div>
```

---

# Receita
## Card preso no canto inferior direito

```html
<div class="relative h-full">
    <div class="absolute right-0 bottom-0">
        <p>Legenda, aviso ou crédito.</p>
    </div>
</div>
```

Dica: `absolute` sem `relative` costuma virar caça ao tesouro.

---

# Resumo
## Checklist mental

- Precisa ocupar tudo? `w-full`, `h-full` ou `size-full`
- Precisa sair do fluxo? `relative` + `absolute`
- Precisa colar nas bordas? `inset-*` ou `top/right/bottom/left-0`
- Precisa controlar imagem? `object-*`
- Precisa sangrar para fora? `bleed-bottom`
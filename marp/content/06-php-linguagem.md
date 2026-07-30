---
marp: true
theme: ifsul
header: ' '
footer: 'Instituto Federal Sul-rio-grandense | Campus Charqueadas'
---

<!-- _class: lead -->

# Programação Web I
## Linguagem PHP

Prof. Pablo Werlang
pablowerlang@ifsul.edu.br

---

# Linguagem PHP
## O navegador pede, o servidor responde

<div class="grid grid-cols-2 gap-6 h-full">
<div>

- JavaScript cuida da interação no navegador
- PHP executa no servidor
- O back-end valida regras e acessa dados
- A resposta pode ser HTML, texto ou JSON

</div>
<div class="media mx-auto">
    <img class="placeholder" alt="Prompt de IA: navegador e servidor trocando uma requisição HTTP e uma resposta, com PHP processando dados no servidor, infográfico didático horizontal">
</div>
</div>

---

# Linguagem PHP
## O caminho de uma requisição

1. O navegador envia uma requisição HTTP
2. O servidor entrega a requisição ao PHP
3. O PHP valida e processa os dados
4. Arquivos ou banco podem participar
5. O servidor devolve a resposta

**O navegador recebe o resultado, não o código-fonte PHP.**

---

# Linguagem PHP
## Front-end e back-end

<div class="grid grid-cols-2 gap-6">
<div>

**JavaScript no navegador**

- reage a eventos
- manipula o DOM
- envia requisições
- não deve guardar segredos

</div>
<div>

**PHP no servidor**

- recebe requisições
- valida dados novamente
- aplica regras de negócio
- acessa dados protegidos

</div>
</div>

---

<!-- _class: divider -->

# Primeiros passos

---

# Linguagem PHP
## O ambiente necessário

- Um `.php` precisa passar pelo interpretador
- Apache recebe a requisição
- PHP executa o script
- Docker Compose padroniza o ambiente

```bash
PUBLIC_DIR=./06-php-linguagem/painel-consumo-agua docker compose up -d
```

---

# Linguagem PHP
## Primeiro script

```php
<?php

echo "Olá, turma!";
```

- O código começa com `<?php`
- Instruções terminam normalmente com `;`
- `echo` escreve na resposta
- Em arquivo só de PHP, podemos omitir `?>`

---

# Linguagem PHP
## PHP e HTML no mesmo arquivo

```php
<?php
$nome = "Ana";
?>

<h1>Olá, <?= $nome ?></h1>
```

- `<?= ... ?>` é a forma curta de `echo`
- PHP prepara os valores
- HTML organiza a apresentação

---

# Linguagem PHP
## Variáveis e tipos

```php
$nome = "Bruna";       // string
$idade = 17;           // int
$media = 8.5;          // float
$matriculado = true;   // bool
$observacao = null;    // null
```

- Toda variável começa com `$`
- O tipo pode mudar durante a execução
- O tipo ainda define quais operações fazem sentido

---

# Linguagem PHP
## Strings: ponto não é detalhe

```php
$curso = "Informática";
$turma = "2AT";

echo $curso . " - " . $turma;
echo "$curso - $turma";
```

- `.` concatena textos
- Aspas duplas permitem interpolação
- `+` continua sendo operador numérico

---

# Linguagem PHP
## Operadores essenciais

<div class="grid grid-cols-3 gap-6">
<div>

**Cálculo**

`+ - * / %`

</div>
<div>

**Comparação**

`=== !== > >= < <=`

</div>
<div>

**Lógica**

`&& || !`

</div>
</div>

Prefira comparação estrita quando o tipo fizer parte da regra.

---

<!-- _class: divider -->

# Controle do programa

---

# Linguagem PHP
## Decisões com `if`

```php
if ($media >= 7) {
    $situacao = "Aprovado";
} elseif ($media >= 5) {
    $situacao = "Recuperação";
} else {
    $situacao = "Reprovado";
}
```

- As condições são avaliadas em ordem
- Apenas o primeiro bloco compatível executa
- Operadores lógicos combinam regras

---

# Linguagem PHP
## Qual repetição escolher?

<div class="grid grid-cols-3 gap-6">
<div>

**`while`**

Enquanto uma condição continuar verdadeira.

</div>
<div>

**`do...while`**

Executa ao menos uma vez.

</div>
<div>

**`for`**

Quando existe um contador previsível.

</div>
</div>

---

# Linguagem PHP
## Tabuada sem copiar dez vezes

```php
for ($numero = 1; $numero <= 10; $numero++) {
    $resultado = 7 * $numero;
    echo "<p>7 × $numero = $resultado</p>";
}
```

1. inicializa o contador;
2. testa a condição;
3. executa o bloco;
4. atualiza o contador.

---

# Linguagem PHP
## Gerando HTML com um laço

```php
<ul>
    <?php for ($numero = 1; $numero <= 6; $numero++) { ?>
        <li>Crachá <?= $numero ?></li>
    <?php } ?>
</ul>
```

- O laço fornece os valores
- O HTML define a estrutura visual
- Arrays entram na próxima seção

---

# Linguagem PHP
## `include` e `require`

| Comando | Arquivo ausente | Repete? |
| :--- | :--- | :--- |
| `include` | avisa e continua | sim |
| `require` | interrompe | sim |
| `include_once` | avisa e continua | não |
| `require_once` | interrompe | não |

```php
require_once __DIR__ . "/config.php";
```

---

<!-- _class: divider -->

# Hora de praticar

---

# Linguagem PHP
## Cálculo e regras

- **Painel de Consumo de Água:** médias e classificação  
  `06-php-linguagem/painel-consumo-agua/`
- **Bilheteria da Gincana:** preço explicado por regras combinadas  
  `06-php-linguagem/bilheteria-gincana/`
- **Calendário de Treinos:** grade mensal calculada com laços  
  `06-php-linguagem/calendario-treinos/`

Cada exercício muda o tipo de raciocínio: indicador, decisão e grade.

---

# Linguagem PHP
## Repetição e estado

- **Lote de Crachás Numerados:** códigos e marcas periódicas  
  `06-php-linguagem/crachas-numerados/`
- **Simulação do Reservatório:** evolução até uma condição de parada  
  `06-php-linguagem/reservatorio-escola/`

Sem arrays, funções próprias ou formulários: o teto desta aula continua visível.

---

# Linguagem PHP
## Erros que aparecem cedo

- Abrir `.php` sem passar pelo servidor
- Esquecer `$`, `;` ou usar `+` para texto
- Comparar tipos diferentes sem perceber
- Criar laço sem condição de parada
- Misturar cálculo e marcação até perder a leitura
- Confiar somente na validação do navegador

---

# Linguagem PHP
## O que precisa ficar

- PHP executa no servidor e produz uma resposta
- Variáveis e operadores representam os dados
- Decisões escolhem caminhos
- Laços geram repetições previsíveis
- HTML apresenta os valores calculados
- `require` inclui arquivos indispensáveis

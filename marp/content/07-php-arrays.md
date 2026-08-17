---
marp: true
theme: ifsul
header: ' '
footer: 'Instituto Federal Sul-rio-grandense | Campus Charqueadas'
---

<!-- _class: lead -->

# Programação Web I
## Arrays no PHP

Prof. Pablo Werlang
pablowerlang@ifsul.edu.br

---

# Arrays no PHP
## Uma variável, vários dados

<div class="grid grid-cols-2 gap-6 h-full">
<div>

- Listas com índices numéricos
- Registros com chaves descritivas
- Cadastros com arrays dentro de arrays
- Base para formulários, JSON e banco de dados

</div>
<div class="media mx-auto">
    <img class="placeholder" alt="Prompt de IA: armário escolar organizado com gavetas numeradas e etiquetadas, representando arrays indexados e associativos, ilustração didática leve para slide">
</div>
</div>

---

# Arrays no PHP
## Chave → valor

```php
$nomes = ["Ana", "Bruno", "Carla"];
```

```text
0 → Ana
1 → Bruno
2 → Carla
```

- Cada valor possui uma chave
- Em listas simples, as chaves começam normalmente em `0`

---

<!-- _class: divider -->

# Arrays Indexados

---

# Arrays no PHP
## Criar, acessar e alterar

```php
$materiais = ["Lápis", "Caderno", "Régua"];

echo $materiais[0]; // Lápis
$materiais[1] = "Caderno quadriculado";
$materiais[] = "Borracha"; // Adiciona no final
```

- `[]` cria o array
- `[0]` acessa uma posição
- `[]` sem índice adiciona ao próximo número

---

# Arrays no PHP
## Remover não reorganiza

```php
$materiais = ["Lápis", "Caderno", "Régua"];

unset($materiais[1]);
```

Resultado:

```text
0 → Lápis
2 → Régua
```

Use `array_values()` quando precisar recriar índices contínuos.

---

# Arrays no PHP
## Quantidade e inspeção

```php
echo count($materiais);

echo "<pre>";
print_r($materiais);
echo "</pre>";
```

- `count()` informa a quantidade
- `print_r()` mostra chaves e valores
- `var_dump()` também mostra os tipos

Essas funções ajudam na depuração, não na resposta final de uma API.

---

<!-- _class: divider -->

# Arrays Associativos

---

# Arrays no PHP
## Um registro com campos nomeados

```php
$produto = [
    "nome" => "Teclado Mecânico",
    "preco" => 249.90,
    "estoque" => 12
];

echo $produto["nome"];
```

O operador `=>` liga cada chave textual ao seu respectivo valor.

---

# Arrays no PHP
## Chave ausente sem susto

```php
$desconto = $produto["desconto"] ?? 0;
```

<div class="grid grid-cols-2 gap-6">
<div>

**`isset()`**

- Verifica se a chave existe
- Retorna `false` para valor `null`

</div>
<div>

**`array_key_exists()`**

- Verifica apenas a chave
- Aceita valor `null`

</div>
</div>

---

<!-- _class: divider -->

# Percorrendo Arrays

---

# Arrays no PHP
## `for` ou `foreach`?

<div class="grid grid-cols-2 gap-6">
<div>

**`for`**

```php
for ($i = 0; $i < count($lista); $i++) {
    echo $lista[$i];
}
```

- Usa posição numérica
- Pede índices contínuos

</div>
<div>

**`foreach`**

```php
foreach ($lista as $item) {
    echo $item;
}
```

- Visita cada valor
- Funciona com qualquer chave

</div>
</div>

---

# Arrays no PHP
## Chave e valor no `foreach`

```php
foreach ($produto as $campo => $valor) {
    echo "<p><strong>$campo:</strong> $valor</p>";
}
```

- `$campo` recebe a chave
- `$valor` recebe o conteúdo
- Funciona muito bem com registros associativos

---

# Arrays no PHP
## Arrays multidimensionais

```php
$alunos = [
    ["nome" => "Ana", "turma" => "2AT", "media" => 8.4],
    ["nome" => "Bruno", "turma" => "2AM", "media" => 6.8]
];

echo $alunos[0]["nome"]; // Ana
```

Uma lista de registros é um array contendo outros arrays.

---

# Arrays no PHP
## Dados viram tabela

```php
<?php foreach ($alunos as $aluno) { ?>
    <tr>
        <td><?= htmlspecialchars($aluno["nome"]) ?></td>
        <td><?= htmlspecialchars($aluno["turma"]) ?></td>
        <td><?= number_format($aluno["media"], 1, ",", ".") ?></td>
    </tr>
<?php } ?>
```

- O array guarda os dados estruturados
- O `foreach` percorre a coleção
- O HTML apresenta na interface

---

<!-- _class: divider -->

# Funções Úteis

---

# Arrays no PHP
## Adicionar e retirar

```php
$nomes[] = "Daniel";
$ultimo = array_pop($nomes);
$primeiro = array_shift($nomes);
array_unshift($nomes, "Aline");
```

- `[]`: adiciona ao final
- `array_pop()`: retira do final
- `array_shift()`: retira do início
- `array_unshift()`: adiciona no início

---

# Arrays no PHP
## Procurando valores

```php
$permitidas = ["jpg", "png", "webp"];

if (in_array("png", $permitidas, true)) {
    echo "Valor encontrado";
}
```

- `in_array()` responde se o valor existe
- O terceiro argumento ativa comparação estrita

---

# Arrays no PHP
## Encontrando a posição

```php
$indice = array_search("Bruno", $nomes, true);

if ($indice !== false) {
    echo "Encontrado na posição $indice";
}
```

Compare com `false` de forma estrita: o índice `0` é uma posição válida.

---

# Arrays no PHP
## String ↔ array

<div class="grid grid-cols-2 gap-6">
<div>

**Separar com `explode()`**

```php
$linha = "Ana;2AT;8.4";
$campos = explode(";", $linha);
```

</div>
<div>

**Juntar com `implode()`**

```php
$nomes = ["Ana", "Bruno"];
$texto = implode(", ", $nomes);
```

</div>
</div>

---

# Arrays no PHP
## Duplicados e índices

```php
$numeros = [4, 2, 4, 7, 2];
$unicos = array_unique($numeros);
$unicos = array_values($unicos);
```

- `array_unique()` remove repetições
- As chaves originais são preservadas
- `array_values()` reorganiza os índices de 0 a N

---

# Arrays no PHP
## Ordenação muda o array

| Função | Critério | Sentido | Preserva Chaves? |
| :--- | :--- | :--- | :--- |
| `sort()` | Valor | Crescente | Não |
| `rsort()` | Valor | Decrescente | Não |
| `asort()` | Valor | Crescente | **Sim** |
| `arsort()` | Valor | Decrescente | **Sim** |
| `ksort()` | Chave | Crescente | **Sim** |

Escolha conforme a associação de dados que precisa ser preservada.

---

# Arrays no PHP
## Transformar e filtrar

<div class="grid grid-cols-2 gap-6">
<div>

**`array_map()`**

```php
$dobros = array_map(
    fn($n) => $n * 2,
    $numeros
);
```

</div>
<div>

**`array_filter()`**

```php
$aprovados = array_filter(
    $alunos,
    fn($a) => $a["media"] >= 7
);
```

</div>
</div>

Para o primeiro contato, um `foreach` explícito também é uma ótima escolha.

---

# Arrays no PHP
## Arrays conversam com JSON

```php
header("Content-Type: application/json; charset=utf-8");

echo json_encode([
    "status" => "OK",
    "result" => $alunos
], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
```

Arrays são a ponte entre PHP, banco de dados e respostas de API.

---

<!-- _class: divider -->

# Hora de Praticar

---

# Arrays no PHP
## Exemplo: cadastro de pessoas

- Criar um array de registros
- Usar chaves como `nome` e `idade`
- Percorrer registros e campos com `foreach`
- Gerar a interface a partir dos dados

Pasta: `exemplos/ex07.1/`

---

# Arrays no PHP
## Exemplo: busca de produtos

- Separar o catálogo em `produtos.php`
- Receber o identificador por formulário
- Percorrer os produtos
- Exibir apenas o registro correspondente

Pasta: `exemplos/ex07.2/`

---

# Arrays no PHP
## Exercícios: posição e ordem

- **Mapa de Assentos:** matriz, estados e primeira posição livre  
  `07-php-arrays/mapa-assentos/`
- **Apuração da Gincana:** pontuações, penalidades e empates  
  `07-php-arrays/ranking-gincana/`
- **Editor de Roteiro:** inserir, remover e descobrir vizinhos  
  `07-php-arrays/roteiro-onibus/`

---

# Arrays no PHP
## Exercícios: análise e combinação

- **Auditoria de Matrículas:** um registro pode ter vários problemas  
  `07-php-arrays/auditoria-matriculas/`
- **Catálogo de Merenda:** grupo, estoque, restrição e custo  
  `07-php-arrays/catalogo-merenda/`

Não são cinco cadastros com temas diferentes: cada proposta exige uma transformação própria.

---

# Arrays no PHP
## Erros comuns

- Esquecer que o primeiro índice costuma ser `0`
- Acessar uma chave sem verificar
- Usar `for` depois de deixar espaços nos índices
- Testar `array_search()` sem `!== false`
- Ordenar com `sort()` e perder chaves associativas
- Atualizar a interface, mas não o array

---

# Arrays no PHP
## O que precisa ficar

- Arrays associam chaves a valores
- Índices numéricos representam listas
- Chaves textuais representam registros
- Arrays multidimensionais representam cadastros
- `foreach` percorre qualquer formato de chave
- Busca e ordenação exigem atenção aos tipos e índices

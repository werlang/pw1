# Programação Web I - Arrays no PHP

## 1. O que este guia ensina

Arrays permitem guardar vários valores em uma única variável. No PHP, a mesma estrutura pode representar uma lista numerada, um registro com campos nomeados ou uma coleção de registros.

Ao final deste guia, você deve conseguir:

- criar arrays indexados e associativos;
- acessar, alterar, adicionar e remover elementos;
- percorrer arrays com `for` e `foreach`;
- representar tabelas com arrays multidimensionais;
- buscar, contar, ordenar e transformar dados;
- verificar chaves e valores sem gerar avisos;
- escolher a operação adequada sem perder informações importantes.

## 2. Como pensar em um array

Um array associa uma **chave** a um **valor**.

Em uma lista simples, as chaves costumam ser números:

```php
$nomes = ["Ana", "Bruno", "Carla"];
```

Essa estrutura equivale a:

```text
0 → Ana
1 → Bruno
2 → Carla
```

Em um registro, as chaves podem ser textos:

```php
$aluno = [
    "nome" => "Ana",
    "turma" => "2AT",
    "media" => 8.4
];
```

## 3. Declaração

A sintaxe curta `[]` é a mais usada atualmente.

```php
$frutas = ["Maçã", "Banana", "Laranja"];
```

A sintaxe `array()` aparece em códigos mais antigos e continua válida:

```php
$frutas = array("Maçã", "Banana", "Laranja");
```

Um array vazio pode ser criado assim:

```php
$tarefas = [];
```

## 4. Arrays indexados

Por padrão, o primeiro índice é `0`.

```php
$materiais = ["Lápis", "Caderno", "Régua"];

echo $materiais[0]; // Lápis
echo $materiais[2]; // Régua
```

É possível alterar uma posição:

```php
$materiais[1] = "Caderno quadriculado";
```

E adicionar no próximo índice disponível:

```php
$materiais[] = "Borracha";
```

Para remover:

```php
unset($materiais[1]);
```

`unset()` remove o elemento, mas não reorganiza automaticamente os índices restantes. Se isso for necessário:

```php
$materiais = array_values($materiais);
```

## 5. Arrays associativos

Arrays associativos usam chaves descritivas.

```php
$produto = [
    "nome" => "Teclado",
    "preco" => 129.90,
    "estoque" => 8
];

echo $produto["nome"];
$produto["estoque"] = 7;
$produto["categoria"] = "Periféricos";
```

O operador `=>` liga cada chave ao seu valor.

As chaves devem ser escolhidas de forma consistente. `"preco"` e `"preço"` seriam duas chaves diferentes.

## 6. Verificando se um dado existe

Acessar uma chave inexistente pode gerar um aviso.

```php
if (isset($produto["desconto"])) {
    echo $produto["desconto"];
}
```

O operador `??` fornece um valor padrão:

```php
$desconto = $produto["desconto"] ?? 0;
```

Diferença importante:

- `isset($array["chave"])` retorna `false` se a chave não existe ou se o valor é `null`;
- `array_key_exists("chave", $array)` verifica a existência da chave mesmo quando o valor é `null`.

## 7. Quantidade e inspeção

`count()` informa a quantidade de elementos.

```php
echo count($materiais);
```

Durante o desenvolvimento, `print_r()` ajuda a observar a estrutura:

```php
echo "<pre>";
print_r($produto);
echo "</pre>";
```

`var_dump()` também mostra os tipos dos valores.

Essas funções são úteis para estudo e depuração, mas não devem compor a resposta final de uma API.

## 8. Percorrendo com `for`

`for` funciona bem quando o array possui índices numéricos contínuos.

```php
$materiais = ["Lápis", "Caderno", "Régua"];

for ($indice = 0; $indice < count($materiais); $indice++) {
    echo "<p>{$materiais[$indice]}</p>";
}
```

Se os índices tiverem espaços causados por `unset()`, esse laço pode tentar acessar posições inexistentes.

## 9. Percorrendo com `foreach`

`foreach` é a forma mais comum de percorrer arrays no PHP.

Somente os valores:

```php
foreach ($materiais as $material) {
    echo "<p>$material</p>";
}
```

Chaves e valores:

```php
foreach ($produto as $campo => $valor) {
    echo "<p><strong>$campo:</strong> $valor</p>";
}
```

Use:

- `for` quando o índice e a contagem fizerem parte do problema;
- `foreach` quando o objetivo for visitar cada elemento.

## 10. Arrays multidimensionais

Um array multidimensional contém outros arrays.

```php
$alunos = [
    [
        "nome" => "Ana",
        "turma" => "2AT",
        "media" => 8.4
    ],
    [
        "nome" => "Bruno",
        "turma" => "2AM",
        "media" => 6.8
    ]
];
```

Acesso direto:

```php
echo $alunos[0]["nome"];
```

Percorrendo:

```php
foreach ($alunos as $aluno) {
    echo "<p>{$aluno['nome']}: {$aluno['media']}</p>";
}
```

Essa é uma estrutura comum para cadastros, resultados de banco de dados e respostas JSON.

## 11. Gerando uma tabela HTML

Os dados ficam no array; o HTML apresenta esses dados.

```php
<table>
    <thead>
        <tr>
            <th>Nome</th>
            <th>Turma</th>
            <th>Média</th>
        </tr>
    </thead>
    <tbody>
        <?php foreach ($alunos as $aluno) { ?>
            <tr>
                <td><?= htmlspecialchars($aluno["nome"]) ?></td>
                <td><?= htmlspecialchars($aluno["turma"]) ?></td>
                <td><?= number_format($aluno["media"], 1, ",", ".") ?></td>
            </tr>
        <?php } ?>
    </tbody>
</table>
```

Esse padrão separa a estrutura de dados da marcação usada para exibi-la.

## 12. Adicionando e removendo valores

Para adicionar ao final:

```php
$nomes[] = "Daniel";
```

`array_push()` também adiciona valores:

```php
array_push($nomes, "Eduarda", "Felipe");
```

Para um único elemento, `[]` costuma ser mais direto.

Para retirar o último ou o primeiro:

```php
$ultimo = array_pop($nomes);
$primeiro = array_shift($nomes);
```

`array_unshift()` adiciona ao início:

```php
array_unshift($nomes, "Aline");
```

## 13. Busca e validação

### Verificar o tipo

```php
if (is_array($nomes)) {
    echo "A variável contém um array.";
}
```

### Procurar um valor

```php
$permitidas = ["jpg", "png", "webp"];

if (in_array("png", $permitidas, true)) {
    echo "Valor encontrado.";
}
```

O terceiro argumento `true` solicita comparação estrita, incluindo o tipo.

### Localizar a chave

```php
$indice = array_search("Bruno", $nomes, true);

if ($indice !== false) {
    echo "Encontrado na posição $indice.";
}
```

A comparação com `false` deve ser estrita porque o índice `0` é uma posição válida.

## 14. Strings e arrays

`explode()` divide uma string:

```php
$linha = "Ana;2AT;8.4";
$campos = explode(";", $linha);
```

`implode()` junta os valores:

```php
$texto = implode(", ", $nomes);
```

Essas operações aparecem ao trabalhar com campos múltiplos, textos delimitados e arquivos simples.

## 15. Remoção de duplicados

`array_unique()` devolve um novo array sem valores repetidos:

```php
$numeros = [4, 2, 4, 7, 2];
$numerosUnicos = array_unique($numeros);
```

As chaves originais são preservadas. Para reorganizar os índices:

```php
$numerosUnicos = array_values($numerosUnicos);
```

## 16. Ordenação

As funções de ordenação modificam o próprio array.

```php
$notas = [8.5, 6.0, 9.2];
sort($notas);
```

Funções comuns:

- `sort()`: ordena valores e reorganiza índices;
- `rsort()`: ordem decrescente e novos índices;
- `asort()`: ordena valores preservando as chaves;
- `arsort()`: ordem decrescente preservando as chaves;
- `ksort()`: ordena pelas chaves;
- `krsort()`: ordena pelas chaves em ordem decrescente.

Escolha de acordo com o que precisa ser preservado.

## 17. Extraindo chaves, valores e colunas

```php
$campos = array_keys($produto);
$valores = array_values($produto);
```

Em um cadastro, `array_column()` pode extrair uma propriedade:

```php
$nomesDosAlunos = array_column($alunos, "nome");
```

## 18. Transformação e filtro

`array_map()` cria um array transformado:

```php
$notas = [6, 8, 9];
$notasComBonus = array_map(
    fn($nota) => min($nota + 0.5, 10),
    $notas
);
```

`array_filter()` mantém apenas os valores que atendem a uma condição:

```php
$aprovados = array_filter(
    $alunos,
    fn($aluno) => $aluno["media"] >= 7
);
```

Para o primeiro contato, um `foreach` explícito pode ser mais fácil de acompanhar. Essas funções se tornam úteis quando a transformação já está bem compreendida.

## 19. Arrays e JSON

Arrays PHP podem ser convertidos para JSON:

```php
header("Content-Type: application/json; charset=utf-8");

echo json_encode([
    "status" => "OK",
    "result" => $alunos
]);
```

Ao receber JSON como texto:

```php
$dados = json_decode($textoJson, true);
```

O segundo argumento `true` pede arrays associativos em vez de objetos.

## 20. Relação com as práticas do repositório

### Cadastro de pessoas

Pasta: [`exemplos/ex07.1`](../exemplos/ex07.1/)

O exemplo usa:

- array de registros;
- arrays associativos;
- `foreach` aninhado;
- geração de HTML a partir dos campos.

### Lista e busca de produtos

Pasta: [`exemplos/ex07.2`](../exemplos/ex07.2/)

O exemplo divide os dados em `produtos.php`, inclui o arquivo e procura um produto recebido por formulário.

## 21. Exercícios propostos

- [Mapa de Assentos da Mostra](./mapa-assentos/README.md): transforma uma matriz de estados em uma grade e um resumo.
- [Apuração da Gincana](./ranking-gincana/README.md): consolida provas, penalidades, ordenação e empates.
- [Editor de Roteiro do Ônibus](./roteiro-onibus/README.md): altera uma sequência em que os índices representam o percurso.
- [Auditoria de Matrículas](./auditoria-matriculas/README.md): encontra problemas sem modificar a coleção original.
- [Catálogo de Merenda](./catalogo-merenda/README.md): cruza grupo, estoque, restrição e custo para produzir HTML e JSON.

## 22. Erros comuns

- esquecer que o primeiro índice normalmente é `0`;
- acessar uma chave inexistente sem `isset()` ou `??`;
- misturar índices numéricos e chaves textuais sem necessidade;
- usar `for` em um array cujos índices não são contínuos;
- confundir busca por chave com busca por valor;
- testar o resultado de `array_search()` apenas com `if ($indice)`;
- esperar que `array_unique()` reorganize os índices;
- usar `sort()` e perder chaves que deveriam ser preservadas;
- alterar o HTML, mas não atualizar o array que representa os dados.

## 23. Boas práticas

- escolha uma estrutura previsível para todos os registros;
- use chaves que expliquem o dado armazenado;
- prefira `foreach` para percorrer coleções;
- verifique se uma chave existe antes de acessá-la;
- use comparação estrita quando o tipo fizer parte da regra;
- mantenha os dados no array e use o HTML apenas como apresentação;
- mantenha cada etapa de transformação visível; use funções próprias quando elas tornarem a regra mais clara, sem esconder o percurso do array.

## 24. Resumo final

Os pontos centrais desta seção são:

- arrays associam chaves a valores;
- listas usam normalmente índices numéricos;
- registros usam chaves textuais;
- arrays multidimensionais representam coleções de registros;
- `foreach` percorre valores e também pode fornecer as chaves;
- funções de busca, ordenação e transformação possuem efeitos diferentes sobre índices;
- arrays são uma ponte importante entre formulários, banco de dados, arquivos e JSON.

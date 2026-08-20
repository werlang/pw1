# Programação Web I - Arrays no PHP

## 1. O que este guia ensina

Arrays permitem guardar múltiplos valores em uma única variável. No PHP, a mesma estrutura de array é extremamente versátil e pode representar uma lista indexada por números, um registro com campos nomeados ou uma coleção complexa de registros (tabelas e matrizes).

Ao final deste guia, você deve conseguir:

- criar arrays indexados e associativos com a sintaxe moderna;
- acessar, alterar, adicionar e remover elementos com segurança;
- percorrer arrays usando `for` e `foreach` (valores isolados e pares chave-valor);
- estruturar tabelas e matrizes com arrays multidimensionais;
- gerar marcação HTML formatada e segura a partir de dados em arrays;
- buscar, contar, ordenar e transformar dados em coleções;
- verificar a existência de chaves sem gerar avisos de chave indefinida (*undefined array key*);
- compreender o impacto da reorganização de índices na conversão para JSON;
- escolher a operação adequada sem perder dados nem corromper associações.

## 2. Como pensar em um array

No PHP, todo array é internamente um mapa ordenado que associa uma **chave** (*key*) a um **valor** (*value*).

Em uma lista simples (array indexado), as chaves são números inteiros gerados automaticamente a partir de zero:

```php
$nomes = ["Ana", "Bruno", "Carla"];
```

Essa estrutura equivale a:

```text
0 → Ana
1 → Bruno
2 → Carla
```

Em um registro (array associativo), as chaves são textos descritivos escolhidos pelo desenvolvedor:

```php
$aluno = [
    "nome" => "Ana",
    "turma" => "2AT",
    "media" => 8.4
];
```

Aqui temos:

```text
"nome"  → Ana
"turma" → 2AT
"media" → 8.4
```

## 3. Declaração

A sintaxe curta com colchetes `[]` é a forma padrão e recomendada no PHP moderno:

```php
$frutas = ["Maçã", "Banana", "Laranja"];
```

A sintaxe clássica com a função `array()` também é suportada e comum em códigos legados:

```php
$frutas = array("Maçã", "Banana", "Laranja");
```

Para inicializar um array vazio que receberá itens posteriormente:

```php
$tarefas = [];
```

## 4. Arrays indexados

Em um array indexado, o acesso aos elementos é feito informando o índice numérico entre colchetes. Por padrão, a contagem sempre começa no índice `0`.

```php
$materiais = ["Lápis", "Caderno", "Régua"];

echo $materiais[0]; // Imprime: Lápis
echo $materiais[2]; // Imprime: Régua
```

### Alterando um elemento

Basta atribuir um novo valor ao índice desejado:

```php
$materiais[1] = "Caderno quadriculado";
```

### Adicionando um elemento ao final

Deixar os colchetes vazios `[]` faz o PHP adicionar o novo item no próximo índice numérico disponível:

```php
$materiais[] = "Borracha"; // Adicionado no índice 3
```

### Removendo elementos com `unset()`

A função `unset()` remove o elemento e a sua respectiva chave:

```php
unset($materiais[1]); // Remove o item do índice 1 ("Caderno quadriculado")
```

> [!IMPORTANT]
> A função `unset()` remove o elemento, mas **não renumera** os índices restantes. O array passará a ter os índices `0`, `2` e `3`, ficando com uma lacuna (índice esparso).
>
> Se você precisar reconstruir uma sequência contínua de índices começando em zero, use a função `array_values()`:
>
> ```php
> $materiais = array_values($materiais); // Agora os índices voltam a ser 0, 1 e 2
> ```

## 5. Arrays associativos

Arrays associativos utilizam chaves textuais (strings) para identificar cada valor armazenado, funcionando como um registro estruturado.

```php
$produto = [
    "nome" => "Teclado Mecânico",
    "preco" => 249.90,
    "estoque" => 12
];

// Acessando pelo nome do campo
echo $produto["nome"]; // Imprime: Teclado Mecânico

// Atualizando um campo existente
$produto["estoque"] = 11;

// Adicionando um novo campo
$produto["categoria"] = "Periféricos";
```

O operador `=>` (conhecido como *double arrow*) associa a chave da esquerda ao valor da direita.

As chaves diferenciam maiúsculas de minúsculas e acentuação. Portanto, `"preco"`, `"Preco"` e `"preço"` seriam tratadas como três chaves completamente diferentes. Mantenha um padrão consistente em todo o projeto.

## 6. Verificando se um dado existe

Tentar acessar uma chave inexistente em um array gera um aviso do interpretador PHP (*Warning: Undefined array key*).

Para evitar erros e avisos, utilize uma das seguintes abordagens:

### Operador de coalescência nula (`??`)

É a maneira mais concisa de ler um valor fornecendo um substituto padrão caso a chave não exista ou contenha `null`:

```php
// Se "desconto" não existir no array, a variável $desconto recebe 0
$desconto = $produto["desconto"] ?? 0;
```

### Função `isset()`

Verifica se a chave existe **e** se o seu valor é diferente de `null`:

```php
if (isset($produto["desconto"])) {
    echo "Desconto: " . $produto["desconto"];
} else {
    echo "Sem desconto";
}
```

## 7. Quantidade e inspeção

### Contando elementos com `count()`

A função `count()` retorna a quantidade total de elementos presentes no array:

```php
echo count($materiais); // 2
```

### Inspecionando dados durante o desenvolvimento

Para examinar a estrutura e os valores de um array durante a depuração:

```php
// print_r exibe chaves e valores estruturados
print_r($materiais); // Array ( [0] => Lápis [2] => Régua )

// var_dump exibe chaves, valores, tipos de dados e tamanhos
var_dump($materiais); // array(2) { [0]=> string(5) "Lápis" [2]=> string(5) "Régua" }
```

No navegador, envolva a saída com tags `<pre>` para manter a quebra de linha e a indentação legíveis:

```php
echo "<pre>";
print_r($materiais);
echo "</pre>";
```

> [!NOTE]
> Funções como `print_r()` e `var_dump()` são recursos de depuração do programador. Elas nunca devem ser utilizadas na interface final entregue ao usuário ou no corpo de respostas de APIs em produção.

## 8. Percorrendo com o laço `for`

O laço `for` é adequado quando você trabalha com arrays indexados cujos índices numéricos sejam perfeitamente sequenciais e contínuos:

```php
$materiais = ["Lápis", "Caderno", "Régua"];

for ($i = 0; $i < count($materiais); $i++) {
    echo "<p>Item $i: {$materiais[$i]}</p>";
}
```

> [!WARNING]
> Se o array tiver passado por `unset()` ou remoção que tenha deixado lacunas entre os números (por exemplo, índices `0`, `2` e `3`), o `for` tentará ler `$materiais[1]` e disparará um erro de índice indefinido. Nesses casos, use `foreach` ou reindexe com `array_values()`.

## 9. Percorrendo com o laço `foreach`

O `foreach` é a estrutura de repetição mais prática, robusta e comum para percorrer arrays no PHP, pois ele funciona tanto com listas indexadas quanto com arrays associativos, independentemente de haver lacunas nos índices.

### Percorrendo apenas os valores

```php
$frutas = ["Maçã", "Banana", "Laranja"];

foreach ($frutas as $fruta) {
    echo "<li>$fruta</li>";
}
```

### Percorrendo chaves e valores

Utilizando a sintaxe `$chave => $valor`, o PHP disponibiliza o identificador da posição a cada volta do laço:

```php
$produto = [
    "nome" => "Teclado Mecânico",
    "preco" => 249.90,
    "estoque" => 12
];

foreach ($produto as $campo => $valor) {
    echo "<p><strong>$campo:</strong> $valor</p>";
}
```

### Quando escolher cada um?

- Escolha **`for`** quando o índice numérico exato, a contagem posicional ou o acesso relativo a posições vizinhas (`$i - 1`, `$i + 1`) fizerem parte da regra do problema.
- Escolha **`foreach`** quando o objetivo principal for visitar todos os itens da coleção ou percorrer registros com campos associativos.

## 10. Arrays multidimensionais

Um array multidimensional é um array que armazena outros arrays em suas posições. É a estrutura ideal para representar cadastros, tabelas, matrizes de coordenadas e listas de entidades.

```php
$alunos = [
    [
        "nome" => "Ana Souza",
        "turma" => "2AT",
        "media" => 8.4
    ],
    [
        "nome" => "Bruno Lima",
        "turma" => "2AM",
        "media" => 6.8
    ],
    [
        "nome" => "Carla Dias",
        "turma" => "2AT",
        "media" => 9.1
    ]
];
```

### Acessando posições específicas

Para acessar uma informação pontual, encadeie os colchetes com os índices ou chaves correspondentes:

```php
// Acessa o primeiro aluno (índice 0) e lê o campo "nome"
echo $alunos[0]["nome"]; // Imprime: Ana Souza
```

### Percorrendo o cadastro

```php
foreach ($alunos as $aluno) {
    echo "<p>{$aluno['nome']} (Turma: {$aluno['turma']}) - Média: {$aluno['media']}</p>";
}
```

## 11. Gerando uma tabela HTML

Em aplicações web dinâmicas, os dados permanecem estruturados no array PHP, enquanto o HTML é montado iterativamente para apresentar os registros na tela.

```php
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <title>Lista de Alunos</title>
</head>
<body>
    <h1>Estudantes Cadastrados</h1>

    <table border="1">
        <thead>
            <tr>
                <th>Nome</th>
                <th>Turma</th>
                <th>Média</th>
                <th>Situação</th>
            </tr>
        </thead>
        <tbody>
            <?php foreach ($alunos as $aluno) { ?>
                <tr>
                    <td><?= htmlspecialchars($aluno["nome"]) ?></td>
                    <td><?= htmlspecialchars($aluno["turma"]) ?></td>
                    <td><?= number_format($aluno["media"], 1, ",", ".") ?></td>
                    <td><?= $aluno["media"] >= 7.0 ? "Aprovado" : "Em exame" ?></td>
                </tr>
            <?php } ?>
        </tbody>
    </table>
</body>
</html>
```

> [!TIP]
> Sempre proteja a exibição de strings oriundas de variáveis ou entradas com `htmlspecialchars()` para prevenir ataques de Cross-Site Scripting (XSS), e formate valores numéricos com `number_format()`.

### Alternativa: Construção iterativa com `echo`

Outra abordagem didática muito comum ao gerar blocos HTML diretamente dentro de laços é preparar variáveis sanitizadas e emitir a marcação via `echo`:

```php
foreach ($alunos as $aluno) {
    $nome = htmlspecialchars($aluno["nome"]);
    $turma = htmlspecialchars($aluno["turma"]);
    $media = number_format($aluno["media"], 1, ",", ".");

    echo "<tr>
        <td>$nome</td>
        <td>$turma</td>
        <td>$media</td>
    </tr>";
}
```

## 12. Adicionando e removendo elementos (Pilhas e Filas)

O PHP oferece funções nativas para manipular extremidades de arrays:

```php
$nomes = ["Bruno", "Carla"];

// Adiciona no final (push)
$nomes[] = "Daniel";
array_push($nomes, "Eduarda", "Felipe");

// Adiciona no início (unshift)
array_unshift($nomes, "Aline");

// Remove do final (pop)
$ultimo = array_pop($nomes); // Remove "Felipe" e armazena na variável

// Remove do início (shift)
$primeiro = array_shift($nomes); // Remove "Aline" e armazena na variável
```

Para adicionar um único elemento ao final, a sintaxe `$nomes[] = "Valor";` é mais direta e tem execução ligeiramente mais rápida que `array_push()`.

## 13. Busca e validação

### Verificando se a variável é um array

```php
if (is_array($nomes)) {
    echo "A variável é uma coleção válida.";
}
```

### Verificando se um valor existe com `in_array()`

Retorna `true` se o valor estiver presente na lista:

```php
$extensoesPermitidas = ["jpg", "png", "webp"];

if (in_array("png", $extensoesPermitidas, true)) {
    echo "Formato de arquivo aceito.";
}
```

O terceiro parâmetro `true` ativa a comparação estrita (verificando tipo e valor), evitando coerções inesperadas.

### Localizando a chave ou posição com `array_search()`

Retorna o índice ou chave onde o valor foi encontrado, ou `false` se o item não existir:

```php
$materiais = ["Lápis", "Caderno", "Régua"];
$indice = array_search("Lápis", $materiais, true);

if ($indice !== false) {
    echo "Material encontrado na posição $indice.";
} else {
    echo "Material não encontrado.";
}
```

> [!CAUTION]
> Ao testar o retorno de `array_search()`, utilize **sempre** a comparação estrita `!== false`. Se o elemento estiver na primeira posição (índice `0`), uma verificação frouxa como `if ($indice)` avalia `0` como falso, provocando um bug silencioso.

## 14. Conversão entre texto e array

### Dividindo texto em array com `explode()`

Transforma uma string em um array a partir de um caractere delimitador:

```php
$linhaCsv = "Ana Souza;2AT;8.4";
$dadosAluno = explode(";", $linhaCsv);

// $dadosAluno[0] => "Ana Souza"
// $dadosAluno[1] => "2AT"
// $dadosAluno[2] => "8.4"
```

### Juntando array em texto com `implode()`

Concatena os elementos de um array em uma única string, separados por um delimitador:

```php
$cidades = ["Porto Alegre", "Charqueadas", "São Jerônimo"];
$texto = implode(" → ", $cidades);

echo $texto; // Imprime: Porto Alegre → Charqueadas → São Jerônimo
```

## 15. Remoção de duplicados

A função `array_unique()` remove valores duplicados de um array:

```php
$numeros = [4, 2, 4, 7, 2, 9];
$unicos = array_unique($numeros);
// $unicos contém: [0 => 4, 1 => 2, 3 => 7, 5 => 9]
```

Como `array_unique()` preserva as chaves originais, se você precisar de índices numéricos contínuos de `0` a `N-1`, combine com `array_values()`:

```php
$unicosReindexados = array_values(array_unique($numeros));
// $unicosReindexados contém: [0 => 4, 1 => 2, 2 => 7, 3 => 9]
```

## 16. Ordenação de arrays

As funções de ordenação do PHP **modificam o array original** diretamente (passagem por referência):

```php
$notas = [8.5, 6.0, 9.2, 7.5];
sort($notas); // $notas agora está ordenada: [6.0, 7.5, 8.5, 9.2]
```

### Guia rápido de funções de ordenação

| Função | Critério de Ordenação | Sentido | Preserva Chaves Originais? |
| :--- | :--- | :--- | :--- |
| `sort()` | Por Valor | Crescente (A-Z, 0-9) | **Não** (renumera de 0 a N) |
| `rsort()` | Por Valor | Decrescente (Z-A, 9-0) | **Não** (renumera de 0 a N) |
| `asort()` | Por Valor | Crescente (A-Z, 0-9) | **Sim** |
| `arsort()` | Por Valor | Decrescente (Z-A, 9-0) | **Sim** |
| `ksort()` | Por Chave | Crescente (A-Z, 0-9) | **Sim** |
| `krsort()` | Por Chave | Decrescente (Z-A, 9-0) | **Sim** |

Ao ordenar arrays associativos onde a chave representa o nome de uma pessoa ou código de produto, use **`asort()`** ou **`arsort()`** para não destruir a relação entre a chave e o valor.

## 17. Extraindo chaves, valores e colunas

```php
$produto = [
    "nome" => "Teclado",
    "preco" => 249.90,
    "estoque" => 12
];

$todasAsChaves = array_keys($produto);   // ["nome", "preco", "estoque"]
$todosOsValores = array_values($produto); // ["Teclado", 249.90, 12]
```

Ao trabalhar com coleções multidimensionais de registros, a função `array_column()` extrai todos os valores de uma coluna específica:

```php
$nomesDosAlunos = array_column($alunos, "nome");
// Retorna: ["Ana Souza", "Bruno Lima", "Carla Dias"]
```

## 18. Transformação e filtro

### Transformando dados com `array_map()`

Aplica uma função de retorno (*callback*) a cada elemento e devolve um novo array com os resultados calculados:

```php
$precos = [100.0, 200.0, 50.0];

// Concede 10% de desconto em todos os itens
$precosComDesconto = array_map(
    fn($preco) => $preco * 0.90,
    $precos
);
```

### Filtrando dados com `array_filter()`

Mantém apenas os elementos cujo retorno da função de teste for verdadeiro (`true`):

```php
$alunosAprovados = array_filter(
    $alunos,
    fn($aluno) => $aluno["media"] >= 7.0
);
```

> [!IMPORTANT]
> Assim como `array_unique()`, a função `array_filter()` **preserva as chaves originais**. Se o segundo aluno (índice `1`) for descartado pelo filtro, o array resultante manterá os índices `0` e `2`. Se você for iterar com `for` ou serializar para JSON, aplique `array_values()` no resultado.

## 19. Arrays e JSON no desenvolvimento de APIs

No desenvolvimento web, o PHP frequentemente recebe e envia dados em formato JSON para interagir com o JavaScript no navegador.

### Gerando JSON com `json_encode()`

```php
header("Content-Type: application/json");

$resposta = [
    "status" => "OK",
    "total" => count($alunos),
    "result" => $alunos
];

echo json_encode($resposta);
```

### Cuidados com arrays ao gerar JSON

O JavaScript diferencia listas `[...]` de objetos `{...}`:

- Um array PHP indexado com índices contínuos de `0` a `N-1` é serializado como um **array JSON** (`["Ana", "Bruno"]`).
- Um array PHP associativo ou indexado com lacunas (após `unset` ou `array_filter`) é serializado como um **objeto JSON** (`{"0": "Ana", "2": "Carla"}`).

Para garantir que uma lista filtrada seja exportada como array JSON puro, sempre envolva o dado com `array_values()`:

```php
$itensLimpos = array_values($alunosAprovados);
echo json_encode($itensLimpos); // Produz [...] em vez de {...}
```

### Lendo JSON com `json_decode()`

Para converter um texto JSON recebido em um array do PHP, passe `true` como segundo parâmetro:

```php
$jsonRecebido = '{"nome":"Ana","turma":"2AT"}';
$dados = json_decode($jsonRecebido, true); // true converte para array associativo

echo $dados["nome"]; // Ana
```

## 20. Relação com as práticas do repositório

### Cadastro de pessoas

Pasta de referência: [`exemplos/ex07.1`](../exemplos/ex07.1/)

Demonstra a montagem de um cadastro com array de registros, iteração com laços `foreach` aninhados e geração de estrutura visual HTML a partir dos campos do array.

### Lista e busca de produtos

Pasta de referência: [`exemplos/ex07.2`](../exemplos/ex07.2/)

Demonstra a separação de responsabilidades com o catálogo de dados em `produtos.php`, inclusão com `include` e busca do registro solicitado via parâmetro de formulário GET.

## 21. Exercícios propostos

Há nove exercícios nesta seção. Comece pelos quatro introdutórios: cada um isola uma ideia principal, usa dados definidos no próprio arquivo e produz uma saída pequena.

- [Lista de Materiais do Laboratório](./lista-materiais/README.md) ([solução completa](./lista-materiais/index.php)): pratica arrays indexados, adição ao final com `[]`, contagem com `count()` e laço `foreach`.
- [Perfil do Estudante](./perfil-estudante/README.md) ([solução completa](./perfil-estudante/index.php)): pratica arrays associativos, chaves textuais, o operador `??` e formatação de saída.
- [Verificador de Presença](./verificador-presenca/README.md) ([solução completa](./verificador-presenca/index.php)): pratica busca em coleções com `in_array()` e `array_search()` com verificação estrita `!== false`.
- [Tabela de Preços da Cantina](./tabela-precos/README.md) ([solução completa](./tabela-precos/index.php)): pratica arrays multidimensionais básicos, cálculo de média e montagem de tabelas HTML.

Depois, avance para os cinco desafios de integração. Eles combinam mais de uma regra e foram pensados para consolidar o domínio de matrizes, classificações, diagnósticos e exportações:

- [Mapa de Assentos da Mostra](./mapa-assentos/README.md) ([solução completa](./mapa-assentos/index.php)): transforma uma matriz bidimensional de fileiras e assentos em uma grade visual com estatísticas e alerta de lotação.
- [Apuração da Gincana](./ranking-gincana/README.md) ([solução completa](./ranking-gincana/index.php)): consolida pontuações e penalidades, ordena com `arsort()` e trata empates reais na classificação.
- [Editor de Roteiro do Ônibus](./roteiro-onibus/README.md) ([solução completa](./roteiro-onibus/index.php)): manipula a sequência cronológica de paradas com `array_unshift()`, `array_splice()`, `array_unique()` e inspeção de vizinhos.
- [Auditoria de Matrículas](./auditoria-matriculas/README.md) ([solução completa](./auditoria-matriculas/index.php)): analisa uma coleção de estudantes identificando inconsistências e duplicidades com `array_column()` e `array_count_values()`.
- [Catálogo de Merenda](./catalogo-merenda/README.md) ([solução completa](./catalogo-merenda/index.php)): filtra e agrupa itens por categoria nutricional, compõe combos econômicos e exporta em HTML e JSON com `array_values()`.

## 22. Erros comuns

- **Esquecer que o índice inicial é `0`:** tentar acessar `$lista[count($lista)]` gera um erro, pois o último elemento está na posição `count($lista) - 1`.
- **Acessar chaves sem verificar:** ler `$array["campo"]` diretamente sem usar `isset()` ou o operador `??` gera avisos quando o campo estiver ausente.
- **Usar `for` em arrays com índices esparsos:** laços `for` assumem contiguidade numérica e quebram se posições intermediárias tiverem sido removidas com `unset()`.
- **Testar `array_search()` com operador frouxo:** usar `if ($indice)` em vez de `if ($indice !== false)` faz a posição `0` ser avaliada como falso.
- **Perder chaves ao usar `sort()` em arrays associativos:** utilizar `sort()` em mapas de chave-valor substitui todas as chaves por números inteiros. Use `asort()` ou `arsort()`.
- **Esperar que `array_unique()` ou `array_filter()` reordenem índices:** essas funções preservam as chaves originais; para reindexar, chame explicitamente `array_values()`.
- **JSON inesperado:** exportar um array com chaves esparsas para JSON e esperar receber uma lista `[]` no JavaScript (resultando em um objeto `{}`).

## 23. Boas práticas

- Escolha uma estrutura previsível e consistente para todos os registros da mesma coleção.
- Utilize chaves descritivas e em padrão uniforme (ex.: sempre minúsculas sem acentos no código).
- Prefira laços `foreach` para navegar em coleções e registros associativos.
- Aplique `htmlspecialchars()` ao imprimir valores textuais de arrays no HTML.
- Mantenha os dados no array e encare o HTML apenas como a camada de apresentação visual.
- Use `array_values()` após operações de remoção e filtragem quando precisar de índices numéricos sequenciais.

## 24. Resumo final

- Arrays são coleções flexíveis que associam chaves (números ou textos) a valores de qualquer tipo.
- Arrays indexados são ideais para listas ordenadas; arrays associativos são ideais para registros nomeados.
- Arrays multidimensionais representam tabelas, cadastros e matrizes estruturadas.
- O laço `foreach` é a forma padrão e mais segura de iterar sobre arrays no PHP.
- Funções como `in_array()`, `array_search()`, `asort()` e `array_values()` fornecem os blocos fundamentais para busca, ordenação e saneamento de dados.
- Arrays PHP são o elo central de comunicação entre requisições de formulários, bancos de dados, sessões e APIs em formato JSON.

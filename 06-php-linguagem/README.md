# Programação Web I - Linguagem PHP e Funções

## 1. O que este guia ensina

Esta seção apresenta o PHP como linguagem de programação executada no servidor. O objetivo é compreender o caminho de uma requisição web, escrever os primeiros scripts e organizar regras em funções reutilizáveis.

Ao final deste guia, você deve conseguir:

- explicar a diferença entre código executado no navegador e no servidor;
- executar um arquivo PHP por meio de um servidor web;
- usar variáveis, tipos, operadores, decisões e repetições;
- misturar PHP e HTML sem perder a legibilidade;
- dividir o programa em arquivos com `include` e `require`;
- criar funções com parâmetros, argumentos e retorno;
- distinguir `return` de `echo`;
- usar escopo local, parâmetros e variáveis `static` de forma consciente;
- reconhecer funções anônimas, arrow functions e callbacks simples;
- evitar erros comuns de sintaxe, saída e organização.

## 2. Onde o PHP participa de uma aplicação web

Uma aplicação web costuma ter duas partes principais:

- **front-end:** HTML, CSS e JavaScript executados no navegador;
- **back-end:** PHP executado no servidor.

Fluxo simplificado:

1. o navegador envia uma requisição HTTP;
2. o servidor web encaminha a requisição ao PHP;
3. o PHP valida dados e executa regras;
4. quando necessário, o PHP consulta arquivos ou banco de dados;
5. o servidor devolve uma resposta;
6. o navegador mostra HTML ou processa JSON.

O usuário recebe apenas o resultado produzido. O código-fonte PHP não deve ser enviado ao navegador.

## 3. PHP não substitui o JavaScript

As duas linguagens trabalham em momentos diferentes:

| JavaScript no navegador | PHP no servidor |
| --- | --- |
| reage a cliques e outros eventos | recebe requisições HTTP |
| manipula o DOM | valida dados novamente |
| atualiza a interface | aplica regras de negócio |
| envia requisições com `fetch()` | acessa banco de dados e arquivos |
| não deve guardar segredos | pode usar configurações protegidas do servidor |

Uma validação feita no navegador melhora a experiência, mas pode ser contornada. Dados importantes devem ser validados novamente no PHP.

## 4. Ambiente de execução

Um arquivo `.php` não deve ser aberto diretamente como se fosse um HTML. Ele precisa passar por um interpretador PHP.

Um ambiente web completo normalmente contém:

1. **servidor web**, como Apache ou Nginx;
2. **interpretador PHP**;
3. **banco de dados**, quando a aplicação precisar de persistência relacional.

Neste repositório, o ambiente pode ser iniciado com Docker Compose. A variável `PUBLIC_DIR` define qual mini-projeto será servido.

```bash
PUBLIC_DIR=./06-php-linguagem/painel-consumo-agua docker compose up -d
```

Depois disso, o endereço e a porta dependem da configuração presente em `compose.yaml`.

## 5. Estrutura básica de um script

O código PHP começa com `<?php`.

```php
<?php

echo "Olá, turma!";
```

Em um arquivo que contém apenas PHP, é comum não escrever a tag de fechamento `?>`. Isso evita que espaços acidentais sejam enviados na resposta.

Quando PHP e HTML aparecem no mesmo arquivo, a tag pode ser aberta e fechada conforme necessário.

```php
<?php
$nome = "Ana";
?>

<h1>Olá, <?= $nome ?></h1>
```

`<?= ... ?>` é uma forma curta de escrever `<?php echo ...; ?>`.

## 6. Instruções, comentários e saída

As instruções PHP normalmente terminam com ponto e vírgula.

```php
<?php

// Comentário de uma linha.
$curso = "Informática";

/*
    Comentário com mais de uma linha.
*/
echo $curso;
```

`echo` escreve dados na resposta HTTP. Essa resposta pode ser texto, HTML ou JSON, dependendo do objetivo do arquivo.

## 7. Variáveis e tipos de dados

Toda variável começa com `$`.

```php
$nome = "Bruna";
$idade = 17;
$media = 8.5;
$matriculado = true;
$observacao = null;
```

Tipos básicos importantes:

- `string`: texto;
- `int`: número inteiro;
- `float`: número com casas decimais;
- `bool`: `true` ou `false`;
- `null`: ausência intencional de valor;
- `array`: coleção de valores;
- `object`: objeto criado a partir de uma classe.

O PHP possui tipagem dinâmica: a variável não precisa ter um tipo declarado para receber um valor. Isso não elimina a necessidade de entender qual tipo está sendo usado.

Para inspecionar valores durante o estudo:

```php
var_dump($idade);
var_dump($matriculado);
```

## 8. Strings, concatenação e interpolação

O operador de concatenação do PHP é o ponto (`.`).

```php
$nome = "João";
$idade = 17;

echo $nome . " possui " . $idade . " anos.";
```

Strings com aspas duplas permitem interpolação simples:

```php
echo "$nome possui $idade anos.";
```

Aspas simples tratam o conteúdo de forma mais literal:

```php
echo '$nome possui $idade anos.';
// Saída: $nome possui $idade anos.
```

Quando uma expressão fica difícil de ler dentro do texto, calcule antes e guarde o resultado em uma variável.

## 9. Operadores principais

### Aritméticos

```php
$soma = 10 + 5;
$subtracao = 10 - 5;
$multiplicacao = 10 * 5;
$divisao = 10 / 5;
$resto = 10 % 3;
$potencia = 2 ** 3;
```

### Atribuição e acumuladores

```php
$contador = 0;
$contador++;
$contador += 5;

$mensagem = "Olá";
$mensagem .= ", turma!";
```

### Comparação

- `==` compara os valores com conversão de tipo;
- `===` compara valor e tipo;
- `!=` e `!==` verificam diferenças;
- `<`, `>`, `<=` e `>=` comparam ordem ou tamanho.

Prefira `===` e `!==` quando o tipo esperado for conhecido.

```php
$codigo = "10";

var_dump($codigo == 10);  // true
var_dump($codigo === 10); // false
```

### Lógicos

```php
$podeAcessar = $idade >= 16 && $matriculado;
$temAviso = !$matriculado;
$recebeAjuda = $bolsista || $baixaRenda;
```

## 10. Conversão de valores recebidos

Dados de formulário chegam ao PHP como texto. Quando o programa precisa calcular, a conversão deve ser consciente.

```php
$idade = (int) $_POST["idade"];
$preco = (float) $_POST["preco"];
```

Converter não é o mesmo que validar. A string `"abc"` convertida para inteiro não se torna uma idade válida. A validação de formulários será aprofundada na seção 9.

## 11. Decisões

### `if`, `elseif` e `else`

```php
if ($media >= 7) {
    echo "Aprovado";
} elseif ($media >= 5) {
    echo "Em recuperação";
} else {
    echo "Reprovado";
}
```

### `match`

Em versões modernas do PHP, `match` é útil quando um valor deve ser comparado com opções exatas.

```php
$situacao = match ($codigo) {
    1 => "Aguardando",
    2 => "Em andamento",
    3 => "Concluído",
    default => "Código desconhecido",
};
```

Para o início da disciplina, `if` continua sendo a estrutura mais flexível e fácil de acompanhar.

## 12. Estruturas de repetição

### `while`

Use quando a repetição depende de uma condição e não se sabe antecipadamente quantas voltas serão necessárias.

```php
$numero = 1;

while ($numero <= 5) {
    echo "<p>$numero</p>";
    $numero++;
}
```

### `do...while`

Executa o bloco pelo menos uma vez.

```php
do {
    $sorteado = rand(1, 10);
} while ($sorteado === 5);
```

### `for`

É adequado quando existe um contador claro.

```php
for ($numero = 1; $numero <= 10; $numero++) {
    $resultado = 7 * $numero;
    echo "<p>7 × $numero = $resultado</p>";
}
```

Laços precisam alterar a condição de parada. Caso contrário, o programa pode entrar em repetição infinita.

## 13. PHP dentro do HTML

Para blocos maiores de marcação, é mais legível sair do PHP em vez de montar todo o HTML com concatenações.

```php
<?php
$totalCrachas = 6;
?>

<ul>
    <?php for ($numero = 1; $numero <= $totalCrachas; $numero++) { ?>
        <li>Crachá <?= $numero ?></li>
    <?php } ?>
</ul>
```

Neste ponto da sequência, o `for` fornece os valores e o HTML define como cada item será apresentado. Arrays serão estudados na próxima seção.

## 14. Divisão do programa em arquivos

Os comandos de inclusão permitem reaproveitar código.

| Comando | Se o arquivo não existir | Inclusão repetida |
| --- | --- | --- |
| `include` | emite aviso e continua | permite |
| `require` | interrompe a execução | permite |
| `include_once` | emite aviso e continua | evita |
| `require_once` | interrompe a execução | evita |

Exemplo:

```php
<?php

require_once "connection.php";
```

Use `require` ou `require_once` quando o arquivo for indispensável, como uma configuração ou um trecho comum da página.

O caminho relativo é resolvido a partir do contexto de execução. Em projetos maiores, `__DIR__` ajuda a criar um caminho previsível:

```php
require_once __DIR__ . "/connection.php";
```

## 15. Funções: uma regra com nome

Uma função reúne uma tarefa que tem nome, entradas e uma saída esperada. Ela ajuda quando uma regra se repete, quando um cálculo precisa ser testado em cenários diferentes ou quando o bloco principal está ficando difícil de ler.

```php
function somar(int $numeroA, int $numeroB): int {
    return $numeroA + $numeroB;
}

$resultado = somar(10, 20);
```

Na definição, `$numeroA` e `$numeroB` são **parâmetros**. Na chamada, `10` e `20` são **argumentos**. O `return` entrega um resultado para a parte que chamou a função.

Uma função pequena deve ter uma responsabilidade clara. Por exemplo, `calcularMedia()` calcula; a parte que monta o HTML decide como apresentar o resultado.

## 16. `return` e `echo` têm papéis diferentes

`return` devolve um valor e encerra a função. `echo` escreve imediatamente na resposta HTTP.

```php
function calcularDobro(int $numero): int {
    return $numero * 2;
}

$dobro = calcularDobro(6);
echo "O dobro é $dobro.";
```

Esse formato permite usar o mesmo cálculo em uma página HTML, uma resposta JSON ou um teste. Uma função que usa `echo` para entregar um cálculo fica mais difícil de reaproveitar.

## 17. Tipos e valores padrão

Tipos nos parâmetros e no retorno deixam o contrato da função mais fácil de entender.

```php
function calcularMedia(
    float $notaA,
    float $notaB,
    float $bonus = 0
): float {
    return ($notaA + $notaB) / 2 + $bonus;
}
```

O valor padrão torna `$bonus` opcional. A assinatura documenta o tipo esperado, mas não substitui a validação de dados vindos de formulário, URL ou arquivo. Esses dados continuam precisando ser conferidos antes de entrar no cálculo.

## 18. Retorno antecipado

Quando existe um caso inválido simples, encerre a função cedo. Isso evita vários níveis de `if` e deixa o caminho principal mais legível.

```php
function calcularDesconto(float $preco): float {
    if ($preco <= 0) {
        return 0;
    }

    return $preco * 0.1;
}
```

O retorno antecipado não é uma forma de esconder erros. Ele deve produzir um resultado que faça sentido para a regra. Quando for necessário informar o problema em detalhes, use uma validação mais explícita ou uma estrutura de resultado estudada depois com arrays.

## 19. Escopo, parâmetros e `static`

Uma variável criada dentro de uma função existe apenas naquele bloco. Esse é o **escopo local**.

```php
function calcularTotal(float $preco, float $taxa): float {
    return $preco * (1 + $taxa);
}
```

Passar `$taxa` como parâmetro é melhor do que usar `global $taxa`: quem lê a chamada já sabe quais valores a regra precisa.

Uma variável `static` mantém seu valor entre chamadas da mesma função durante a requisição atual:

```php
function proximoNumero(): int {
    static $contador = 0;
    $contador++;
    return $contador;
}
```

Ela não cria armazenamento permanente e volta ao valor inicial em uma nova requisição.

## 20. Funções anônimas, arrow functions e callbacks

Uma função também pode ser guardada em uma variável. A arrow function é uma forma curta para uma expressão simples.

```php
$dobro = fn(int $numero): int => $numero * 2;

function aplicarOperacao(int $numero, callable $operacao): int {
    return $operacao($numero);
}

echo aplicarOperacao(6, $dobro); // 12
```

Nesse exemplo, `$dobro` é um **callback**: uma função entregue como argumento para outra função usar depois. Primeiro, domine funções nomeadas e parâmetros comuns; callbacks serão especialmente úteis ao trabalhar com arrays.

## 21. Exercícios propostos

Comece pelos quatro exercícios introdutórios. Cada um pratica uma ideia principal com dados definidos no próprio arquivo e uma saída pequena:

- [Cartão de Estudante](./cartao-estudante/README.md) ([implementação](./cartao-estudante/index.php)): usa variáveis para preencher uma página HTML.
- [Conta do Lanche](./conta-lanche/README.md) ([implementação](./conta-lanche/index.php)): usa uma função com parâmetros e `return` para calcular um total.
- [Status de Frequência](./status-frequencia/README.md) ([implementação](./status-frequencia/index.php)): combina comparações, booleanos e uma decisão em cadeia.
- [Tabuada de Uma Turma](./tabuada-uma-turma/README.md) ([implementação](./tabuada-uma-turma/index.php)): usa `for`, `%`, contadores e HTML repetitivo.

Depois, use os cinco desafios de integração. Eles combinam mais de uma regra e não precisam ser o primeiro contato do estudante com o conteúdo:

- [Painel de Consumo de Água](./painel-consumo-agua/README.md) ([implementação](./painel-consumo-agua/index.php)): reúne cálculos, classificação e recomendação.
- [Bilheteria da Gincana](./bilheteria-gincana/README.md) ([implementação](./bilheteria-gincana/index.php)): combina condições para explicar o preço final de um ingresso.
- [Calendário de Treinos](./calendario-treinos/README.md) ([implementação](./calendario-treinos/index.php)): gera uma grade com dias vazios, fins de semana e treinos especiais.
- [Lote de Crachás Numerados](./crachas-numerados/README.md) ([implementação](./crachas-numerados/index.php)): combina formatação, repetição, marcações e contagem.
- [Simulação do Reservatório](./reservatorio-escola/README.md) ([implementação](./reservatorio-escola/index.php)): acompanha a evolução de um estado e seus motivos de parada.

### Mapa de preparação

| Exercício introdutório | Habilidades praticadas | Desafios que reutilizam a base |
| --- | --- | --- |
| Cartão de Estudante | variáveis e PHP misturado ao HTML | todos os cinco |
| Conta do Lanche | parâmetros, `return`, cálculo e separação entre regra e apresentação | Painel e funções extraídas nos demais |
| Status de Frequência | comparações, booleanos, `&&`, `||`, `if`/`elseif`/`else` | Painel, Bilheteria e Reservatório |
| Tabuada de Uma Turma | `for`, `%`, contadores, HTML repetitivo e ponte para `while` | Calendário, Crachás e Reservatório |

Os nove exercícios permanecem sem arrays ou formulários. Os quatro primeiros cobrem as bases reutilizadas pelos desafios. Os desafios ainda combinam essas bases com uma regra de domínio nova: classificação com limites, grade com laços aninhados, formatação com `str_pad()` ou estado controlado por `while`. A extensão `do...while` do Reservatório é posterior e opcional.

## 22. Erros comuns

- abrir o arquivo PHP diretamente, sem servidor;
- esquecer `$` no nome de uma variável;
- esquecer `;` ao final de uma instrução;
- usar `+` para concatenar strings;
- comparar tipos diferentes sem perceber;
- produzir HTML com aspas mal fechadas;
- enviar saída antes de usar `header()`;
- criar laço sem condição de parada;
- usar `global` quando o valor poderia ser um parâmetro;
- usar `echo` dentro de uma função que deveria devolver um cálculo;
- criar uma função longa que calcula, valida e monta HTML ao mesmo tempo;
- acreditar que uma validação no front-end protege o back-end.

## 23. Resumo final

As ideias centrais desta seção são:

- PHP executa no servidor e produz uma resposta HTTP;
- variáveis começam com `$` e os tipos dos valores continuam importantes;
- decisões e repetições controlam o fluxo do programa;
- PHP pode gerar HTML ou texto nesta etapa inicial;
- `require` e `include` ajudam a dividir responsabilidades;
- laços evitam repetir manualmente estruturas previsíveis;
- funções recebem argumentos, executam uma regra e podem devolver resultados;
- `return` separa cálculo de apresentação;
- parâmetros e escopo local deixam as dependências visíveis;
- funções anônimas e callbacks permitem escolher uma operação quando isso realmente ajuda.

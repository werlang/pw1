# Programação Web I - Linguagem PHP

## 1. O que este guia ensina

Esta seção apresenta o PHP como linguagem de programação executada no servidor. O objetivo é compreender o caminho de uma requisição web e escrever os primeiros scripts com valores, decisões, repetições e geração de HTML.

Ao final deste guia, você deve conseguir:

- explicar a diferença entre código executado no navegador e no servidor;
- executar um arquivo PHP por meio de um servidor web;
- usar variáveis, tipos, operadores, decisões e repetições;
- misturar PHP e HTML sem perder a legibilidade;
- dividir o programa em arquivos com `include` e `require`;
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

## 15. Exercícios propostos

- [Painel de Consumo de Água](./painel-consumo-agua/README.md): transforma medidas em médias, classificação e recomendação.
- [Bilheteria da Gincana](./bilheteria-gincana/README.md): combina regras lógicas para explicar um preço final.
- [Calendário de Treinos](./calendario-treinos/README.md): produz uma grade mensal com índices e laços.
- [Lote de Crachás Numerados](./crachas-numerados/README.md): gera códigos, marcas periódicas e contagens.
- [Simulação do Reservatório](./reservatorio-escola/README.md): acompanha um estado até uma condição de parada.

Os cinco exercícios usam somente recursos apresentados até esta seção. Arrays, funções próprias e formulários ficam para as aulas seguintes.

## 16. Erros comuns

- abrir o arquivo PHP diretamente, sem servidor;
- esquecer `$` no nome de uma variável;
- esquecer `;` ao final de uma instrução;
- usar `+` para concatenar strings;
- comparar tipos diferentes sem perceber;
- produzir HTML com aspas mal fechadas;
- enviar saída antes de usar `header()`;
- criar laço sem condição de parada;
- acreditar que uma validação no front-end protege o back-end.

## 17. Resumo final

As ideias centrais desta seção são:

- PHP executa no servidor e produz uma resposta HTTP;
- variáveis começam com `$` e os tipos dos valores continuam importantes;
- decisões e repetições controlam o fluxo do programa;
- PHP pode gerar HTML ou texto nesta etapa inicial;
- `require` e `include` ajudam a dividir responsabilidades;
- laços evitam repetir manualmente estruturas previsíveis;
- manter cálculo e marcação organizados facilita a evolução para arrays e funções.

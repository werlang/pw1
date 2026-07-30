# Programação Web I - Formulários com PHP

## 1. O que este guia ensina

Formulários conectam a interface HTML ao código executado no servidor. Esta seção mostra como o navegador organiza os campos, como a requisição é enviada e como o PHP recebe, valida e utiliza os valores.

Ao final deste guia, você deve conseguir:

- montar formulários HTML com campos identificáveis;
- diferenciar `GET` de `POST`;
- ler `$_GET`, `$_POST` e `$_SERVER`;
- tratar campos ausentes, vazios e múltiplos;
- validar dados no servidor;
- exibir valores sem permitir injeção de HTML;
- trabalhar corretamente com senhas;
- redirecionar após uma operação concluída;
- devolver erros claros sem expor informações internas.

## 2. O caminho dos dados

Quando o usuário envia um formulário:

1. o navegador coleta os controles que possuem `name`;
2. os valores são codificados conforme o método e o tipo do formulário;
3. uma requisição HTTP é enviada ao endereço de `action`;
4. o PHP lê os dados recebidos;
5. o servidor valida e processa;
6. o PHP devolve HTML, redirecionamento ou JSON.

O servidor não deve confiar nos dados apenas porque eles vieram de um formulário criado pela aplicação. Uma requisição também pode ser montada por outras ferramentas.

## 3. Estrutura da tag `<form>`

```html
<form action="processar.php" method="POST">
    <label for="nome">Nome</label>
    <input id="nome" name="nome" type="text">

    <label for="email">E-mail</label>
    <input id="email" name="email" type="email">

    <button type="submit">Enviar</button>
</form>
```

Atributos principais:

- `action`: endereço que receberá a requisição;
- `method`: método HTTP, geralmente `GET` ou `POST`;
- `enctype`: codificação dos dados, necessária principalmente em upload.

Em cada controle:

- `id` conecta o campo ao `label` e ajuda na seleção pelo JavaScript;
- `name` define a chave enviada ao servidor;
- `type` define o comportamento do controle;
- `value` representa o valor enviado.

Sem `name`, o campo não participa do envio tradicional.

## 4. Método GET

No método `GET`, os dados aparecem na URL como *query string*.

```text
buscar.php?termo=php&turma=2AT
```

Características:

- os parâmetros podem ser vistos e copiados na URL;
- a página pode ser favoritada com os mesmos filtros;
- navegadores e intermediários podem guardar a URL no histórico ou em registros;
- é adequado para leitura, busca, filtro e paginação;
- não deve ser usado para alterar ou excluir dados;
- existe limite prático para o tamanho da URL.

Formulário:

```html
<form action="buscar.php" method="GET">
    <input name="termo" type="search">
    <button type="submit">Buscar</button>
</form>
```

PHP:

```php
<?php

$termo = trim($_GET["termo"] ?? "");

if ($termo === "") {
    echo "Informe um termo para buscar.";
    exit;
}

echo "Busca por: " . htmlspecialchars($termo);
```

## 5. Método POST

No método `POST`, os dados são colocados no corpo da requisição.

Características:

- os valores não aparecem na barra de endereços;
- é adequado para cadastro, login e outras operações que modificam estado;
- suporta corpos maiores que uma URL;
- não torna os dados automaticamente secretos.

`POST` não é criptografia. Para proteger os dados durante o transporte, a aplicação precisa usar HTTPS.

```html
<form action="cadastrar.php" method="POST">
    <input name="nome" type="text">
    <input name="email" type="email">
    <button type="submit">Cadastrar</button>
</form>
```

```php
<?php

$nome = trim($_POST["nome"] ?? "");
$email = trim($_POST["email"] ?? "");
```

## 6. `$_GET`, `$_POST` e `$_SERVER`

`$_GET` e `$_POST` são arrays associativos chamados **superglobais**.

```php
$nome = $_POST["nome"] ?? "";
```

`$_SERVER` contém informações sobre a requisição:

```php
$metodo = $_SERVER["REQUEST_METHOD"];

if ($metodo !== "POST") {
    http_response_code(405);
    echo "Método não permitido.";
    exit;
}
```

Essa verificação evita processar o arquivo por um método que não corresponde ao objetivo do endpoint.

## 7. Campo ausente, vazio e valor `"0"`

São situações diferentes:

- **ausente:** a chave não foi enviada;
- **vazio:** foi enviada uma string sem conteúdo;
- **`"0"`:** existe um valor que pode ser válido.

Leitura previsível:

```php
$quantidadeTexto = trim($_POST["quantidade"] ?? "");

if ($quantidadeTexto === "") {
    echo "Informe a quantidade.";
    exit;
}
```

Usar apenas `empty()` exige cuidado, porque `empty("0")` retorna `true`.

## 8. Validação no HTML e no PHP

O HTML pode orientar o usuário:

```html
<input
    name="email"
    type="email"
    required
    maxlength="120"
>
```

Mas o PHP precisa validar novamente:

```php
$email = trim($_POST["email"] ?? "");

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo "E-mail inválido.";
    exit;
}
```

Razões para validar no servidor:

- atributos HTML podem ser removidos;
- JavaScript pode ser desativado;
- a requisição pode vir de outro programa;
- regras de negócio pertencem ao back-end.

## 9. Validar, normalizar e escapar são ações diferentes

### Normalizar

Coloca o valor em uma forma previsível.

```php
$email = strtolower(trim($_POST["email"] ?? ""));
```

### Validar

Confere se o valor atende à regra.

```php
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    // Responde com erro.
}
```

### Escapar na saída

Protege o contexto em que o valor será exibido.

```php
echo htmlspecialchars($nome, ENT_QUOTES, "UTF-8");
```

Remover caracteres sem entender a regra pode alterar dados válidos. Em geral, valide o formato e escape no momento da saída.

## 10. Números

Um campo numérico também chega como string.

```php
$idadeRecebida = $_POST["idade"] ?? null;
$idade = filter_var($idadeRecebida, FILTER_VALIDATE_INT);

if ($idade === false || $idade < 0 || $idade > 120) {
    echo "Idade inválida.";
    exit;
}
```

Para valores decimais, defina qual formato a interface aceita. O texto `"10,50"` não é interpretado da mesma forma que `"10.50"` em todas as operações.

## 11. Radio, checkbox e select

### Radio

Campos radio do mesmo grupo compartilham o mesmo `name`.

```html
<label><input name="turno" type="radio" value="manha"> Manhã</label>
<label><input name="turno" type="radio" value="tarde"> Tarde</label>
```

```php
$turno = $_POST["turno"] ?? "";
```

### Checkbox único

Um checkbox desmarcado normalmente não é enviado.

```html
<label>
    <input name="aceitou" type="checkbox" value="1">
    Aceito os termos
</label>
```

```php
$aceitou = isset($_POST["aceitou"]);
```

### Vários valores

Colchetes no nome criam um array:

```html
<label><input name="interesses[]" type="checkbox" value="front-end"> Front-end</label>
<label><input name="interesses[]" type="checkbox" value="back-end"> Back-end</label>
```

```php
$interesses = $_POST["interesses"] ?? [];

if (!is_array($interesses)) {
    $interesses = [];
}
```

## 12. Preservando valores após um erro

Quando o formulário e o processamento estão na mesma página, é possível mostrar novamente um valor válido:

```php
<?php
$nome = trim($_POST["nome"] ?? "");
?>

<input
    name="nome"
    value="<?= htmlspecialchars($nome, ENT_QUOTES, "UTF-8") ?>"
>
```

Nunca insira diretamente na página um valor recebido do usuário.

## 13. Mensagens de erro

Um formulário pode acumular erros para exibi-los de uma vez:

```php
$erros = [];

if ($nome === "") {
    $erros[] = "O nome é obrigatório.";
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $erros[] = "Informe um e-mail válido.";
}

if (count($erros) > 0) {
    foreach ($erros as $erro) {
        echo "<p>" . htmlspecialchars($erro) . "</p>";
    }
}
```

Em uma API, a mesma ideia pode ser devolvida como JSON.

## 14. Senhas

Senhas não devem ser armazenadas como texto puro.

Cadastro:

```php
$senha = $_POST["senha"] ?? "";

if (strlen($senha) < 8) {
    echo "A senha deve possuir pelo menos 8 caracteres.";
    exit;
}

$hash = password_hash($senha, PASSWORD_DEFAULT);
```

Login:

```php
if (password_verify($senhaInformada, $hashArmazenado)) {
    echo "Credenciais válidas.";
}
```

Regras importantes:

- `password_hash()` recebe a senha original;
- somente o hash deve ser salvo;
- `password_verify()` recebe primeiro a senha informada e depois o hash;
- não compare hashes criando um novo hash da mesma senha, pois o resultado pode mudar.

## 15. Redirecionamento

Depois de concluir uma operação, o PHP pode redirecionar:

```php
header("Location: perfil.php");
exit;
```

`header()` precisa ser chamado antes de qualquer saída. O `exit` impede que o restante do script continue executando.

Uma prática comum após um `POST` tradicional é redirecionar para evitar o reenvio acidental ao atualizar a página.

## 16. Formulário tradicional e AJAX

No envio tradicional:

- o navegador segue o `action`;
- a página normalmente é recarregada;
- o PHP pode devolver uma página ou redirecionar.

Com AJAX:

- JavaScript intercepta `submit`;
- `fetch()` envia a requisição;
- o PHP costuma devolver JSON;
- a página atualiza apenas a parte necessária.

O processamento no servidor continua precisando das mesmas validações.

## 17. Upload é um tipo especial de formulário

Para envio tradicional de arquivos:

```html
<form action="upload.php" method="POST" enctype="multipart/form-data">
    <input name="foto" type="file">
    <button type="submit">Enviar</button>
</form>
```

O arquivo chega em `$_FILES`, não em `$_POST`. A validação segura de upload será aprofundada na seção 13.

## 18. Exemplo completo de validação

```php
<?php

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    exit;
}

$nome = trim($_POST["nome"] ?? "");
$email = strtolower(trim($_POST["email"] ?? ""));
$erros = [];

if ($nome === "") {
    $erros[] = "O nome é obrigatório.";
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $erros[] = "O e-mail informado é inválido.";
}

if (count($erros) > 0) {
    http_response_code(422);

    foreach ($erros as $erro) {
        echo "<p>" . htmlspecialchars($erro) . "</p>";
    }

    exit;
}

echo "<p>Cadastro recebido para " . htmlspecialchars($nome) . ".</p>";
```

O exemplo separa:

1. conferência do método;
2. leitura e normalização;
3. validação;
4. resposta de erro;
5. processamento de sucesso.

## 19. Relação com as práticas do repositório

### Primeiros formulários GET

Pastas:

- [`exemplos/ex08.1`](../exemplos/ex08.1/)
- [`exemplos/ex08.2`](../exemplos/ex08.2/)

Esses exemplos mostram `action`, campos nomeados, `$_GET` e envio de vários valores com `[]`.

### Hash de senha

Pasta: [`exemplos/ex08.3`](../exemplos/ex08.3/)

O exemplo introduz `password_hash()` e `password_verify()`.

## 20. Exercícios propostos

- [Buscador de Rotas Escolares](./buscador-rotas/README.md): usa GET para criar uma consulta reproduzível por URL.
- [Inscrição em Oficinas](./inscricao-oficinas/README.md): acumula erros e preserva radio, select e checkbox.
- [Montador de Kit de Lanche](./kit-lanche/README.md): processa quantidades indexadas por código e calcula um orçamento.
- [Quiz em Etapas](./quiz-etapas/README.md): transporta estado mínimo entre requisições sem sessão.
- [Troca de Senha Simulada](./troca-senha-simulada/README.md): verifica e gera hashes sem expor as senhas.

## 21. Erros comuns

- esquecer `name` no campo;
- confundir `id` com a chave enviada ao PHP;
- acessar `$_POST["campo"]` sem considerar que ele pode faltar;
- acreditar que `required` substitui validação no servidor;
- usar `GET` para excluir ou cadastrar;
- acreditar que `POST` esconde ou criptografa os dados;
- exibir entrada do usuário sem `htmlspecialchars()`;
- usar `empty()` sem considerar o valor `"0"`;
- guardar senha em texto puro;
- chamar `header()` depois de imprimir HTML;
- redirecionar sem encerrar o script.

## 22. Boas práticas

- use `GET` para leitura e `POST` para mudanças;
- valide todos os dados no servidor;
- normalize somente quando existir uma regra clara;
- escape valores no contexto da saída;
- use `password_hash()` e `password_verify()` para senhas;
- devolva mensagens úteis sem mostrar detalhes internos;
- separe leitura, validação e processamento em blocos claros;
- use HTTPS em aplicações reais.

## 23. Resumo final

Os pontos centrais desta seção são:

- `form` organiza e envia controles que possuem `name`;
- `GET` coloca parâmetros na URL e serve para operações de leitura;
- `POST` envia dados no corpo e serve para operações que modificam estado;
- `$_GET` e `$_POST` são arrays associativos;
- o servidor precisa validar mesmo quando o HTML já possui regras;
- escapar saída é diferente de validar entrada;
- senhas devem ser verificadas por hash;
- um fluxo previsível separa recebimento, validação, processamento e resposta.

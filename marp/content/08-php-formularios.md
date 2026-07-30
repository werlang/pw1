---
marp: true
theme: ifsul
header: ' '
footer: 'Instituto Federal Sul-rio-grandense | Campus Charqueadas'
---

<!-- _class: lead -->

# Programação Web I
## Formulários com PHP

Prof. Pablo Werlang
pablowerlang@ifsul.edu.br

---

# Formulários com PHP
## Da interface até o servidor

<div class="grid grid-cols-2 gap-6 h-full">
<div>

- O usuário preenche campos
- O navegador monta uma requisição
- O PHP recebe e valida novamente
- O servidor responde com HTML, JSON ou redirecionamento

</div>
<div class="media mx-auto">
    <img class="placeholder" alt="Prompt de IA: formulário escolar atravessando uma esteira de inspeção antes de entrar no servidor, metáfora visual leve para validação de dados">
</div>
</div>

---

# Formulários com PHP
## O caminho dos dados

1. Controles com `name` são coletados
2. `method` define como os dados viajam
3. `action` define quem recebe
4. PHP lê as superglobais
5. O back-end valida e processa
6. Uma resposta volta ao navegador

---

<!-- _class: divider -->

# A Tag `<form>`

---

# Formulários com PHP
## Estrutura mínima

```html
<form action="processar.php" method="POST">
    <label for="nome">Nome</label>
    <input id="nome" name="nome" type="text">

    <button type="submit">Enviar</button>
</form>
```

- `action`: destino
- `method`: método HTTP
- `name`: chave enviada ao PHP

---

# Formulários com PHP
## `id` e `name` não fazem o mesmo trabalho

<div class="grid grid-cols-2 gap-6">
<div>

**`id`**

- Liga o `label` ao campo
- Ajuda CSS e JavaScript
- Identifica o elemento na página

</div>
<div>

**`name`**

- Define a chave da requisição
- É lido em `$_GET` ou `$_POST`
- Sem ele, o campo não é enviado

</div>
</div>

---

<!-- _class: divider -->

# GET e POST

---

# Formulários com PHP
## GET: a consulta vai na URL

```text
buscar.php?termo=php&turma=2AT
```

- Bom para busca, filtro e paginação
- A URL pode ser copiada e favoritada
- Os dados ficam visíveis no histórico
- Não deve cadastrar, alterar ou excluir

---

# Formulários com PHP
## Lendo `$_GET`

```php
$termo = trim($_GET["termo"] ?? "");

if ($termo === "") {
    echo "Informe um termo.";
    exit;
}

echo htmlspecialchars($termo);
```

`??` fornece um valor padrão quando a chave não existe.

---

# Formulários com PHP
## POST: dados no corpo

- Bom para cadastro, login e alterações
- Não coloca os campos na barra de endereço
- Aceita corpos maiores que uma URL
- **Não criptografa os dados**

HTTPS é o que protege o transporte.

---

# Formulários com PHP
## Lendo `$_POST`

```php
$nome = trim($_POST["nome"] ?? "");
$email = trim($_POST["email"] ?? "");
```

Os dois são arrays associativos:

- `$_GET["campo"]`
- `$_POST["campo"]`

---

# Formulários com PHP
## Qual método usar?

<div class="grid grid-cols-2 gap-6">
<div>

**GET**

- Consulta dados
- Repete sem efeito colateral
- Parâmetros aparecem na URL

</div>
<div>

**POST**

- Cria ou altera estado
- Envia dados no corpo
- Continua precisando de HTTPS

</div>
</div>

---

<!-- _class: divider -->

# Receber e Validar

---

# Formulários com PHP
## Confira o método

```php
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    echo "Método não permitido.";
    exit;
}
```

- O endpoint deixa claro o que aceita
- `405` indica método incorreto
- `exit` interrompe o restante do script

---

# Formulários com PHP
## Ausente, vazio ou `"0"`?

```php
$quantidade = trim($_POST["quantidade"] ?? "");

if ($quantidade === "") {
    echo "Informe a quantidade.";
    exit;
}
```

- Ausente: a chave não veio
- Vazio: veio sem conteúdo
- `"0"`: pode ser um valor válido

`empty("0")` retorna `true`: use com consciência.

---

# Formulários com PHP
## O navegador ajuda, o PHP confirma

<div class="grid grid-cols-2 gap-6">
<div>

**HTML**

```html
<input
    name="email"
    type="email"
    required
>
```

</div>
<div>

**PHP**

```php
if (!filter_var(
    $email,
    FILTER_VALIDATE_EMAIL
)) {
    exit("E-mail inválido.");
}
```

</div>
</div>

---

# Formulários com PHP
## Três tarefas diferentes

<div class="grid grid-cols-3 gap-6">
<div>

**Normalizar**

`trim()` e regras de formato.

</div>
<div>

**Validar**

Conferir se o valor é aceito.

</div>
<div>

**Escapar**

Proteger o contexto de saída.

</div>
</div>

```php
echo htmlspecialchars($nome, ENT_QUOTES, "UTF-8");
```

---

# Formulários com PHP
## Radio e checkbox

```html
<label><input name="turno" type="radio"
    value="manha"> Manhã</label>

<label><input name="interesses[]" type="checkbox"
    value="backend"> Back-end</label>
```

- Radios do grupo compartilham o mesmo `name`
- `[]` envia vários valores como array
- Checkbox desmarcado normalmente não é enviado

---

# Formulários com PHP
## Senha não vai para o banco em texto puro

```php
$hash = password_hash(
    $senha,
    PASSWORD_DEFAULT
);

if (password_verify($senhaInformada, $hash)) {
    echo "Credenciais válidas";
}
```

- Salve somente o hash
- Verifique senha informada contra hash armazenado

---

# Formulários com PHP
## Redirecionar depois do sucesso

```php
header("Location: perfil.php");
exit;
```

- `header()` precisa vir antes de qualquer saída
- `exit` impede a continuação do script
- O redirecionamento evita reenvio acidental do formulário

---

# Formulários com PHP
## Tradicional ou AJAX?

<div class="grid grid-cols-2 gap-6">
<div>

**Envio tradicional**

- Navegador segue o `action`
- A página recarrega
- PHP devolve HTML ou redireciona

</div>
<div>

**AJAX**

- JavaScript intercepta `submit`
- `fetch()` envia os dados
- PHP normalmente devolve JSON

</div>
</div>

As validações do servidor continuam as mesmas.

---

# Formulários com PHP
## Upload pede outra codificação

```html
<form action="upload.php" method="POST"
    enctype="multipart/form-data">
    <input name="foto" type="file">
    <button type="submit">Enviar</button>
</form>
```

- Campos comuns chegam em `$_POST`
- Arquivos chegam em `$_FILES`
- Upload seguro será aprofundado na aula 13

---

<!-- _class: divider -->

# Hora de Praticar

---

# Formulários com PHP
## Primeiro contato com GET

- Montar o formulário com `action`, `method` e `name`
- Ler nome e e-mail no PHP
- Enviar vários valores com `[]`
- Observar a query string na URL

Pastas: `exemplos/ex08.1/` e `exemplos/ex08.2/`

---

# Formulários com PHP
## Exercícios: consultas e escolhas

- **Buscador de Rotas:** filtros GET reproduzíveis pela URL  
  `08-php-formularios/buscador-rotas/`
- **Inscrição em Oficinas:** erros acumulados e campos preservados  
  `08-php-formularios/inscricao-oficinas/`
- **Kit de Lanche:** quantidades por código e orçamento seguro  
  `08-php-formularios/kit-lanche/`

---

# Formulários com PHP
## Exercícios: estado e senha

- **Quiz em Etapas:** estado mínimo viaja em campos ocultos  
  `08-php-formularios/quiz-etapas/`
- **Troca de Senha Simulada:** verifica e gera hashes sem persistência  
  `08-php-formularios/troca-senha-simulada/`

Sessão e banco ainda não entram: o limite desta aula faz parte do exercício.

---

# Formulários com PHP
## Erros comuns

- Esquecer `name` no campo
- Achar que `required` protege o servidor
- Usar GET para alterar dados
- Achar que POST é criptografia
- Exibir entrada sem `htmlspecialchars()`
- Chamar `header()` depois de imprimir

---

# Formulários com PHP
## O que precisa ficar

- `form` transforma controles em uma requisição
- GET consulta; POST modifica estado
- `$_GET` e `$_POST` são arrays associativos
- O back-end sempre valida novamente
- Validar entrada e escapar saída são tarefas diferentes
- Senhas usam hash, nunca texto puro

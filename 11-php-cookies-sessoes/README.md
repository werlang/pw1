# Programação Web I - Cookies e Sessões no PHP

## 1. O que este guia ensina

HTTP não mantém, por conta própria, uma memória contínua entre requisições. Cookies e sessões permitem reconhecer preferências e manter autenticação ao navegar por várias páginas.

Ao final deste guia, você deve conseguir:

- explicar por que HTTP é considerado sem estado;
- diferenciar cookie de sessão;
- iniciar, ler, alterar e encerrar uma sessão PHP;
- proteger páginas e endpoints com uma guarda de sessão;
- criar e ler cookies com atributos adequados;
- implementar um fluxo básico de login e logout;
- reduzir riscos de roubo e fixação de sessão;
- entender por que autenticação também exige autorização e proteção contra CSRF.

## 2. Requisições não compartilham variáveis comuns

Uma variável criada em `login.php` não continua existindo automaticamente quando o navegador abre `perfil.php`.

```text
POST /login.php   → uma execução do PHP
GET /perfil.php   → outra execução do PHP
```

Cada requisição inicia uma nova execução. Para relacioná-las, a aplicação precisa de um identificador persistido no cliente e de dados recuperáveis no servidor.

## 3. Cookie e sessão: qual é a diferença

### Cookie

- fica armazenado no navegador;
- possui nome, valor e atributos;
- é enviado automaticamente em requisições compatíveis;
- pode guardar preferências pequenas;
- pode guardar o identificador de uma sessão.

### Sessão PHP

- guarda os dados da aplicação no servidor;
- associa esses dados a um identificador;
- normalmente usa um cookie para manter esse identificador no navegador;
- permite guardar dados de autenticação sem colocar todo o cadastro no cliente.

Portanto, sessão não elimina cookies: normalmente ela usa um cookie de identificação.

## 4. Ciclo básico de uma sessão

1. o PHP inicia ou recupera a sessão;
2. o navegador recebe ou envia o cookie com o identificador;
3. o PHP localiza os dados associados no servidor;
4. o script lê ou altera `$_SESSION`;
5. outra requisição pode recuperar o mesmo estado enquanto a sessão for válida.

A duração real depende das configurações do cookie, do PHP e da aplicação. Fechar o navegador pode remover um cookie de sessão, mas não é uma regra suficiente para definir logout ou expiração.

## 5. Iniciando a sessão

```php
<?php

session_start();
```

`session_start()` deve ocorrer antes de enviar HTML, texto ou cabeçalhos da resposta.

Todo arquivo que usa `$_SESSION` precisa iniciar a sessão.

## 6. Gravando e lendo dados

```php
session_start();

$_SESSION["user"] = [
    "id" => 15,
    "name" => "Ana Souza",
    "email" => "ana@example.com"
];
```

Em outra requisição:

```php
session_start();

if (isset($_SESSION["user"])) {
    echo $_SESSION["user"]["name"];
}
```

Guarde apenas o necessário. Não coloque senha, hash de senha ou dados excessivos na sessão.

## 7. Login com sessão

Fluxo esperado:

1. receber e validar e-mail e senha;
2. buscar o usuário com consulta preparada;
3. verificar a senha com `password_verify()`;
4. gerar um novo identificador de sessão;
5. salvar dados mínimos do usuário;
6. responder com sucesso.

```php
session_start();

if (!$user || !password_verify($senha, $user["password"])) {
    http_response_code(401);

    echo json_encode([
        "error" => true,
        "message" => "Credenciais inválidas."
    ]);

    exit;
}

session_regenerate_id(true);

$_SESSION["user"] = [
    "id" => $user["id"],
    "name" => $user["name"],
    "email" => $user["email"]
];
```

`session_regenerate_id(true)` reduz o risco de fixação de sessão após a autenticação.

## 8. Guarda de sessão

Uma página protegida verifica a sessão antes de executar a regra principal.

```php
<?php

session_start();
header("Content-Type: application/json; charset=utf-8");

if (!isset($_SESSION["user"])) {
    http_response_code(401);

    echo json_encode([
        "error" => true,
        "message" => "Autenticação necessária."
    ]);

    exit;
}

$user = $_SESSION["user"];
```

O `exit` é indispensável. Sem ele, o endpoint pode continuar e devolver dados protegidos.

## 9. Autenticação e autorização

Autenticação verifica quem é o usuário. Autorização verifica se ele pode realizar a ação.

```php
if ($_SESSION["user"]["id"] !== $ownerId) {
    http_response_code(403);

    echo json_encode([
        "error" => true,
        "message" => "Você não pode alterar este registro."
    ]);

    exit;
}
```

Ter uma sessão válida não dá acesso automático a todos os registros do sistema.

## 10. Logout

Um logout completo remove os dados, encerra a sessão e expira o cookie de identificação.

```php
<?php

session_start();
$_SESSION = [];

if (ini_get("session.use_cookies")) {
    $parameters = session_get_cookie_params();

    setcookie(session_name(), "", [
        "expires" => time() - 42000,
        "path" => $parameters["path"],
        "domain" => $parameters["domain"],
        "secure" => $parameters["secure"],
        "httponly" => $parameters["httponly"],
        "samesite" => $parameters["samesite"] ?? "Lax"
    ]);
}

session_destroy();
```

Para uma primeira prática, `unset($_SESSION["user"])` pode remover somente o usuário. `session_destroy()` sozinho não apaga necessariamente o cookie do navegador.

Logout deve ser uma operação intencional, normalmente enviada por `POST`.

## 11. Criando cookies no PHP

```php
setcookie("tema", "dark", [
    "expires" => time() + 86400,
    "path" => "/",
    "secure" => true,
    "httponly" => false,
    "samesite" => "Lax"
]);
```

Atributos:

- `expires` ou `max-age`: duração;
- `path`: caminhos que recebem o cookie;
- `domain`: domínio permitido;
- `secure`: envia somente por HTTPS;
- `httponly`: impede leitura por JavaScript;
- `samesite`: controla envio em navegação entre sites.

Em ambiente local sem HTTPS, `secure => true` impede o envio. Em produção com HTTPS, cookies sensíveis devem usar `secure`.

`setcookie()` também precisa ocorrer antes de qualquer saída.

## 12. Lendo cookies no PHP

```php
$tema = $_COOKIE["tema"] ?? "light";
```

Após `setcookie()`, o novo valor normalmente aparecerá em `$_COOKIE` somente na próxima requisição.

Cookies podem ser alterados pelo usuário. Uma preferência pode aceitar valores limitados:

```php
$temasPermitidos = ["light", "dark"];

if (!in_array($tema, $temasPermitidos, true)) {
    $tema = "light";
}
```

## 13. Cookies no JavaScript

```js
document.cookie = 'tema=dark; path=/; max-age=86400; SameSite=Lax';
console.log(document.cookie);
```

JavaScript não consegue ler cookies marcados como `HttpOnly`. Essa proteção é adequada para cookies de sessão, porque o código da interface não precisa acessar o identificador.

`document.cookie` devolve uma string, não um objeto pronto.

## 14. O que não guardar em cookie

Evite guardar:

- senha;
- hash de senha;
- dados pessoais desnecessários;
- permissões confiáveis somente pelo valor do cliente;
- informações grandes.

O usuário controla o navegador e pode alterar cookies. O servidor deve validar qualquer valor que afete uma regra.

## 15. Cookies, `localStorage` e sessão

| Recurso | Onde fica | Envio automático | Uso comum |
| --- | --- | --- | --- |
| cookie | navegador | sim, conforme atributos | preferências e identificador de sessão |
| `localStorage` | navegador | não | estado local não sensível |
| `sessionStorage` | aba do navegador | não | estado temporário da interface |
| sessão PHP | servidor | identificador via cookie | autenticação e estado do usuário |

Não guarde token ou senha em storage apenas por ser fácil de acessar pelo JavaScript.

## 16. Configuração do cookie de sessão

Antes de iniciar a sessão, a aplicação pode definir atributos:

```php
session_set_cookie_params([
    "httponly" => true,
    "secure" => true,
    "samesite" => "Lax",
    "path" => "/"
]);

session_start();
```

Essa configuração deve ser centralizada para não variar entre endpoints.

## 17. Expiração e inatividade

A aplicação pode controlar o tempo máximo sem atividade:

```php
session_start();

$limite = 30 * 60;
$ultimoAcesso = $_SESSION["last_activity"] ?? time();

if (time() - $ultimoAcesso > $limite) {
    $_SESSION = [];
    session_destroy();
    http_response_code(401);

    echo json_encode([
        "error" => true,
        "message" => "Sessão expirada por inatividade."
    ]);

    exit;
}

$_SESSION["last_activity"] = time();
```

Esse controle precisa ser aplicado de forma consistente em todas as rotas protegidas.

## 18. CSRF

Como cookies são enviados automaticamente, outro site pode tentar induzir o navegador a enviar uma requisição autenticada. Isso é **Cross-Site Request Forgery**.

Defesas importantes:

- usar `SameSite=Lax` ou `Strict` quando compatível;
- usar `POST` para mudanças;
- validar um token CSRF em operações sensíveis;
- conferir origem quando apropriado;
- nunca usar apenas um parâmetro GET para excluir ou alterar dados.

Sessão válida não prova que o usuário desejou aquela requisição.

## 19. Resposta ao front-end

```php
echo json_encode([
    "user" => $_SESSION["user"],
    "message" => "Perfil recuperado com sucesso."
]);
```

O front-end pode redirecionar ao receber 401:

```js
if (response.status === 401) {
    window.location.href = '../login/';
}
```

A interface melhora a navegação, mas a proteção real continua no PHP.

## 20. Relação com as práticas do repositório

### Login, perfil e sessão

Pasta: [`exemplos/ex12.1`](../exemplos/ex12.1/)

Mostra login com banco, criação de `$_SESSION`, consulta do perfil e logout via requisição.

### Aplicação integrada

Pasta: [`exemplos/ex13.1`](../exemplos/ex13.1/)

O mini-projeto contém uma guarda de sessão em `api/session.php` e endpoints separados para login e logout.

## 21. Exercícios propostos

- [Preferências de Leitura](./preferencias-leitura/README.md): usa cookies apenas para escolhas de apresentação validadas.
- [Comanda da Cantina por Rodadas](./comanda-cantina/README.md): mantém rodada atual e histórico na sessão, com preços do servidor.
- [Portal do Boletim](./portal-boletim/README.md): protege página e endpoint e limita cada consulta ao usuário autenticado.
- [Inscrição em Etapas](./inscricao-etapas/README.md): mantém um rascunho navegável e bloqueia etapas fora de ordem.
- [Quiz com Tentativas Controladas](./quiz-tentativas/README.md): combina progresso, expiração, limite e token CSRF.

## 22. Erros comuns

- chamar `session_start()` depois de gerar saída;
- usar `$_SESSION` sem iniciar a sessão;
- acreditar que fechar a aba sempre encerra a sessão;
- salvar a senha na sessão;
- verificar sessão na interface, mas não no endpoint;
- autenticar sem regenerar o identificador;
- usar `session_destroy()` e assumir que todo cookie foi removido;
- confiar em valores de cookies para autorizar ações;
- criar cookies sensíveis sem `HttpOnly`, `Secure` e `SameSite`;
- usar GET para logout ou exclusão;
- esquecer proteção contra CSRF.

## 23. Boas práticas

- centralize a configuração da sessão;
- regenere o identificador após login;
- guarde somente dados mínimos do usuário;
- aplique a guarda em todo endpoint protegido;
- verifique autorização sobre o recurso;
- encerre a execução depois de 401 ou 403;
- use HTTPS e atributos seguros em produção;
- implemente logout e expiração previsíveis;
- trate cookies do cliente como entrada não confiável.

## 24. Resumo final

Os pontos centrais desta seção são:

- requisições HTTP não compartilham variáveis comuns;
- cookies ficam no navegador;
- sessões guardam estado no servidor e normalmente usam um cookie identificador;
- `session_start()` recupera ou inicia a sessão;
- a guarda de sessão protege cada endpoint;
- login deve regenerar o identificador;
- logout precisa remover dados e encerrar a sessão;
- autenticação, autorização e CSRF são problemas relacionados, mas diferentes.

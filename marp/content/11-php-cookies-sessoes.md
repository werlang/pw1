---
marp: true
theme: ifsul
header: ' '
footer: 'Instituto Federal Sul-rio-grandense | Campus Charqueadas'
---

<!-- _class: lead -->

# Programação Web I
## Cookies e Sessões no PHP

Prof. Pablo Werlang
pablowerlang@ifsul.edu.br

---

# Cookies e Sessões
## Como o servidor lembra de alguém?

<div class="grid grid-cols-2 gap-6 h-full">
<div>

- Cada requisição é uma nova execução
- Variáveis comuns não atravessam páginas
- Cookies guardam pequenos valores no navegador
- Sessões mantêm estado no servidor

</div>
<div class="media mx-auto">
    <img class="placeholder" alt="Prompt de IA: recepcionista reconhecendo um estudante por um crachá numerado enquanto guarda a ficha completa em um arquivo seguro, metáfora para cookie de sessão">
</div>
</div>

---

# Cookies e Sessões
## HTTP não guarda memória sozinho

```text
POST /login.php   → uma execução
GET  /perfil.php  → outra execução
```

- Cada requisição começa de novo
- Uma variável de `login.php` não aparece magicamente em `perfil.php`
- Precisamos relacionar as requisições

---

# Cookies e Sessões
## Cliente ou servidor?

<div class="grid grid-cols-2 gap-6">
<div>

**Cookie**

- Fica no navegador
- Viaja automaticamente
- Guarda valor pequeno
- Pode ser alterado pelo usuário

</div>
<div>

**Sessão PHP**

- Dados ficam no servidor
- Usa um identificador
- Normalmente depende de um cookie
- Guarda estado autenticado

</div>
</div>

---

# Sessões no PHP
## O ciclo da sessão

1. PHP inicia ou recupera a sessão
2. Navegador envia o cookie identificador
3. Servidor localiza os dados
4. O script usa `$_SESSION`
5. A próxima requisição repete o processo

Fechar a aba não é uma regra confiável de logout.

---

<!-- _class: divider -->

# Sessões no PHP

---

# Sessões no PHP
## Comece antes de qualquer saída

```php
<?php

session_start();
```

- Deve vir antes de HTML ou `echo`
- Todo arquivo que usa `$_SESSION` inicia a sessão
- O PHP recupera ou cria o identificador

---

# Sessões no PHP
## Guardando dados mínimos

```php
session_start();

$_SESSION["user"] = [
    "id" => 15,
    "name" => "Ana Souza",
    "email" => "ana@example.com"
];
```

Não guarde senha nem hash da senha.

---

# Sessões no PHP
## Login: o fluxo completo

1. Validar e-mail e senha
2. Buscar o usuário com consulta preparada
3. Conferir com `password_verify()`
4. Regenerar o identificador
5. Guardar dados mínimos na sessão

---

# Sessões no PHP
## Regenerar depois de autenticar

```php
session_regenerate_id(true);

$_SESSION["user"] = [
    "id" => $user["id"],
    "name" => $user["name"]
];
```

Isso reduz o risco de **fixação de sessão**.

---

# Sessões no PHP
## Guarda de sessão

```php
session_start();

if (!isset($_SESSION["user"])) {
    http_response_code(401);
    echo json_encode([
        "error" => true,
        "message" => "Autenticação necessária"
    ]);
    exit;
}
```

O `exit` impede que dados protegidos sejam enviados.

---

# Sessões no PHP
## Autenticado não significa autorizado

<div class="grid grid-cols-2 gap-6">
<div>

**Autenticação**

Quem é o usuário?

Resposta comum: `401`.

</div>
<div>

**Autorização**

Ele pode alterar este registro?

Resposta comum: `403`.

</div>
</div>

---

# Sessões no PHP
## Logout

```php
session_start();
$_SESSION = [];
session_destroy();
```

Um logout completo também expira o cookie da sessão.

- Remover dados
- Destruir a sessão
- Invalidar o identificador no navegador
- Preferir uma requisição POST

---

<!-- _class: divider -->

# Cookies

---

# Cookies
## Criando no PHP

```php
setcookie("tema", "dark", [
    "expires" => time() + 86400,
    "path" => "/",
    "secure" => true,
    "httponly" => false,
    "samesite" => "Lax"
]);
```

`setcookie()` também precisa vir antes da saída.

---

# Cookies
## Atributos que mudam a segurança

| Atributo | Papel |
| :--- | :--- |
| `expires` | duração |
| `path` | caminhos permitidos |
| `secure` | somente HTTPS |
| `httponly` | bloqueia leitura pelo JS |
| `samesite` | controla envio entre sites |

Cookies de sessão devem usar configurações mais restritas.

---

# Cookies
## Lendo e validando

```php
$tema = $_COOKIE["tema"] ?? "light";
$permitidos = ["light", "dark"];

if (!in_array($tema, $permitidos, true)) {
    $tema = "light";
}
```

Cookie vem do cliente: trate como entrada não confiável.

---

# Cookies
## JavaScript não lê `HttpOnly`

```js
document.cookie =
    'tema=dark; path=/; max-age=86400; SameSite=Lax';

console.log(document.cookie);
```

- Bom para preferências simples
- Cookie de sessão não precisa ficar visível ao JavaScript

---

# Cookies e Storage
## Não são a mesma coisa

| Recurso | Local | Envio automático |
| :--- | :--- | :--- |
| cookie | navegador | sim |
| `localStorage` | navegador | não |
| `sessionStorage` | aba | não |
| sessão PHP | servidor | ID via cookie |

Nenhum deles é lugar para senha.

---

# Sessões no PHP
## Expiração por inatividade

```php
$limite = 30 * 60;
$ultimoAcesso = $_SESSION["last_activity"] ?? time();

if (time() - $ultimoAcesso > $limite) {
    $_SESSION = [];
    session_destroy();
    http_response_code(401);
    echo json_encode([
        "error" => true,
        "message" => "Sessão expirada por inatividade"
    ]);
    exit;
}
```

A regra precisa valer em todas as rotas protegidas.

---

# Sessões no PHP
## Cookie automático cria risco de CSRF

- Outro site pode induzir uma requisição autenticada
- Use POST para mudanças
- Configure `SameSite`
- Valide token CSRF em operações sensíveis
- Nunca exclua dados apenas por um parâmetro GET

Sessão válida não prova a intenção do usuário.

---

<!-- _class: divider -->

# Hora de Praticar

---

# Cookies e Sessões
## Login e perfil protegido

- Criar sessão após validar credenciais
- Consultar o usuário autenticado
- Redirecionar ao receber `401`
- Encerrar a sessão no logout

Pasta: `exemplos/ex12.1/`

---

# Cookies e Sessões
## Outro exemplo integrado

- Guarda de sessão reutilizável
- Endpoints separados para login e logout
- Proteção conferida no servidor
- Resposta `401` para acesso sem sessão

Pasta: `exemplos/ex13.1/`

---

# Cookies e Sessões
## Exercícios: lembrar e proteger

- **Preferências de Leitura:** cookies validados e não sensíveis  
  `11-php-cookies-sessoes/preferencias-leitura/`
- **Comanda da Cantina:** rodada atual e histórico na sessão  
  `11-php-cookies-sessoes/comanda-cantina/`
- **Portal do Boletim:** login, guarda e autorização do próprio registro  
  `11-php-cookies-sessoes/portal-boletim/`

---

# Cookies e Sessões
## Exercícios: fluxo e limite

- **Inscrição em Etapas:** rascunho, retorno e bloqueio de etapas  
  `11-php-cookies-sessoes/inscricao-etapas/`
- **Quiz com Tentativas:** progresso, expiração e token CSRF  
  `11-php-cookies-sessoes/quiz-tentativas/`

Sessão não é sinônimo de login: ela também sustenta fluxos temporários.

---

# Cookies e Sessões
## Erros comuns

- Usar `$_SESSION` sem `session_start()`
- Iniciar sessão depois de imprimir
- Verificar login só na interface
- Salvar senha na sessão
- Não regenerar o ID após login
- Confiar em cookie para autorizar

---

# Cookies e Sessões
## O que precisa ficar

- Requisições não compartilham variáveis comuns
- Cookie fica no navegador
- Sessão guarda estado no servidor
- O navegador carrega o identificador da sessão
- Cada endpoint protegido aplica uma guarda
- Login, autorização, logout e CSRF são problemas diferentes

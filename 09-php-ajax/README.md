# Programação Web I - AJAX e JavaScript Assíncrono

## 1. O que este guia ensina

Até este ponto do curso, você aprendeu a manipular a interface do navegador com JavaScript e a criar serviços de backend no PHP que respondem em formato JSON (na seção anterior de APIs). Agora, vamos unir esses dois lados por meio do **AJAX (Asynchronous JavaScript and XML)**.

O AJAX permite que o JavaScript troque informações com o servidor em segundo plano e atualize a tela de forma pontual, sem que a página inteira precise ser recarregada. Para dominar esse fluxo, é necessário compreender como o JavaScript lida com o tempo e com operações que não terminam instantaneamente: temporizadores, callbacks, Promises, `async`/`await` e a moderna API nativa `fetch()`.

Ao final deste guia, você deve conseguir:

- explicar por que o navegador precisa de operações assíncronas para não travar a interface (*single thread*);
- entender a diferença entre execução síncrona (bloqueante) e assíncrona (não bloqueante);
- utilizar e cancelar temporizadores com `setTimeout()`, `clearTimeout()`, `setInterval()` e `clearInterval()`;
- evitar o bug clássico de múltiplos intervalos concorrentes (*stopwatch runaway*);
- compreender os três estados fundamentais de uma Promise (`pending`, `fulfilled` e `rejected`);
- escrever código assíncrono limpo e linear utilizando `async` e `await`;
- fazer requisições HTTP `GET` e `POST` com a API `fetch()`;
- enviar dados ao servidor utilizando `URLSearchParams`, `FormData` e JSON puro;
- interpretar respostas JSON e tratar erros de conexão e de validação;
- compreender por que erros HTTP `404` e `500` não caem automaticamente no `catch` do `fetch()`;
- estruturar um endpoint em PHP que responda JSON consistente com códigos de status HTTP semânticos;
- gerenciar os quatro estados visuais da interface (carregando, sucesso, erro e finalização);
- implementar *polling* seguro sem acúmulo de requisições e cancelamento de buscas com `AbortController`.

---

## 2. Código síncrono e assíncrono: por que isso é necessário?

O motor de JavaScript no navegador opera em **linha única de execução (*single thread*)**. Isso significa que o navegador só consegue realizar uma instrução de código por vez na aba ativa.

### O comportamento síncrono (bloqueante)

No código síncrono clássico, uma instrução só começa a ser executada depois que a instrução anterior terminar por completo:

```js
console.log('Passo A');
console.log('Passo B');
console.log('Passo C');
```

A saída será rigorosamente sequencial:
```text
Passo A
Passo B
Passo C
```

Imagine agora se o Passo B fosse uma requisição de rede para um servidor lento que demorasse 3 segundos para responder. Se essa operação fosse síncrona, o navegador **congelaria a tela inteira por 3 segundos**: o usuário não conseguiria clicar em botões, rolar a barra de rolagem, digitar em formulários nem trocar de aba. O cursor do mouse se transformaria no ícone de carregamento ("disco de espera") e a página pareceria ter travado.

### O comportamento assíncrono (não bloqueante)

Para evitar esse congelamento, operações demoradas (como esperar uma contagem de tempo, ler um arquivo ou buscar dados na rede) são executadas de forma **assíncrona**. O JavaScript delega a tarefa aos bastidores da plataforma (Web APIs do navegador) e continua atendendo o usuário normalmente:

```text
EXECUÇÃO SÍNCRONA (Trava a fila):
[Passo A] ──> [Espera bloqueante de 3s (TELA CONGELADA)] ──> [Passo C]

EXECUÇÃO ASSÍNCRONA (Fluxo livre):
[Passo A] ──> [Agenda tarefa nos bastidores] ──> [Passo C imediatamente]
                      │
                      └───> [Quando terminar, entrega o resultado B]
```

Observe o que acontece quando usamos um temporizador:

```js
console.log('A');

setTimeout(function() {
    console.log('B');
}, 1000);

console.log('C');
```

A ordem de exibição no console será:

```text
A
C
B
```

**Por que `C` aparece antes de `B`?**  
Porque `setTimeout()` não paralisa o computador por um segundo. Ele apenas registra: *"Navegador, continue o seu trabalho e, daqui a pelo menos 1000 milissegundos, coloque a função com a letra B na fila para ser executada."* A execução principal avança de imediato para a linha seguinte e imprime `C`.

---

## 3. Callbacks: a primeira forma de dizer "faça isso depois"

Uma **callback** é uma função passada como argumento para outra função, para ser executada no momento em que um evento ou tarefa for concluído no futuro.

```js
function avisarConclusao() {
    console.log('A tarefa foi concluída com sucesso!');
}

// Passamos a função avisarConclusao como callback:
setTimeout(avisarConclusao, 1000);
```

Você já utiliza callbacks desde o início do aprendizado de DOM com JavaScript:

```js
const botao = document.querySelector('#btn-salvar');

botao.addEventListener('click', function() {
    console.log('O botão foi clicado pelo usuário.');
});
```

A lógica é exatamente a mesma:
- No `addEventListener`, a função callback é guardada e disparada quando o **usuário** clica no elemento.
- No `setTimeout`, a função callback é guardada e disparada quando o **relógio** atinge o tempo configurado.

Callbacks são a base histórica de todo o comportamento assíncrono no JavaScript, e continuam essenciais mesmo quando usamos Promises e `async`/`await`.

## 4. `setTimeout()`: agendamento de execução única

A função `setTimeout()` programa a execução de uma função de callback para daqui a um tempo mínimo, especificado em milissegundos (`1000 ms = 1 segundo`):

```js
const identificador = setTimeout(function() {
    console.log('Mensagem exibida após 2 segundos.');
}, 2000);
```

### Cancelando com `clearTimeout()`

Quando você chama `setTimeout()`, o navegador retorna um identificador numérico (`id`). Se as circunstâncias mudarem antes do tempo acabar, você pode cancelar o agendamento passando esse identificador para `clearTimeout()`:

```js
// Se o usuário fechar o alerta antes dos 2 segundos, cancelamos a ação:
clearTimeout(identificador);
```

**Casos de uso comuns:**
- ocultar automaticamente uma notificação flutuante (*toast*) após alguns segundos;
- implementar *debounce* em campos de busca rápida (esperar o usuário parar de digitar antes de disparar uma consulta);
- criar pausas controladas ou contagens regressivas em etapas.

---

## 5. `setInterval()`: execuções recorrentes

A função `setInterval()` agenda uma função para ser executada repetidamente a cada intervalo fixo de tempo:

```js
const identificador = setInterval(function() {
    console.log('Esta mensagem será exibida a cada 1 segundo.');
}, 1000);
```

### Interrompendo com `clearInterval()`

Para interromper a repetição, passe o identificador para a função `clearInterval()`:

```js
clearInterval(identificador);
```

> **Atenção:** Guarde sempre o identificador retornado em uma variável acessível. Se você iniciar um intervalo sem guardar o `id`, perderá a referência e o intervalo continuará rodando para sempre em segundo plano, consumindo memória e processamento.

---

## 6. Evitando intervalos duplicados (O clássico bug do cronômetro acelerado)

Um dos erros mais frequentes cometidos por estudantes em projetos de cronômetro ou contadores é permitir múltiplos intervalos simultâneos.

Se você anexar `setInterval()` diretamente ao clique de um botão sem nenhuma verificação:
1. O usuário clica em "Iniciar" uma vez $\rightarrow$ 1 intervalo fica rodando.
2. O usuário clica novamente em "Iniciar" $\rightarrow$ um **segundo** intervalo é criado.
3. O contador agora avança com o dobro da velocidade!
4. Se o usuário clicar em "Pausar", o código só cancela o último `id` guardado, deixando o primeiro intervalo rodando solto para sempre.

A solução é usar uma **variável de estado defensiva** inicializada com `null`:

```js
let intervalo = null;

function iniciarCronometro() {
    // Trava de segurança: se já houver um intervalo rodando, ignora novos cliques!
    if (intervalo !== null) {
        return;
    }

    intervalo = setInterval(function() {
        console.log('Atualizando mostrador...');
    }, 100);
}

function pausarCronometro() {
    clearInterval(intervalo);
    // Fundamental: redefinir para null para permitir novo início no futuro!
    intervalo = null;
}
```

O valor `null` comunica com clareza a ausência de um intervalo ativo e permite validar o estado antes de qualquer nova criação.

---

## 7. Precisão de temporizadores: relógio vs. temporizador

O tempo informado em `setTimeout()` ou `setInterval()` representa um **atraso mínimo garantido**, e não um compromisso atômico de execução milissegundo a milissegundo.

O navegador precisa conciliar a execução do seu JavaScript com a renderização da tela, rolagem, eventos do usuário e coleta de lixo. Se a aba for colocada em segundo plano ou o computador sofrer uma oscilação de carga, os intervalos podem atrasar alguns milissegundos.

Por essa razão, nunca construa um cronômetro somando `+0.1` a cada ciclo de 100 ms:

```js
// ❌ Abordagem ingênua e imprecisa (acumula erro com o tempo):
let tempo = 0;
setInterval(function() {
    tempo += 0.1;
    mostrador.textContent = tempo.toFixed(1);
}, 100);
```

A abordagem profissional separa a **medição** da **atualização visual**:

```js
// ✅ Abordagem precisa com delta de tempo real:
const inicio = performance.now();

const intervalo = setInterval(function() {
    // Calculamos exatamente quantos milissegundos se passaram desde o início:
    const decorrido = performance.now() - inicio;
    const segundos = decorrido / 1000;
    mostrador.textContent = segundos.toFixed(1);
}, 100);
```

> **Regra prática:** O `setInterval()` serve apenas para ditar a **taxa de atualização da interface**; a medição do tempo real deve ser obtida com `performance.now()` ou `Date.now()`.

## 8. O que é uma Promise: a metáfora do pedido na lanchonete

Uma **Promise** (promessa) é um objeto que representa um valor que ainda não está disponível agora, mas que será entregue em algum momento futuro (ou falhará).

Para entender Promises de forma intuitiva, pense no funcionamento de uma **lanchonete rápida**:

1. Você vai ao balcão e faz o pedido de um lanche.
2. O atendente não entrega o lanche de imediato; em vez disso, ele entrega um **comprovante com o número do seu pedido (um ticket)**. Esse ticket é a **Promise**.
3. Enquanto a cozinha prepara o lanche, você não precisa ficar paralisado no balcão: você pode sentar, mexer no celular e conversar com seus amigos (o navegador continua responsivo).
4. O seu pedido pode ter três desfechos:
   - **`pending` (Pendente):** o lanche ainda está sendo preparado na chapa. A Promise está aguardando.
   - **`fulfilled` ou `resolved` (Resolvida / Concluída com sucesso):** o seu número é chamado no painel e você retira o lanche quentinho. A Promise cumpriu o que prometeu e entregou o valor!
   - **`rejected` (Rejeitada):** o atendente chama seu número para avisar que o ingrediente acabou ou a chapa quebrou. Aconteceu um erro e o pedido não pôde ser entregue.

```text
┌─────────────────────────────────────────────────────────────┐
│                    ESTADOS DE UMA PROMISE                   │
│                                                             │
│                      ┌───────────────┐                      │
│                      │    PENDING    │                      │
│                      │  (Aguardando) │                      │
│                      └───────┬───────┘                      │
│                              │                              │
│              ┌───────────────┴───────────────┐              │
│              ▼                               ▼              │
│      ┌───────────────┐               ┌───────────────┐      │
│      │   FULFILLED   │               │    REJECTED   │      │
│      │   (Sucesso)   │               │    (Falha)    │      │
│      └───────────────┘               └───────────────┘      │
└─────────────────────────────────────────────────────────────┘
```

### O padrão clássico com `.then()` e `.catch()`

Antes do surgimento de `async`/`await`, o resultado de uma Promise era tratado encadeando métodos:

```js
fetch('api/status.php')
    .then(function(response) {
        // Executado quando a resposta HTTP chega com sucesso:
        return response.json();
    })
    .then(function(dados) {
        // Executado quando o corpo JSON termina de ser lido:
        console.log('Dados recebidos:', dados);
    })
    .catch(function(erro) {
        // Executado se qualquer etapa anterior falhar:
        console.error('Falha na operação:', erro.message);
    });
```

- Cada `.then()` recebe o resultado retornado pelo passo anterior.
- O `.catch()` no final captura erros de rede ou exceções disparadas em qualquer etapa.
- Embora esse encadeamento funcione bem, em fluxos com muitas etapas o código pode ficar longo e difícil de acompanhar.

---

## 9. `async` e `await`: tornando o assíncrono linear

Para simplificar o trabalho com Promises, o JavaScript moderno introduziu as palavras-chave `async` e `await`. Elas permitem escrever código assíncrono com a mesma facilidade e clareza visual de um código sequencial.

### Como funciona?

1. **`async` (função assíncrona):** colocada antes da palavra `function`, avisa que a função contém operações assíncronas e que seu retorno será automaticamente empacotado em uma Promise.
2. **`await` (aguardar):** só pode ser usado **dentro** de uma função `async`. Ele pausa a leitura daquela função específica até que a Promise seja resolvida, devolvendo o valor desempacotado diretamente.

```js
async function carregarStatus() {
    try {
        const response = await fetch('api/status.php');
        const dados = await response.json();
        console.log('Dados recebidos:', dados);
    } catch (erro) {
        console.error('Erro na requisição:', erro.message);
    }
}

carregarStatus();
```

> **Aviso fundamental:** O `await` pausa **apenas a função assíncrona em que ele se encontra**, e **nunca** a thread principal do navegador. Enquanto a função aguarda a resposta da rede, o usuário continua interagindo livremente com o restante da página.

---

## 10. AJAX e a API `fetch()`: a grande virada da Web

Historicamente, o termo **AJAX** significava *Asynchronous JavaScript and XML*. Hoje, o formato XML foi praticamente substituído pelo **JSON**, mas o nome AJAX permanece como o conceito universal de **trocar dados com o servidor sem recarregar a página inteira**.

### Comparação: Web Tradicional vs. Web Moderna com AJAX

```text
WEB TRADICIONAL (Recarregamento total):
[Usuário clica em Enviar]
         │
         ▼
[Navegador descarrega a página inteira (TELA PISCA EM BRANCO)]
         │
         ▼
[Servidor PHP processa e monta um NOVO HTML completo do zero]
         │
         ▼
[Navegador reconstrói todo o layout: perde rolagem, foco e estado]

───────────────────────────────────────────────────────────────────

WEB MODERNA COM AJAX (Atualização cirúrgica):
[Usuário clica em Enviar]
         │
         ▼
[JavaScript intercepta o envio via evento submit e preventDefault()]
         │
         ▼
[fetch() envia os dados ao PHP em segundo plano (TELA FICA VIVA)]
         │
         ▼
[Servidor PHP processa e devolve apenas dados puros em JSON]
         │
         ▼
[JavaScript lê o JSON e altera cirurgicamente APENAS o pedaço do DOM]
```

### Anatomia do `fetch()`: por que usamos dois `await`s?

A função `fetch()` é a API padrão e nativa dos navegadores modernos para emitir requisições HTTP:

```js
// Passo 1: Dispara a requisição e aguarda o cabeçalho/status HTTP
const response = await fetch('api/alunos.php');

// Passo 2: Faz o download assíncrono do corpo e decodifica o texto JSON
const dados = await response.json();
```

Muitos iniciantes perguntam: **"Por que precisamos de dois `await`s no `fetch()`?"**

1. **O primeiro `await fetch(...)`:** aguarda o handshake inicial da conexão com o servidor. Quando o servidor envia os **cabeçalhos HTTP** e o código de status (`200`, `404`, etc.), a Promise do `fetch()` é resolvida e entrega um objeto `Response`. Nesse momento, o corpo de dados ainda não foi necessariamente baixado por completo.
2. **O segundo `await response.json()`:** o corpo da resposta pode ser extenso e chega aos poucos em fluxo de dados (*stream*). O método `.json()` aguarda a chegada de todo o texto restante e o converte em um objeto nativo do JavaScript. Como essa leitura também leva tempo, ela retorna uma segunda Promise que precisa do seu próprio `await`!

---

## 11. A armadilha do `response.ok`: falha de rede vs. erro HTTP

Este é um dos conceitos mais importantes e que mais causam confusão em provas e projetos práticos:

> **O `fetch()` só rejeita a Promise (caindo no bloco `catch`) em caso de FALHA DE REDE TOTAL.**

Uma falha de rede total ocorre quando:
- o computador do usuário está sem conexão com a internet;
- o cabo de rede foi desconectado;
- o servidor de DNS não conseguiu resolver o endereço;
- o servidor de destino está desligado e inacessível.

### E se o servidor responder com erro 404 (Não Encontrado) ou 500 (Erro Interno)?

Um status `404 Not Found` ou `500 Internal Server Error` **é uma resposta HTTP válida que viajou pela rede e chegou com sucesso ao navegador**. O servidor atendeu a chamada, processou o pedido e devolveu um código formal de erro.

Para o navegador, a requisição foi bem-sucedida no nível de transporte de rede! Portanto, **ela NÃO cai no `catch` automaticamente**.

Por isso, você é **obrigado** a inspecionar a propriedade `response.ok`:

```js
async function carregarAlunos() {
    const response = await fetch('api/alunos.php');

    // response.ok é true apenas se o status estiver na faixa de sucesso (200 a 299)
    if (!response.ok) {
        // Disparamos um erro manualmente para interromper o fluxo e acionar o catch:
        throw new Error(`Falha HTTP: ${response.status}`);
    }

    const dados = await response.json();
    return dados;
}
```

### Propriedades fundamentais do objeto `Response`:
- `response.ok`: booleano (`true` para status entre 200 e 299; `false` para qualquer outro);
- `response.status`: número inteiro com o código HTTP (ex.: `200`, `201`, `400`, `404`, `422`, `500`);
- `response.headers`: cabeçalhos retornados pelo servidor;
- `response.json()`: método que decodifica o corpo da resposta como JSON;
- `response.text()`: método alternativo que lê o corpo como texto puro sem tentar converter em objeto.

---

## 12. Tratando falhas com `try...catch` de forma robusta

Ao construir aplicações reais, o código deve ser preparado para lidar com qualquer imprevisto sem travar a interface do usuário:

```js
async function atualizarLista() {
    const mensagem = document.querySelector('#mensagem');
    mensagem.textContent = 'Carregando dados...';

    try {
        const response = await fetch('api/alunos.php');
        const dados = await response.json();

        if (!response.ok) {
            // Se o backend devolveu uma mensagem no JSON, nós a aproveitamos:
            throw new Error(dados.message || `Erro do servidor (${response.status})`);
        }

        renderizarAlunos(dados.alunos);
        mensagem.textContent = 'Lista atualizada com sucesso!';
    } catch (erro) {
        // Captura tanto falhas de rede quanto o throw de response.ok:
        mensagem.textContent = `Atenção: ${erro.message}`;
        console.error('Detalhes da falha:', erro);
    }
}
```

O bloco `try...catch` unifica as duas fontes de problema (queda de rede física e erros lógicos retornados pelo PHP) em um único ponto de tratamento, garantindo que o usuário sempre receba uma explicação clara na tela.

## 13. Requisição GET com parâmetros: `URLSearchParams`

Em requisições de consulta (`GET`), os parâmetros viajam anexados diretamente na própria URL (a chamada *query string*, iniciando com `?` e separada por `&`).

Concatenar strings manualmente com `+` é perigoso porque espaços, acentos e caracteres especiais (como `&`, `?` ou `=`) podem quebrar a URL. A forma nativa e segura no JavaScript moderno é utilizar o utilitário `URLSearchParams`:

```js
const parametros = new URLSearchParams({
    turma: '2AT',
    ordem: 'nome',
    pagina: '1'
});

// Monta automaticamente: api/alunos.php?turma=2AT&ordem=nome&pagina=1
const response = await fetch(`api/alunos.php?${parametros}`);
const dados = await response.json();
```

No script PHP do servidor, esses dados chegam organizados no array superglobal `$_GET`:

```php
$turma = trim($_GET["turma"] ?? "");
$ordem = trim($_GET["ordem"] ?? "nome");
$pagina = (int) ($_GET["pagina"] ?? 1);
```

---

## 14. Envio POST com `FormData`: o parceiro natural de formulários

Quando precisamos enviar dados de preenchimento para cadastrar ou salvar informações no servidor, o método HTTP mais adequado é o `POST`.

O objeto `FormData` é a maneira mais simples e direta de coletar os valores de um formulário HTML existente no DOM:

```js
const formulario = document.querySelector('#form-cadastro');

formulario.addEventListener('submit', async function(evento) {
    // 1. Fundamental: impede o comportamento padrão de recarregar a página!
    evento.preventDefault();

    // 2. Coleta automaticamente todos os inputs que possuem o atributo 'name':
    const dadosFormulario = new FormData(formulario);

    try {
        const response = await fetch('api/cadastro.php', {
            method: 'POST',
            body: dadosFormulario
        });

        const resultado = await response.json();
        console.log('Resposta do servidor:', resultado);
    } catch (erro) {
        console.error('Falha no envio:', erro);
    }
});
```

### ⚠️ A regra de ouro do `FormData`: NUNCA defina o cabeçalho `Content-Type` na mão!

Este é um dos erros mais comuns em projetos web:
```js
// ❌ NUNCA FAÇA ISSO AO ENVIAR FORMDATA:
headers: {
    'Content-Type': 'multipart/form-data'
}
```

**Por que não fazer isso?**  
Ao usar `FormData`, o corpo da mensagem precisa ser fatiado em partes separadas por uma sequência aleatória única chamada de **delimitador de fronteira (*boundary*)** (por exemplo: `boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW`).  
Quando você deixa o navegador cuidar do envio, ele calcula o delimitador exato e adiciona o cabeçalho completo sozinho. Se você definir o cabeçalho manualmente, o delimitador se perde, o PHP não consegue separar os campos e o array `$_POST` fica completamente vazio!

No PHP, os campos de texto enviados via `FormData` chegam diretamente no array `$_POST` (e arquivos enviados em `<input type="file">` ficam disponíveis em `$_FILES`).

---

## 15. Envio de JSON puro no corpo da requisição

Quando consumimos APIs RESTful completas, é muito comum que o servidor exija que a carga de dados (*payload*) seja enviada no corpo em formato JSON puro, em vez de dados de formulário:

```js
const aluno = {
    nome: 'Ana Souza',
    turma: '2AT',
    disciplinas: ['Programação Web I', 'Banco de Dados']
};

const response = await fetch('api/alunos.php', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json' // Avisamos que o corpo é texto JSON
    },
    body: JSON.stringify(aluno) // Convertemos o objeto JS em string JSON
});

const resultado = await response.json();
```

### Como o PHP lê JSON no corpo da requisição?

O PHP foi concebido historicamente para processar formulários HTML tradicionais. Portanto, o interpretador do PHP **preenche automaticamente o array `$_POST` apenas quando a requisição vem codificada como formulário** (`application/x-www-form-urlencoded` ou `multipart/form-data`).

Quando enviamos JSON puro no corpo (`application/json`), o array `$_POST` fica vazio! Para ler a carga útil, precisamos capturar o fluxo de entrada bruta do PHP e decodificá-lo:

```php
<?php
// 1. Lê todo o texto bruto que chegou no corpo da requisição HTTP:
$textoRecebido = file_get_contents("php://input");

// 2. Decodifica a string JSON para um array associativo do PHP:
$dados = json_decode($textoRecebido, true);

$nome = trim($dados["nome"] ?? "");
```

---

## 16. Resumo comparativo dos três formatos de envio

| Formato | Como o JavaScript prepara | Cabeçalho `Content-Type` | Como o PHP lê |
| :--- | :--- | :--- | :--- |
| **Query String (GET)** | `new URLSearchParams({...})` na URL | *(Sem corpo)* | `$_GET["campo"]` |
| **FormData (POST)** | `new FormData(formulario)` no `body` | *(Automático pelo navegador)* | `$_POST["campo"]` e `$_FILES` |
| **JSON Puro (POST)** | `JSON.stringify(objeto)` no `body` | `'application/json'` | `json_decode(file_get_contents("php://input"), true)` |

> **Dica didática:** Para formulários convencionais do dia a dia escolar, `FormData` é o formato mais rápido e menos propenso a erros de sintaxe. Para comunicação avançada entre serviços ou envio de estruturas aninhadas complexas, o JSON puro no corpo é a escolha ideal.

---

## 17. Resposta JSON no PHP e códigos de status HTTP

Ao criar um endpoint em PHP que funciona como serviço de backend (API), você deve manter um **contrato previsível e defensivo**:

```php
<?php
// 1. Avisa formalmente ao cliente que a resposta será JSON em UTF-8:
header("Content-Type: application/json; charset=utf-8");

// 2. Coleta e sanitiza as entradas:
$nome = trim($_POST["nome"] ?? "");

// 3. Validação defensiva:
if ($nome === "") {
    // 422: Unprocessable Content (dados recebidos violam regras)
    http_response_code(422);

    echo json_encode([
        "error" => true,
        "message" => "O campo nome é de preenchimento obrigatório."
    ]);

    // ⚠️ REGRA FUNDAMENTAL: interrompa a execução imediatamente após responder!
    exit;
}

// 4. Sucesso: 201 Created (novo registro cadastrado com êxito)
http_response_code(201);

echo json_encode([
    "nome" => $nome,
    "message" => "Aluno cadastrado com sucesso!"
]);
```

### Por que o comando `exit;` é indispensável?
Quando emitimos uma resposta de erro em uma API PHP, devemos sempre colocar `exit;` logo em seguida. Sem o `exit;`, o script continua sendo executado até o final, podendo gravar dados indevidos no banco, disparar outros comandos `echo` ou misturar tags HTML acidentais, o que corromperia o formato JSON esperado pelo cliente.

### O padrão de resposta do repositório
Para facilitar o consumo no JavaScript, mantemos um contrato padronizado:
- **No erro:** `{ "error": true, "message": "Explicação amigável do problema" }`
- **No sucesso:** `{ "message": "Mensagem informativa", "dados": [...] }` (sem a propriedade `error`).

### Tabela de Códigos de Status HTTP Semânticos
Lembre-se da regra de ouro: **O status HTTP classifica a resposta; o JSON explica os detalhes.**

| Código HTTP | Nome formal | Significado pedagógico e uso recomendado |
| :--- | :--- | :--- |
| **`200`** | OK | Sucesso padrão em consultas `GET` ou atualizações `PUT`/`PATCH`. |
| **`201`** | Created | Novo recurso cadastrado/criado com sucesso via `POST`. |
| **`400`** | Bad Request | A requisição está malformada ou faltam parâmetros obrigatórios. |
| **`401`** | Unauthorized | O usuário não está autenticado (sessão ou login ausente). |
| **`403`** | Forbidden | O usuário está logado, mas não possui permissão para este recurso. |
| **`404`** | Not Found | A rota solicitada ou o registro procurado não existe no sistema. |
| **`405`** | Method Not Allowed | O método HTTP está incorreto (ex.: enviou `GET` em rota exclusiva de `POST`). |
| **`422`** | Unprocessable Content | O formato da requisição está correto, mas as regras de validação falharam (ex.: email inválido, senha curta). |
| **`500`** | Internal Server Error | Ocorreu uma falha inesperada no servidor (exceção não tratada ou erro de banco de dados). |

## 18. Gerenciamento de estados da interface: o ciclo dos quatro estados

Nenhuma requisição de rede é instantânea. Para proporcionar uma experiência de uso profissional e evitar que o usuário clique repetidas vezes por ansiedade, a interface deve transitar de forma clara por **quatro estados fundamentais**:

```text
┌─────────────────┐       ┌─────────────────┐       ┌─────────────────┐
│ 1. PRONTO       │ ────> │ 2. CARREGANDO   │ ────> │ 3. SUCESSO/ERRO │
│ (Botão ativo)   │       │ (Botão travado) │       │ (Feedback DOM)  │
└─────────────────┘       └─────────────────┘       └────────┬────────┘
         ▲                                                   │
         └────────────────── 4. CONCLUSÃO ───────────────────┘
                             (finally: destrava botão)
```

Observe a implementação no JavaScript:

```js
const botao = document.querySelector('#btn-enviar');
const status = document.querySelector('#status');

async function submeterDados() {
    // 1. Estado CARREGANDO: desabilita botão e informa o usuário
    botao.disabled = true;
    status.textContent = 'Enviando informações, aguarde...';
    status.className = 'carregando';

    try {
        const response = await fetch('api/cadastro.php', {
            method: 'POST',
            body: new FormData(formulario)
        });
        const dados = await response.json();

        if (!response.ok) {
            throw new Error(dados.message || 'Não foi possível completar o envio.');
        }

        // 2. Estado de SUCESSO:
        status.textContent = dados.message;
        status.className = 'sucesso';
        formulario.reset(); // Limpa o formulário apenas no sucesso!
    } catch (erro) {
        // 3. Estado de ERRO:
        status.textContent = erro.message;
        status.className = 'erro';
        // Note: os campos do formulário continuam intactos para o usuário corrigir!
    } finally {
        // 4. Estado de CONCLUSÃO:
        // O bloco finally executa SEMPRE (tanto no sucesso quanto no erro)!
        botao.disabled = false;
    }
}
```

> **Por que usar `finally`?** Se ocorrer um erro de rede ou uma falha de validação dentro do `try`, o fluxo salta imediatamente para o `catch`. Se o comando `botao.disabled = false` estivesse solto no final do `try`, o botão ficaria travado desabilitado para sempre em caso de falha! O bloco `finally` garante que o botão destrave em qualquer situação.

---

## 19. Requisições periódicas (*Polling*) sem sobreposição de rede

Chama-se ***polling*** a técnica em que o cliente consulta o servidor repetidamente a cada intervalo de tempo para obter dados atualizados (por exemplo, monitorar a temperatura de sensores ou novas mensagens de um mural).

### O perigo de usar `setInterval()` no *polling*

Se a conexão do usuário ficar lenta e uma requisição demorar 6 segundos para voltar, mas o intervalo configurado for de 4 segundos:
- Uma segunda requisição será disparada antes de a primeira terminar!
- Logo em seguida, uma terceira requisição será aberta.
- As requisições começam a se acumular na fila do navegador e sobrecarregam o servidor.
- As respostas podem chegar fora de ordem e corromper os dados exibidos.

### A solução profissional: encadeamento com `setTimeout()`

Em vez de disparar um cronômetro cego, agendamos a próxima consulta **somente depois que a requisição anterior tiver terminado**:

```js
let monitorando = true;

async function monitorarEstacoes() {
    if (!monitorando) return;

    try {
        const response = await fetch('api/leituras.php');
        const dados = await response.json();
        atualizarPainel(dados);
    } catch (erro) {
        console.warn('Falha temporária na leitura:', erro.message);
    } finally {
        // Agenda a próxima chamada 5 segundos DEPOIS que a atual foi concluída:
        if (monitorando) {
            setTimeout(monitorarEstacoes, 5000);
        }
    }
}

// Dispara a primeira execução:
monitorarEstacoes();
```

---

## 20. Cancelamento de requisições com `AbortController`

Em interfaces com **busca rápida por digitação** (*live search*), um problema clássico de concorrência pode acontecer:

1. O usuário digita a letra `"a"` $\rightarrow$ dispara a Requisição 1 (que demora 800 ms no servidor).
2. O usuário digita rapidamente `"ana"` $\rightarrow$ dispara a Requisição 2 (que demora apenas 150 ms).
3. A Requisição 2 responde primeiro e renderiza na tela os dados de *"Ana Souza"*.
4. Meio segundo depois, a lenta Requisição 1 finalmente termina e **sobrescreve a tela com os resultados desatualizados da letra `"a"`!**

Para resolver isso, usamos o **`AbortController`** nativo do navegador para cancelar formalmente requisições pendentes que se tornaram obsoletas:

```js
let controladorAtual = null;

function buscarAcervo(termo) {
    // 1. Se já existe uma busca em andamento nos bastidores, cancelamos ela:
    if (controladorAtual !== null) {
        controladorAtual.abort();
    }

    // 2. Criamos um novo controlador para a busca atual:
    controladorAtual = new AbortController();

    fetch(`api/busca.php?termo=${encodeURIComponent(termo)}`, {
        signal: controladorAtual.signal // Conectamos o sinal de cancelamento
    })
    .then(response => response.json())
    .then(dados => {
        renderizarResultados(dados.resultados);
    })
    .catch(erro => {
        // Requisições canceladas disparam um erro do tipo 'AbortError'
        if (erro.name !== 'AbortError') {
            console.error('Erro real na busca:', erro.message);
        }
    });
}
```

---

## 21. Origem e a política de CORS (*Cross-Origin Resource Sharing*)

Uma das barreiras de segurança mais importantes da Web é o conceito de **Mesma Origem (*Same-Origin Policy*)**.

Duas URLs pertencem à **mesma origem** apenas quando compartilham exatamente os três elementos:
1. mesmo protocolo (`http` ou `https`);
2. mesmo domínio (`meusite.com` vs `outro.com`);
3. mesma porta (`:80`, `:8080`, `:3000`).

Quando o JavaScript tenta fazer um `fetch()` para uma URL de **origem diferente**:
- O navegador bloqueia o script de ler os dados da resposta por padrão.
- Para autorizar o acesso, o servidor de destino precisa emitir o cabeçalho HTTP especial:  
  `Access-Control-Allow-Origin: *` (ou informando o domínio exato de origem).

> **Aviso de segurança:** O CORS é uma trava de proteção executada pelo **navegador do usuário** para impedir que sites maliciosos leiam dados bancários ou sessões em segundo plano. Ele **não é um mecanismo de autenticação** e não impede ferramentas de terminal (como `curl` ou o Bruno) de acessarem sua API diretamente.

---

## 22. Relação com cookies e sessão

Quando o JavaScript faz requisições AJAX para a **mesma origem** (como é o padrão de todos os exercícios desta seção):
- O navegador anexa automaticamente o cookie de sessão (`PHPSESSID`) no cabeçalho `Cookie` da requisição HTTP.
- No PHP, a chamada a `session_start()` reconhece o mesmo usuário que abriu a página no navegador.
- Isso significa que sessões e controle de acesso funcionam com AJAX exatamente da mesma maneira que nos formulários tradicionais.

---

## 23. Relação com as práticas do repositório

O repositório disponibiliza dois exemplos reais de referência que demonstram esses conceitos isolados:

### 1. Temporizador e animação de interface
- **Pasta:** [`exemplos/ex09.1/`](../exemplos/ex09.1/)
- **O que observar:** O script demonstra o uso de `setInterval()` e `clearInterval()`. Observe como o botão "Go" é desabilitado com `.setAttribute('disabled', true)` para impedir intervalos duplicados enquanto a contagem de pontos ("Aguarde...") está ativa, e como o botão "Stop" reabilita o botão e cancela o intervalo.

### 2. Cadastro assíncrono com `fetch()`, `FormData` e notificação Toast
- **Pasta:** [`exemplos/ex09.2/`](../exemplos/ex09.2/)
- **O que observar:** O script intercepta o evento `submit` com `e.preventDefault()`, cria uma instância de `FormData(form)`, envia para `cadastro.php` via `POST` e processa a resposta JSON. No PHP, veja a validação de email e tamanho de senha, e no frontend, observe o uso de `setTimeout()` na função `showToast()` para remover a mensagem da tela após 4 segundos.

---

## 24. Exercícios propostos

Esta seção contém 10 exercícios organizados em duas etapas complementares de aprendizagem, acompanhando a evolução dos conceitos desde os primeiros fundamentos até sistemas integrados:

### Grupo 1: Exercícios Introdutórios — Fundamentos do AJAX e Assincronismo (01 a 05)
Neste primeiro grupo, os exercícios são focados e objetivos, permitindo consolidar a mecânica de Promises, o disparo de requisições `fetch()` com `GET` e `POST`, e o tratamento rigoroso de status HTTP:

1. [**01. Temporizador de Aviso Escolar**](./01-temporizador-aviso/README.md):  
   *Situação:* Emissão de sinal sonoro/visual com tempo configurável em seletor.  
   *Conceito:* Criação de uma `Promise` nativa com `setTimeout()`, consumo com `async`/`await` e desabilitação preventiva de botão para impedir múltiplos disparos.

2. [**02. Horário Oficial do Campus**](./02-relogio-servidor/README.md):  
   *Situação:* Painel que consulta a data, horário oficial e turno letivo a partir do servidor PHP.  
   *Conceito:* Primeira requisição `GET` com `fetch('api.php')`, conversão de JSON com `await response.json()` e atualização do DOM via `textContent`.

3. [**03. Consulta de Disciplinas com URLSearchParams**](./03-consulta-disciplina/README.md):  
   *Situação:* Catálogo acadêmico que exibe ementa, docente e carga horária da disciplina selecionada.  
   *Conceito:* Composição segura de parâmetros na URL via `new URLSearchParams()`, leitura de `$_GET['sigla']` no PHP e retorno de status `200` ou `404`.

4. [**04. Envio de Formulário com FormData**](./04-envio-comentario/README.md):  
   *Situação:* Mural de dúvidas e sugestões da turma com envio assíncrono.  
   *Conceito:* Interceptação de `submit` com `e.preventDefault()`, empacotamento automático com `new FormData()`, envio via `POST` e limpeza com `form.reset()`.

5. [**05. Ciclo de Vida da Requisição e Tratamento de Erros**](./05-ciclo-requisicao/README.md):  
   *Situação:* Consulta de saldo da carteirinha estudantil no refeitório.  
   *Conceito:* Gestão explícita dos 4 estados da interface (Carregando, Sucesso, Erro e Finalização com `finally`), checagem defensiva de `response.ok` e tratamento de erros `404` e `422`.

### Grupo 2: Desafios — Aplicações Integradas, Concorrência e Resiliência (06 a 10)
Neste segundo grupo, você enfrentará desafios reais de interface rica, resolvendo problemas de concorrência, cancelamento, ordem de rede e tolerância a falhas:

6. [**06. Painel de Largada com Fases Assíncronas**](./06-painel-largada/README.md):  
   *Situação:* Painel de largada esportiva com contagem regressiva e fases ("Atenção", "Contagem", "Largada").  
   *Conceito:* Orquestração de sequências temporais com Promises, botões de pausar e cancelar, e proteção estrita contra cliques concorrentes.

7. [**07. Envio de Ocorrência Escolar com Protocolo**](./07-envio-ocorrencia/README.md):  
   *Situação:* Sistema completo de registro de chamados pedagógicos e patrimoniais com geração de protocolo no servidor.  
   *Conceito:* Validação defensiva no PHP, resposta `201 Created` vs `422 Unprocessable Entity`, preservação de dados preenchidos em caso de erro e ciclo completo de feedback.

8. [**08. Busca Cancelável no Acervo da Biblioteca**](./08-busca-acervo/README.md):  
   *Situação:* Pesquisa instantânea de livros conforme o usuário digita (*live search*).  
   *Conceito:* Prevenção de sobrecarga com *debounce* (300 ms) e cancelamento de buscas antigas em trânsito com a API `AbortController`, evitando que respostas atrasadas sobrescrevam a tela.

9. [**09. Simulador de Rastreamento de Entregas por Etapas**](./09-simulador-entrega/README.md):  
   *Situação:* Pipeline de rastreamento logístico de materiais em 4 etapas sequenciais.  
   *Conceito:* Máquina de estados com simulação de falha controlada (`PED-FALHA`), cancelamento limpo e **retomada inteligente** (*resume from failed step*) sem repetir etapas já concluídas.

10. [**10. Monitor de Telemetria de Estações (Polling Seguro)**](./10-monitor-estacoes/README.md):  
    *Situação:* Painel de monitoramento de sensores ambientais (CPD, laboratórios, estufa) atualizado periodicamente.  
    *Conceito:* Implementação de *polling* sequencial não sobreposto com `setTimeout()` no `finally` (em vez do problemático `setInterval`), *backoff* em falhas consecutivas, preservação da última leitura válida e alerta de dados defasados (*stale data*).

---

## 25. Erros frequentes (para você não cometer!)

- **Esquecer `evento.preventDefault()` no formulário:** o navegador executa o comportamento HTML padrão, recarrega a página inteira e aborta o `fetch()` antes que ele termine.
- **Esquecer o segundo `await` em `response.json()`:** a variável receberá uma Promise pendente em vez dos dados convertidos, resultando em `undefined` ao tentar acessar as propriedades.
- **Achar que `fetch()` rejeita em erros HTTP 404 ou 500:** o `fetch()` só rejeita em quedas físicas de conexão. Códigos 404 e 500 resolvem com sucesso e exigem que você verifique `response.ok`.
- **Definir `Content-Type` na mão ao enviar `FormData`:** destrói o delimitador de fronteira (*boundary*) e faz o PHP receber um `$_POST` vazio.
- **Iniciar intervalos repetidos sem trava de estado:** clicar várias vezes em "Iniciar" cria múltiplos `setInterval()` simultâneos e descontrola o cronômetro.
- **Esquecer de reabilitar botões no bloco `finally`:** se uma exceção for capturada no `try`, o botão permanece desabilitado para sempre.
- **Tentar ler JSON no PHP usando `$_POST`:** o PHP não preenche `$_POST` com JSON puro. Use `file_get_contents("php://input")`.
- **Esquecer o comando `exit;` após emitir JSON de erro no PHP:** o script continuará executando e misturará saídas indesejadas na resposta.
- **Usar `setInterval()` ingênuo para *polling* de rede:** se a rede oscilar, requisições concorrentes se atropelam no servidor.
- **Confundir CORS com autenticação:** CORS é uma trava do navegador do cliente; ele não protege sua API contra chamadas de ferramentas externas.

---

## 26. Boas práticas consolidadas

- Mantenha a forma assíncrona consistente em cada função: prefira sempre `async`/`await` sobre cadeias longas de `.then()`.
- Verifique sempre `if (!response.ok)` e lance exceções explicativas com os dados retornados pela API.
- Gerencie ativamente os quatro estados da interface: carregando, sucesso, erro e destravamento via `finally`.
- Mantenha um contrato de resposta JSON previsível em todos os seus scripts PHP (`error`, `message`, dados).
- Utilize códigos de status HTTP semânticos para categorizar o resultado formal da requisição.
- Separe a atualização visual da interface da medição precisa do tempo decorrido com `performance.now()`.
- Use `FormData` para formulários e `URLSearchParams` para consultas com filtros na URL.
- Valide rigorosamente todos os campos recebidos no PHP antes de processar regras de negócio ou banco de dados.

---

## 27. Resumo final

As ideias fundamentais desta seção que você deve levar para a prática são:

1. **Assincronismo é essencial para uma Web viva:** o JavaScript roda em *single thread*. Delegar operações demoradas (rede e tempo) aos bastidores impede que a interface do usuário congele.
2. **Promises representam o futuro:** possuem três estados (`pending`, `fulfilled` e `rejected`) e encontram em `async` e `await` a sintaxe mais legível e moderna para encadeamento de tarefas.
3. **AJAX renova o DOM sem recarregar:** com `fetch()`, o cliente busca dados estruturados em JSON no servidor e atualiza cirurgicamente apenas as partes necessárias da página.
4. **Comunicação padronizada e defensiva:** o status HTTP classifica o desfecho da requisição (`200`, `201`, `400`, `422`, `500`), enquanto o corpo JSON transporta os dados e a mensagem humana.
5. **A interface é parte ativa do fluxo:** uma boa aplicação sempre previne cliques concorrentes, fornece feedback visual imediato de progresso e trata tanto falhas de rede física quanto erros de validação com clareza.

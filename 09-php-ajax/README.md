# Programação Web I - AJAX e JavaScript Assíncrono

## 1. O que este guia ensina

AJAX permite que o JavaScript troque dados com um servidor sem recarregar a página inteira. Para entender esse fluxo, é necessário compreender tarefas assíncronas, temporizadores, Promises, `async`/`await` e a API `fetch()`.

Ao final deste guia, você deve conseguir:

- explicar por que algumas operações são assíncronas;
- usar e cancelar `setTimeout()` e `setInterval()`;
- entender os estados básicos de uma Promise;
- escrever funções assíncronas com `async` e `await`;
- fazer requisições GET e POST com `fetch()`;
- enviar `URLSearchParams`, `FormData` e JSON;
- interpretar respostas JSON e erros HTTP;
- criar um endpoint PHP com resposta consistente;
- atualizar a interface sem recarregar a página;
- evitar intervalos duplicados e requisições concorrentes desnecessárias.

## 2. Código síncrono e assíncrono

No código síncrono, uma instrução termina antes da próxima.

```js
console.log('A');
console.log('B');
console.log('C');
```

No código assíncrono, uma tarefa pode ficar aguardando enquanto o navegador continua atendendo eventos e atualizando a página.

```js
console.log('A');

setTimeout(function() {
    console.log('B');
}, 1000);

console.log('C');
```

A ordem será:

```text
A
C
B
```

O temporizador não paralisa o navegador por um segundo. Ele agenda a função para ser executada quando o tempo mínimo terminar e a execução puder continuar.

## 3. Callbacks

Callback é uma função passada para outra função executar depois.

```js
function avisarConclusao() {
    console.log('Tarefa concluída.');
}

setTimeout(avisarConclusao, 1000);
```

Eventos também usam callbacks:

```js
botao.addEventListener('click', function() {
    console.log('Botão acionado.');
});
```

Callbacks continuam importantes mesmo quando usamos Promises e `async`/`await`.

## 4. `setTimeout()`

Executa uma função uma vez depois de um tempo mínimo em milissegundos.

```js
const identificador = setTimeout(function() {
    console.log('Aviso exibido.');
}, 2000);
```

É possível cancelar antes da execução:

```js
clearTimeout(identificador);
```

Usos comuns:

- esconder uma mensagem depois de alguns segundos;
- adiar uma ação;
- criar uma espera didática;
- implementar *debounce* em uma busca.

## 5. `setInterval()`

Agenda execuções recorrentes.

```js
const identificador = setInterval(function() {
    console.log('Atualização periódica.');
}, 1000);
```

Para parar:

```js
clearInterval(identificador);
```

Guarde o identificador em uma variável. Sem ele, o código perde a referência necessária para cancelar o intervalo.

## 6. Evitando intervalos duplicados

Cada clique em “Iniciar” não deve criar um novo intervalo enquanto outro já está ativo.

```js
let intervalo = null;

function iniciarCronometro() {
    if (intervalo !== null) {
        return;
    }

    intervalo = setInterval(function() {
        console.log('Contando...');
    }, 100);
}

function pausarCronometro() {
    clearInterval(intervalo);
    intervalo = null;
}
```

O estado `null` indica claramente que não há intervalo ativo.

## 7. Precisão de temporizadores

O tempo informado em `setTimeout()` ou `setInterval()` é um atraso mínimo, não uma garantia de execução no milissegundo exato.

Para um cronômetro mais confiável:

- use o intervalo para atualizar a tela;
- calcule o tempo real com `Date.now()` ou `performance.now()`;
- não some apenas `0.1` supondo que todas as atualizações ocorreram exatamente a cada 100 ms.

```js
const inicio = performance.now();

const intervalo = setInterval(function() {
    const decorrido = performance.now() - inicio;
    const segundos = decorrido / 1000;
    mostrador.textContent = segundos.toFixed(1);
}, 100);
```

## 8. O que é uma Promise

Uma Promise representa um resultado que pode chegar no futuro.

Estados:

- **pending:** aguardando;
- **fulfilled:** concluída com valor;
- **rejected:** concluída com erro.

Uso com `.then()` e `.catch()`:

```js
fetch('api/status.php')
    .then(function(response) {
        return response.json();
    })
    .then(function(dados) {
        console.log(dados);
    })
    .catch(function(erro) {
        console.error(erro);
    });
```

Cada `.then()` recebe o resultado devolvido pelo passo anterior.

## 9. `async` e `await`

Uma função marcada com `async` sempre retorna uma Promise.

`await` pausa apenas aquela função assíncrona até a Promise terminar.

```js
async function carregarStatus() {
    const response = await fetch('api/status.php');
    const dados = await response.json();
    console.log(dados);
}

carregarStatus();
```

`await` não transforma a requisição em uma operação síncrona para o navegador inteiro. A página continua atendendo outros eventos.

## 10. AJAX e `fetch()`

AJAX significa *Asynchronous JavaScript and XML*. O nome é histórico: aplicações atuais usam JSON com frequência.

`fetch()`:

- recebe uma URL e opções;
- inicia uma requisição HTTP;
- retorna uma Promise;
- resolve para um objeto `Response`.

```js
const response = await fetch('api/alunos.php');
```

O corpo ainda precisa ser lido:

```js
const dados = await response.json();
```

`response.json()` também é assíncrono.

## 11. Verificando a resposta HTTP

`fetch()` normalmente rejeita a Promise em falhas de rede. Uma resposta HTTP `404` ou `500` ainda resolve para um objeto `Response`.

Por isso, confira `response.ok`:

```js
async function carregarAlunos() {
    const response = await fetch('api/alunos.php');

    if (!response.ok) {
        throw new Error(`Falha HTTP: ${response.status}`);
    }

    return response.json();
}
```

Propriedades úteis:

- `ok`: `true` para status entre 200 e 299;
- `status`: código numérico;
- `headers`: cabeçalhos da resposta;
- `url`: URL final.

## 12. Tratando falhas com `try...catch`

```js
async function atualizarLista() {
    mensagem.textContent = 'Carregando...';

    try {
        const response = await fetch('api/alunos.php');
        const dados = await response.json();

        if (!response.ok) {
            throw new Error(dados.message || 'Não foi possível carregar.');
        }

        mensagem.textContent = 'Lista atualizada.';
        renderizarAlunos(dados.result);
    } catch (erro) {
        mensagem.textContent = erro.message;
    }
}
```

O `try...catch` deve cobrir as operações que realmente podem falhar. A interface precisa sair do estado de carregamento tanto no sucesso quanto no erro.

## 13. Requisição GET com parâmetros

`URLSearchParams` evita montar manualmente a query string.

```js
const parametros = new URLSearchParams({
    turma: '2AT',
    pagina: '1'
});

const response = await fetch(`api/alunos.php?${parametros}`);
const dados = await response.json();
```

No PHP:

```php
$turma = trim($_GET["turma"] ?? "");
$pagina = (int) ($_GET["pagina"] ?? 1);
```

## 14. Envio POST com `FormData`

`FormData` coleta os campos nomeados de um formulário.

```js
const formulario = document.querySelector('form');

formulario.addEventListener('submit', async function(evento) {
    evento.preventDefault();

    const dadosDoFormulario = new FormData(formulario);

    const response = await fetch('api/cadastro.php', {
        method: 'POST',
        body: dadosDoFormulario
    });

    const resultado = await response.json();
    console.log(resultado);
});
```

Ao usar `FormData`, não defina manualmente o cabeçalho `Content-Type`. O navegador adiciona o tipo e o separador corretos.

No PHP, os campos de texto ficam em `$_POST` e arquivos ficam em `$_FILES`.

## 15. Envio de JSON

Algumas APIs recebem JSON no corpo.

```js
const aluno = {
    nome: 'Ana',
    turma: '2AT'
};

const response = await fetch('api/alunos.php', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(aluno)
});
```

PHP não coloca automaticamente esse JSON em `$_POST`.

```php
$textoRecebido = file_get_contents("php://input");
$aluno = json_decode($textoRecebido, true);
```

Para as práticas iniciais do repositório, `FormData` mantém o fluxo mais próximo dos formulários HTML.

## 16. Resposta JSON no PHP

Um endpoint deve informar o tipo da resposta e manter um contrato previsível.

```php
<?php

header("Content-Type: application/json; charset=utf-8");

$nome = trim($_POST["nome"] ?? "");

if ($nome === "") {
    http_response_code(422);

    echo json_encode([
        "error" => true,
        "message" => "O nome é obrigatório."
    ]);

    exit;
}

http_response_code(201);
echo json_encode([
    "nome" => $nome,
    "message" => "Cadastro recebido com sucesso."
]);
```

Campos usados no padrão do repositório:

- `error`: ausente no sucesso, ou `true` quando houver erro;
- Chaves específicas para os dados (ex.: `nome`, `alunos`, `id`);
- `message`: explicação para o usuário ou cliente.

## 17. Códigos HTTP úteis

- `200 OK`: leitura ou operação concluída;
- `201 Created`: recurso criado;
- `400 Bad Request`: requisição malformada;
- `401 Unauthorized`: autenticação ausente ou inválida;
- `403 Forbidden`: usuário autenticado sem permissão;
- `404 Not Found`: recurso não encontrado;
- `405 Method Not Allowed`: método incorreto;
- `422 Unprocessable Content`: campos recebidos, mas inválidos;
- `500 Internal Server Error`: falha inesperada no servidor.

O JSON explica o problema; o status HTTP classifica o resultado da requisição.

## 18. Estado de carregamento e botões

Enquanto uma operação está em andamento, a interface deve comunicar o estado e impedir envios repetidos.

```js
botao.disabled = true;
mensagem.textContent = 'Enviando...';

try {
    await enviarFormulario();
    mensagem.textContent = 'Enviado com sucesso.';
} catch (erro) {
    mensagem.textContent = erro.message;
} finally {
    botao.disabled = false;
}
```

`finally` executa no sucesso ou no erro.

## 19. Requisições periódicas

Uma atualização a cada cinco segundos pode ser iniciada assim:

```js
async function atualizarCotacao() {
    // Faz a requisição e atualiza a tela.
}

atualizarCotacao();
const intervalo = setInterval(atualizarCotacao, 5000);
```

Se a requisição puder demorar mais que o intervalo, chamadas podem se sobrepor. Uma alternativa é agendar a próxima somente depois que a atual terminar:

```js
async function atualizarPeriodicamente() {
    await atualizarCotacao();
    setTimeout(atualizarPeriodicamente, 5000);
}
```

## 20. Cancelamento

`AbortController` permite cancelar uma requisição que não é mais necessária.

```js
const controlador = new AbortController();

fetch('api/busca.php', {
    signal: controlador.signal
});

controlador.abort();
```

Isso é útil em buscas nas quais uma nova consulta torna a anterior irrelevante.

## 21. Origem e CORS

Requisições para o mesmo protocolo, domínio e porta pertencem à mesma origem.

Quando o JavaScript chama outra origem, o servidor de destino precisa autorizar o acesso com cabeçalhos CORS. CORS é uma regra aplicada pelo navegador; não é um substituto para autenticação nem autorização.

APIs públicas também podem impor:

- limites de requisições;
- chaves de acesso;
- indisponibilidade temporária;
- formatos ou contratos que mudam.

## 22. Relação com cookies e sessão

Em requisições para a mesma origem, cookies de sessão compatíveis são enviados pelo navegador. Em chamadas entre origens, o envio exige configuração específica no cliente e no servidor.

O fato de uma requisição usar AJAX não muda as regras de autenticação do back-end.

## 23. Relação com as práticas do repositório

### Temporizador

Pasta: [`exemplos/ex09.1`](../exemplos/ex09.1/)

O exemplo apresenta `setInterval()`, `clearInterval()` e controle do botão.

### Cadastro com `fetch()`

Pasta: [`exemplos/ex09.2`](../exemplos/ex09.2/)

O exemplo intercepta `submit`, envia `FormData` e processa uma resposta JSON.

## 24. Exercícios propostos

- [Painel de Largada](./painel-largada/README.md): controla uma sequência temporal com pausa e cancelamento.
- [Busca Cancelável no Acervo](./busca-acervo/README.md): impede que respostas antigas substituam a busca atual.
- [Envio de Ocorrência](./envio-ocorrencia/README.md): diferencia falha de rede, validação e sucesso em um POST com `FormData`.
- [Rastreamento Simulado de Entrega](./simulador-entrega/README.md): retoma um fluxo assíncrono a partir da etapa que falhou.
- [Monitor de Estações](./monitor-estacoes/README.md): faz polling sem sobreposição e preserva a última leitura válida.

## 25. Erros comuns

- esquecer `event.preventDefault()` e recarregar a página;
- esquecer `await` em `response.json()`;
- assumir que `fetch()` rejeita automaticamente em HTTP 404 ou 500;
- misturar `.then()` e `await` sem necessidade;
- iniciar vários intervalos para a mesma tarefa;
- esquecer de reativar um botão depois de uma falha;
- definir manualmente `Content-Type` ao enviar `FormData`;
- tentar ler JSON quando o PHP devolveu HTML de erro;
- fazer atualizações periódicas sem tratar sobreposição;
- acreditar que CORS é uma proteção de login.

## 26. Boas práticas

- use uma forma assíncrona consistente por função;
- confira `response.ok`;
- trate estados de carregamento, sucesso e erro;
- mantenha um contrato JSON estável;
- use códigos HTTP coerentes;
- evite requisições duplicadas;
- cancele temporizadores e buscas quando não forem mais necessários;
- valide novamente todos os dados no PHP;
- mostre mensagens úteis ao usuário sem expor detalhes internos.

## 27. Resumo final

As ideias centrais desta seção são:

- tarefas assíncronas permitem aguardar sem bloquear toda a interface;
- callbacks representam ações executadas depois;
- Promises representam resultados futuros;
- `async` e `await` tornam a sequência de Promises mais legível;
- `fetch()` devolve um `Response`, cujo corpo precisa ser lido;
- GET usa parâmetros na URL e POST pode enviar `FormData` ou JSON;
- o PHP deve responder com JSON e status HTTP coerentes;
- uma boa interface trata carregamento, sucesso, falha e cancelamento.

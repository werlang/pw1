---
marp: true
theme: ifsul
header: ' '
footer: 'Instituto Federal Sul-rio-grandense | Campus Charqueadas'
---

<!-- _class: lead -->

# Programação Web I
## AJAX e JavaScript Assíncrono

Prof. Pablo Werlang
pablowerlang@ifsul.edu.br

---

# JavaScript Assíncrono
## Esperar sem congelar a página

<div class="grid grid-cols-2 gap-6 h-full">
<div>

- Temporizadores executam tarefas depois
- Requisições aguardam respostas do servidor
- A interface continua atendendo eventos
- Promises representam resultados futuros

</div>
<div class="media mx-auto">
    <img class="placeholder" alt="Prompt de IA: atendente malabarista cuidando de relógio, formulário e resposta de servidor sem deixar nada cair, metáfora divertida para assincronismo">
</div>
</div>

---

# JavaScript Assíncrono
## A ordem pode surpreender

```js
console.log('A');

setTimeout(function() {
    console.log('B');
}, 1000);

console.log('C');
```

Saída: `A`, `C`, `B`.

---

# JavaScript Assíncrono
## Callback: faça isso depois

```js
function avisarConclusao() {
    console.log('Tarefa concluída');
}

setTimeout(avisarConclusao, 1000);
```

Uma callback é uma função entregue para ser executada depois.

---

<!-- _class: divider -->

# Temporizadores

---

# JavaScript Assíncrono
## `setTimeout()`: uma execução

```js
const id = setTimeout(function() {
    mensagem.textContent = 'Tempo encerrado';
}, 2000);
```

- O tempo é informado em milissegundos
- A execução ocorre uma vez
- `clearTimeout(id)` cancela o agendamento

---

# JavaScript Assíncrono
## `setInterval()`: execução recorrente

```js
const id = setInterval(function() {
    console.log('Atualização');
}, 1000);

clearInterval(id);
```

Guarde o identificador para conseguir parar.

---

# JavaScript Assíncrono
## Não crie vários cronômetros

```js
let intervalo = null;

function iniciar() {
    if (intervalo !== null) return;

    intervalo = setInterval(atualizar, 100);
}
```

Uma variável de estado impede intervalos concorrentes.

---

# JavaScript Assíncrono
## Intervalo atualiza; relógio mede

```js
const inicio = performance.now();

setInterval(function() {
    const milissegundos = performance.now() - inicio;
    mostrador.textContent =
        (milissegundos / 1000).toFixed(1);
}, 100);
```

O atraso informado é mínimo, não uma garantia de precisão exata.

---

<!-- _class: divider -->

# Promises e `await`

---

# JavaScript Assíncrono
## Promise: um resultado futuro

<div class="grid grid-cols-3 gap-6">
<div>

**pending**

Aguardando.

</div>
<div>

**fulfilled**

Concluída com valor.

</div>
<div>

**rejected**

Concluída com erro.

</div>
</div>

---

# JavaScript Assíncrono
## Encadeando com `.then()`

```js
fetch('api/status.php')
    .then(function(response) {
        return response.json();
    })
    .then(function(dados) {
        console.log(dados);
    });
```

Cada etapa recebe o resultado da etapa anterior.

---

# JavaScript Assíncrono
## `async` e `await`

```js
async function carregarStatus() {
    const response = await fetch('api/status.php');
    const dados = await response.json();
    console.log(dados);
}
```

- `async` faz a função retornar uma Promise
- `await` aguarda uma Promise dentro da função
- A página continua atendendo outros eventos

---

<!-- _class: divider -->

# AJAX com `fetch()`

---

# AJAX
## O nome ficou, o XML não é obrigatório

- AJAX: *Asynchronous JavaScript and XML*
- Hoje JSON é muito mais comum
- A página troca dados sem recarregar inteira
- `fetch()` é a API nativa moderna para requisições

---

# AJAX
## `fetch()` devolve um `Response`

```js
const response = await fetch('api/alunos.php');
const dados = await response.json();
```

- A primeira Promise entrega a resposta HTTP
- `response.json()` lê o corpo
- Ler o corpo também é assíncrono

---

# AJAX
## 404 e 500 não rejeitam automaticamente

```js
const response = await fetch('api/alunos.php');

if (!response.ok) {
    throw new Error(`Falha HTTP: ${response.status}`);
}

const dados = await response.json();
```

Falha HTTP e falha de rede são situações diferentes.

---

# AJAX
## Tratando falhas

```js
try {
    const response = await fetch('api/alunos.php');
    const dados = await response.json();

    if (!response.ok) throw new Error(dados.message);
    renderizarAlunos(dados.result);
} catch (erro) {
    mensagem.textContent = erro.message;
}
```

---

# AJAX
## GET com `URLSearchParams`

```js
const parametros = new URLSearchParams({
    turma: '2AT',
    pagina: '1'
});

const response = await fetch(
    `api/alunos.php?${parametros}`
);
```

Evite montar a query string manualmente.

---

# AJAX
## POST com `FormData`

```js
formulario.addEventListener('submit', async function(evento) {
    evento.preventDefault();

    const response = await fetch('cadastro.php', {
        method: 'POST',
        body: new FormData(formulario)
    });
});
```

O navegador define o `Content-Type` correto para `FormData`.

---

# AJAX
## Enviando JSON

```js
await fetch('api/alunos.php', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(aluno)
});
```

No PHP, JSON é lido por `php://input`, não por `$_POST`.

---

# AJAX
## Resposta JSON no PHP

```php
header("Content-Type: application/json; charset=utf-8");

echo json_encode([
    "status" => "OK",
    "result" => $alunos,
    "message" => "Lista carregada"
]);
```

Mantenha o contrato previsível em todos os endpoints.

---

# AJAX
## JSON e status HTTP trabalham juntos

| Status | Significado |
| :--- | :--- |
| `200` | operação concluída |
| `201` | recurso criado |
| `401` | autenticação necessária |
| `404` | recurso não encontrado |
| `422` | campos inválidos |
| `500` | falha inesperada |

O status classifica; o JSON explica.

---

# AJAX
## Carregando, sucesso ou erro

```js
botao.disabled = true;

try {
    await enviarFormulario();
    mensagem.textContent = 'Enviado';
} catch (erro) {
    mensagem.textContent = erro.message;
} finally {
    botao.disabled = false;
}
```

`finally` executa nos dois caminhos.

---

# AJAX
## Atualizações periódicas sem sobreposição

```js
async function atualizarPeriodicamente() {
    try {
        await atualizarCotacao();
    } finally {
        setTimeout(atualizarPeriodicamente, 5000);
    }
}
```

A próxima atualização é marcada depois que a atual termina.

---

# AJAX
## CORS não é autenticação

- Outra origem significa outro protocolo, domínio ou porta
- O servidor de destino precisa autorizar o navegador
- CORS controla leitura entre origens
- Não decide quem pode acessar um recurso protegido

APIs públicas também podem ter limites e ficar indisponíveis.

---

<!-- _class: divider -->

# Hora de Praticar

---

# AJAX
## Exemplos do repositório

- **Temporizador:** `setInterval()` e `clearInterval()`  
  `exemplos/ex09.1/`
- **Cadastro com `fetch()`:** `FormData` e resposta JSON  
  `exemplos/ex09.2/`

Observe o ciclo completo antes de ampliar a interface.

---

# AJAX
## Exercícios: sequência e requisição

- **Painel de Largada:** pausa e cancelamento sem ciclo duplicado  
  `09-php-ajax/painel-largada/`
- **Busca no Acervo:** debounce, GET e cancelamento da busca anterior  
  `09-php-ajax/busca-acervo/`
- **Envio de Ocorrência:** POST, validação e estados da interface  
  `09-php-ajax/envio-ocorrencia/`

---

# AJAX
## Exercícios: fluxo e monitoramento

- **Rastreamento de Entrega:** falha, retomada e cancelamento por etapa  
  `09-php-ajax/simulador-entrega/`
- **Monitor de Estações:** polling sequencial e dado desatualizado  
  `09-php-ajax/monitor-estacoes/`

Os dois controlam tempo, mas exigem estados e condições de parada diferentes.

---

# AJAX
## Erros comuns

- Esquecer `preventDefault()`
- Esquecer `await response.json()`
- Não verificar `response.ok`
- Criar intervalos duplicados
- Deixar botão travado após erro
- Definir `Content-Type` manualmente no `FormData`

---

# AJAX e JavaScript Assíncrono
## O que precisa ficar

- Callbacks representam ações para depois
- Promises representam resultados futuros
- `await` organiza a leitura do fluxo
- `fetch()` entrega um `Response`
- GET usa a URL; POST pode usar `FormData` ou JSON
- A interface trata carregamento, sucesso e falha

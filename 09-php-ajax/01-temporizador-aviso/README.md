# Exercício Prático: Temporizador de Aviso Escolar com Promise

## Objetivo da Atividade

O objetivo desta atividade inicial é compreender o funcionamento de uma `Promise` nativa do JavaScript encapsulando uma operação temporal com `setTimeout()`, e consumi-la de forma síncrona aos olhos do programador utilizando a sintaxe moderna `async` e `await`.

Você construirá um painel de emissão de avisos escolares onde o operador escolhe um tempo de espera (em segundos), clica em um botão e observa a interface congelar a ação de forma assíncrona (sem travar o navegador) até que o sinal seja emitido.

---

## Conceitos trabalhados

- Criação explícita de uma `Promise` com `new Promise((resolve) => ...)`;
- Encapsulamento da função de temporização `setTimeout()`;
- Declaração de funções assíncronas com `async`;
- Pausa não bloqueante da execução com o operador `await`;
- Gerenciamento básico de estado na interface (desabilitar botões para impedir cliques duplicados).

---

## Especificações Técnicas do Sistema

### 1. Interface do Usuário (Frontend)
- Um seletor `<select id="seletor-tempo">` com as opções:
  - 1 segundo (`1000` ms);
  - 2 segundos (`2000` ms) — selecionado por padrão;
  - 3 segundos (`3000` ms);
  - 5 segundos (`5000` ms).
- Um botão `<button id="btn-emitir">Emitir Aviso Escolar</button>`.
- Uma área de status visual `<div id="status-aviso">` que apresente:
  - **Estado Inicial:** *"Selecione o tempo e clique no botão para agendar o aviso."*;
  - **Estado Aguardando:** *"Aguardando X segundos para tocar o sinal..."* (com botão desabilitado);
  - **Estado Concluído:** *"🔔 Sinal sonoro emitido com sucesso às HH:MM:SS!"* (botão reabilitado).

### 2. A Função `esperar(ms)`
No arquivo `script.js`, você implementará a função utilitária padrão de temporização:

```javascript
function esperar(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
```

---

## Estrutura de Arquivos

```text
09-php-ajax/01-temporizador-aviso/
├── README.md      # Este enunciado com as instruções
├── index.html     # Seletor, botão e área de feedback
├── style.css      # Estilização do card e estados visuais
└── script.js      # Função esperar(), async/await e controle do botão
```

---

## Critérios de Verificação

- [ ] Clicar no botão desabilita imediatamente o botão e altera o texto do status.
- [ ] O tempo selecionado no `<select>` é respeitado com precisão.
- [ ] Ao terminar o tempo, o botão volta a ficar habilitado.
- [ ] Não ocorre recarregamento de página.
- [ ] O código utiliza `async`/`await` em conjunto com a função baseada em `Promise`.

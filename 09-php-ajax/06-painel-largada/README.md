# Exercício Prático: Painel de Largada

## Objetivo da Atividade

O objetivo desta atividade é construir um painel de controle para a largada de corridas dos Jogos Escolares do IFSul. A mesa de arbitragem precisa emitir sinais visuais e orientações sonoras/visuais aos atletas em sequência ("Atenção", contagem regressiva e "Largada"), com a possibilidade de pausar ou cancelar a tentativa caso ocorra uma invasão de pista ou falsa largada.

Você praticará como criar temporizadores baseados em **Promises**, consumir essas esperas com **`async`/`await`** e controlar estados da aplicação de forma defensiva para que cliques repetidos não acelerem o cronômetro nem disparem múltiplos ciclos simultâneos.

---

## Conceitos trabalhados

- criação de Promises com `new Promise()` e `setTimeout()`;
- fluxo assíncrono sequencial com funções `async` e palavra-chave `await`;
- variáveis de controle de estado (`emExecucao`, `pausado`, `cancelado`);
- manipulação do DOM (`textContent`, `classList`);
- criação dinâmica de itens no histórico de tentativas (`createElement`, `append`);
- prevenção de ciclos concorrentes (*race conditions* na interface).

---

## Especificações Técnicas do Sistema

O painel deve representar com clareza o ciclo de vida de uma largada de atletismo:

1. **Estado Inicial (Aguardando Atletas):**
   - O painel exibe o status "Aguardando atletas na pista".
   - O mostrador exibe `--`.
   - O botão "Iniciar Prova" fica habilitado; os botões "Pausar" e "Cancelar" ficam desabilitados.

2. **Início do Ciclo ("Atenção"):**
   - Ao clicar em "Iniciar Prova", o sistema entra em execução e bloqueia novo clique de início.
   - O status muda para "Atenção: atletas aos seus lugares!" (cor amarela).
   - O sistema aguarda 1,5 segundo antes de iniciar a contagem.

3. **Contagem Regressiva:**
   - O mostrador exibe `3`, aguarda 1 segundo;
   - Depois exibe `2`, aguarda 1 segundo;
   - Depois exibe `1`, aguarda 1 segundo;
   - A cada segundo, uma orientação é exibida: "Preparar...", "Apontar...".

4. **Largada:**
   - O mostrador exibe `VAI!` ou `LARGADA!` (cor verde em destaque).
   - O status exibe "Prova em andamento!".
   - Um registro de sucesso é adicionado ao histórico com o horário da largada.

5. **Interrupção e Cancelamento:**
   - **Pausar:** se houver uma ocorrência na pista durante a contagem, o árbitro clica em "Pausar". A contagem congela no número atual. Ao clicar em "Retomar", a contagem segue a partir do ponto pausado.
   - **Cancelar (Falsa largada):** interrompe imediatamente o ciclo atual, volta o painel para o estado inicial e adiciona um item em vermelho no histórico: *"Tentativa cancelada na etapa: [etapa]"*.

---

## Estrutura de Arquivos

```text
09-php-ajax/06-painel-largada/
├── README.md      # Este guia didático com os requisitos
├── index.html     # Painel de largada e semáforo textual
├── style.css      # Estilos visuais e transições de cor das fases
└── script.js      # Lógica da Promise de espera, async/await e controle de estado
```

---

## Regras de Funcionamento

1. Crie uma função auxiliar didática `esperar(ms)` que retorne uma Promise resolvida após o tempo informado:
   ```js
   function esperar(ms) {
       return new Promise(resolve => setTimeout(resolve, ms));
   }
   ```
2. Toda a sequência de preparação e contagem deve ser orquestrada dentro de uma função `async function iniciarSequencia()`.
3. A cada segundo de espera, o código deve verificar se a flag de cancelamento foi acionada para interromper o ciclo imediatamente e não disparar a largada acidentalmente.
4. Para o histórico, crie elementos `<li>` com `document.createElement('li')` e adicione à lista com `appendChild()`. Não utilize atributos `data-*` para controlar a interface.

---

## O que observar durante a prática

- Uma função marcada com `async` permite usar `await esperar(1000)` para pausar o fluxo daquela rotina sem congelar o navegador do usuário.
- Se você clicar repetidas vezes no botão de início sem uma trava defensiva, o cronômetro disparará múltiplas vezes. Garanta que `if (emExecucao) return;` proteja a função.
- O cancelamento deve ser verificado após cada etapa de espera antes de avançar para a próxima.

---

## Critérios de Verificação

- [ ] Clicar 5 vezes seguidas em "Iniciar" não deve acelerar nem duplicar a contagem.
- [ ] Enquanto o painel aguarda ou conta, a interface continua responsiva (o usuário consegue clicar em Pausar ou Cancelar).
- [ ] Clicar em "Cancelar" durante a contagem `2` deve impedir que `1` e `LARGADA` apareçam depois.
- [ ] O histórico registra com precisão cada largada autorizada e cada tentativa cancelada.

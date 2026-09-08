# Exercício Prático: Simulador de Rastreamento de Entregas por Etapas

## Objetivo da Atividade

O objetivo desta atividade é construir um simulador interativo de linha do tempo (*stepper pipeline*) para rastreamento logístico de encomendas de suprimentos escolares do IFSul. Cada etapa da entrega é uma operação assíncrona independente, simulada por meio de uma `Promise` com tempos de espera variados.

O sistema deve implementar uma **máquina de estados assíncrona** capaz de:
1. Avançar sequencialmente pelas etapas do pedido;
2. Cancelar o processo em tempo de execução sem deixar temporizadores órfãos;
3. Simular falhas controladas com base no código de rastreamento digitado;
4. Oferecer a opção de **tentar novamente retomando exatamente a partir da etapa que falhou**, sem repetir as etapas que já foram concluídas com sucesso.

---

## Conceitos trabalhados

- Encapsulamento de atrasos e transições em `Promise`;
- Encadeamento sequencial com `async` e `await`;
- Máquina de estados no frontend (`inativo`, `em_andamento`, `pausado/cancelado`, `falha`, `concluido`);
- Controle de interrupção e prevenção de múltiplos cliques simultâneos;
- Retomada seletiva de pipelines de execução (*resume from failed step*);
- Atualização dinâmica de classes e elementos no DOM sem `data-*` attributes;
- Feedback visual de progresso e tratamento gracioso de erros com `try...catch`.

---

## Especificações Técnicas do Sistema

### 1. Etapas do Processo de Entrega
O fluxo é composto por 4 etapas consecutivas:
1. **Pedido Recebido no Sistema:** validação da nota e registro inicial (~1,2s);
2. **Separação no Almoxarifado:** separação e embalagem dos itens (~1,8s);
3. **Em Transporte Intermunicipal:** deslocamento do caminhão de entrega (~2,2s);
4. **Entregue ao Destinatário:** confirmação de recebimento no campus (~1,0s).

### 2. Códigos de Rastreamento e Simulação de Falhas
O usuário digita um código no campo de texto para iniciar o teste:
- Códigos normais (ex.: `IFSUL-2026`, `PED-100`): todas as etapas são aprovadas até a conclusão final.
- Código com a palavra `FALHA` (ex.: `FALHA-3`, `PED-FALHA`): a etapa 3 (*Em Transporte*) simula uma avaria ou bloqueio na via, rejeitando a Promise correspondente.
- Campo em branco: deve exibir mensagem de validação antes de iniciar.

### 3. Controles e Ações do Usuário
- **Botão "Iniciar Envio":** inicia o pipeline a partir da primeira etapa pendente.
- **Botão "Cancelar Envio":** ativo somente enquanto o pipeline está em execução. Interrompe o avanço imediato.
- **Botão "Retomar / Tentar Novamente":** surge após uma falha ou cancelamento, permitindo continuar da etapa interrompida.
- **Botão "Novo Rastreamento":** reinicia todo o estado para permitir testar um novo código do zero.

### 4. Linha do Tempo Visual
Cada etapa possui um marcador numérico, título, descrição e estado visual:
- `pendente`: cinza, sem destaque.
- `ativo` (*em andamento*): borda em destaque e indicador de carregamento pulsante.
- `concluido`: fundo verde com ícone de check (`✓`).
- `erro`: fundo vermelho com ícone de alerta (`✕`) e mensagem da causa da falha.

---

## Estrutura de Arquivos

```text
09-php-ajax/09-simulador-entrega/
├── README.md      # Este guia didático com os requisitos
├── index.html     # Formulário de código, controles e stepper da linha do tempo
├── style.css      # Estilização da linha do tempo, estados visuais e animações
└── script.js      # Máquina de estados assíncrona, Promises, cancelamento e retomada
```

---

## Regras de Funcionamento

1. **Retomada inteligente:** se as etapas 1 e 2 foram concluídas e a etapa 3 falhou, ao clicar em "Tentar Novamente", o código deve executar **apenas** a etapa 3 e depois a 4. As etapas 1 e 2 devem permanecer marcadas como concluídas.
2. **Prevenção de vazamento de tempo:** quando o usuário clica em "Cancelar", nenhum temporizador anterior deve avançar a linha do tempo após o cancelamento.
3. **Bloqueio de concorrência:** enquanto o pipeline estiver rodando, o campo de código e o botão iniciar devem ser desabilitados para evitar execuções paralelas concorrentes.

---

## Critérios de Verificação

- [ ] Digitar `IFSUL-101` e clicar em iniciar percorre as 4 etapas até o sucesso completo.
- [ ] Digitar `PED-FALHA` interrompe a execução na etapa 3 exibindo a mensagem de erro da rejeição da Promise.
- [ ] Clicar em "Tentar Novamente" após a falha retoma diretamente na etapa 3 sem reiniciar as etapas 1 e 2.
- [ ] Clicar em "Cancelar" durante a separação interrompe o fluxo imediatamente.
- [ ] O código não utiliza `data-*` attributes para carregar estados ou IDs no JavaScript.

# Exercício Prático: Monitor de Telemetria de Estações (Polling Seguro)

## Objetivo da Atividade

O objetivo desta atividade é construir um painel de monitoramento de telemetria em tempo real para os sensores do IFSul (Laboratório de Redes, Sala de Servidores, Estufa Didática e Pátio Central). O painel atualiza as leituras periodicamente consultando um endpoint PHP.

O foco pedagógico deste exercício é implementar a técnica de **Polling Sequencial Não Sobreposto** usando `setTimeout()` encadeado em vez do problemático `setInterval()`, tratando falhas de rede com preservação de dados e alerta de dados defasados (*stale data*).

---

## Por que evitar `setInterval()` em consultas AJAX?

Quando usamos `setInterval(consultar, 3000)`, o navegador tenta disparar uma nova requisição a cada 3 segundos independentemente do que aconteceu na rede. Se o servidor demorar 5 segundos para responder, as requisições se acumulam em fila, geram concorrência descontrolada e podem travar a aplicação.

A abordagem robusta e profissional é o **Polling Recursivo via `setTimeout()`**: a próxima consulta só é agendada **depois** que a resposta atual for completamente recebida e processada (seja em caso de sucesso ou de falha, dentro do bloco `finally`).

---

## Conceitos trabalhados

- Polling sequencial seguro com `setTimeout()` recursivo;
- Por que e quando evitar `setInterval()` em requisições de rede;
- Bloco `finally` para agendamento garantido da próxima iteração;
- Preservação da última leitura válida no DOM durante falhas transitórias;
- Aumento gradual do intervalo de repetição após falhas consecutivas (*backoff*);
- Sinalização visual de dados defasados (*stale data warning*);
- Construção de cartões de telemetria sem uso de `data-*` attributes;
- Backend PHP simulando leituras com cabeçalho JSON e status HTTP.

---

## Especificações Técnicas do Sistema

### 1. Interface do Usuário (Frontend)
- **Barra de status geral:** exibe o estado da conexão (*Conectado*, *Sincronizando...*, *Pausado*, *Tentando reconectar...*), horário da última atualização bem-sucedida e contador de segundos decorridos.
- **Botões de controle:**
  - `Iniciar Monitoramento`: ativa as consultas periódicas (desabilitado se já estiver ativo);
  - `Pausar`: interrompe o agendamento de novas consultas sem apagar os dados da tela;
  - `Atualizar Agora`: força uma leitura imediata;
  - `Simular Falha`: ativa/desativa um interruptor para testar a reação do painel a erros 500 do servidor.
- **Banner de dados defasados:** se passarem mais de 15 segundos sem que uma nova leitura seja obtida com sucesso, a interface destaca um aviso de atenção indicando que os dados exibidos podem estar desatualizados.
- **Grade de cartões das estações:**
  - Cada cartão mostra o nome da estação, localização, temperatura (°C), umidade relativa (%) e nível de bateria (%).
  - Valores fora da faixa recomendada recebem destaque visual (ex.: temperatura > 28°C em vermelho na Sala de Servidores).

### 2. Mecanismo de Polling e Backoff
- Intervalo padrão entre consultas: **4 segundos**.
- Ao ocorrer uma falha consecutiva, o intervalo aumenta:
  - 1ª falha: espera 6 segundos antes de tentar novamente;
  - 2ª falha: espera 9 segundos;
  - 3ª falha ou mais: espera 12 segundos (teto de tolerância).
- Quando uma requisição tem sucesso, o contador de falhas zera e o intervalo volta para 4 segundos.

### 3. Backend em PHP (`api.php`)
- Responde a requisições `GET` devolvendo JSON formatado.
- Se o parâmetro `?falhar=1` for enviado, responde status `500 Internal Server Error` para testar o comportamento resiliente do frontend.
- Devolve timestamp atual do servidor e uma lista de 4 estações com dados simulados realistas (pequenas variações aleatórias a cada chamada).

---

## Estrutura de Arquivos

```text
09-php-ajax/monitor-estacoes/
├── README.md      # Este guia didático com os requisitos
├── index.html     # Painel de telemetria e controles de monitoramento
├── style.css      # Estilos da grade de sensores, alertas e estados
├── script.js      # Polling sequencial com setTimeout, backoff e manipulação do DOM
└── api.php        # Gerador de telemetria com suporte a simulação de falhas
```

---

## O que observar durante a prática

1. Abra a aba **Rede (Network)** do navegador e acompanhe as requisições sendo disparadas em fila ordenada, sempre aguardando a resposta anterior terminar antes de programar a próxima.
2. Clique no botão de simular falha e observe que os cartões das estações **não** somem da tela: a tela continua exibindo o último dado conhecido com um aviso discreto.
3. Pause o monitoramento e verifique que nenhuma requisição fantasma continua sendo enviada no painel de rede.

---

## Critérios de Verificação

- [ ] A aplicação **não** utiliza `setInterval()` para chamadas AJAX.
- [ ] O botão "Pausar" interrompe imediatamente qualquer próximo agendamento.
- [ ] Em caso de erro 500 no endpoint, os cartões anteriores permanecem visíveis.
- [ ] O intervalo aumenta após falhas consecutivas e volta ao normal após o primeiro sucesso.
- [ ] Nenhum atributo `data-*` foi utilizado para manipulação dos nós na lógica JS.

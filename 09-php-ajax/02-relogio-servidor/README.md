# Exercício Prático: Horário Oficial do Campus com `fetch()` GET

## Objetivo da Atividade

O objetivo desta atividade é realizar a sua **primeira consulta assíncrona real a um backend PHP** utilizando a API nativa `fetch()`. Você aprenderá a disparar a requisição com o método `GET`, converter a resposta recebida para um objeto JavaScript com `await response.json()`, e atualizar a interface sem recarregar a página.

---

## Conceitos trabalhados

- Realização de requisição `GET` com `fetch('api.php')`;
- Leitura e conversão de resposta JSON com `await response.json()`;
- Atualização dinâmica de nós no DOM (`textContent`);
- Diferenciação entre o tempo local do navegador e o tempo oficial do servidor PHP.

---

## Especificações Técnicas do Sistema

### 1. Interface do Usuário (Frontend)
- Um botão `<button id="btn-consultar">Consultar Horário Oficial</button>`.
- Um cartão de informações com os campos:
  - **Campus:** `<span id="info-campus">--</span>`;
  - **Horário do Servidor:** `<span id="info-horario">--:--:--</span>`;
  - **Data:** `<span id="info-data">--/--/----</span>`;
  - **Turno Escolar:** `<span id="info-turno">--</span>`.
- Uma área de status `<div id="status-requisicao">` que informe quando a consulta estiver em andamento (*"Sincronizando com o servidor..."*) e quando terminar com sucesso.

### 2. O Backend em PHP (`api.php`)
- Responde a requisições `GET`.
- Retorna cabeçalho `Content-Type: application/json; charset=utf-8`.
- Calcula o turno atual (`Manhã`, `Tarde` ou `Noite`) e entrega data e hora no fuso horário do Brasil.

---

## Estrutura de Arquivos

```text
09-php-ajax/02-relogio-servidor/
├── README.md      # Este guia didático com os requisitos
├── index.html     # Botão e cartão de exibição dos dados
├── style.css      # Estilização do painel e do relógio
├── script.js      # Consulta com fetch(), await response.json() e manipulação do DOM
└── api.php        # Endpoint PHP que entrega os dados em JSON
```

---

## Critérios de Verificação

- [ ] Clicar no botão busca as informações no PHP e atualiza os 4 campos na tela.
- [ ] A página **não** recarrega durante a consulta.
- [ ] O código utiliza `fetch('api.php')` e `await response.json()`.
- [ ] O arquivo `api.php` pode ser testado diretamente no navegador e devolve JSON válido.

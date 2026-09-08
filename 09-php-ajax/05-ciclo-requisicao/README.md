# Exercício Prático: Ciclo de Vida da Requisição e Tratamento de Erros

## Objetivo da Atividade

O objetivo desta atividade é dominar os **4 estados fundamentais de qualquer operação assíncrona** na web:
1. **Carregando:** feedback visual de espera e botões desabilitados;
2. **Sucesso:** exibição dos dados retornados com status HTTP `200`;
3. **Erro:** captura e exibição de falhas de negócio ou recursos inexistentes (`404` / `422`);
4. **Finalização (`finally`):** reabilitação garantida da interface.

Você entenderá na prática por que a API `fetch()` **não cai automaticamente no `catch`** quando o servidor devolve erros 404 ou 500, exigindo a verificação explícita da propriedade booleana `response.ok`.

---

## Conceitos trabalhados

- Estrutura completa de controle assíncrono com `try...catch...finally`;
- Verificação de sucesso HTTP através da propriedade `response.ok`;
- Lançamento de exceção customizada com `throw new Error(...)` para desviar ao `catch`;
- Tratamento de status `404 Not Found` e `422 Unprocessable Entity`;
- Prevenção de travamento definitivo de botões através do bloco `finally`.

---

## Especificações Técnicas do Sistema

### 1. Interface do Usuário (Frontend)
- Campo `<input type="text" id="campo-carteirinha" placeholder="Ex.: 1001, 1002 ou 9999">`.
- Botão `<button id="btn-consultar">Consultar Saldo</button>`.
- Caixa de feedback `<div id="status-painel">`.
- Cartão com os dados do estudante `<div id="card-saldo">` exibindo nome, matrícula, situação e saldo em reais formatado.

### 2. Casos de Teste Didáticos
- Digitar `1001` ou `1002`: deve responder `200 OK`, atualizar os dados e exibir sucesso em verde.
- Digitar `9999`: o PHP responde `404 Not Found`. O frontend deve capturar a mensagem no `catch` e exibir em vermelho: *"Carteirinha nº 9999 não foi localizada..."*.
- Deixar em branco e clicar: o PHP responde `422 Unprocessable Entity` e exibe aviso de preenchimento.

---

## Estrutura de Arquivos

```text
09-php-ajax/05-ciclo-requisicao/
├── README.md      # Este enunciado detalhado
├── index.html     # Formulário de consulta e cartão de saldo
├── style.css      # Estilização dos 4 estados visuais
├── script.js      # try, catch, finally, response.ok e manipulação do DOM
└── api.php        # Emissão de 200, 404 e 422 em PHP
```

---

## Critérios de Verificação

- [ ] Durante a busca, o botão fica desabilitado e exibe o estado de carregamento.
- [ ] Testar com carteirinha `9999` exibe o alerta de erro em vermelho sem quebrar a aplicação.
- [ ] O botão volta a ficar habilitado mesmo quando a requisição falha (graças ao `finally`).
- [ ] O código testa explicitamente `if (!resposta.ok)` antes de processar os dados.

# Exercício Prático: Envio de Ocorrência Escolar

## Objetivo da Atividade

O objetivo desta prática é implementar um canal digital de registro de ocorrências e manutenção predial para o Campus (como lâmpadas queimadas em laboratórios, torneiras com vazamento ou equipamentos com defeito).

Você construirá o fluxo completo de um **formulário web assíncrono moderno**:
1. O JavaScript intercepta o envio do formulário, impedindo que a página recarregue.
2. Os dados são empacotados com `new FormData(formulario)` e despachados via `fetch()` com método `POST`.
3. O servidor em PHP recebe os dados em `$_POST`, realiza a validação defensiva e responde com dados em formato JSON e códigos de status HTTP semânticos.
4. A interface transita pelos quatro estados clássicos (carregando, sucesso, erro e conclusão no `finally`), garantindo que campos não sejam apagados acidentalmente em caso de falha de preenchimento.

---

## Conceitos trabalhados

- interceptação de evento `submit` com `evento.preventDefault()`;
- coleta automática de campos de formulário com `new FormData()`;
- requisição `fetch()` com método `POST` e corpo de dados;
- verificação de status HTTP com `response.ok`;
- leitura do corpo JSON com `response.json()`;
- gerenciamento dos estados da interface (carregando, erro, sucesso e destravamento no `finally`);
- backend PHP com `header("Content-Type: application/json")`, `http_response_code()` e `exit;`.

---

## Especificações Técnicas do Sistema

O sistema é composto por um formulário de chamado e um endpoint PHP:

### 1. Campos do Formulário
- **Categoria:** seleção (`infraestrutura`, `equipamento`, `limpeza`, `outros`).
- **Local:** texto (ex.: `Laboratório 102`, `Biblioteca`, `Sala 3B`).
- **Nível de Urgência:** rádio ou seleção (`Baixa`, `Média`, `Alta`).
- **Descrição da Ocorrência:** área de texto (`textarea`), exigindo detalhamento mínimo de 10 caracteres.

### 2. Comportamento do Backend (`api.php`)
- Aceita apenas requisições `POST` (rejeita outros métodos com status `405 Method Not Allowed`).
- Valida se `local`, `categoria` e `descricao` foram preenchidos.
- Se a validação falhar: responde com status `422 Unprocessable Content` e o JSON:
  ```json
  {
    "error": true,
    "message": "A descrição da ocorrência deve conter pelo menos 10 caracteres."
  }
  ```
- Se a validação passar: gera um código de protocolo único no formato `OC-2026-XXXX`, responde com status `201 Created` e o JSON:
  ```json
  {
    "protocolo": "OC-2026-4819",
    "categoria": "equipamento",
    "local": "Laboratório 102",
    "message": "Ocorrência registrada com sucesso no sistema da manutenção!"
  }
  ```

### 3. Comportamento da Interface (Frontend)
- Enquanto a requisição estiver em trânsito: o botão de envio fica desabilitado com o texto `"Registrando chamado..."` e a mensagem informa `"Enviando dados..."`.
- Em caso de falha de rede ou erro 422: a mensagem de erro é exibida em vermelho, e **os campos digitados continuam intactos** para que o usuário possa corrigir o texto sem precisar redigitar tudo.
- Em caso de sucesso (201): exibe uma notificação verde informando o protocolo gerado e limpa o formulário com `formulario.reset()`.
- O botão de envio **deve ser reabilitado em qualquer situação** dentro do bloco `finally`.

---

## Estrutura de Arquivos

```text
09-php-ajax/envio-ocorrencia/
├── README.md      # Este enunciado detalhado
├── index.html     # Formulário de abertura de chamado
├── style.css      # Estilos visuais dos campos e estados de feedback
├── script.js      # Interceptação do submit, fetch() e ciclo de estados
└── api.php        # Endpoint de validação e emissão de protocolo em PHP
```

---

## O que observar durante a prática

- **Nunca defina manualmente o cabeçalho `Content-Type` ao usar `FormData`**. O navegador cuidará do delimitador (*boundary*) correto.
- Observe como o bloco `finally` garante que o botão destrave mesmo se o servidor estiver fora do ar ou retornar um erro 422.
- A validação no backend PHP é indispensável: o frontend auxilia o usuário, mas o servidor é quem garante a integridade e segurança dos dados.

---

## Critérios de Verificação

- [ ] Ao enviar o formulário, a página não deve recarregar nem piscar em branco.
- [ ] Tentar enviar com uma descrição muito curta (ex.: "quebrou") exibe a mensagem de validação sem limpar os campos.
- [ ] O envio com dados válidos retorna o protocolo gerado e limpa os campos.
- [ ] Se o servidor estiver inacessível, o botão volta a ficar habilitado após a exibição do erro.

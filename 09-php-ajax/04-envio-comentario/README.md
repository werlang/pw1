# Exercício Prático: Envio de Formulário com FormData (POST)

## Objetivo da Atividade

O objetivo desta atividade é aprender como capturar os dados de um formulário HTML e transmiti-los para um endpoint PHP usando o método `POST` e o objeto nativo `FormData`. Você verá como interceptar o evento `submit`, impedir a recarga da tela com `evento.preventDefault()`, desabilitar o botão durante o envio e limpar os campos após o sucesso com `form.reset()`.

---

## Conceitos trabalhados

- Interceptação do evento `submit` em formulários;
- Prevenção do recarregamento padrão da página com `evento.preventDefault()`;
- Empacotamento automático de campos usando `new FormData(formulario)`;
- Disparo de requisição `POST` com `fetch('api.php', { method: 'POST', body: dados })`;
- Por que **NÃO** devemos definir o cabeçalho `Content-Type` manualmente ao usar `FormData`;
- Limpeza dos campos com `form.reset()` após sucesso (código HTTP `201 Created`).

---

## Especificações Técnicas do Sistema

### 1. Interface do Usuário (Frontend)
- Um formulário `<form id="form-recado">` contendo:
  - Campo `<input type="text" id="campo-nome" name="nome" placeholder="Seu nome completo" required>`;
  - Seletor `<select id="campo-turma" name="turma" required>` com opções de turmas (`1A`, `2A`, `3A`);
  - Área de texto `<textarea id="campo-mensagem" name="mensagem" placeholder="Digite sua dúvida ou sugestão..." rows="3" required></textarea>`;
  - Botão de envio `<button type="submit" id="btn-enviar">Publicar Recado</button>`.
- Uma área de feedback `<div id="status-envio">` que informa:
  - *"Enviando recado para o mural..."* (durante o trânsito da requisição);
  - Mensagem de sucesso em verde com o protocolo retornado pelo PHP;
  - Mensagem de erro em vermelho caso algum campo esteja inválido.

### 2. A Mágica do `FormData`
Ao instanciar `new FormData(formulario)`, o navegador lê automaticamente todos os elementos que possuem o atributo `name` e os empacota no padrão multipart, gerando o delimitador de fronteira (*boundary*) adequado.

```javascript
const dados = new FormData(formRecado);

const resposta = await fetch('api.php', {
  method: 'POST',
  body: dados
});
```

---

## Estrutura de Arquivos

```text
09-php-ajax/04-envio-comentario/
├── README.md      # Este enunciado com as instruções
├── index.html     # Formulário de recados e feedback
├── style.css      # Estilização do formulário e estados de alerta
├── script.js      # Interceptação de submit, FormData, fetch() e reset()
└── api.php        # Endpoint de validação e confirmação em PHP
```

---

## Critérios de Verificação

- [ ] Ao clicar em "Publicar Recado", a página **não recarrega** (url não pisca e não muda).
- [ ] O botão fica desabilitado com o texto "Enviando..." enquanto a requisição transcorre.
- [ ] Se o envio for bem-sucedido, os campos do formulário são limpos com `form.reset()`.
- [ ] O PHP recebe os campos via `$_POST['nome']`, `$_POST['turma']` e `$_POST['mensagem']`.

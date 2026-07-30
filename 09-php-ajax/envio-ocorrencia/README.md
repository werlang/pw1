# Exercício: Envio de Ocorrência

## Objetivo

Enviar um formulário ao PHP sem recarregar a página e refletir com precisão as etapas da requisição.

## Requisitos

- receber categoria, local, descrição e urgência;
- interceptar `submit` e enviar `FormData`;
- desabilitar o botão somente enquanto a requisição estiver ativa;
- validar os campos novamente no PHP;
- responder JSON com `status`, `message` e um protocolo calculado;
- mostrar erros de validação sem apagar os campos e limpar o formulário apenas no sucesso.

## Conceitos trabalhados

`FormData`, POST assíncrono, `response.ok`, JSON, códigos HTTP e estados da interface.

## Critérios de verificação

- falha de rede, erro 422 e sucesso devem ter comportamentos diferentes;
- não deve ser definido manualmente o `Content-Type` do `FormData`;
- o botão precisa ser reativado mesmo após uma exceção.

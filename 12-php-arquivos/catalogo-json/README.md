# Exercício: Catálogo JSON com Escrita Segura

## Objetivo

Manter um pequeno cadastro em JSON e evitar que uma gravação parcial destrua o arquivo principal.

## Requisitos

- carregar o catálogo e verificar erros de decodificação;
- listar, cadastrar, editar e remover registros por identificador;
- validar identificador único e campos obrigatórios;
- gravar o JSON formatado em arquivo temporário;
- substituir o arquivo principal somente após escrita completa;
- manter uma cópia de segurança da última versão válida.

## Conceitos trabalhados

`json_decode()`, `json_encode()`, CRUD em array, arquivo temporário, renomeação e recuperação.

## Critérios de verificação

- JSON inválido deve bloquear alterações e preservar o arquivo;
- a escrita deve ter um único ponto de implementação;
- falha antes da substituição não pode apagar a versão válida.

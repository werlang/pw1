# Exercício: Galeria de Imagens Segura

## Objetivo

Validar um upload real e manter metadados separados do nome fornecido pelo usuário.

## Requisitos

- receber título, crédito e uma imagem;
- verificar código de erro, tamanho e MIME real com `finfo`;
- aceitar somente os tipos definidos no servidor;
- gerar nome aleatório e preservar apenas uma extensão permitida;
- mover a imagem para um diretório controlado;
- registrar título, crédito, nome gerado e data em um arquivo JSON;
- remover a imagem caso a gravação dos metadados falhe.

## Conceitos trabalhados

`$_FILES`, validação de upload, MIME, nome seguro, `move_uploaded_file()`, JSON e compensação de falha.

## Critérios de verificação

- nome original e `$_FILES["type"]` não podem decidir o destino;
- arquivo inválido não pode permanecer na pasta;
- a galeria deve ser reconstruída pelos metadados persistidos.

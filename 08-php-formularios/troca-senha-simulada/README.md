# Exercício: Troca de Senha Simulada

## Objetivo

Praticar verificação e criação de hash sem banco de dados nem sessão, deixando explícita a diferença entre validar uma troca e persistir a nova senha.

## Dados

Defina no PHP o hash de uma senha atual de demonstração.

## Requisitos

- receber senha atual, nova senha e confirmação via POST;
- verificar a senha atual com `password_verify()`;
- exigir tamanho mínimo e ao menos três tipos de caractere na nova senha;
- impedir que a nova senha seja igual à atual;
- comparar nova senha e confirmação;
- quando tudo estiver válido, gerar o novo hash e mostrá-lo apenas como demonstração técnica.

## Conceitos trabalhados

Campos de senha, POST, validações independentes, `password_verify()`, `password_hash()` e mensagens sem exposição de segredo.

## Critérios de verificação

- a resposta não pode repetir nenhuma senha digitada;
- as regras devem gerar mensagens específicas;
- o texto final deve avisar que o hash se perde ao encerrar a requisição.

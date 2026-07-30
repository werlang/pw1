# Exercício: Inventário de Equipamentos

## Objetivo

Construir um CRUD consultável que continue utilizável quando a quantidade de registros crescer.

## Dados

Use uma tabela com patrimônio único, descrição, setor, estado, data de aquisição e indicador de ativo.

## Requisitos

- cadastrar e editar equipamentos com validação;
- impedir patrimônio duplicado por restrição no banco;
- desativar um registro em vez de excluí-lo fisicamente;
- filtrar por setor, estado e texto de busca;
- paginar a listagem com `LIMIT` e `OFFSET`;
- mostrar total de registros e manter os filtros nos links de página.

## Conceitos trabalhados

CRUD, restrição `UNIQUE`, atualização, filtros opcionais, paginação e conflito esperado.

## Critérios de verificação

- a paginação deve acontecer no SQL;
- filtros combinados devem usar parâmetros preparados;
- equipamento desativado deve permanecer no histórico e sair da visão padrão.

<?php
// Questão 2 - Listagem de Itens
// Arquivo: api/items/list.php
//
// Leia as instruções completas em README-list.md
//
// TODO: Implementar listagem com filtros
// 1. Incluir connection.php
// 2. Criar query base com JOINs (categories e users)
// 3. Aplicar filtros opcionais via $_GET:
//    - category: filtrar por categoria
//    - status: filtrar por status
//    - q: buscar por texto em título e descrição
// 4. Ordenar por created_at DESC
// 5. Executar query e retornar JSON

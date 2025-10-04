# Exercício 10: Navegar Galeria de Fotos com Paginação

## Objetivo

Praticar GET com paginação completa.

## Tema

Galeria de Fotos

## Descrição

Exiba fotos em grid, com paginação. Mostre 12 fotos por página, com controles Anterior/Próximo e números de página.

## API

- **URL**: `/api/photo/list.php?page=1&limit=12`
- **Método**: `GET`

## Resposta
```json
{
    "photos": [...],
    "pagination": {"page": 1, "limit": 12, "total": 50, "totalPages": 5}
}
```

## Tarefa

Implemente paginação completa com botões numéricos, desabilite botões apropriadamente.

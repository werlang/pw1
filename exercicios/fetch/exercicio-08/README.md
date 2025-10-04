# Exercício 8: Buscar Receitas por Ingredientes

## Objetivo

Praticar GET com parâmetros de busca textual.

## Tema

Sistema de Receitas Culinárias

## Descrição

Busque receitas que contenham determinados ingredientes. Use um campo de busca com busca em tempo real.

## API

- **URL**: `/api/recipe/search.php?ingredient=tomate`
- **Método**: `GET`

## Resposta
```json
{
    "recipes": [
        {"id": 1, "name": "Molho de Tomate", "ingredients": "tomate, alho, cebola", "time": 30}
    ]
}
```

## Tarefa

Adicione evento de input no campo de busca, faça requisição ao digitar (com debounce se possível).

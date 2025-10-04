# Exercício 5: Ordenar Alunos por Nota

## Objetivo

Praticar requisições HTTP **GET com parâmetros de ordenação**.

## Tema

Sistema de Notas Escolares

## Descrição

Implemente a funcionalidade de listar e ordenar alunos por diferentes critérios (nome, nota, crescente/decrescente).

## API Endpoint

- **URL**: `/api/student/list.php?orderBy=grade&order=desc`
- **Parâmetros**:
  - `orderBy`: `name` ou `grade`
  - `order`: `asc` ou `desc`

## Resposta

```json
{
    "students": [
        {"id": 1, "name": "Ana Silva", "grade": 9.5, "class": "3A"},
        {"id": 2, "name": "Carlos Santos", "grade": 8.8, "class": "3A"}
    ]
}
```

## Tarefa

1. Adicione event listeners nos botões de ordenação
2. Faça requisições GET com parâmetros de ordenação
3. Atualize a tabela com os dados ordenados

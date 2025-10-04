# Edição de Avaliações de Filmes

Você deve implementar a funcionalidade de editar avaliações de filmes.

## Objetivo

Listar filmes já avaliados e permitir a edição da:
- Nota (1 a 5 estrelas)
- Comentário da avaliação

## Passo a Passo da Questão

### 0. Carregar Filmes Avaliados

- Carregue os filmes da API:
    - Endereço: `/api/movie/list.php`
    - Método: `GET`

Retorno da API:
```json
{
    "movies": [
        {
            "id": "1",
            "title": "O Poderoso Chefão",
            "year": "1972",
            "genre": "Drama",
            "rating": "5",
            "review": "Obra-prima do cinema!"
        }
    ]
}
```

### 1. Renderizar Lista de Filmes

Crie cards para cada filme mostrando:
- Título e ano
- Gênero
- Avaliação em estrelas
- Comentário
- Botão "Editar"

### 2. Abrir Modal de Edição

Ao clicar em "Editar":
- Preencha o modal com os dados atuais do filme
- Mostre o título do filme no cabeçalho do modal
- Pré-selecione a nota atual
- Pré-preencha o comentário atual

### 3. Atualizar Avaliação

Ao submeter o formulário do modal:
- Envie os dados para a API:
    - Endereço: `/api/movie/update.php`
    - Método: `POST`
    - Corpo: FormData com `id`, `rating`, `review`

Retorno:
```json
{
    "message": "Avaliação atualizada com sucesso",
    "movie": { ... dados atualizados ... }
}
```

- Exiba mensagem de sucesso
- Feche o modal
- Atualize o card do filme na lista

## Dicas

- Use data-attributes nos botões editar para guardar o ID do filme
- O rating deve ser um número de 1 a 5
- Feche o modal após sucesso limpando o formulário
- Considere criar funções auxiliares: openEditModal(movieId), updateMovieCard(movie)

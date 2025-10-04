# Exercício 2: Buscar Produtos por Categoria

## Objetivo

Praticar requisições HTTP **GET com parâmetros de query string** para filtrar dados.

## Tema

Sistema de Loja Online - Busca de Produtos

## Descrição

Você deve implementar a funcionalidade de buscar produtos filtrados por categoria. O sistema possui botões para diferentes categorias (Eletrônicos, Roupas, Livros, Todos) e deve exibir apenas os produtos da categoria selecionada.

## Tarefa do Aluno

Complete a função no arquivo `script.js` para buscar produtos da API e exibi-los na tabela.

### API Endpoint

- **URL**: `/api/product/list.php`
- **Método**: `GET`
- **Parâmetros** (query string):
  - `category`: nome da categoria (opcional - se não informado, retorna todos)

**Exemplos:**
- `/api/product/list.php` - retorna todos os produtos
- `/api/product/list.php?category=Eletrônicos` - retorna apenas eletrônicos

### Resposta da API

```json
{
    "products": [
        {
            "id": 1,
            "name": "Notebook Dell",
            "category": "Eletrônicos",
            "price": 2500.00,
            "stock": 15
        },
        {
            "id": 2,
            "name": "Mouse Logitech",
            "category": "Eletrônicos",
            "price": 89.90,
            "stock": 50
        }
    ]
}
```

## O Que Você Vai Aprender

- Como fazer requisições GET com parâmetros
- Como construir URLs com query strings
- Como processar arrays de dados JSON
- Como criar elementos HTML dinamicamente
- Como preencher uma tabela com dados da API

## Instruções

1. Abra o arquivo `script.js`
2. Encontre o comentário `// TODO: Implemente aqui`
3. Complete o código para:
   - Fazer requisição GET para a API (com ou sem parâmetro de categoria)
   - Processar o array de produtos retornado
   - Criar linhas da tabela dinamicamente
   - Exibir "Nenhum produto encontrado" se o array estiver vazio

## Dicas

- Para fazer GET com parâmetros: `fetch('/api/product/list.php?category=' + category)`
- Use `.map()` ou `.forEach()` para percorrer o array de produtos
- Use template literals para criar o HTML: `` `<tr>...</tr>` ``
- Para exibir preço formatado: `price.toFixed(2)`
- Limpe a tabela antes de adicionar novos produtos

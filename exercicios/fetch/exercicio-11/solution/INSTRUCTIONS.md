# Cadastro de Produtos no Estoque

Você deve implementar a funcionalidade de adicionar produtos ao estoque.

## Objetivo

Permitir ao usuário cadastrar produtos com:
- Nome do produto
- Categoria
- Preço unitário
- Quantidade em estoque

## Passo a Passo da Questão

### 0. Submissão do Formulário

- O formulário `#productForm` já está criado no HTML.
- Não esqueça de usar o `event.preventDefault()` para evitar o comportamento padrão de recarregar a página.
- Envie os dados do formulário para a API usando `fetch` e aguarde a resposta.
    - Endereço: `/api/product/add.php`
    - Método: `POST`
    - Corpo: Dados do formulário (use `FormData`)

### 1. Verificar Resposta da API

A API irá retornar um JSON com a seguinte estrutura:
- Em caso de erro:
```json
{
    "error": true,
    "message": "Mensagem de erro"
}
```
- Em caso de sucesso:
```json
{
    "message": "Produto adicionado com sucesso",
    "product": {
        "id": 1,
        "name": "Notebook Dell",
        "category": "Eletrônicos",
        "price": 2500.00,
        "quantity": 10
    }
}
```

- Se `error` for `true`, exiba a mensagem de erro usando `showToast(message, 'error')`.
- Se `error` for `false` ou inexistente, exiba a mensagem de sucesso usando `showToast(message, 'success')`.

### 2. Limpar o Formulário

- Após adicionar o produto com sucesso, limpe o formulário usando `form.reset()`.

## Dicas

- Use `FormData` para capturar os dados do formulário facilmente
- Sempre use `async/await` para trabalhar com requisições
- Lembre-se de importar o `showToast` do arquivo de components
- O preço é armazenado como decimal no banco de dados
- A quantidade deve ser um número inteiro positivo

# Listagem e Busca de Contatos

Você deve implementar a funcionalidade de listar e buscar contatos.

## Objetivo

Exibir uma lista de contatos com:
- Nome
- Email
- Telefone
- Categoria (Trabalho, Pessoal, Família)

E permitir busca em tempo real por nome ou email.

## Passo a Passo da Questão

### 0. Carregar Contatos da API

- Realize uma requisição para a API para obter a lista de contatos.
    - Endereço: `/api/contact/list.php`
    - Método: `GET`
    - Parâmetros opcionais de Query (URL):
        - `search`: termo de busca (filtra por nome ou email)
        - `category`: categoria para filtrar

A API retorna:
```json
{
    "contacts": [
        {
            "id": "1",
            "name": "João Silva",
            "email": "joao@email.com",
            "phone": "(51) 99999-9999",
            "category": "Trabalho"
        }
    ]
}
```

### 1. Renderizar Lista de Contatos

- Se não houver contatos, exiba:
```html
<p class="no-contacts">Nenhum contato encontrado.</p>
```

- Se houver contatos, crie cards para cada um:
```html
<div class="contact-card">
    <div class="contact-header">
        <h3 class="contact-name">João Silva</h3>
        <span class="contact-category">Trabalho</span>
    </div>
    <div class="contact-info">
        <p class="contact-email">📧 joao@email.com</p>
        <p class="contact-phone">📱 (51) 99999-9999</p>
    </div>
</div>
```

### 2. Implementar Busca em Tempo Real

- Adicione um evento `input` no campo `#searchInput`
- A cada digitação, faça uma nova requisição à API com o parâmetro `search`
- Atualize a lista de contatos com os resultados filtrados

### 3. Implementar Filtro por Categoria

- Adicione um evento `change` no select `#categoryFilter`
- Quando o usuário selecionar uma categoria, faça uma nova requisição com o parâmetro `category`
- Combine os filtros de busca e categoria quando ambos estiverem ativos

## Dicas

- Use `setTimeout` com debounce para evitar muitas requisições durante a digitação
- Os parâmetros de busca são opcionais - envie apenas os que estiverem preenchidos
- Use template strings para construir a URL com parâmetros de query
- A categoria pode ser: "Trabalho", "Pessoal", "Família", ou "" (todas)

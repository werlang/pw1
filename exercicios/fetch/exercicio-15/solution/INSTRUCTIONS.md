# Cardápio com Paginação

## Objetivo

Exibir pratos de um restaurante com paginação e filtro por categoria.

## Funcionalidades a Implementar

### 1. Carregar Pratos com Paginação

- API: `/api/dish/list.php`
- Parâmetros: `page` (número da página), `limit` (itens por página), `category` (opcional)
- Resposta inclui array `dishes` e objeto `pagination`

### 2. Renderizar Cards de Pratos

- Criar cards com: nome, categoria, descrição, preço
- Formatar preço como "R$ 00,00"
- Grid responsivo

### 3. Implementar Controles de Paginação

- Botões "Anterior" e "Próxima"
- Desabilitar botões nos extremos
- Mostrar "Página X de Y"
- Atualizar página ao clicar

### 4. Filtro por Categoria

- Select com categorias: Entrada, Prato Principal, Sobremesa, Bebida
- Ao mudar seleção, voltar para página 1
- Passar categoria como parâmetro na URL

## Estrutura da API

```json
{
    "dishes": [...],
    "pagination": {
        "page": 1,
        "limit": 6,
        "total": 10,
        "totalPages": 2
    }
}
```

## Dicas

- Use `parseFloat(price).toFixed(2).replace('.', ',')` para formatar preço
- Remova paginação anterior antes de criar nova
- Use URLSearchParams para construir query string

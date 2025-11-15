# Community Swap - Exercício Preparatório

Exercício preparatório para prática de PHP + MySQL com frontend completo.

## Descrição

Sistema de feira de trocas comunitária onde usuários podem cadastrar itens para troca, visualizar ofertas, filtrar por categoria e status, e gerenciar seus próprios itens.

## Tema

**Feira de Trocas Comunitária** - Uma plataforma para moradores de um condomínio ou bairro trocarem itens entre si de forma organizada e transparente.

## Estrutura

```
community-swap/
├── COMPARISON.md       # Documento interno (remover antes de distribuir)
└── public/             # Pasta do exercício (distribuir aos alunos)
    ├── README.md       # Instruções completas
    ├── api/            # Backend PHP (alunos devem implementar)
    ├── components/     # Componentes JS (já implementados)
    ├── css/            # Estilos (já implementados)
    ├── login/          # Página de login (já implementada)
    ├── add-item/       # Adicionar item (já implementado)
    ├── update-item/    # Editar item (já implementado)
    ├── index.html      # Página principal (já implementada)
    └── script.js       # JavaScript principal (já implementado)
```

## O que você deve fazer

Você deve implementar **APENAS** os arquivos PHP dentro de `public/api/`:

### Questões Obrigatórias
1. **Login** (`api/auth/login.php`, `api/auth/logout.php`)
2. **Listagem com filtros** (`api/items/list.php`)
3. **Adicionar item** (`api/items/add.php`)
4. **Atualizar item** (`api/items/update.php`)

### Questão Bônus
5. **Remover item** (`api/items/delete.php`)

## Conceitos Cobertos

- ✅ Autenticação com sessões PHP
- ✅ CRUD completo com PDO
- ✅ Prepared Statements
- ✅ JOINs múltiplos
- ✅ Filtros dinâmicos em queries
- ✅ Busca textual com LIKE
- ✅ Validação de dados
- ✅ Verificação de permissões
- ✅ Validação de Foreign Keys
- ✅ Retorno de JSON

## Nível de Dificuldade

**Intermediário** - Adequado para alunos que já viram:
- PHP básico
- MySQL e SQL básico
- Conceitos de autenticação
- CRUD básico

## Tempo Estimado

- **Implementação completa:** 3-4 horas
- **Questões obrigatórias apenas:** 2-3 horas

## Como Usar Este Exercício

1. Acesse a pasta `public/`
2. Leia o `README.md` principal
3. Importe `api/database.sql`
4. Configure `api/connection.php`
5. Leia os READMEs de cada questão
6. Implemente os arquivos PHP
7. Teste no navegador
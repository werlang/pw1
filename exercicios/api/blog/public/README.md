# Desafio P4 - Blog System

Sistema de gerenciamento de blog com autenticação de usuários, criação de posts, busca textual e controle de publicação.

## 📋 Descrição

Este é um exercício prático de PHP com banco de dados MySQL. O objetivo é implementar 4 endpoints de API que gerenciam um sistema de blog.

## 🎯 Questões

### Questão 1 - Login de Usuários
**Arquivo:** `/api/auth/login.php`  
**Documentação:** `/api/auth/README-login.md`

Implementar autenticação de usuários com validação de senha hash e criação de sessão.

### Questão 2 - Busca de Posts  
**Arquivo:** `/api/posts/search.php`  
**Documentação:** `/api/posts/README-search.md`

Implementar busca textual de posts usando LIKE e JOIN para incluir nome do autor.

### Questão 3 - Criar Post
**Arquivo:** `/api/posts/create.php`  
**Documentação:** `/api/posts/README-create.md`

Implementar criação de novos posts com validação de campos.

### Questão 4 - Toggle Publicação
**Arquivo:** `/api/posts/toggle-publish.php`  
**Documentação:** `/api/posts/README-toggle.md`

Implementar alternância de status de publicação (0 ↔ 1) com verificação de propriedade.

## 🗄️ Banco de Dados

Execute o arquivo `api/database.sql` para criar a estrutura:

```bash
mysql -u root -p < api/database.sql
```

### Tabelas

**users**
- id, name, email, password (hash), bio

**posts**
- id, user_id (FK), title, content, category, is_published, created_at

### Usuários de Teste

Todos usam a senha: **blog2025**

- ana@email.com
- carlos@email.com  
- beatriz@email.com

## 🚀 Como Testar

1. Configure o banco de dados executando `api/database.sql`
2. Ajuste as credenciais em `api/connection.php` se necessário
3. Abra `login/index.html` no navegador
4. Faça login com um dos usuários de teste
5. Teste as funcionalidades:
   - Ver todos os posts publicados
   - Buscar posts por palavras-chave
   - Criar novos posts
   - Publicar/despublicar seus posts

## 📁 Estrutura de Arquivos

```
public/
├── api/
│   ├── connection.php        # Conexão PDO (já implementado)
│   ├── database.sql          # Schema do banco (já implementado)
│   ├── auth/
│   │   ├── login.php         # ⚠️ IMPLEMENTAR (Questão 1)
│   │   ├── logout.php        # ✅ Já implementado
│   │   └── README-login.md   # Instruções
│   └── posts/
│       ├── search.php        # ⚠️ IMPLEMENTAR (Questão 2)
│       ├── create.php        # ⚠️ IMPLEMENTAR (Questão 3)
│       ├── toggle-publish.php # ⚠️ IMPLEMENTAR (Questão 4)
│       ├── README-search.md
│       ├── README-create.md
│       └── README-toggle.md
├── login/                    # ✅ Página de login (já pronta)
├── posts/                    # ✅ Listagem e busca (já pronta)
├── create-post/              # ✅ Criar post (já pronta)
├── edit-post/                # ✅ Gerenciar posts (já pronta)
├── css/                      # ✅ Estilos (já prontos)
└── components/               # ✅ Toast (já pronto)
```

## 🎨 Frontend

Todo o frontend está pronto e funcional:
- Interface responsiva e moderna
- Notificações toast
- Formulários validados
- Navegação entre páginas

Você só precisa implementar os 4 arquivos PHP marcados com ⚠️.

## 📚 Conceitos Avaliados

- ✅ Autenticação com sessões PHP
- ✅ Prepared statements (PDO)  
- ✅ Validação de dados
- ✅ Hash de senhas (bcrypt)
- ✅ JOIN entre tabelas
- ✅ Busca com LIKE e wildcards
- ✅ Lógica de toggle (inversão de valor)
- ✅ Controle de acesso (ownership)

## 💡 Dicas

1. Leia TODO o README de cada questão antes de começar
2. Use `$_SESSION["user_id"]` para pegar o usuário logado
3. Sempre use prepared statements
4. Na Q4, você deve CALCULAR o novo valor, não receber
5. Adicione `user_id` no WHERE para segurança

## 📝 Entregas

Implemente os 4 arquivos PHP:
1. `/api/auth/login.php`
2. `/api/posts/search.php`
3. `/api/posts/create.php`
4. `/api/posts/toggle-publish.php`

Teste cada funcionalidade no frontend para garantir que está funcionando!

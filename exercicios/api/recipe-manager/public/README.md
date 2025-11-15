# Sistema de Gerenciamento de Receitas 🍳

Você deve implementar o backend (PHP) de um sistema para compartilhar e gerenciar receitas culinárias. O sistema deve permitir login de usuários, listagem com filtros, criação e atualização de receitas.

Todo o frontend já está implementado e funcionando. Sua responsabilidade é apenas implementar os arquivos PHP na pasta `api/`.

O dump do banco de dados está disponível no arquivo `api/database.sql`.

Todas as questões envolvem a manipulação de dados com PHP, uso de PDO para consultas SQL, tratamento de sessões e retorno de JSON. NENHUMA questão envolve a manipulação do frontend, HTML, CSS ou JavaScript.

## 🚀 Como Rodar o Projeto

1. Importe o arquivo `api/database.sql` no MySQL
2. Configure o arquivo `api/connection.php` com suas credenciais:
   - Host: `localhost` ou `mysql` (se usando Docker do repositório raiz)
   - Usuário: `root`
   - Senha: sua senha do MySQL
   - Porta: `3306`
3. Acesse `http://localhost/challenges/recipe-manager/public/login/` no navegador

## 📚 Questões

### Questão 1: Login de Usuários
**Arquivo:** [`api/auth/login.php`](api/auth/login.php)  
**Documentação:** [api/auth/README-login.md](api/auth/README-login.md)

Implementar autenticação de usuários com validação de senha hash e criação de sessão.

**Conceitos avaliados:**
- Sessões PHP (`session_start()`)
- Prepared statements com PDO
- Validação de senha com `password_verify()`
- Retorno de JSON estruturado

---

### Questão 2: Listagem de Receitas com Filtros
**Arquivo:** [`api/recipes/list.php`](api/recipes/list.php)  
**Documentação:** [api/recipes/README-list.md](api/recipes/README-list.md)

Implementar listagem de receitas públicas de todos os usuários com suporte a filtros opcionais por categoria e dificuldade.

**Conceitos avaliados:**
- INNER JOIN entre tabelas
- Queries com múltiplos filtros opcionais
- Validação de valores permitidos com `in_array()`
- Prepared statements dinâmicos

---

### Questão 3: Adicionar Nova Receita
**Arquivo:** [`api/recipes/add.php`](api/recipes/add.php)  
**Documentação:** [api/recipes/README-add.md](api/recipes/README-add.md)

Implementar criação de novas receitas vinculadas ao usuário autenticado.

**Conceitos avaliados:**
- INSERT com múltiplos campos
- Validação de campos obrigatórios
- Valores padrão para campos opcionais
- Uso de `lastInsertId()`

---

### Questão 4: Alternar Visibilidade da Receita
**Arquivo:** [`api/recipes/update-visibility.php`](api/recipes/update-visibility.php)  
**Documentação:** [api/recipes/README-update-visibility.md](api/recipes/README-update-visibility.md)

Implementar alternância (toggle) de visibilidade entre pública e privada com verificação de propriedade.

**Conceitos avaliados:**
- SELECT antes de UPDATE
- Lógica de alternância (toggle)
- Validação de propriedade (segurança)
- Operadores ternários

---

## 🗄️ Estrutura do Banco de Dados

O banco possui duas tabelas principais:

### Tabela `users`
- `id`: Identificador único do usuário
- `name`: Nome completo do usuário
- `email`: Email do usuário (usado para login)
- `password`: Senha do usuário (armazenada com hash bcrypt)
- `favorite_cuisine`: Culinária favorita do usuário (opcional)
- `created_at`: Data e hora de criação

**Nota:** As senhas de teste estão hasheadas. Use `password_verify()` para validação.

### Tabela `recipes`
- `id`: Identificador único da receita
- `user_id`: ID do usuário que criou a receita (FK para `users`)
- `title`: Título da receita
- `description`: Descrição breve da receita
- `ingredients`: Lista de ingredientes (texto)
- `category`: Categoria da receita (ex: Sobremesas, Pratos Principais)
- `difficulty`: Dificuldade da receita (`fácil`, `médio` ou `difícil` - ENUM)
- `prep_time`: Tempo de preparo em minutos (INT)
- `servings`: Número de porções (INT)
- `is_public`: Visibilidade (1 = pública, 0 = privada - TINYINT)
- `created_at`: Data e hora de criação

## 🔐 Usuários de Teste

| Nome | Email | Senha | Culinária Favorita |
|------|-------|-------|--------------------|
| Chef Carolina | carolina@chef.com | receita123 | Italiana |
| Marcos Ferreira | marcos@email.com | receita123 | Brasileira |
| Juliana Costa | juliana@email.com | receita123 | Asiática |

## 📋 Padrão de Resposta das APIs

Todas as APIs devem retornar JSON com a seguinte estrutura:

### Em caso de sucesso:
```json
{
    "message": "Mensagem descritiva do sucesso",
    "data": {
        // dados específicos da operação
    }
}
```

### Em caso de erro:
```json
{
    "error": true,
    "message": "Mensagem descritiva do erro"
}
```

**Importante:** Sempre defina o header:
```php
header('Content-Type: application/json');
```

## 🔒 Sessões

O sistema utiliza sessões PHP para manter o usuário logado.

Certifique-se de:
1. Iniciar a sessão com `session_start()` no início de cada script
2. Armazenar `user_id` e `user_name` na sessão após login bem-sucedido
3. Verificar se `$_SESSION['user_id']` existe antes de processar operações autenticadas

**Dica:** Se não autenticado, retorne HTTP 401:
```php
if (!isset($_SESSION['user_id'])) {
    http_response_code(401);
    echo json_encode(['error' => true, 'message' => 'Usuário não autenticado']);
    exit;
}
```

## 🎯 Categorias Disponíveis

- Sobremesas
- Pratos Principais
- Massas e Grãos
- Entradas
- Lanches
- Bebidas
- Saladas
- Sopas

## 📁 Estrutura de Arquivos

```
public/
├── api/
│   ├── database.sql          # Dump do banco de dados
│   ├── connection.php         # Conexão PDO (já implementado)
│   ├── auth/
│   │   ├── login.php         # [VOCÊ IMPLEMENTA] Questão 1
│   │   ├── logout.php        # [JÁ IMPLEMENTADO]
│   │   └── README-login.md   # Documentação da Q1
│   └── recipes/
│       ├── list.php          # [VOCÊ IMPLEMENTA] Questão 2
│       ├── add.php           # [VOCÊ IMPLEMENTA] Questão 3
│       ├── update-visibility.php  # [VOCÊ IMPLEMENTA] Questão 4
│       ├── README-list.md    # Documentação da Q2
│       ├── README-add.md     # Documentação da Q3
│       └── README-update-visibility.md  # Documentação da Q4
├── login/                    # [JÁ IMPLEMENTADO] Página de login
├── recipes/                  # [JÁ IMPLEMENTADO] Lista de receitas públicas
├── add-recipe/               # [JÁ IMPLEMENTADO] Formulário de nova receita
├── my-recipes/               # [JÁ IMPLEMENTADO] Gerenciar minhas receitas
├── css/                      # [JÁ IMPLEMENTADO] Estilos
└── components/               # [JÁ IMPLEMENTADO] Componentes JS
```

## 🧪 Como Testar

### Questão 1 - Login
1. Acesse `/login/`
2. Use: `carolina@chef.com` / `receita123`
3. Deve redirecionar para `/recipes/`

### Questão 2 - Listagem
1. Após login, você está em `/recipes/`
2. Deve ver todas as receitas públicas
3. Teste os filtros de categoria e dificuldade
4. Abra o console (F12) e veja as requisições

### Questão 3 - Adicionar
1. Clique em "+ Nova Receita"
2. Preencha o formulário
3. Clique em "Adicionar Receita"
4. Deve aparecer na listagem

### Questão 4 - Toggle Visibilidade
1. Clique em "Minhas Receitas"
2. Clique em "Tornar Privada" em uma receita pública
3. O status deve mudar
4. Clique novamente para tornar pública

## 💡 Dicas Importantes

1. **Sempre use prepared statements** para prevenir SQL injection
2. **Valide todos os inputs** antes de usar no banco
3. **Retorne HTTP status codes apropriados** (401 para não autenticado, 400 para dados inválidos, 500 para erros do servidor)
4. **Teste cada endpoint individualmente** antes de passar para o próximo
5. **Use `var_dump()` ou `error_log()`** para debug
6. **Leia os READMEs de cada questão** - eles contêm exemplos de SQL e explicações detalhadas

## 📝 Observações

- O frontend já está completo e funcional
- Você só precisa implementar os 4 arquivos PHP mencionados
- Cada README de questão contém instruções detalhadas
- O arquivo `connection.php` já está pronto - apenas ajuste as credenciais
- O arquivo `logout.php` já está implementado como exemplo

---

**Boa sorte! 🍀**

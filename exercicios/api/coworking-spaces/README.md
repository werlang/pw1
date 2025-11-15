# Sistema de Reservas de Salas de Coworking
## Exercício Preparatório - PHP + MySQL

---

## 📁 Estrutura de Arquivos Criada

```
challenges/coworking-spaces/
├── COMPARISON.md                           # ⚠️ Documento interno (REMOVER antes da entrega)
└── public/                                 # Pasta pública (entregar aos alunos)
    ├── README.md                           # Documentação principal
    ├── api/
    │   ├── connection.php                  # ⚠️ Alunos devem configurar
    │   ├── database.sql                    # ✅ Schema + dados
    │   ├── auth/
    │   │   ├── login.php                   # ⚠️ Alunos devem implementar
    │   │   ├── logout.php                  # ✅ Já implementado
    │   │   └── README-login.md             # Documentação Questão 1
    │   └── bookings/
    │       ├── list.php                    # ⚠️ Alunos devem implementar
    │       ├── add.php                     # ⚠️ Alunos devem implementar
    │       ├── cancel.php                  # ⚠️ Alunos devem implementar
    │       ├── README-list.md              # Documentação Questão 2
    │       ├── README-add.md               # Documentação Questão 3
    │       └── README-cancel.md            # Documentação Questão 4
    ├── components/
    │   └── toast.js                        # Sistema de notificações
    ├── css/
    │   ├── index.css                       # Estilos principais
    │   └── toast.css                       # Estilos das notificações
    ├── login/
    │   └── index.html                      # Página de login
    ├── rooms/
    │   └── index.html                      # Listagem de salas
    ├── add-booking/
    │   └── index.html                      # Formulário nova reserva
    └── my-bookings/
        └── index.html                      # Minhas reservas
```

---

## ✅ Checklist de Entrega

### Arquivos para Alunos Implementarem
- [ ] `api/auth/login.php` - Login (com comentários guia)
- [ ] `api/bookings/list.php` - Listagem com filtros (com comentários guia)
- [ ] `api/bookings/add.php` - Criar reserva (com comentários guia)
- [ ] `api/bookings/cancel.php` - Cancelar reserva (com comentários guia)

### Arquivos Prontos
- [x] `api/connection.php` - Conexão PDO (alunos devem configurar credenciais)
- [x] `api/database.sql` - Schema completo com dados
- [x] `api/auth/logout.php` - Logout implementado

### Documentação das Questões
- [x] `api/auth/README-login.md` - Questão 1
- [x] `api/bookings/README-list.md` - Questão 2
- [x] `api/bookings/README-add.md` - Questão 3
- [x] `api/bookings/README-cancel.md` - Questão 4

### Front-end Completo
- [x] `login/index.html` - Tela de login
- [x] `rooms/index.html` - Listagem de salas
- [x] `add-booking/index.html` - Criar reserva
- [x] `my-bookings/index.html` - Gerenciar reservas
- [x] `css/index.css` - CSS moderno com variáveis
- [x] `css/toast.css` - Estilos de notificação
- [x] `components/toast.js` - Sistema de toasts

### Documentação Geral
- [x] `README.md` - Instruções completas

---

## 🎯 Características do Exercício

### Tema
**Sistema de Reservas de Salas de Coworking**

Gerenciar reservas de espaços de trabalho compartilhados com cálculo automático de duração e preço.

### Banco de Dados
- `users` - Usuários do sistema
- `rooms` - Salas disponíveis para reserva
- `bookings` - Reservas realizadas

### Questões (4 no total)
1. **Login** - Autenticação com sessões
2. **Listagem** - Reservas com filtros dinâmicos e JOINs
3. **Criar** - Nova reserva com cálculos automáticos
4. **Cancelar** - Cancelamento com validações complexas

### Conceitos Avaliados
- ✓ Sessões PHP
- ✓ PDO com prepared statements
- ✓ JOINs entre múltiplas tabelas
- ✓ Filtros dinâmicos via `$_GET`
- ✓ Validações no servidor
- ✓ Cálculos automáticos (duração/preço)
- ✓ Lógica de negócio complexa
- ✓ Retorno padronizado JSON

## 🚀 Como Usar

1. Importar `api/database.sql` no MySQL
2. Configurar `api/connection.php` (host, user, password)
3. Acessar `login/index.html` no navegador
4. Implementar os 4 endpoints PHP conforme READMEs e comentários guia
3. Acessar `login/index.html` no navegador
4. Implementar os 4 endpoints PHP conforme READMEs

---

## 🔐 Usuários de Teste

**Senha para todos**: `cowork2025`

- marina@startup.tech
- roberto@freelancer.com
- julia@design.studio
- carlos@consultant.io

---
# Desafio GreenPulse - Operações de Estufas Urbanas

Sistema completo para gestores acompanharem chamados de manutenção em estufas urbanas inteligentes. O frontend está finalizado: formulários, filtros, dashboards e notificações. Sua tarefa é implementar os endpoints PHP que se comunicam com o MySQL.

## 📋 Contexto
A GreenPulse monitora estufas espalhadas pela cidade. Quando sensores identificam problemas, os gestores registram chamados indicando a zona, tipo de falha e prioridade. O time precisa:
- Autenticar usuários via sessão
- Listar e filtrar chamados com métricas agregadas
- Abrir novos chamados com validações de data e enums
- Atualizar o status com regras de transição (agendar/encerrar)

## 🧩 Questões
1. **Login (auth/login.php)** — validar credenciais, salvar sessão e retornar nome/role. Ver `api/auth/README-login.md`.
2. **Listagem Inteligente (requests/list.php)** — filtros dinâmicos, busca textual, resumo por status e modo de detalhe. Ver `api/requests/README-list.md`.
3. **Criar Chamado (requests/add.php)** — inserir novo registro com validações de enums e datas. Ver `api/requests/README-add.md`.
4. **Atualizar Chamado (requests/update.php)** — aplicar regras de transição (`open → scheduled → done`). Ver `api/requests/README-update.md`.

## 🗄️ Banco de Dados
Execute `api/database.sql` para criar o banco `greenpulse` com as tabelas:
- `users` (id, name, email, password hash, role)
- `maintenance_requests` (campos textuais e enums para prioridade/status)

Usuários de teste (senha `green@2025`):
- lara@greenpulse.com (manager)
- otavio@greenpulse.com (technician)
- helena@greenpulse.com (manager)

## 🚀 Como rodar
1. Importe `api/database.sql` no MySQL (`mysql -u root -p < api/database.sql`).
2. Ajuste `api/connection.php` se usar host/porta diferentes.
3. Suba o backend PHP (Apache embutido ou Docker do repositório raiz).
4. Abra `login/index.html` e autentique-se com um usuário de teste.
5. Explore as páginas:
   - `/requests/` filtros e dashboard
   - `/add-request/` cadastro
   - `/update-request/?id=ID` atualização

## 🧱 Estrutura
```
public/
├── README.md
├── api/
│   ├── connection.php
│   ├── database.sql
│   ├── auth/
│   │   ├── login.php        # ⚠️ implementar
│   │   ├── logout.php
│   │   └── README-login.md
│   └── requests/
│       ├── add.php          # ⚠️ implementar
│       ├── list.php         # ⚠️ implementar
│       ├── update.php       # ⚠️ implementar
│       ├── README-add.md
│       ├── README-list.md
│       └── README-update.md
├── components/toast.js
├── css/
│   ├── index.css
│   └── toast.css
├── login/
├── requests/
├── add-request/
└── update-request/
```

## ✅ Conceitos Avaliados
- Sessões PHP + validação de autenticação
- PDO com prepared statements e filtros dinâmicos
- JOIN entre tabelas e agregações
- Manipulação de enums, datas e validações personalizadas
- Retorno padronizado em JSON para o frontend

Implemente os quatro arquivos PHP, teste cada página e garanta respostas coerentes com o frontend.

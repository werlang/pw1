# Sistema de Reservas de Salas de Coworking

Você deve implementar o backend (PHP) de um sistema para gerenciar reservas de salas em espaços de coworking. O sistema deve permitir login de usuários, listagem de reservas com filtros, criação de novas reservas e cancelamento.

Todo o frontend já está implementado e funcionando. Sua responsabilidade é apenas implementar os arquivos PHP na pasta `api/`.

O dump do banco de dados está disponível no arquivo `api/database.sql`.

Todas as questões envolvem a manipulação de dados com PHP, uso de PDO para consultas SQL, tratamento de sessões e retorno de JSON. NENHUMA questão envolve a manipulação do frontend, HTML, CSS ou JavaScript.

## Como Rodar o Projeto

1. Importe o arquivo `api/database.sql` no MySQL
2. Configure o arquivo `api/connection.php` com suas credenciais:
   - Host: `localhost` ou `mysql` (se usando Docker do repositório raiz)
   - Usuário: `root`
   - Senha: sua senha do MySQL
   - Porta: `3306`
3. Acesse `http://localhost/challenges/coworking-spaces/public/login/` no navegador

## Questões

- **Questão 1**: [Login de Usuários](api/auth/README-login.md)
- **Questão 2**: [Listagem de Reservas com Filtros](api/bookings/README-list.md)
- **Questão 3**: [Criar Nova Reserva](api/bookings/README-add.md)
- **Questão 4**: [Cancelar Reserva](api/bookings/README-cancel.md)

Cada questão possui um arquivo README na pasta correspondente da API com as instruções detalhadas sobre o que deve ser implementado.

Você deve implementar os arquivos PHP dentro das pastas `api/auth/` e `api/bookings/`.

## Estrutura do Banco de Dados

O banco possui três tabelas principais:

### Tabela `users`
- `id`: Identificador único do usuário
- `name`: Nome completo do usuário
- `email`: Email do usuário (usado para login)
- `password`: Senha do usuário (armazenada com hash bcrypt)
- `company`: Empresa/organização do usuário
- `created_at`: Data de cadastro

**Nota:** As senhas de teste estão hasheadas com bcrypt. Use `password_verify()` para validação.

### Tabela `rooms`
- `id`: Identificador único da sala
- `name`: Nome da sala
- `capacity`: Capacidade máxima de pessoas
- `type`: Tipo da sala (`meeting`, `private_office`, `event_space`, `phone_booth`)
- `hourly_rate`: Valor por hora da sala (em R$)
- `floor`: Andar onde a sala está localizada
- `amenities`: Comodidades disponíveis na sala
- `created_at`: Data de cadastro

### Tabela `bookings`
- `id`: Identificador único da reserva
- `user_id`: ID do usuário que fez a reserva
- `room_id`: ID da sala reservada
- `booking_date`: Data da reserva
- `start_time`: Horário de início
- `end_time`: Horário de término
- `duration_hours`: Duração em horas (calculado)
- `total_price`: Preço total da reserva (calculado)
- `status`: Status da reserva (`confirmed`, `cancelled`, `completed`)
- `notes`: Observações adicionais sobre a reserva
- `created_at`: Data de criação do registro

## Padrão de Resposta das APIs

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

## Sessões

O sistema utiliza sessões PHP para manter o usuário logado. 

Certifique-se de iniciar a sessão com `session_start()` no início de cada script que manipula autenticação ou dados do usuário.

Após o login bem-sucedido, armazene o `id` e o `name` do usuário na sessão:
```php
$_SESSION['user_id'] = $user['id'];
$_SESSION['user_name'] = $user['name'];
```

## Usuários de Teste

Todos os usuários possuem a mesma senha: **cowork2025**

- marina@startup.tech (StartupTech)
- roberto@freelancer.com (Freelancer)
- julia@design.studio (Design Studio)
- carlos@consultant.io (Consultant IO)

## Estrutura de Arquivos

```
public/
├── README.md                           # Este arquivo
├── api/
│   ├── connection.php                  # ⚠️ Configure suas credenciais
│   ├── database.sql                    # ✅ Importe no MySQL
│   ├── auth/
│   │   ├── login.php                   # ⚠️ VOCÊ DEVE IMPLEMENTAR (Questão 1)
│   │   ├── logout.php                  # ✅ Já implementado
│   │   └── README-login.md             # Documentação Questão 1
│   └── bookings/
│       ├── list.php                    # ⚠️ VOCÊ DEVE IMPLEMENTAR (Questão 2)
│       ├── add.php                     # ⚠️ VOCÊ DEVE IMPLEMENTAR (Questão 3)
│       ├── cancel.php                  # ⚠️ VOCÊ DEVE IMPLEMENTAR (Questão 4)
│       ├── README-list.md              # Documentação Questão 2
│       ├── README-add.md               # Documentação Questão 3
│       └── README-cancel.md            # Documentação Questão 4
├── components/
│   └── toast.js                        # Sistema de notificações
├── css/
│   ├── index.css                       # Estilos globais
│   └── toast.css                       # Estilos do toast
├── login/
│   └── index.html                      # Página de login
├── rooms/
│   └── index.html                      # Listagem de salas disponíveis
├── add-booking/
│   └── index.html                      # Formulário de nova reserva
└── my-bookings/
    └── index.html                      # Minhas reservas
```

## Conceitos Avaliados

Este exercício avalia os seguintes conceitos:

1. **Autenticação com sessões**: Login seguro usando `password_verify()` e `session_start()`
2. **Consultas com JOIN**: Relacionamento entre múltiplas tabelas
3. **Filtros dinâmicos**: Construção de queries com parâmetros opcionais via `$_GET`
4. **Validações no servidor**: Validar dados antes de inserir no banco
5. **Cálculos automáticos**: Calcular duração e preço total baseado em dados relacionados
6. **Prepared statements**: Uso correto do PDO para evitar SQL injection
7. **Retorno estruturado**: Sempre retornar JSON padronizado
8. **Lógica de negócio**: Implementar regras específicas (ex: não permitir cancelar reservas concluídas)

## Dicas Importantes

- Sempre valide os dados recebidos via `$_POST` e `$_GET`
- Use prepared statements para todas as queries SQL
- Verifique se o usuário está autenticado antes de permitir operações
- Calcule `duration_hours` e `total_price` no servidor, não confie no cliente
- Para calcular a diferença entre horários, use funções do MySQL como `TIMESTAMPDIFF()`
- Retorne mensagens claras e específicas em português
- Teste cada endpoint individualmente antes de passar para o próximo

## Observações Importantes

- **Não modifique o frontend**: HTML, CSS e JavaScript já estão prontos e funcionando
- **Foque apenas nos arquivos PHP**: Sua tarefa é implementar os 4 endpoints da API
- **Siga o padrão de resposta**: O frontend espera o formato JSON especificado em cada questão
- **Teste cada endpoint**: Use o navegador para testar se suas implementações funcionam corretamente
- **Leia os READMEs**: Cada questão tem instruções detalhadas em seu próprio README

## Como Começar

1. Importe o `database.sql` no MySQL
2. Configure o `connection.php` com suas credenciais
3. Leia o README da Questão 1 (`api/auth/README-login.md`)
4. Implemente o arquivo `api/auth/login.php`
5. Teste fazendo login no sistema
6. Continue com as próximas questões na ordem

Boa sorte! 🚀

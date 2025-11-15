# Questão 3 - Abrir Chamado de Manutenção

## Objetivo
Permitir que o usuário crie um novo chamado informando o problema detectado na estufa.

## Arquivo
`/api/requests/add.php`

## Dados Recebidos (POST)
- `greenhouse_name`: Nome da estufa
- `zone_code`: Código da zona
- `issue_type`: Tipo de problema (`sensor`, `irrigation`, `structure`, `power`, `climate`)
- `priority`: Prioridade (`low`, `normal`, `high`)
- `description`: Descrição detalhada
- `desired_date`: Data desejada (formato YYYY-MM-DD)

## Regras
1. **Sessão**: Apenas usuários logados.
2. **Validação**:
   - Todos os campos são obrigatórios.
   - `issue_type` deve estar entre: `sensor`, `irrigation`, `structure`, `power`, `climate`.
   - `priority` deve ser `low`, `normal` ou `high`.
   - `desired_date` não pode ser uma data passada.
3. **Insert**:
   - `status` sempre inicia como `open`.
   - `scheduled_date` começa como `NULL`.
   - Relacione o chamado ao `user_id` da sessão.
4. **Retorno**:
   - Sucesso:
     ```json
     {
       "message": "Chamado registrado",
       "data": { "id": 7 }
     }
     ```
   - Erro:
     ```json
     {
       "error": true,
       "message": "Mensagem do erro"
     }
     ```

## Dicas
- Use `DateTime` para validar datas.
- Normaliza `greenhouse_name` com `trim()` antes de salvar.

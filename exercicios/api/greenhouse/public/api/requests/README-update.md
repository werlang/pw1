# Questão 4 - Agendamento e Finalização

## Objetivo
Atualizar o status de um chamado garantindo que apenas o criador possa avançar as etapas e que as transições sejam válidas.

## Arquivo
`/api/requests/update.php`

## Dados Recebidos (POST)
- `id`: ID do chamado
- `status`: Novo status (`scheduled` ou `done`)
- `scheduled_date`: Data agendada (opcional, obrigatório se status = scheduled)

## Fluxo
1. **Sessão**: Verifique o usuário logado.
2. **Busca inicial**: Carregue o chamado pelo `id` informado e garanta que `user_id` pertence ao usuário logado. Caso contrário retorne erro.
3. **Transições permitidas**:
   - `open` → `scheduled` ou `done`
   - `scheduled` → `done`
   - Nenhuma outra transição é aceita (não é possível voltar para `open`).
4. **Validações**:
   - `status` precisa ser um dos valores válidos.
   - Quando `status = scheduled`, `scheduled_date` é obrigatório e deve ser futura ou igual ao dia atual.
   - Quando `status = done`, permita `scheduled_date` opcional porém, se informado, também deve ser data válida.
5. **Atualização**:
   - Faça UPDATE apenas dos campos enviados (`status`, `scheduled_date`).
   - Atualize também `desired_date`? não.
6. **Retorno**:
   ```json
   {
     "message": "Chamado atualizado",
     "data": {
       "id": 4,
       "status": "scheduled",
       "scheduled_date": "2025-06-20"
     }
   }
   ```

## Dicas
- Use transação simples (BEGIN/COMMIT) se quiser garantir consistência.
- Centralize a lógica de validação em funções auxiliares para facilitar testes.

# Questão 2 - Listagem Inteligente de Chamados

## Objetivo
Retornar os chamados de manutenção das estufas GreenPulse aplicando filtros dinâmicos e trazendo métricas para o dashboard.

## Arquivo
`/api/requests/list.php`

## Parâmetros (GET)
- `id` (opcional): quando informado retorna somente o chamado específico (também verifica o proprietário)
- `status` (opcional): `open`, `scheduled`, `done`
- `priority` (opcional): `low`, `normal`, `high`
- `search` (opcional): trecho para buscar em `greenhouse_name` **ou** `zone_code`
- `mine` (opcional): quando igual a `1`, retorna apenas chamados criados pelo usuário logado

## Requisitos
1. **Sessão obrigatória**: Verifique `$_SESSION["user_id"]`.
2. **Query Base**:
   ```sql
   SELECT r.*, u.name AS owner_name
   FROM maintenance_requests r
   INNER JOIN users u ON u.id = r.user_id
   WHERE 1=1
   ```
3. **Filtros Dinâmicos**:
   - Adicione condições apenas quando o parâmetro existir.
   - `search` deve usar `LIKE` e ser aplicado em `greenhouse_name` **ou** `zone_code`.
   - `mine=1` deve adicionar `AND r.user_id = :user_id`.
4. **Ordenação**: Resultados mais recentes primeiro (`ORDER BY r.created_at DESC`).
5. **Resumo**: Após buscar os registros, execute outra consulta que conte quantos chamados há em cada `status`. Retorne junto no JSON.
6. **Retorno**:
   ```json
   {
     "data": {
       "requests": [ ... ],
       "summary": {
         "open": 3,
         "scheduled": 2,
         "done": 5
       }
     }
   }
   ```

## Dicas
- Construa arrays `$conditions` e `$params` para montar a query incrementalmente.
- `LIKE` deve usar `"%" . $search . "%"`.
- Use `PDO::prepare` para evitar SQL Injection.

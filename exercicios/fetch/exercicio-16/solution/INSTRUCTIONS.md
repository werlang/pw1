# Sistema de Notas com Operações em Lote

## Objetivo

Gerenciar notas de estudantes com seleção múltipla e cálculo de médias.

## Funcionalidades a Implementar

### 1. Carregar Estudantes

- API: `/api/student/list.php`
- Calcular média de cada aluno: `(grade1 + grade2 + grade3) / 3`
- Adicionar propriedades `selected` e `average` a cada estudante

### 2. Renderizar Lista em Formato Tabela

- Cabeçalho com checkbox "Selecionar Todos"
- Linha para cada estudante com:
  - Checkbox individual
  - Nome, 3 notas, média
- Aplicar classe `approved` se média >= 7, senão `failed`

### 3. Seleção Individual e Total

- Checkbox individual atualiza `student.selected`
- Checkbox "Selecionar Todos" marca/desmarca todos
- Sincronizar estado: se todos marcados, marcar "Selecionar Todos"
- Atualizar botão de calcular após cada mudança

### 4. Calcular Média dos Selecionados

- Botão desabilitado se nenhum selecionado
- Mostrar quantidade no texto do botão
- Calcular média das médias dos selecionados
- Exibir resultado em #averageDisplay
- Mostrar toast com resultado

## Dicas

- Use `students.every(s => s.selected)` para verificar se todos estão selecionados
- Use `students.filter(s => s.selected)` para obter selecionados
- Formate números com `.toFixed(2)`
- Classes `approved`/`failed` já têm estilos CSS

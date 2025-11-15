# Questão Bônus - Remover Item

## Objetivo

Implementar o endpoint que remove um item do banco de dados.

## Arquivo a Implementar

`delete.php` (nesta pasta: `/api/items/`)

## Contexto

Esta é uma questão bônus que pode adicionar pontos extras à nota. A funcionalidade permite que usuários removam itens que criaram.

### Parâmetros (via POST)

- `id` (obrigatório): ID do item a ser removido

## Implementação

### 1. Inicia a Sessão e Verifica Autenticação

### 2. Inclui a Conexão

### 3. Valida o ID

Verifique se o ID foi enviado.

### 4. Verifica Permissão

O usuário só pode remover itens que ele mesmo criou.

### 5. Remove o Item

Execute DELETE no banco.

### 6. Retorna a Resposta

## Estrutura da Resposta

### Sucesso
```json
{
    "message": "Item removido com sucesso"
}
```

### Erros Possíveis

**Usuário não autenticado:**
```json
{
    "error": true,
    "message": "Usuário não autenticado"
}
```

**ID não informado:**
```json
{
    "error": true,
    "message": "ID do item é obrigatório"
}
```

**Item não encontrado:**
```json
{
    "error": true,
    "message": "Item não encontrado"
}
```

**Sem permissão:**
```json
{
    "error": true,
    "message": "Você não tem permissão para remover este item"
}
```

## Como Testar

1. Faça login no sistema
2. Na listagem, clique no botão "Remover" em um item seu
3. Confirme a remoção
4. Verifique se o item foi removido da listagem
5. Tente remover um item de outro usuário (não deve permitir)

## Checklist

- [ ] `session_start()` no início
- [ ] Verificar autenticação
- [ ] Incluir `connection.php`
- [ ] Validar ID
- [ ] Verificar se item existe
- [ ] Verificar se usuário é o dono
- [ ] Executar DELETE
- [ ] Retornar JSON apropriado
- [ ] Testar remoção
- [ ] Testar tentativa de remover item de outro usuário

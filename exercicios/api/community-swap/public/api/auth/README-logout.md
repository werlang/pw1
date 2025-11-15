# Logout de Usuários

## Objetivo

Implementar o endpoint que encerra a sessão do usuário.

## Arquivo a Implementar

`logout.php` (nesta pasta: `/api/auth/`)

## Implementação

### 1. Inicia a Sessão

Use `session_start()` no início do arquivo.

### 2. Destrói a Sessão

Use as funções apropriadas para encerrar a sessão do usuário:
- `session_unset()` - Remove todas as variáveis de sessão
- `session_destroy()` - Destrói a sessão

### 3. Retorna a Resposta

Retorne JSON confirmando o logout.

## Estrutura da Resposta

### Sucesso
```json
{
    "message": "Logout realizado com sucesso"
}
```

## Como Testar

1. Faça login no sistema
2. Na página principal, clique no botão "Sair"
3. Você será redirecionado para a página de login
4. Tente acessar páginas protegidas - você não deve conseguir

## Conceitos Importantes

### Destruir Sessão
```php
session_start();
session_unset();
session_destroy();
```

## Checklist

- [ ] `session_start()` no início do arquivo
- [ ] Usar `session_unset()` e `session_destroy()`
- [ ] Retornar JSON com mensagem de sucesso
- [ ] Testar logout e verificar redirecionamento

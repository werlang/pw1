# Exercício 4: Editar Perfil de Usuário

## Objetivo

Praticar requisições HTTP **PUT** para atualizar dados existentes.

## Tema

Sistema de Perfil de Usuário

## Descrição

Você deve implementar a funcionalidade de editar informações de perfil de um usuário. O sistema carrega os dados atuais do usuário e permite editar nome, email e bio.

## Tarefa do Aluno

Complete a função no arquivo `script.js` para:
1. Carregar os dados do usuário da API
2. Preencher o formulário com os dados carregados
3. Enviar requisição PUT quando o formulário for submetido

### API Endpoints

**Carregar Dados do Usuário:**
- **URL**: `/api/user/get.php?id=1`
- **Método**: `GET`
- **Resposta**:
```json
{
    "user": {
        "id": 1,
        "name": "João Silva",
        "email": "joao@email.com",
        "bio": "Desenvolvedor full-stack"
    }
}
```

**Atualizar Perfil:**
- **URL**: `/api/user/update.php`
- **Método**: `PUT`
- **Body** (JSON):
```json
{
    "id": 1,
    "name": "João Silva",
    "email": "joao@email.com",
    "bio": "Desenvolvedor full-stack sênior"
}
```
- **Resposta**:
```json
{
    "message": "Perfil atualizado com sucesso"
}
```

## O Que Você Vai Aprender

- Como fazer requisições PUT
- Como enviar dados JSON (em vez de FormData)
- Como preencher formulários com dados da API
- Como atualizar recursos existentes

## Instruções

1. Crie uma função `loadUser()` que busca dados do usuário
2. Preencha os campos do formulário com os dados recebidos
3. Ao submeter o formulário:
   - Crie um objeto JSON com os dados
   - Faça requisição PUT enviando JSON
   - Use `JSON.stringify()` para converter o objeto
   - Defina header `Content-Type: application/json`

## Dicas

- Para PUT com JSON:
```javascript
fetch(url, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
})
```
- Preencher inputs: `input.value = user.name`

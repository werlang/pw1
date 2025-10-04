# Exercício 1: Adicionar Filme à Coleção

## Objetivo

Praticar requisições HTTP **POST** enviando dados de um formulário para uma API.

## Tema

Sistema de Coleção de Filmes

## Descrição

Você deve implementar a funcionalidade de adicionar filmes a uma coleção pessoal. O sistema possui um formulário onde o usuário pode inserir:
- Título do filme
- Diretor
- Ano de lançamento
- Gênero

## Tarefa do Aluno

Complete a função no arquivo `script.js` para enviar os dados do formulário para a API quando o botão "Adicionar Filme" for clicado.

### API Endpoint

- **URL**: `/api/movie/add.php`
- **Método**: `POST`
- **Dados**: FormData com os campos do formulário

### Resposta da API

**Sucesso:**
```json
{
    "message": "Filme adicionado com sucesso!",
    "movie": {
        "id": 1,
        "title": "Matrix",
        "director": "Wachowski",
        "year": 1999,
        "genre": "Ficção Científica"
    }
}
```

**Erro:**
```json
{
    "error": true,
    "message": "Preencha todos os campos obrigatórios"
}
```

## O Que Você Vai Aprender

- Como capturar o evento de submit de um formulário
- Como prevenir o comportamento padrão do formulário
- Como criar um objeto FormData
- Como fazer uma requisição POST usando fetch
- Como tratar respostas JSON da API
- Como exibir mensagens de feedback ao usuário

## Instruções

1. Abra o arquivo `script.js`
2. Encontre o comentário `// TODO: Implemente aqui`
3. Complete o código para:
   - Prevenir o comportamento padrão do formulário
   - Criar um FormData com os dados do formulário
   - Fazer a requisição POST para a API
   - Tratar a resposta (sucesso ou erro)
   - Exibir mensagem usando a função `showToast()`
   - Limpar o formulário em caso de sucesso

## Dicas

- Use `event.preventDefault()` para evitar recarregar a página
- Use `new FormData(form)` para capturar os dados do formulário
- Use `await fetch(url, { method: 'POST', body: formData })`
- Verifique se `data.error` é true para identificar erros
- Use `form.reset()` para limpar os campos do formulário

# Sistema de Gerenciamento de Estoque de Produtos

Você deve implementar um sistema para gerenciar produtos em um estoque. O sistema deve permitir o cadastro de produtos com validação de quantidade e preço.

Está disponível uma API para interagir com o banco de dados, localizada na pasta `api/product`.

O dump do banco de dados está disponível no arquivo `api/database.sql`.

Todas as questões envolvem a manipulação do DOM, a criação de requisições HTTP usando `fetch` e o tratamento de respostas JSON. NENHUMA questão envolve a manipulação do backend, php ou SQL.

## Objetivo da Prática

Esta prática foca no **CREATE (Criar)** de um sistema CRUD, enfatizando:
- Validação de formulários
- Envio de dados via FormData
- Tratamento de respostas de API
- Feedback visual ao usuário

## Instruções

Implemente a funcionalidade de adicionar produtos ao estoque seguindo as instruções detalhadas no arquivo [README.md](README.md) desta pasta.

O sistema já possui:
- ✅ HTML estruturado com formulário
- ✅ CSS com Material Design
- ✅ API backend completa
- ✅ Componente de toast para notificações

Você deve implementar:
- ❌ Captura de evento de submit do formulário
- ❌ Envio de dados para a API
- ❌ Tratamento de respostas de sucesso/erro
- ❌ Limpeza do formulário após sucesso

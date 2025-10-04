# Sistema de Avaliação de Filmes

Você deve implementar um sistema para avaliar e editar avaliações de filmes. O sistema foca na operação de atualização (UPDATE) com sistema de estrelas e edição de comentários.

Está disponível uma API para interagir com o banco de dados, localizada na pasta `api/movie`.

O dump do banco de dados está disponível no arquivo `api/database.sql`.

Todas as questões envolvem a manipulação do DOM, a criação de requisições HTTP usando `fetch` e o tratamento de respostas JSON. NENHUMA questão envolve a manipulação do backend, php ou SQL.

## Objetivo da Prática

Esta prática foca no **UPDATE (Atualizar)** de um sistema CRUD, enfatizando:
- Edição de dados existentes
- Formulários pré-preenchidos
- Atualização parcial de informações
- Interface de avaliação (estrelas)

## Instruções

Implemente a funcionalidade de listar filmes e editar suas avaliações seguindo as instruções detalhadas no arquivo [INSTRUCTIONS.md](INSTRUCTIONS.md) desta pasta.

O sistema já possui:
- ✅ HTML estruturado com lista de filmes
- ✅ CSS com Material Design  
- ✅ API backend completa
- ✅ Componente de toast para notificações
- ✅ Modal para edição

Você deve implementar:
- ❌ Carregar lista de filmes avaliados
- ❌ Abrir modal de edição com dados do filme
- ❌ Atualizar avaliação (nota e comentário)
- ❌ Atualizar interface após edição

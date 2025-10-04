# Sistema de Gerenciamento de Contatos

Você deve implementar um sistema para visualizar e buscar contatos. O sistema foca na operação de leitura (READ) com funcionalidade de busca e filtro.

Está disponível uma API para interagir com o banco de dados, localizada na pasta `api/contact`.

O dump do banco de dados está disponível no arquivo `api/database.sql`.

Todas as questões envolvem a manipulação do DOM, a criação de requisições HTTP usando `fetch` e o tratamento de respostas JSON. NENHUMA questão envolve a manipulação do backend, php ou SQL.

## Objetivo da Prática

Esta prática foca na **READ (Leitura)** de um sistema CRUD, enfatizando:
- Busca e filtro de dados
- Renderização dinâmica de listas
- Manipulação de eventos de input
- Atualização da interface em tempo real

## Instruções

Implemente a funcionalidade de listar e buscar contatos seguindo as instruções detalhadas no arquivo [INSTRUCTIONS.md](INSTRUCTIONS.md) desta pasta.

O sistema já possui:
- ✅ HTML estruturado com campo de busca
- ✅ CSS com Material Design
- ✅ API backend completa
- ✅ Componente de toast para notificações

Você deve implementar:
- ❌ Carregar lista de contatos da API
- ❌ Renderizar contatos em cards
- ❌ Implementar busca em tempo real
- ❌ Filtrar contatos por categoria

# Exercício Prático: Jogo de Cliques com Sistema de Melhorias

---

## Objetivo da Atividade

Nesta etapa avançada, o objetivo é expandir a lógica do projeto anterior, implementando uma economia virtual e um gerenciamento de estado mais complexo, simulando um sistema de "upgrade" comum em softwares modernos.

## Especificações Técnicas do Sistema

O aplicativo deve ser estruturado com base na mecânica de progressão e coleta, cumprindo os seguintes requisitos:

* **Estrutura de Controles:** A interface da aplicação deve ser construída contendo dois elementos de botão independentes. Esta base estrutural é semelhante à exigida na atividade anterior.
* **Mecânica de Coleta (Farm):** O botão principal será o seu gerador de recursos. Sempre que o usuário disparar o evento de clique neste elemento, um valor específico deve ser adicionado ao montante da pontuação.
* **Sistema de Progressão (Upgrade):** O segundo botão atuará como uma "loja" para aprimorar o sistema. A lógica associada a este botão deve executar três passos simultâneas no estado do jogo:
    1. **Cobrança:** O valor exigido pela melhoria deve ser imediatamente deduzido do saldo total da pontuação do jogador.
    2. **Aprimoramento:** O ganho produtivo gerado pelo primeiro botão deve ser ampliado (+1), rendendo mais pontos a cada clique futuro.
    3. **Inflação:** O preço para adquirir uma nova melhoria através deste botão deve ser reajustado para um valor mais alto (por exemplo, 20%).
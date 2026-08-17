# Exercício: Mapa de Assentos da Mostra

## Objetivo

Durante a Mostra Tecnológica do campus, o auditório principal será utilizado para palestras e apresentações de projetos. Para organizar a entrada dos participantes, a comissão precisa de uma página em PHP que receba o mapa de ocupação da sala e desenhe uma grade visual dos lugares, acompanhada de um resumo com estatísticas e alertas.

O desafio central deste exercício é trabalhar com **posicionamento bidimensional** (matriz de fileiras e cadeiras), e não com uma listagem linear de cadastros.

## Solução completa

A resposta completa está em [index.php](./index.php) e [style.css](./style.css). Tente resolver o enunciado antes de consultá-la. Depois, compare sua solução com esses arquivos.

## Dados iniciais

Crie um array multidimensional no início do script PHP representando as fileiras do auditório. Cada chave do array principal representa a letra da fileira (`"A"`, `"B"`, `"C"`, `"D"`), e o valor correspondente é uma lista indexada com o estado de cada assento (`"livre"`, `"ocupado"` ou `"reservado"`):

```php
$mapaAuditorio = [
    "A" => ["ocupado", "ocupado", "livre", "livre", "ocupado", "livre"],
    "B" => ["reservado", "ocupado", "ocupado", "livre", "reservado", "livre"],
    "C" => ["ocupado", "ocupado", "ocupado", "ocupado", "ocupado", "ocupado"],
    "D" => ["livre", "livre", "livre", "ocupado", "ocupado", "reservado"]
];
```

## O que você deve construir

1. **Grade visual da sala:**
   - Percorra o array com laços `foreach` aninhados (o primeiro para as fileiras e o segundo para os assentos de cada fileira).
   - Identifique cada cadeira combinando a letra da fileira e o número da posição (índice + 1), por exemplo: `A-1`, `A-2`, ..., `D-6`.
   - Aplique uma classe CSS em cada elemento visual conforme seu estado (`assento-livre`, `assento-ocupado` ou `assento-reservado`).

2. **Painel de estatísticas:**
   - Conte a quantidade total de assentos, além do total individual de lugares livres, ocupados e reservados.
   - Calcule a taxa de ocupação do auditório (porcentagem de lugares ocupados em relação ao total de assentos).

3. **Localizador de primeiro lugar livre:**
   - Implemente uma busca que percorra as fileiras em ordem e identifique o código do **primeiro assento livre** disponível (ex.: `A-3`), interrompendo a busca logo após encontrá-lo. Se não houver nenhum assento vago, informe "Lotado".

4. **Alerta de fileira esgotada:**
   - Verifique se alguma fileira atingiu 100% de ocupação (nenhum assento `"livre"`).
   - Se houver fileiras sem vagas, exiba uma mensagem de alerta destacando as letras dessas fileiras (por exemplo: `"Atenção: Fileira C completamente cheia!"`).

## Conceitos trabalhados

- Arrays multidimensionais (array associativo contendo arrays indexados).
- Laços `foreach` aninhados para navegação em matrizes.
- Contadores e acumuladores de estado.
- Busca sequencial com interrupção (`break` ou sinalizadores).
- Geração de HTML estruturado e classes dinâmicas a partir de dados PHP.

## Critérios de verificação

- Ao alterar ou adicionar uma nova fileira `"E"` no array `$mapaAuditorio`, a grade e as contagens devem se ajustar automaticamente sem alteração manual no HTML.
- Com o conjunto de dados inicial fornecido:
  - **Total de assentos:** 24.
  - **Ocupados:** 13 | **Reservados:** 3 | **Livres:** 8.
  - **Taxa de ocupação:** 54,2% (considerando apenas ocupados) ou 66,7% (considerando ocupados + reservados).
  - **Primeiro assento livre:** `A-3`.
  - **Alerta de fileira esgotada:** Fileira `C`.

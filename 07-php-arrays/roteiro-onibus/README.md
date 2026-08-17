# Exercício: Editor de Roteiro do Ônibus

## Objetivo

O setor de transporte escolar gerencia o itinerário diário dos ônibus que conduzem os estudantes até o campus do IFSul. Como a linha segue um trajeto sequencial, a ordem e os índices numéricos do array representam a ordem cronológica em que o ônibus atende aos passageiros.

O objetivo deste exercício é aplicar operações de inserção, remoção por busca, eliminação de duplicidades e acesso a elementos vizinhos (anterior e posterior) em uma sequência onde **a ordem dos dados tem significado real**.

## Solução completa

A resposta completa está em [index.php](./index.php) e [style.css](./style.css). Tente resolver o enunciado antes de consultá-la. Depois, compare sua solução com esses arquivos.

## Dados iniciais

Defina o array indexado contendo as paradas do itinerário original, incluindo uma duplicação acidental para teste:

```php
$roteiroOriginal = [
    "Terminal Rodoviário",
    "Hospital Regional",
    "Praça Central",
    "Bairro Industrial",
    "Praça Central",
    "Campus IFSul"
];
```

## O que você deve construir

1. **Alterações sequenciais no roteiro:**
   - Trabalhe em uma cópia do roteiro original (`$roteiro = $roteiroOriginal;`) para preservar o histórico.
   - **Inserção no início:** adicione `"Garagem da Empresa"` como a primeira parada da linha (utilizando `array_unshift()`).
   - **Inserção intermediária:** localize a posição de `"Hospital Regional"` e insira `"Biblioteca Municipal"` logo após ela (utilizando `array_splice()`).
   - **Remoção de parada cancelada:** localize o índice da parada `"Bairro Industrial"` usando `array_search("Bairro Industrial", $roteiro, true)` e remova-a da lista com segurança.
   - **Sanitização de duplicados:** utilize `array_unique()` para eliminar eventuais paradas repetidas (como a segunda `"Praça Central"`) e aplique `array_values()` para garantir que os índices numéricos fiquem perfeitamente contínuos de `0` a `N-1`.

2. **Exibição comparativa:**
   - Apresente duas listas numeradas lado a lado ou em sequência: o **Itinerário Original** e o **Itinerário Revisado**.

3. **Painel de conexões e vizinhança:**
   - Percorra o itinerário final revisado com um laço `for` e exiba um cartão para cada parada intermediária (todas exceto a primeira e a última).
   - Para cada ponto intermediário na posição `$i`, informe:
     - **Ponto atual:** `$roteiro[$i]`
     - **Ponto anterior (origem do trecho):** `$roteiro[$i - 1]`
     - **Próximo ponto (destino do trecho):** `$roteiro[$i + 1]`

4. **Cálculo de trechos:**
   - Calcule e exiba a quantidade total de trechos/viagens entre paradas (`count($roteiro) - 1`).

## Conceitos trabalhados

- Arrays indexados e significado posicional.
- Adição no início com `array_unshift()`.
- Inserção e remoção pontual com `array_splice()`.
- Busca estrita com `array_search()` (`!== false`).
- Remoção de repetições com `array_unique()` e reindexação com `array_values()`.
- Navegação posicional por índices vizinhos (`$i - 1` e `$i + 1`).

## Critérios de verificação

- Com as operações solicitadas, a sequência final do roteiro deve ser:
  1. `0`: Garagem da Empresa *(Início da linha)*
  2. `1`: Terminal Rodoviário
  3. `2`: Hospital Regional
  4. `3`: Biblioteca Municipal
  5. `4`: Praça Central
  6. `5`: Campus IFSul *(Fim da linha)*
- **Total de paradas:** 6 | **Total de trechos entre paradas:** 5.
- Para a parada `"Hospital Regional"` (índice 2), o ponto anterior deve ser `"Terminal Rodoviário"` e o próximo `"Biblioteca Municipal"`.
- A busca por elementos na posição zero (`0`) deve ser tratada com comparação estrita (`!== false`), evitando que o índice zero seja interpretado incorretamente como falso.

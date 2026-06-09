# Exercício Prático: Mapa de Sala

## Objetivo da Atividade

O objetivo desta prática é montar um mapa de assentos persistente. Em vez de cadastrar uma lista comum, o estudante precisa controlar uma grade de lugares e salvar um objeto em que cada chave representa um assento.

## Conceitos trabalhados

- objeto usado como mapa de dados;
- `localStorage`;
- geração de grade com loops;
- chave composta, como `A-1`;
- ocupação e liberação de assentos;
- renderização condicional por estado.

## Especificações Técnicas do Sistema

O aplicativo deve atender aos seguintes pontos:

- a sala possui 4 fileiras (`A`, `B`, `C`, `D`) e 5 cadeiras por fileira;
- o usuário informa o nome do estudante e escolhe um assento;
- o mapa deve ser salvo na chave `mapa-sala`;
- o formato salvo deve ser um objeto, não um array;
- cada propriedade do objeto deve usar a chave do assento, por exemplo:

```json
{
    "A-1": "Marina",
    "B-3": "Lucas"
}
```

- assentos ocupados devem aparecer visualmente diferentes;
- não deve ser possível ocupar um assento já preenchido;
- deve existir uma ação para liberar um assento ocupado;
- o painel deve mostrar quantos assentos estão livres e ocupados.

## O que você deve fazer

Edite somente o arquivo `script.js`.

### Parte 1 - Implementar `loadSeatMap()` e `saveSeatMap()`

Leia e salve o objeto do mapa usando `localStorage`.

### Parte 2 - Implementar `getSelectedSeatKey()`

Monte a chave do assento a partir da fileira e da cadeira selecionadas.

### Parte 3 - Implementar `assignSeat()`

Valide o nome, valide o assento, impeça ocupação duplicada e salve o mapa.

### Parte 4 - Implementar `releaseSeat(seatKey)`

Remova somente a propriedade do assento informado e salve novamente.

### Parte 5 - Implementar `renderSeatMap()`

Gere a grade completa de assentos a partir das fileiras e cadeiras.

## Resumo do fluxo

1. O usuário seleciona um assento.
2. O sistema monta uma chave como `C-4`.
3. O nome fica associado a essa chave no objeto salvo.
4. Ao recarregar a página, a grade volta com os mesmos lugares ocupados.

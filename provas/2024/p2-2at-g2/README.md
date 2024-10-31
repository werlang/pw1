# PWI - Prova 02

## Introdução

Nesta prova, você deverá implementar um sistema de cadastro de veículos e visualização das vagas de estacionamento conforme a modalidade da vaga escolhida pelo cliente. As modalidades de vaga disponíveis são: Por Hora, Diária, ou Mensalista.

## Questão 1

**(Peso 2)** Nos arquivos `car-register.js` e `car-register.html`, implemente o cadastro do veículo com os seguintes campos:
- Nome do Cliente
- CPF
- Modelo do Carro
- Placa do Carro
- Modalidade da Vaga
  - Por Hora
  - Diária
  - Mensalista

Os veículos devem ser inseridos nas listas de objetos correspondentes conforme a modalidade da vaga (Por Hora, Diária ou Mensalista). As três listas devem ser salvas no `localStorage` utilizando as chaves `hourlyList`, `dailyList` e `monthlyList`.

## Questão 2

**(Peso 2)** Nos arquivos `car-view-spots.html` e `car-view-spots.js`, implemente a visualização dos veículos nas vagas.
As informações devem ser recuperadas do `localStorage` (`hourlyList`, `dailyList` e `monthlyList`) e exibidas na tela, cada veículo ocupará uma `li`.

```html
<li>
   <span>João Barcelos - Honda Civic</span>
   <button class="btn-return">Retornar Carro</button>
   <button class="btn-edit">Editar</button>
</li>
```

Implemente a funcionalidade dos botões “Retornar Carro” e “Editar”.

-	**(Peso 2)** O botão “Retornar Carro” ao ser pressionado deve retirar o veículo da vaga, da lista de objetos correspondente, e a lista deve ser atualizada (lembrando também de atualizar o armazenamento local).
-	**(Peso 3)** O botão “Editar” ao ser pressionado deve ativar a `modal` com a possibilidade de alterar a modalidade da vaga do veículo. Quando a modal se abre, o nome do cliente e o modelo do carro devem ser exibidos nos respectivos campos e o select deve estar selecionado com a modalidade atual da vaga. Ao clicar no botão “Salvar”, a modalidade da vaga deve ser alterada e a lista de veículos deve ser atualizada. A classe CSS `active` deve ser adicionada ao `modal` para que ele seja exibido.

### Dicas de abordagens para resolver o problema

1.	**Abordagem 1**: Adicionar um `eventListener` para cada botão de cada `li` da lista de veículos no momento da criação de cada `li`.
2.	**Abordagem 2**: Adicionar um `eventListener` na tag `main` e verificar qual botão foi clicado através do `event.target`, que é passado como argumento para a função de callback do `eventListener`.
3.	**Abordagem 3**: Quando criada a lista de veículos, adicionar um `id` para cada `li` com um valor único (ex.: `hourly-id-1`, `daily-id-1`, `monthly-id-1`). Após, selecionar todos os botões de cada `li` e adicionar um `eventListener` para cada um deles, verificando qual botão foi clicado através do id do `li` pai do botão clicado.
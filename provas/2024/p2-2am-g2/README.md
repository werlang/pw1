# PWI - Prova 02

## Introdução

Nesta prova você deverá implementar um sistema de cadastro de pacientes e visualização de filas de atendimento conforme a classificação da gravidade dos sintomas do paciente, sendo que os pacientes serão classificados em Verde, Amerelo ou Vermelho.

## Questão 1

**(Peso 2)** Nos arquivos `patient-register-script.js` e `patient-register.html`, implemente o cadastro do paciente com os seguintes campos
- Nome
- CPF
- Sintomas
- Classificação
  - Verde
  - Amarelo
  - Vermelho

Os pacientes devem ser inseridos nas listas de objetos correspondentes conforme a Classificação (Verde, Amarelo ou Vermelho). As três listas devem ser salvas na `localStorage` com usando as chaves `greenList`, `yellowList` e `redList`.

## Questão 2

**(Peso 2)** Nos arquivos `patient-view-queues.html` e `patient-view-queues.js` implemente a visualização dos pacientes nas filas.
As informações devem ser recuperadas da `localStorage` (`greenList`, `yellowList` e `redList`) e exibidas na tela, cada paciene ocupará uma `li`.

```` HTML
<li>
   <span>João Barcelos</span>
   <button class="btn-attend">Atendimento</button>
   <button class="btn-edit">Editar</button>
</li>
````

Implemente a funcionalidade dos botões "Atendimento" e "Editar".

- **(Peso 2)** O botão "Atendimento" ao ser pressionado deve retirar o pacinte da fila, da lista de objetos correspondente, por fim, a lista deve ser atualizada (lambrando também de atualizar o armazenamento local).
- **(Peso 3)** O botão "Editar" ao ser pressionado deve ativar a `modal` com a possibilidade de alterar a classificação do paciente. Quando a modal se abre o nome do paciente deve ser exibido no `input name` e o select deve estar selecionado com a classificação atual do paciente. Ao clicar no botão "Salvar" a classificação do paciente deve ser alterada e a lista de pacientes deve ser atualizada. A classe css `active` deve ser adicionada ao `modal` para que ele seja exibido.

### Dicas de abordagens para resolver o problema

1. **Abordagem 1**: Adicionar um `eventListener` para cada botão de cada `li` da lista de pacientes no momento da criação de cada `li`.
2. **Abordagem 2**: Adicionar um `eventListener` na tag `main` e verificar qual botão foi clicado através do `event.target`, que é passado como argumento para a função de callback do `eventListener`.
3. **Abordagem 3**: Quando criada a lista de pacientes, adicionar um `id` para cada `li` com um valor único (ex.: `green-id-1`, `yellow-id-1`, `red-id-1`). Após, selecionar todos os botões de cada `li` e adicionar um `eventListener` para cada um deles, verificando qual botão foi clicado através do `id` do `li` pai do botão clicado.
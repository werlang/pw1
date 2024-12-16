# Prova Reavaliação 01 - Programação Web I

As questões envolvem um protótipo de um sistema de gerenciamento de Imobiliária Rudimentar.

O usuário conta com a funcionalidade de cadastros de imóveis para venda, com as seguintes informações: **Descrição**, **Preço**, **Categoria** e uma **Imagem**.

Existe também uma página de listagem de imóveis, onde o usuário pode visualizar todos os imóveis cadastrados. Nessa página, o usuário pode filtrar os imóveis por categoria.

O conteúdo das páginas HTML já está disponível nos arquivos `proporty-insert.html` e `proporty-list.html`. Os arquivos `assets/js/property-insert.js` e `assets/js/property-list.js` contém os scripts que devem ser implementados para adicionar as funcionalidades descritas abaixo. O CSS já está implementado nos arquivos `assets/css/list.css` e `assets/css/insert.css`.

## Questão 1 - Cadastro de Imóveis (`proporty-insert.html` e `assets/js/property-insert.js`)

No script `proporty-insert.html` é exibido o formulário de cadastro de imóveis, com os campos: **Descrição**, **Preço**, **Categoria** e uma **Imagem**; 

Ao clicar no botão **Cadastrar**, o imóvel deve ser cadastrado no **localStorage** com a chave _propertyList_. O valor da chave _propertyList_ deve ser um array de objetos, onde cada objeto representa um imóvel cadastrado e a cada cadastro um novo objeto deve ser adicionado ao array.

Os campos **description** e **price** são obtidos das caixas de texto do formulário. O campo **category** é obtido do _value_ do _select_ do formulário. O campo **image** é obtido do _input radio_ selecionado no formulário. Utilize o seletor `.radio:checked` para obter o _input radio_ selecionado.

Exemplo de objeto de imóvel cadastrado no localStorage:

```json
{
    "description": "Apartamento 2 quartos",
    "price": 200000,
    "category": "apartamento",
    "image": "assets/images/property01.jpg"
}
```

Após o cadastro, o formulário deve ser limpo e o elemento `.message` deve ser exibido com a mensagem "_Imóvel cadastrado com sucesso!_". Adicione a classe **success** ao elemento `.message` ao exibir a mensagem.

Caso algum campo não seja preenchido, o elemento `.message` deve ser exibido com a mensagem "_Preencha todos os campos!_". Adicione a classe **error** ao elemento `.message` ao exibir a mensagem.

## Questão 2 - Listagem de Imóveis (`proporty-list.html` e `assets/js/property-list.js`)

No script `proporty-list.js` existe um array **propertyList** com alguns imóveis cadastrados. Utilize esse array para exibir na página `proporty-list.html` os imóveis cadastrados, no mesmo formato que o exemplo disponível na página:

```html
<div class="property-card">
    <img src="assets/images/property02.jpg">
    <div class="property-description">Casa na Zona Sul</div>
    <div class="property-category">Casa</div>
    <div class="property-price">R$ 1.500.000,00</div>
</div>
```

Utilize uma função para gerar o HTML de cada imóvel cadastrado. A função deve receber como parâmetro um objeto de imóvel e retornar o HTML (string ou objeto DOM) do imóvel.

## Questão 3 - Filtro de Imóveis (`proporty-list.html` e `assets/js/property-list.js`)

Na página `proporty-list.html` existe um __select__ com as opções de categorias de imóveis: **Todos**, **Casa**, **Apartamento** e **Terreno**. Ao selecionar uma categoria, os imóveis devem ser filtrados de acordo com a categoria selecionada. Implemente o filtro de imóveis no script `proporty-list.js`.

Para a categoria **Todos**, todos os imóveis devem ser exibidos. Para as demais categorias, apenas os imóveis da categoria selecionada devem ser exibidos.

Os imóveis deverão ser obtidos do **localStorage**, utilizando a chave _propertyList_. Você pode remover o array **propertyList** do script `proporty-list.js` para utilizar o array do **localStorage**.

Utilize a função implementada na questão 2 para gerar o HTML de cada imóvel.
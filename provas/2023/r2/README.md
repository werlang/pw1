# Prova Reavaliação 02 - Programação Web I

As questões envolvem um protótipo de um sistema de gerenciamento de Imobiliária Rudimentar.

Ao abrir a página `index.html`, será requisitado ao usuário que faça o login. Foi previamente cadastrado um usuário com o _email_ **admin@admin.com** e _senha_ **admin**. O script que realiza a autenticação do usuário já está implementado no arquivo `assets/js/login.js`, bem como a lógica do login está implementada no arquivo `back/login.php`.

O usuário conta com a funcionalidade de cadastros de imóveis para venda, com as seguintes informações: **Descrição**, **Preço**, **Categoria** e uma **Imagem**.

Existe também uma página de listagem de imóveis, onde o usuário pode visualizar todos os imóveis cadastrados. Nessa página, o usuário pode filtrar os imóveis por categoria.

O conteúdo das páginas HTML já está disponível nos arquivos `insert.html` e `list.html`. Os arquivos `assets/js/insert.js` e `assets/js/list.js` contém os scripts que adicionam as funcionalidades descritas abaixo. O CSS já também está implementado nos arquivos `assets/css/list.css` e `assets/css/insert.css`.

A conexão com o banco de dados é realizada através do arquivo `back/connection.php`. Esse arquivo já está implementado e não deve ser alterado.

Foi fornecido o script `back/database.sql` que foi utilizado para criar o banco de dados.

## (Peso 1) Questão 1 - Requisições (`assets/js/insert.js` e `assets/js/list.js`)

Os script `assets/js/insert.js` e `assets/js/list.js` já estão implementados, com exceção das requisições ao servidor. Implemente as requisições necessárias para que os scripts funcionem corretamente. Foram adicionados comentários nos locais onde as requisições devem ser implementadas.

No script `assets/js/insert.js`, a requisição deve ser feita para o arquivo `back/insert.php` utilizando o método **POST** e enviando o conteúdo do formulário no corpo da requisição.

No script `assets/js/list.js`, a requisição deve ser feita para o arquivo `back/list.php` utilizando o método **GET** e enviando o parâmetro **cat** com o nome da categoria escolhida, que deve ser obtida do _value_ do _select_.

## (Peso 3) Questão 2 - Cadastro de Imóveis (`back/insert.php`)

Na página `insert.html` é exibido o formulário de cadastro de imóveis, com os campos: **Descrição**, **Preço**, **Categoria** e **Imagem**.

Ao clicar no botão **Cadastrar**, o formulário é submetido para o arquivo `back/insert.php`, utilizando o método **POST**, com os campos **description**, **price**, **category** e **image**. A imagem é enviada através de um _input_ do tipo **file**.

Verifique a sessão, e caso nenhum usuário esteja logado, retorne um JSON com a seguinte estrutura:

```json
{
    "error": true,
    "logged": false,
    "message": "Você não está logado"
}
```

Ao receber os dados do formulário, o script `back/insert.php` deverá verificar se todos os campos foram preenchidos. Caso algum campo não tenha sido preenchido, o arquivo deverá devolver um JSON com a seguinte estrutura:

```json
{
    "error": true,
    "message": "Todos os campos são obrigatórios"
}
```

Caso todos os campos tenham sido preenchidos, o script deverá verificar se a extensão da imagem enviada é válida. Apenas imagens com as extensões **jpg** e **png** são permitidas. Caso a extensão da imagem não seja válida, o script deverá devolver um JSON com a seguinte estrutura:

```json
{
    "error": true,
    "message": "Imagem deve ser PNG ou JPG"
}
```

A imagem deverá ser salva na pasta `uploads` com o nome **N.EXT**, onde **N** é o ID do imóvel e **EXT** é a extensão da imagem.

Em caso de sucesso, o script deverá salvar o novo imóvel no arquivo banco de dados e devolver um JSON com a seguinte estrutura:

```json
{
    "message": "Imóvel cadastrado com sucesso",
    "property": {
        "id": 1,
        "description": "Descrição do imóvel",
        "price": 100000,
        "category": "apartamento",
        "image": "1.jpg"
    }
}
```

## (Peso 2) Questão 3 - Listagem de Imóveis (`back/list.php`)

Na página `list.html` é exibida a listagem de todos os imóveis cadastrados. Nessa página, o usuário pode filtrar os imóveis por categoria.

Ao escolher uma categoria no _select_, é enviado por **GET** o parâmetro **cat** com o nome da categoria escolhida. Possíveis valores para o parâmetro **cat**: **apartamento**, **casa**, **terreno** e **todos**.

Implemente o script `back/list.php` para que, ao receber o parâmetro **cat**, o script devolva um JSON com todos os imóveis cadastrados na categoria escolhida. Caso o parâmetro **cat** não seja enviado, ou seja enviado com o valor **todos**, o script deverá devolver um JSON com todos os imóveis cadastrados.

O JSON deverá ter a seguinte estrutura:

```json
{
    "properties": [
        {
            "id": 1,
            "description": "Descrição do imóvel 1",
            "price": 100000,
            "category": "apartamento",
            "image": "1.jpg"
        },
        {
            "id": 2,
            "description": "Descrição do imóvel 2",
            "price": 200000,
            "category": "apartamento",
            "image": "2.jpg"
        }
    ]
}
```
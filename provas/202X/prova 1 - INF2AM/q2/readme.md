Crie uma página que possua dois botões e uma caixa de texto, conforme abaixo:

![image](https://user-images.githubusercontent.com/19828711/181781258-f2deba95-3de3-4df3-93b5-307ae7d868d9.png)

Ao clicar no botão “Cria”, uma nova div (classe “box”) deve ser criada no documento. Esta box deverá possuir um texto dentro dela. Caso a caixa de texto possua um número inteiro entre 1 e 9, esta box deverá conter esse número, caso contrário a box não deverá possuir texto. Caso o botão “Remove” seja clicado, uma das box deverá ser excluída do documento (não importa qual). Abaixo possui um exemplo onde algumas box foram criadas, e também o css desta box.

![image](https://user-images.githubusercontent.com/19828711/181781387-9117924d-11f5-4058-9f41-68f87dee5c5b.png)

```
.box {
    width: 20px;
    height: 20px;
    border: 1px solid black;
    background-color: grey;
    color: white;
    margin: 5px;
    text-align: center;
}
```
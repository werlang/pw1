# Exercício - Sessões

Foi fornecido uma página de login e uma página de perfil. O objetivo é fazer com que o usuário só consiga acessar a página de perfil se ele estiver logado.

Na pégina `index.html` ao clicar no botão **Entrar** os dados do formulário são enviados para o script `login.php` que verifica se o usuário e senha estão corretos. Se estiverem corretos, o usuário é redirecionado para a página `profile.html` e uma sessão é iniciada. Caso contrário, o usuário é redirecionado para a página `index.html` novamente. Na página `profile.html` é verificado se o usuário está logado, caso não esteja, ele é redirecionado para a página `index.html`. Ao clicar no botão **Logout** o usuário é redirecionado para a página `index.html` e a sessão é destruída.

## Login

Você deve implementar o script `login.php`. Os usuários estão disponíveis no arquivo `users.json`, que deve ser importado no script. O script deve verificar se o usuário enviado no formulário existe no arquivo `users.json`. Caso não exista, o script deve retornar:

```json
{
    "error": true,
    "status": 401,
    "message": "Usuário não encontrado"
}
```

Caso o usuário exista, o script deve verificar se a senha está correta. Utilize a função `password_verify` para verificar se a senha está correta. Caso a senha esteja incorreta, o script deve retornar:

```json
{
    "error": true,
    "status": 401,
    "message": "Senha incorreta"
}
```

A senha para todos os usuários é **asdf1234**. 

Caso o usuário e senha estejam corretos, o script deve retornar:

```json
{
    "status": 200,
    "message": "Login efetuado com sucesso"
}
```

Além disso, o script deve iniciar uma sessão e armazenar o nome do usuário e email na sessão.

## Perfil

A página de perfil ao ser carregada faz uma requisição para o script `session.php` que verifica se o usuário está logado. Implemente este script. Ele deve verificar a sessão e retornar, caso o usuário esteja logado:

```json
{
    "status": 200,
    "message": "Usuário logado",
    "user": {
        "name": "Nome do usuário",
        "email": "Email do usuário"
    }
}
```

Caso o usuário não esteja logado, o script deve retornar:

```json
{
    "error": true,
    "status": 401,
    "message": "Usuário não logado"
}
```

## Logout

Ao clicar no botão **Logout** na página de perfil, o usuário é redirecionado para a página `index.html` e a sessão é destruída. Implemente o script `logout.php` que deve destruir a sessão e retornar:

```json
{
    "status": 200,
    "message": "Logout efetuado com sucesso"
}
```
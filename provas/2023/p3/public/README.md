# Prova 3 - Programação Web 1

As questões envolvem um protótipo de um sistema de cadastro de vagas. O sistema possui um login de usuário na página `login.html`.

Após o login, o usuário é redirecionado para a página de perfil `profile.html`, onde ele é permitido alterar seus dados cadastrais (inclusive enviar um pdf com seu currículo).

No header ele pode acessar as página mencionadas e também a página de vagas `jobs.html`, onde ele pode se candidatar a vagas. A página de vagas possui um select que mostra as vagas disponíveis. Ao selecionar uma vaga, o usuário pode se candidatar a ela.

No header também possui o link para o logout.php, que encerra a sessão do usuário e o redireciona para a página de login.

A conexão com o banco de dados é feita através de um banco de dados remoto. As credenciais de acesso ao banco de dados estão no arquivo `back/connection.php`. Foi disponibilizado para fins de consulta um script `database.sql` que demonstra a estrutura do banco de dados. Mas não será necessário criar o banco de dados, pois ele já está criado no servidor remoto.

O `docker-compose.yml` descreve o serviço necessário para rodar o container com o apache, que será utilizado para fins de teste do sistema.

A maior parte dos códigos já estão implementados. Você deve implementar apenas o que for pedido nas questões abaixo.

Das quatro questões apresentadas, você deve escolher três questões para resolver. Note que dependendo da questão escolhida, a sua prova poderá valer 10, 10.5 ou 11 pontos no total. Caso você obtenha mais de 10 pontos, a pontuação excedente será desconsiderada.


## Questão 1 (*3 PONTOS*) - Requisições ao back-end

Os scripts `jobs.js`, `profile.js` e `login.js` fazem requisições ao back-end. Implemente-as analisando nos comentários o que é pedido. Atente para o envio das informações quando necessário. Um exemplo de resposta das requisições foi atribuído à constante *data* em cada local de requisição. Observe os scripts php para identificar o formato das respostas.


## Questão 2 (*3.5 PONTOS*) - Login de usuário

O script `login.js` envia os dados do formulário (**email** e **password**) por **POST** para o script `back/login.php`.

Caso algum dos campos esteja vazio ou não informado, o script deve retornar um JSON no seguinte formato:

```json
{
    "status": "error",
    "message": "Email e senha são obrigatórios"
}
```

Caso o email não esteja cadastrado no banco de dados, o script deve retornar um JSON no seguinte formato:

```json
{
    "status": "error",
    "message": "Usuário não encontrado"
}
```

Utilize a seguinte query sql para fazer esta consulta (utilize as consultas preparadas do PDO):

```sql
SELECT * FROM users WHERE email = ?
```

Caso o email esteja cadastrado, mas a senha não confere, o script deve retornar um JSON no seguinte formato:

```json
{
    "status": "error",
    "message": "Senha incorreta"
}
```

Utilize a função **password_verify** para verificar se a senha confere com a senha cadastrada no banco de dados.

Caso o email e a senha confiram, o script deve retornar um JSON no seguinte formato:

```json
{
    "status": "success",
    "message": "Usuário logado com sucesso"
}
```

Além disso, o script deve iniciar a sessão do usuário e armazenar os campos **name** e **email** na sessão.

## Questão 3 (*4 PONTOS*) - Perfil do usuário

O script `profile.js` permite a ediçao dos dados cadastrais do usuário. O script envia os dados do formulário por **POST** (**name**, **email**, **password**) bem como permite o envio de um arquivo pdf (**curriculum**) para o script `back/profile.php`.

Os novos dados enviados devem ser atualizados no banco de dados. Para isso, utilize a seguinte query sql (utilize as consultas preparadas do PDO):

```sql
UPDATE users SET name = ?, email = ? WHERE id = ?
```

**DICA**: Atente para verificar o id do usuário de acordo com email logado na sessão, e não com os dados enviados no formulário, pois o usuário pode ter alterado o email.

O currículo deve ser salvo na pasta `back/uploads` com o **nome do arquivo igual ao id do usuário**. Por exemplo, se o id do usuário for 1, o currículo deve ser salvo como `back/uploads/1.pdf`.

Faça a verificação do tipo do arquivo enviado. Caso não seja um **pdf**, o script deve retornar um JSON no seguinte formato:

```json
{
    "status": "error",
    "message": "Currículo deve ser um arquivo PDF"
}
```

Caso a atualização do usuário seja bem sucedida, o script atualizar os campos **name**, **email** e **curriculum** na sessão e retornar um JSON no seguinte formato:

```json
{
    "status": "success",
    "message": "Usuário atualizado com sucesso",
    "user": <dados da sessão do usuário>
}
```

## Questão 4 (*3.5 PONTOS*) - Candidatura a vagas

O script `jobs.js` permite que o usuário se candidate a uma vaga. O script requisita a lista de vagas do script `back/jobs.php` e preenche as informações no select da página `jobs.html`. O nome do canditato é recebido da sessão. Estas funcionalidades estão implementadas.

Ao clicar no botão **Canditatar-se** o script envia por POST o **id da vaga** no campo **jobs** para o script `back/apply.php`.

O script busca o id do usuário usando o email da sessão. Para isso, utilize a seguinte query sql (utilize as consultas preparadas do PDO):

```sql
SELECT id FROM users WHERE email = ?
```

Usando o **id do usuário** e o **id da vaga**, o script verifica na tabela **applications** se o usuário já se candidatou a esta vaga. Para isso, utilize a seguinte query sql:

```sql
SELECT * FROM applications WHERE user = ? AND job = ?
```

Caso o usuário já tenha se candidatado a vaga em questão, o script deve retornar um JSON no seguinte formato:

```json
{
    "status": "error",
    "message": "Você já se candidatou a esta vaga"
}
```

Caso contrário, o script deve inserir na tabela **applications** o **id do usuário** e o **id da vaga**. Para isso, utilize a seguinte query sql:

```sql
INSERT INTO applications (user, job) VALUES (?, ?)
```

Após a inserção, o script deve retornar um JSON no seguinte formato:

```json
{
    "status": "success",
    "message": "Candidatura realizada com sucesso"
}
```
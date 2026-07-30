# Exercício: Portal do Boletim

## Objetivo

Proteger páginas e registros de modo que cada estudante autenticado veja somente as próprias notas.

## Requisitos

- autenticar usuário do banco com `password_verify()`;
- regenerar o identificador da sessão após o login;
- guardar somente identificador e nome necessário à interface;
- criar uma guarda reutilizável para páginas e endpoints;
- consultar notas usando o identificador da sessão, nunca um estudante recebido da URL;
- implementar logout por POST e responder adequadamente a acesso sem sessão.

## Conceitos trabalhados

Login, sessão, regeneração, guarda, autorização por recurso, PDO e logout.

## Critérios de verificação

- trocar um identificador na URL não pode revelar outro boletim;
- endpoint protegido deve negar acesso mesmo se a tela não estiver aberta;
- o hash da senha nunca pode entrar na sessão ou na resposta.

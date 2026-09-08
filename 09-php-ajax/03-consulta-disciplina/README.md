# Exercício Prático: Consulta de Disciplinas com URLSearchParams (GET)

## Objetivo da Atividade

O objetivo desta atividade é aprender a enviar **parâmetros na URL (Query String)** em requisições `GET` utilizando a classe nativa do navegador `URLSearchParams`. No backend PHP, você observará como ler e validar essas informações via `$_GET`.

---

## Conceitos trabalhados

- Construção de URLs com parâmetros dinâmicos usando `new URLSearchParams()`;
- Realização de requisição `GET` com parâmetros anexados à URL;
- Leitura e validação de `$_GET['sigla']` no PHP com respostas de erro `404` e `422`;
- Renderização dinâmica de detalhes de um item na interface.

---

## Especificações Técnicas do Sistema

### 1. Interface do Usuário (Frontend)
- Um campo de seleção `<select id="seletor-disciplina">` com as opções:
  - *"Selecione uma disciplina..."* (valor vazio);
  - Programação Web I (`pw1`);
  - Banco de Dados (`bd`);
  - Redes de Computadores (`redes`);
  - Engenharia de Software (`es`).
- Um botão `<button id="btn-consultar">Ver Detalhes</button>`.
- Um contêiner `<div id="card-detalhes">` que exibe:
  - Título da disciplina;
  - Sigla e Carga Horária;
  - Professor(a);
  - Ementa.
- Uma caixa de status `<div id="status-consulta">`.

### 2. A Classe `URLSearchParams`
Em vez de concatenar strings com `+` ou interpolação manual (que pode quebrar caracteres especiais), você utilizará:

```javascript
const parametros = new URLSearchParams({ sigla: valorSelecionado });
const url = `api.php?${parametros.toString()}`;
```

---

## Estrutura de Arquivos

```text
09-php-ajax/03-consulta-disciplina/
├── README.md      # Este enunciado detalhado
├── index.html     # Seletor de disciplina e card de detalhes
├── style.css      # Estilização do card e das informações acadêmicas
├── script.js      # URLSearchParams, fetch() GET e atualização do DOM
└── api.php        # Catálogo em array associativo e filtro no PHP
```

---

## Critérios de Verificação

- [ ] Selecionar uma disciplina e clicar no botão exibe seus dados sem recarregar a tela.
- [ ] O código utiliza `new URLSearchParams()` para montar a URL da requisição.
- [ ] Se o usuário clicar sem selecionar nenhuma disciplina, exibe aviso visual sem fazer requisição desnecessária.
- [ ] O endpoint `api.php?sigla=pw1` responde com status `200` e dados válidos.

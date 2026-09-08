# Exercício Prático: Busca Cancelável no Acervo da Biblioteca

## Objetivo da Atividade

O objetivo desta atividade é construir um sistema de busca em tempo real (*live search*) para o acervo de livros da Biblioteca do Campus Charqueadas. Conforme o estudante digita no campo de pesquisa, o sistema consulta um catálogo no servidor PHP via requisição `GET` e exibe os livros correspondentes.

O grande desafio desta prática é resolver o problema de **concorrência e ordem de chegada de requisições na rede (*race conditions*)**: quando alguém digita com rapidez, várias requisições são disparadas em sequência. Se uma resposta antiga demorar mais tempo no servidor do que uma resposta nova, ela pode chegar depois e sobrescrever a tela com dados defasados. Você aplicará **debounce** e a API nativa **`AbortController`** para cancelar buscas obsoletas.

---

## Conceitos trabalhados

- requisições HTTP `GET` com parâmetros via `URLSearchParams`;
- evento `input` em campos de texto;
- técnica de *debounce* com `setTimeout()` e `clearTimeout()`;
- cancelamento de requisições ativas com `AbortController` e tratamento de `AbortError`;
- renderização dinâmica de cards de livros com `document.createElement()` e `append()`;
- filtragem e busca textual no backend PHP com arrays e funções de string;
- contratos de resposta JSON padronizados.

---

## Especificações Técnicas do Sistema

### 1. Interface do Usuário (Frontend)
- Um campo de busca com `placeholder="Digite o título, autor ou assunto do livro..."`.
- Um indicador de status visual que transita entre:
  - *"Digite pelo menos 2 caracteres para pesquisar..."* (estado inicial/vazio);
  - *"Buscando livros no acervo..."* (durante o trânsito da requisição);
  - *"X livros encontrados para o termo '...'"* (sucesso);
  - *"Nenhum livro encontrado para '...'"* (busca sem resultados);
  - Mensagem de erro caso a requisição falhe por problema de servidor.
- Um contêiner em grade onde os cards dos livros encontrados são renderizados. Cada card exibe: título, autor, ano de publicação, categoria e uma etiqueta de status (*Disponível* em verde ou *Emprestado* em cinza).

### 2. O Mecanismo de Debounce e Cancelamento
- **Debounce:** ao digitar, o código não deve disparar o `fetch()` imediatamente. Deve aguardar 300 ms de inatividade do teclado. Se o usuário digitar outra tecla antes desse tempo, o temporizador anterior é cancelado com `clearTimeout()`.
- **Cancelamento com AbortController:** se uma requisição anterior ainda estiver aguardando resposta no servidor quando uma nova busca for disparada, o código deve chamar `controlador.abort()`.
- **Tratamento no catch:** erros do tipo `AbortError` devem ser ignorados silenciosamente (eles representam cancelamentos normais provocados pela digitação do usuário e não falhas reais do sistema).

### 3. Backend em PHP (`api.php`)
- Aceita requisições `GET`.
- Possui um acervo pré-cadastrado em array com pelo menos 8 livros técnicos (ex.: Programação Web, JavaScript, PHP, Redes de Computadores, Algoritmos, Banco de Dados).
- Lê o parâmetro de busca através de `$_GET["busca"]`.
- Se o termo tiver menos de 2 caracteres: responde status `422` com mensagem de orientação.
- Filtra os livros verificando se o termo aparece no título ou no autor (usando `mb_stripos()`).
- Devolve status `200` com a lista filtrada em JSON.

---

## Estrutura de Arquivos

```text
09-php-ajax/busca-acervo/
├── README.md      # Este enunciado detalhado
├── index.html     # Campo de busca e contêiner do acervo
├── style.css      # Estilização da grade de livros e etiquetas de disponibilidade
├── script.js      # Debounce, AbortController, fetch() e renderização
└── api.php        # Catálogo em array e filtro textual em PHP
```

---

## O que observar durante a prática

- Observe como o `AbortController` é conectado ao `fetch()` através da opção `{ signal: controlador.signal }`.
- Digite rapidamente *"java"* e apague rapidamente para observar no painel de Rede (*Network*) do navegador as requisições sendo canceladas em vermelho com status `(canceled)`.
- Verifique como o método `createElement` monta a estrutura dos cards sem depender de `data-*` attributes nem `innerHTML` inseguro.

---

## Critérios de Verificação

- [ ] Digitar rápido não pode deixar a tela com resultados de uma letra antiga digitada anteriormente.
- [ ] O cancelamento de requisição não exibe mensagens de erro ao usuário.
- [ ] Pesquisar por "web" encontra os livros correspondentes de desenvolvimento web.
- [ ] O endpoint `api.php?busca=php` pode ser aberto e testado diretamente no navegador, devolvendo JSON válido.

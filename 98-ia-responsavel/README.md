# Programação Web I - IA como Parceira de Estudo

## 1. O que este guia ensina

Ferramentas de inteligência artificial já fazem parte do dia a dia de quem programa. Elas estão no VS Code, no navegador, no terminal e no celular. Escrevem, explicam e corrigem código em segundos.

Por isso, a pergunta desta seção não é **se** você vai usar IA. A pergunta é: ela vai te deixar **mais capaz** ou **mais dependente**?

Ao final deste guia, você deve conseguir:

- explicar, de forma simples, como uma IA gera respostas e por que ela erra;
- diferenciar um chat de IA de um agente de código;
- usar a IA para aprender, e não para pular o aprendizado;
- escrever pedidos (prompts) que ajudam você a pensar;
- trabalhar com agentes sem perder o controle do seu projeto;
- reconhecer sinais de alerta, cuidados de privacidade e regras de honestidade acadêmica.

## 2. Relação com o resto da disciplina

Este guia não ensina um conteúdo novo de programação. Ele ensina **como estudar** os conteúdos da disciplina com a IA por perto.

Os exemplos usam o que você já viu:

- arrays e o método `splice()`;
- DOM, `querySelector()` e `addEventListener()`;
- `localStorage` e `JSON.stringify()`;
- `fetch()` e Promises;
- endpoints PHP que respondem JSON e usam prepared statements.

Se algum exemplo parecer estranho, volte ao guia da seção correspondente antes de continuar. Esse movimento, aliás, é exatamente o que este guia quer incentivar.

## 3. O que a IA é

Um modelo de linguagem é, no fundo, uma **máquina de prever texto** muito boa. Ele aprendeu padrões lendo uma quantidade enorme de texto e código e, a cada pedido, gera a continuação **mais provável**.

Daí vêm três consequências importantes:

- a resposta mais provável **nem sempre é a correta**;
- a IA não tem um "botão de dúvida": quando não sabe, ela pode **inventar com total confiança**;
- ela não sabe o que o professor pediu, nem o que você já aprendeu ou ainda não estudou.

### 3.1 Chat e agente veem coisas diferentes

Em um **chat**, a IA só enxerga o que você cola na conversa. Ela não abre a sua página nem testa o seu código.

Em um **agente de código**, a situação muda: ele pode ler a sua pasta, abrir arquivos, editar e rodar comandos. Isso é mais poderoso e também exige mais cuidado (veja a seção 7).

Nos dois casos, a IA continua sem saber qual é o objetivo pedagógico do exercício.

### 3.2 Quando a IA "alucina"

Chamamos de **alucinação** a resposta inventada que parece certa. Imagine que você pergunta como remover uma tarefa de uma lista e recebe isto:

```javascript
const tarefas = ['Estudar DOM', 'Fazer exercício', 'Dormir'];
tarefas.removeAt(1); // TypeError: tarefas.removeAt is not a function
```

O método `removeAt()` não existe em arrays JavaScript. O jeito estudado em aula é o `splice()`:

```javascript
tarefas.splice(1, 1); // resultado: ['Estudar DOM', 'Dormir']
```

Quem estudou arrays percebe o erro na hora. Quem só copiou a resposta fica preso, sem saber por onde começar. Conhecer o conteúdo é o que permite **conferir** a IA.

## 4. Academia para o cérebro

### 4.1 A empilhadeira na academia

Pense em alguém que leva uma empilhadeira para a academia. O peso sobe, a série termina e o treino "fica pronto". Mas quem ficou forte foi a empilhadeira.

Com exercícios de programação acontece a mesma coisa:

- o exercício não existe para **produzir código**, porque o professor já sabe resolvê-lo;
- ele existe para **treinar o seu raciocínio**;
- o código pronto é o peso; o aprendizado é o músculo.

### 4.2 Muleta ou treinador?

A mesma ferramenta pode ser usada de dois jeitos muito diferentes.

| IA como muleta | IA como treinador |
| --- | --- |
| "Faz o exercício de localStorage pra mim" | "Por que meu item some ao recarregar a página?" |
| Copia, cola e entrega | Recebe uma pista e tenta de novo |
| Funciona, mas você não sabe por quê | Entende o `JSON.stringify()` que faltava |
| Na prova, trava | Na prova, resolve sozinho |

A diferença não está na ferramenta. Está no que você pede e no que faz com a resposta.

## 5. Cinco jeitos de usar bem

### 5.1 Professor particular

Peça **explicação**, não solução. Diga o seu nível e o que você não quer receber.

```text
Estou aprendendo JavaScript puro, sem frameworks.
Explique o que o addEventListener faz como se eu
tivesse 15 anos. Use uma analogia do dia a dia e
NÃO escreva o código do meu exercício.
```

Se a primeira analogia não fizer sentido, peça outra. Também vale pedir uma comparação com algo que você já conhece, como "qual a diferença entre isso e o `onclick` no HTML?".

### 5.2 Tutor que só faz perguntas

Em vez de pedir a resposta, peça para ser guiado.

```text
Meu fetch está mostrando [object Promise] na tela.
Não me dê a resposta. Faça uma pergunta de cada
vez até eu descobrir sozinho o que está errado.
```

Esse jeito é mais lento, e é justamente por isso que funciona. Quando você chega à resposta pelo próprio raciocínio, reconhece o mesmo problema sozinho na próxima vez.

### 5.3 Detetive de erros

Mensagens de erro assustam, mas carregam a pista mais importante. Copie a mensagem do console e pergunte **o que ela significa**, não "como eu conserto".

```text
Uncaught TypeError: Cannot read properties of null (reading 'addEventListener')
```

A IA vai explicar que o `querySelector()` devolveu `null`, ou seja, não encontrou o elemento. A partir daí, a investigação é sua. Existem três suspeitos principais:

- o script rodou antes de o HTML existir;
- o seletor foi escrito errado, diferente do `id` ou da classe do HTML;
- o elemento simplesmente não existe no HTML.

Você entende a causa e faz a correção com as suas mãos.

### 5.4 Revisor depois que funcionou

Primeiro você faz. Depois pede uma segunda opinião.

```text
Este é o meu insertuser.php. Ele já funciona.
O que um professor criticaria aqui? Aponte os
problemas, mas não reescreva o arquivo inteiro.
```

Uma boa revisão pode apontar, por exemplo:

- SQL montado com concatenação de texto, que abre espaço para SQL injection;
- a falta do `header('Content-Type: application/json')`;
- uma resposta de erro fora do formato `{"error": true, "message": "..."}` usado na disciplina.

Você decide o que corrigir e corrige você mesmo.

### 5.5 Gerador de treino

Use a IA para criar **mais exercício**, não para fugir dele.

```text
Crie 3 desafios curtos de localStorage parecidos
com uma lista de tarefas. Um fácil, um médio e um
difícil. Não mostre as soluções.
```

Também funciona bem para revisar antes da prova: peça um quiz de cinco perguntas sobre o conteúdo e, depois, peça para a IA corrigir as suas respostas.

## 6. Anatomia de um bom prompt

Um pedido útil costuma ter quatro partes:

- **contexto:** quem você é e com o que está trabalhando ("estudante de PW1, JavaScript puro");
- **objetivo:** o que você quer entender ("por que minha lista não aparece após o fetch");
- **limite:** o que a IA não deve fazer ("não me dê o código pronto");
- **formato:** como você quer a resposta ("em 3 passos curtos").

Juntando tudo:

```text
Sou estudante de PW1 e uso JavaScript puro, sem frameworks.
Quero entender por que minha lista não aparece após o fetch.
Não me dê o código pronto. Explique em 3 passos curtos.
```

Quanto melhor o contexto, menos a IA precisa adivinhar, e menos ela inventa.

## 7. Agentes de código

### 7.1 Do chat ao agente

Um **chat** responde com texto: quem copia, cola e testa é você. Um **agente de código** trabalha direto no seu projeto. Ele lê arquivos, edita, cria pastas e roda comandos no terminal.

Alguns agentes conhecidos são **Codex**, **Claude Code**, **GitHub Copilot**, **Antigravity** e **OpenCode**. Alguns funcionam no terminal, outros dentro do VS Code ou em um editor próprio.

Um agente consegue resolver um exercício inteiro em poucos segundos. É exatamente aí que mora o perigo: a empilhadeira ficou ainda mais forte.

### 7.2 Como um agente trabalha

De forma simplificada, um agente segue este ciclo:

1. lê o seu pedido;
2. explora a pasta e abre os arquivos que acha relevantes;
3. monta um plano;
4. edita um ou vários arquivos;
5. roda comandos para testar;
6. mostra o que mudou, o chamado **diff**.

O diff mostra, linha por linha, o que entrou e o que saiu de cada arquivo. Muitos agentes pedem a sua **aprovação** antes de editar ou de rodar um comando. Se você aprova tudo sem ler, quem programou foi o agente, não você.

### 7.3 O agente como colega de estudo

Agentes também servem para aprender, principalmente quando você pede para ele **ler e explicar** sem mexer em nada:

```text
Leia a pasta 05-local-storage/agenda-contatos.
Explique o caminho de um contato: do formulário
até o localStorage e de volta para a tela.
Não altere nenhum arquivo.
```

Outras boas ideias:

- usar o modo de **planejamento** ou de **pergunta** da ferramenta, quando existir, para que ela não edite arquivos;
- pedir para o agente explicar um diff antes de você aceitar;
- pedir um exercício novo em uma pasta separada, sem a solução.

### 7.4 Instruções que o agente lê antes de começar

Muitos agentes procuram um arquivo de instruções na raiz do projeto antes de trabalhar. Este repositório tem um `AGENTS.md` com regras como estas:

```markdown
- Prefer solutions that are clear for students
- Vanilla JS with direct DOM APIs
- Do not introduce frameworks or new dependencies
- comments in PT-BR
```

É como um "combinado da turma" escrito para a IA. A maioria dos agentes lê o `AGENTS.md`; alguns usam um arquivo com outro nome, como o Claude Code, que lê o `CLAUDE.md`.

Você pode criar o seu, com pedidos como "explique antes de editar" ou "não use frameworks".

### 7.5 Regras de segurança com agentes

- Faça um **commit** antes de chamar o agente. Se algo der errado, o Git permite voltar ao ponto anterior.
- Leia cada diff antes de aceitar.
- Não aprove comandos que você não entende, principalmente `rm`, `sudo` ou instalação de pacotes.
- Deixe o `.env` e qualquer senha fora do alcance do agente.
- No fim, rode o projeto e teste com as suas próprias mãos.

## 8. Os limites

### 8.1 Sinais de alerta

Desconfie quando:

- a resposta usa React, jQuery ou outra ferramenta que não vimos em aula;
- você não consegue explicar o código linha por linha;
- "funcionou", mas você não sabe dizer **por quê**;
- o código é muito maior ou mais sofisticado do que o exercício pede;
- você não lembra a última vez que leu o erro no console antes de perguntar.

Use o **teste do colega**: se você não consegue explicar a solução para quem senta ao seu lado, ainda não aprendeu.

### 8.2 Privacidade e segurança

Tudo o que você cola em um serviço de IA pode ficar guardado nele. E um agente pode ler qualquer arquivo da pasta onde está trabalhando.

- Nunca cole senhas, o `.env` ou o `connection.php` com credenciais do banco.
- Não cole dados pessoais de colegas, como nome completo, e-mail ou telefone.
- Troque dados reais por exemplos: "Ana", "ana@exemplo.com".
- Confira o código antes de rodar, principalmente o que mexe no banco de dados.

### 8.3 Honestidade acadêmica

- Na prova, quem programa é você, sem IA.
- Nos trabalhos, combine com o professor o que é permitido.
- Se usou IA, **diga como usou**. Isso não é vergonha, é transparência.
- Você é o autor e o responsável por cada linha entregue.

Regra de ouro: **se você não consegue explicar, não entregue.**

### 8.4 O semáforo da IA

| 🟢 Pode usar | 🟡 Com cuidado | 🔴 Não use |
| --- | --- | --- |
| Explicar um conceito | Pedir um trecho de exemplo | Fazer o exercício inteiro |
| Traduzir uma mensagem de erro | Comparar duas soluções | Resolver a prova |
| Criar quiz e desafios extras | Pedir a "dica final" | Colar senhas ou dados de colegas |
| Revisar o que você já fez | Deixar um agente editar arquivos | Entregar o que não entende |

No amarelo, vale um combinado simples: leia o exemplo, feche a janela e reescreva sozinho.

## 9. Travei no exercício. E agora?

Antes de abrir a IA, siga esta ordem:

1. tente por 15 minutos de verdade;
2. leia o erro no console do navegador (F12);
3. consulte o README do exercício;
4. pergunte à IA pedindo **uma pista**, não a solução;
5. implemente você mesmo;
6. explique a solução em voz alta, como se estivesse ensinando alguém.

A IA aparece só no passo 4. Os outros passos são o treino.

## 10. Atividade proposta

Escolha um exercício que você **já resolveu**, como [`04-dom/lista-tarefas`](../04-dom/lista-tarefas/) ou [`05-local-storage/agenda-contatos`](../05-local-storage/agenda-contatos/).

1. Peça para a IA ser sua **tutora de perguntas** sobre esse código, usando o modelo da seção 5.2.
2. Anote as três perguntas mais difíceis que ela fez.
3. Peça um desafio novo e parecido, **sem a solução**, usando o modelo da seção 5.5.
4. Resolva o desafio sem pedir o código pronto.

Traga as perguntas anotadas para discutirmos em aula.

## 11. Erros comuns

- Aceitar a primeira resposta sem testar.
- Pedir "faz pra mim" e chamar isso de estudo.
- Colar o código inteiro do projeto, com senhas e dados reais.
- Aprovar todas as edições de um agente sem ler o diff.
- Trabalhar com um agente sem ter feito commit antes.
- Usar uma biblioteca sugerida pela IA que a disciplina não usa.

## 12. Resumo final

As ideias centrais desta seção são estas:

- a IA prevê texto: ela erra e pode inventar com confiança;
- conhecer o conteúdo é o que permite conferir a IA;
- o exercício treina **você**, não a ferramenta;
- use a IA como professor, tutor, detetive, revisor e gerador de treino;
- com agentes, faça commit antes e leia cada diff depois;
- proteja seus dados e respeite as regras de cada atividade;
- você está no volante; a IA é o copiloto.

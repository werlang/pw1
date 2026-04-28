---
name: codigo-didatico-ptbr
description: Create, revise, refactor, or explain source code for this repository in a didactic, beginner-friendly style for high-school students. Use when Agent needs to write or change HTML, CSS, JavaScript, PHP, or code snippets in lessons, examples, exercises, mini-projects, or avaliações, keeping the implementation educational, explicit, well documented, and with comments in PT-BR.
---

# Código Didático PT-BR

Escrever código deste repositório como material de aprendizagem, não como código de produção otimizado.

Partir da ideia de que estudantes do ensino médio podem ler, copiar, adaptar e apresentar esse código em aula. Priorizar clareza, progressão pedagógica e documentação útil.

## Objetivo

Produzir código que:

- seja fácil de ler por iniciantes;
- exponha a lógica em passos visíveis;
- ajude o professor a explicar o raciocínio;
- use comentários em PT-BR quando eles realmente ajudarem;
- mantenha consistência com os exemplos e exercícios vizinhos.

## Regras obrigatórias

- Assumir autoria estudantil e finalidade educacional em todo código novo.
- Preferir a solução mais simples que ensine bem o conceito pedido.
- Evitar abstrações desnecessárias, truques de linguagem, metaprogramação, helpers genéricos demais e encadeamentos difíceis de explicar.
- Manter mudanças locais à pasta alvo e respeitar o padrão do material ao redor.
- Preservar JavaScript vanilla, DOM direto e o estilo PHP já usado no repositório, salvo pedido explícito em contrário.
- Usar nomes claros e coerentes com o contexto da pasta. Se o material já estiver em português, manter o vocabulário em português.
- Escrever comentários em PT-BR, com ortografia correta e acentuação normal.
- Comentar intenção, fluxo, decisão e armadilha. Não comentar o óbvio linha por linha.

## Fluxo recomendado

1. Ler a pasta alvo e um exemplo, exercício ou README próximo para calibrar profundidade e vocabulário.
2. Identificar qual conceito principal o código deve ensinar.
3. Escolher uma estrutura direta, com poucas camadas de indireção.
4. Implementar em passos pequenos, com funções curtas quando isso melhorar a leitura.
5. Adicionar comentários em PT-BR nos pontos em que um estudante provavelmente teria dúvida.
6. Revisar com o checklist em `references/revisao-final.md`.

## Como escrever código didático

- Mostrar uma ideia por bloco sempre que possível.
- Preferir condicionais explícitas a expressões excessivamente compactas.
- Separar captura de dados, processamento e atualização de interface quando isso ajudar a explicar o fluxo.
- Usar valores de exemplo concretos e legíveis em vez de placeholders abstratos.
- Em exercícios e exemplos, deixar claro o estado principal da aplicação: variáveis, arrays, objetos, sessão, formulário ou DOM.
- Quando houver validação, explicar com comentário curto o motivo da regra.

## Como comentar

Usar comentários curtos e úteis, por exemplo:

```js
// Guarda as tarefas em memória para podermos redesenhar a lista sempre que algo mudar.
let tarefas = [];
```

```js
// Se o campo estiver vazio, não faz sentido criar uma tarefa sem texto.
if (descricao === "") {
    return;
}
```

```php
// Fecha a sessão do usuário para impedir acesso às páginas protegidas.
session_destroy();
```

Evitar comentários assim:

```js
// Incrementa i
i++;
```

## Critérios de qualidade

- O arquivo pode ser entendido por alguém que está vendo o conteúdo pela primeira vez.
- O código favorece explicação em aula e manutenção pelo estudante.
- Os nomes ajudam a prever o papel de cada parte.
- Os comentários orientam a leitura sem poluir o arquivo.
- A solução não depende de conhecimento acima do nível esperado para a seção.

## Recurso de apoio

Antes de concluir, ler `references/revisao-final.md` e corrigir qualquer item que ainda não esteja claro o suficiente para uso didático.

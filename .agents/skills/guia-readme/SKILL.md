---
name: guia-readme
description: Transforme READMEs de seções, aulas, tópicos e mini-projetos em guias didáticos de referência em PT-BR. Use ao criar, ampliar, revisar ou padronizar material de aula, guia prático, enunciado, documentação de API ou base textual para slides, mantendo exemplos reais, progressão pedagógica e referências de exercícios sincronizadas.
---

# Guia de READMEs

Produza um material que possa ser consultado depois da aula: mais completo que um slide, menor que um capítulo de livro e alinhado ao código real da seção.

## Contexto obrigatório

Antes de editar:

1. leia o README atual por inteiro;
2. inspecione os arquivos e exemplos reais da seção;
3. leia um ou dois guias vizinhos para calibrar profundidade;
4. identifique o conteúdo já estudado, o foco da seção e o conteúdo futuro que não pode ser exigido;
5. localize todas as menções a exemplos e exercícios.

Não trate exemplo e exercício como sinônimos. Preserve exemplos válidos quando eles continuarem como referência. Quando a lista de exercícios for substituída, remova as referências antigas e inclua somente os caminhos finais.

## Tipos de guia

Escolha a estrutura conforme o material.

### Referência conceitual

Use para linguagem, arrays, DOM, eventos, formulários, sessões e arquivos:

1. visão geral e objetivos;
2. conceitos fundamentais;
3. mecanismo ou sintaxe;
4. exemplos pequenos;
5. comparações importantes;
6. erros comuns e boas práticas;
7. exemplos reais e exercícios propostos;
8. resumo.

### Guia prático

Use para uma implementação orientada:

1. objetivo;
2. ponto de partida;
3. sequência de implementação;
4. trechos mínimos de apoio;
5. comportamento verificável;
6. erros comuns.

### Enunciado

Use para exercício:

1. contexto e objetivo;
2. dados e estado;
3. ações ou operações;
4. regras e validações;
5. saída esperada;
6. conceitos trabalhados;
7. critérios de verificação.

### API ou back-end

Documente:

1. arquivos e responsabilidades;
2. entrada e validação;
3. sequência da operação;
4. resposta e códigos HTTP;
5. erros esperados;
6. segurança, sessão ou persistência relevante.

## Escrita didática

- Escreva em PT-BR correto, com acentuação.
- Apresente o conceito antes do exemplo.
- Use frases diretas e nomes coerentes com o projeto.
- Mostre exemplos curtos, executáveis e compatíveis com a seção.
- Explique diferenças que costumam causar erros.
- Não aumente o arquivo apenas repetindo a mesma ideia.
- Não antecipe conteúdo futuro para “melhorar” artificialmente a solução.

## Código e precisão

Confira:

- se o exemplo corresponde ao comportamento real da linguagem ou API;
- se os caminhos citados existem;
- se nenhuma afirmação contradiz o repositório;
- se entrada, validação, transformação e saída estão diferenciadas;
- se padrões inseguros aparecem apenas para crítica explícita;
- se o JSON, SQL, formulário ou sessão segue o contrato usado no projeto.

## Sincronização com exercícios e slides

Quando a seção possuir práticas:

- descreva em uma linha o desafio central de cada exercício;
- use links relativos para o caminho real;
- não mantenha uma lista antiga “para referência” quando o pedido for substituí-la;
- evite títulos genéricos que escondam exercícios repetidos;
- ordene as propostas por progressão ou contraste didático;
- deixe blocos curtos o bastante para serem resumidos nos slides.

Depois de editar o guia, procure no guia e no slide correspondente por caminhos antigos, títulos removidos e termos como `exercicios/ex`.

## Revisão final

Leia [CHECKLIST.md](./CHECKLIST.md) e confirme:

- progressão do básico ao importante;
- teto pedagógico respeitado;
- exemplos reais preservados;
- exercícios atuais e caminhos corretos;
- Markdown consistente;
- resumo que acrescenta fechamento em vez de repetir parágrafos.

Use [README-TEMPLATE.md](./README-TEMPLATE.md) somente como ponto de partida. Adapte a estrutura ao tipo de material.

# Exercício Introdutório: Perfil do Estudante

## Objetivo

Imagine que o sistema escolar precise renderizar um cartão de perfil individual do estudante. Cada registro possui campos nomeados (como nome, turma, curso e média), mas alguns dados podem ser opcionais ou ainda não cadastrados (como telefone ou observações pedagógicas).

O objetivo desta atividade é praticar a criação de um **array associativo**, o acesso a valores por chaves textuais e o uso do **operador de coalescência nula (`??`)** para fornecer valores padrão seguros sem disparar avisos no PHP.

## Conceito central

Pratique o operador `=>` para associar chaves e valores, a leitura `$array["campo"]` e a prevenção de erros de chave ausente com `$array["campo"] ?? "Valor padrão"`.

## Solução completa

A resposta completa está em [index.php](./index.php) e [style.css](./style.css). Tente resolver o enunciado antes de consultá-la. Depois, compare sua solução com esses arquivos.

## Dados iniciais

No início do `index.php`, crie um array associativo representando o registro do estudante:

```php
$estudante = [
    "nome" => "Beatriz Ramos",
    "matricula" => "202410",
    "curso" => "Técnico em Informática",
    "turma" => "2AT",
    "media" => 8.7,
    "ativo" => true
    // O campo "telefone" e "observacao" não existem propositalmente
];
```

## O que você deve construir

1. **Leitura segura de dados:**
   - Acesse os campos obrigatórios existentes (`nome`, `matricula`, `curso`, `turma`, `media`, `ativo`).
   - Leia o campo `"telefone"` com o operador `??`, atribuindo `"Não informado"` caso o campo não exista.
   - Leia o campo `"observacao"` com o operador `??`, atribuindo `"Nenhuma pendência registrada"` como padrão.
2. **Formatação de apresentação:**
   - Formate a média escolar com uma casa decimal utilizando `number_format($estudante["media"], 1, ",", ".")`.
   - Crie uma variável para indicar a situação da matrícula (`"Matrícula Ativa"` se `$estudante["ativo"]` for `true`, ou `"Matrícula Trancada"` caso contrário).
3. **Cartão de perfil em HTML:**
   - Monte um cartão com cabeçalho destacando o nome do estudante e sua matrícula.
   - Apresente os dados em uma grade ou lista de campos com rótulos em negrito (`Curso`, `Turma`, `Média Geral`, `Telefone de Contato`, `Observação`).
   - Aplique uma classe visual no indicador de status conforme a situação da matrícula.

## Conceitos trabalhados

- Arrays associativos e operador `=>`.
- Acesso por chaves textuais.
- Operador de coalescência nula (`??`) para tratamento defensivo de campos ausentes.
- Formatação numérica com `number_format()`.
- Expressão ternária para determinação de rótulos de status.

## Critérios de verificação

- Com os dados de referência:
  - **Nome:** Beatriz Ramos.
  - **Matrícula:** 202410 | **Turma:** 2AT.
  - **Média:** `8,7`.
  - **Telefone:** deve exibir `"Não informado"` sem gerar nenhum aviso (*Notice/Warning: Undefined array key*).
  - **Observação:** deve exibir `"Nenhuma pendência registrada"`.
  - **Situação:** `"Matrícula Ativa"`.

# Exercício: Auditoria de Matrículas

## Objetivo

A secretaria acadêmica recebeu um lote de cadastros de estudantes importados de uma planilha externa. Para autorizar a emissão dos crachás institucionais e a liberação de acesso, é necessário realizar uma **auditoria de dados**.

O objetivo deste exercício é inspecionar uma coleção de registros de estudantes, detectar inconsistências (como duplicidades de matrícula, campos obrigatórios ausentes e incoerências de status) e gerar um **painel de diagnóstico** com resumo estatístico e lista detalhada das pendências, **sem alterar o array original**.

## Solução completa

A resposta completa está em [index.php](./index.php) e [style.css](./style.css). Tente resolver o enunciado antes de consultá-la. Depois, compare sua solução com esses arquivos.

## Dados iniciais

Crie um array multidimensional contendo os registros de estudantes a serem auditados:

```php
$estudantes = [
    [
        "matricula" => "202401",
        "nome" => "Ana Souza",
        "turma" => "2AT",
        "email" => "ana@ifsul.edu.br",
        "ativo" => true
    ],
    [
        "matricula" => "202402",
        "nome" => "",
        "turma" => "2AM",
        "email" => "pedro@ifsul.edu.br",
        "ativo" => true
    ],
    [
        "matricula" => "202401",
        "nome" => "Carlos Lima",
        "turma" => "",
        "email" => "carlos@ifsul.edu.br",
        "ativo" => true
    ],
    [
        "matricula" => "202404",
        "nome" => "Beatriz Silva",
        "turma" => "2AT",
        "email" => "",
        "ativo" => true
    ],
    [
        "matricula" => "202405",
        "nome" => "Lucas Rocha",
        "turma" => "",
        "email" => "lucas@ifsul.edu.br",
        "ativo" => false
    ]
];
```

## O que você deve construir

1. **Detecção prévia de duplicidades:**
   - Extraia a coluna de matrículas com `array_column($estudantes, "matricula")`.
   - Conte a frequência de cada número com `array_count_values()`. Uma matrícula com contagem maior que 1 é considerada duplicada no lote e afeta todos os registros que compartilham aquele número.

2. **Auditoria registro a registro:**
   - Percorra o array de estudantes acumulando os erros de cada um em uma lista de mensagens. Um mesmo estudante pode acumular múltiplos problemas.
   - Aplique as seguintes regras:
     - **Nome obrigatório:** campo `"nome"` vazio ou em branco.
     - **E-mail obrigatório:** campo `"email"` vazio ou em branco.
     - **Turma de ativo:** se `"ativo"` for `true`, o campo `"turma"` não pode estar vazio. (Estudantes inativos podem ficar sem turma).
     - **Matrícula única:** a matrícula não pode aparecer repetida no lote.

3. **Painel de métricas da auditoria:**
   - Calcule e apresente no topo da página:
     - **Total de cadastros analisados.**
     - **Registros regulares:** quantidade e porcentagem sobre o total.
     - **Registros com pendência:** quantidade e porcentagem sobre o total.
     - **Contagem por tipo de erro:** quantas vezes cada problema ocorreu no conjunto (ex.: 2 matrículas duplicadas, 1 nome em branco, 1 e-mail ausente, 1 ativo sem turma).

4. **Tabela de registros pendentes:**
   - Renderize uma tabela HTML contendo **apenas os registros que apresentaram inconsistências**.
   - Para cada estudante irregular, mostre seus dados e uma lista de badges ou tags indicando todos os motivos da reprovação.

## Conceitos trabalhados

- Arrays de registros (arrays de arrays associativos).
- Extração de propriedades com `array_column()`.
- Análise de frequências com `array_count_values()`.
- Validação defensiva de campos com `isset()` e `??`.
- Acumulação de erros e agrupamento de estatísticas.
- Separação entre coleção de origem e estruturas de diagnóstico.

## Critérios de verificação

- Com o lote de teste fornecido:
  - **Total de registros:** 5.
  - **Regulares:** 1 (Lucas Rocha — *Lucas está regular pois está inativo, não exigindo turma*).
  - **Com pendência:** 4 (Ana Souza e Carlos Lima pela duplicação de `202401`, Pedro pelo nome ausente e Beatriz pelo e-mail ausente).
  - **Percentual de conformidade:** 20,0% regulares e 80,0% com pendência.
  - **Problemas por estudante:**
    - `202401 (Ana Souza)`: Matrícula duplicada no lote.
    - `202402 (Pedro)`: Nome obrigatório ausente.
    - `202401 (Carlos Lima)`: Matrícula duplicada no lote **E** Estudante ativo sem turma.
    - `202404 (Beatriz Silva)`: E-mail institucional ausente.
  - **Frequência total de falhas:** 2 matrículas duplicadas (duas ocorrências do código 202401), 1 nome ausente, 1 e-mail ausente, 1 ativo sem turma (Total de 5 alertas emitidos).

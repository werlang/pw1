# Exercício: Exportador de Frequência

## Objetivo

Gerar um arquivo para download sob demanda, sem manter cópias desnecessárias no servidor.

## Dados

Use um array de estudantes com presenças, faltas e total de encontros.

## Requisitos

- receber por GET a turma e o limite mínimo de frequência;
- selecionar os registros da turma;
- calcular o percentual individual;
- gerar CSV com cabeçalho e situação final;
- enviar `Content-Type` e `Content-Disposition` adequados;
- usar um fluxo de saída que respeite a estrutura do CSV e encerrar o script.

## Conceitos trabalhados

Geração de CSV, `fputcsv()`, stream de saída, cabeçalhos HTTP, download e cálculo derivado.

## Critérios de verificação

- o navegador deve baixar um CSV válido;
- nomes com vírgulas ou aspas precisam permanecer corretos;
- a rota de download não deve misturar HTML com o conteúdo do arquivo.

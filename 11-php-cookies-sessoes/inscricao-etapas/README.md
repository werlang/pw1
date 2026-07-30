# Exercício: Inscrição em Etapas

## Objetivo

Usar a sessão como rascunho de um processo que atravessa várias páginas e permite voltar sem perder respostas.

## Requisitos

- dividir a inscrição em identificação, escolhas, revisão e confirmação;
- salvar na sessão somente dados validados de cada etapa;
- impedir acesso a uma etapa quando a anterior não foi concluída;
- permitir voltar e editar respostas;
- oferecer cancelamento que apague apenas o rascunho;
- após confirmar, mostrar um protocolo e limpar o fluxo da sessão.

## Conceitos trabalhados

Objeto de sessão, fluxo por etapas, pré-condições, rascunho temporário e limpeza seletiva.

## Critérios de verificação

- abrir diretamente a etapa final deve redirecionar para a etapa pendente;
- voltar não pode apagar dados já válidos;
- confirmar duas vezes não pode duplicar o resultado.

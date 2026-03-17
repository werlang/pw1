# Scripts auxiliares

Esta pasta reúne scripts de apoio para preparar um ambiente portátil no Windows para as aulas e exercícios deste repositório.

Os arquivos aqui não fazem parte diretamente dos exemplos e exercícios de Programação Web I. Eles servem para automatizar a instalação de ferramentas que podem ser usadas em laboratório, pendrive ou máquinas sem configuração prévia.

## Arquivos

### `usbwebserver.bat`

Baixa a versão mais recente do **USBWebServer** a partir do GitHub, extrai os arquivos na pasta atual, cria um atalho para o executável e remove o arquivo `.zip` temporário.

Uso típico:

1. Abra o Prompt de Comando no diretório em que deseja instalar o USBWebServer.
2. Execute `usbwebserver.bat`.
3. Aguarde a criação do atalho `USBWebServer.lnk`.

### `vscp.bat`

Baixa a versão `.zip` estável do **Visual Studio Code** para Windows, extrai os arquivos em uma pasta `vscode`, cria uma pasta `data`, e gera o atalho `VSCode Portable.lnk`.

Esse script foi pensado para um uso portátil do VS Code, mantendo os dados da aplicação fora da pasta principal do editor.

Uso típico:

1. Abra o Prompt de Comando no diretório em que deseja preparar o VS Code portátil.
2. Execute `vscp.bat`.
3. Abra o editor pelo atalho `VSCode Portable.lnk`.

## Requisitos

- Windows
- `PowerShell` disponível no sistema
- Conexão com a internet para download dos arquivos

## Observações

- Os scripts foram feitos para execução local em Windows e não têm utilidade em macOS ou Linux.
- Se o download falhar, verifique a conexão com a internet e possíveis bloqueios da rede.
- É recomendável executar esses scripts em uma pasta própria, pois os arquivos baixados e extraídos serão criados no diretório atual.

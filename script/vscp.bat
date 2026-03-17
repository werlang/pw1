@echo off
setlocal EnableDelayedExpansion

:: 1. Definir variaveis
set "DOWNLOAD_URL=https://code.visualstudio.com/sha/download?build=stable&os=win32-x64-archive"
set "ZIP_FILE=vscode.zip"
set "DEST_DIR=vscode"
set "SHORTCUT_NAME=VSCode Portable.lnk"
set "GIT_EXE="
set "WINGET_EXE="

call :ENSURE_GIT
if %ERRORLEVEL% neq 0 (
    echo [!] Ocorreu um erro ao configurar o Git.
    pause
    exit /b %ERRORLEVEL%
)

:: 2. Verificacao de idempotencia
if exist "%CD%\%DEST_DIR%\Code.exe" (
    echo [*] Executavel do Visual Studio Code encontrado em '%DEST_DIR%'.
    echo [*] Download e extracao serao ignorados.
    goto :MAP_DATA
)

:: Se nao existir, fazer download
call :DOWNLOAD_AND_EXTRACT
if %ERRORLEVEL% neq 0 (
    echo [!] Ocorreu um erro durante a configuracao.
    pause
    exit /b %ERRORLEVEL%
)

:MAP_DATA
:: 3. Inicializar diretorio local de dados do VS Code
echo [*] Inicializando diretorio local de dados...
if exist "%CD%\%DEST_DIR%\data\" (
    rmdir /S /Q "%CD%\%DEST_DIR%\data"
)
mkdir "%CD%\%DEST_DIR%\data"
echo     Diretorio 'data' criado vazio dentro de '%DEST_DIR%'.

:: 4. Criacao do atalho do aplicativo
echo [*] Criando atalho do aplicativo...
set "TARGET_PATH=%CD%\%DEST_DIR%\Code.exe"
set "WORKING_DIR=%CD%\%DEST_DIR%"
set "SHORTCUT_PATH=%CD%\%SHORTCUT_NAME%"

powershell -NoProfile -Command "$wshell = New-Object -ComObject WScript.Shell; $shortcut = $wshell.CreateShortcut('%SHORTCUT_PATH%'); $shortcut.TargetPath = '%TARGET_PATH%'; $shortcut.WorkingDirectory = '%WORKING_DIR%'; $shortcut.Save()"

echo.
echo Configuracao concluida. O Visual Studio Code esta pronto.
endlocal
pause
exit /b

:: --- Sub-rotinas ---

:ENSURE_GIT
call :LOCATE_GIT
if defined GIT_EXE (
    echo [*] Git encontrado em "!GIT_EXE!".
    call :CONFIGURE_GIT
    goto :eof
)

echo [*] Git nao foi encontrado neste computador.
choice /C SN /M "Deseja instalar o Git agora usando o winget?"
if errorlevel 2 (
    echo [*] Instalacao do Git ignorada pelo usuario.
    goto :eof
)

call :INSTALL_GIT
if %ERRORLEVEL% neq 0 goto :eof

call :LOCATE_GIT
if not defined GIT_EXE (
    echo [!] O Git foi instalado, mas o executavel nao foi localizado automaticamente.
    exit /b 1
)

call :CONFIGURE_GIT
goto :eof

:LOCATE_WINGET
set "WINGET_EXE="
for /f "delims=" %%G in ('where winget 2^>nul') do (
    set "WINGET_EXE=%%G"
    goto :eof
)
goto :eof

:LOCATE_GIT
set "GIT_EXE="
for /f "delims=" %%G in ('where git 2^>nul') do (
    set "GIT_EXE=%%G"
    goto :eof
)

if exist "%ProgramFiles%\Git\cmd\git.exe" set "GIT_EXE=%ProgramFiles%\Git\cmd\git.exe"
if not defined GIT_EXE if exist "%ProgramFiles%\Git\bin\git.exe" set "GIT_EXE=%ProgramFiles%\Git\bin\git.exe"
if not defined GIT_EXE if exist "%LocalAppData%\Programs\Git\cmd\git.exe" set "GIT_EXE=%LocalAppData%\Programs\Git\cmd\git.exe"
if not defined GIT_EXE if exist "%LocalAppData%\Programs\Git\bin\git.exe" set "GIT_EXE=%LocalAppData%\Programs\Git\bin\git.exe"
goto :eof

:INSTALL_GIT
call :LOCATE_WINGET
if not defined WINGET_EXE (
    echo [!] O winget nao foi encontrado neste computador.
    echo [!] Instale o App Installer da Microsoft e execute o script novamente.
    exit /b 1
)

echo [*] Instalando o Git com winget em modo silencioso...
"!WINGET_EXE!" install --id Git.Git -e --source winget --silent --accept-source-agreements --accept-package-agreements --custom "/o:PathOption=Cmd"
if %ERRORLEVEL% neq 0 (
    echo [!] Falha ao instalar o Git com winget.
    exit /b %ERRORLEVEL%
)

echo [*] Instalacao do Git concluida.
goto :eof

:CONFIGURE_GIT
set "GIT_USER_NAME="
set "GIT_USER_EMAIL="

for /f "usebackq delims=" %%G in (`"!GIT_EXE!" config --global --get user.name 2^>nul`) do set "GIT_USER_NAME=%%G"
for /f "usebackq delims=" %%G in (`"!GIT_EXE!" config --global --get user.email 2^>nul`) do set "GIT_USER_EMAIL=%%G"

if defined GIT_USER_NAME if defined GIT_USER_EMAIL (
    echo [*] Git ja possui user.name e user.email configurados.
    goto :eof
)

echo [*] Configurando identificacao do Git...
if not defined GIT_USER_NAME set /p GIT_USER_NAME=Informe o user.name do Git: 
if not defined GIT_USER_EMAIL set /p GIT_USER_EMAIL=Informe o user.email do Git: 

if not defined GIT_USER_NAME (
    echo [!] O user.name nao foi informado.
    exit /b 1
)

if not defined GIT_USER_EMAIL (
    echo [!] O user.email nao foi informado.
    exit /b 1
)

"!GIT_EXE!" config --global user.name "!GIT_USER_NAME!"
if %ERRORLEVEL% neq 0 (
    echo [!] Falha ao configurar o user.name do Git.
    exit /b %ERRORLEVEL%
)

"!GIT_EXE!" config --global user.email "!GIT_USER_EMAIL!"
if %ERRORLEVEL% neq 0 (
    echo [!] Falha ao configurar o user.email do Git.
    exit /b %ERRORLEVEL%
)

echo [*] Git configurado com sucesso.
goto :eof

:DOWNLOAD_AND_EXTRACT
echo [*] Baixando a versao mais recente do Visual Studio Code (zip 64-bit)...
curl -L "%DOWNLOAD_URL%" -o "%ZIP_FILE%"
if %ERRORLEVEL% neq 0 exit /b %ERRORLEVEL%

echo [*] Extraindo o arquivo...
powershell -NoProfile -Command "Expand-Archive -Path '%ZIP_FILE%' -DestinationPath '%DEST_DIR%' -Force"
if %ERRORLEVEL% neq 0 exit /b %ERRORLEVEL%

echo [*] Limpando arquivos temporarios...
del "%ZIP_FILE%"
goto :eof
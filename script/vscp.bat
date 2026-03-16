@echo off
setlocal EnableDelayedExpansion

:: 1. Define variables
set "DOWNLOAD_URL=https://code.visualstudio.com/sha/download?build=stable&os=win32-x64-archive"
set "ZIP_FILE=vscode.zip"
set "DEST_DIR=vscode"
set "SHORTCUT_NAME=VSCode Portable.lnk"

:: 2. Idempotency Check
if exist "%CD%\%DEST_DIR%\Code.exe" (
    echo [*] Visual Studio Code executable detected in '%DEST_DIR%'.
    echo [*] Skipping download and extraction phases.
    goto :MAP_DATA
)

:: If not exist, proceed to Download
call :DOWNLOAD_AND_EXTRACT
if %ERRORLEVEL% neq 0 (
    echo [!] An error occurred during setup.
    pause
    exit /b %ERRORLEVEL%
)

:MAP_DATA
:: 3. Real-Time Data Mapping (Directory Junction)
echo [*] Configuring Real-Time Data Mapping (Directory Junction)...
if not exist "%CD%\data\" (
    echo     Creating source 'data' directory.
    mkdir "%CD%\data"
)

if exist "%CD%\%DEST_DIR%\data\" (
    rmdir /S /Q "%CD%\%DEST_DIR%\data"
)

:: Create the Junction (Requires NTFS)
mklink /J "%CD%\%DEST_DIR%\data" "%CD%\data" >nul
echo     Directory Junction created.

:: 4. Application Shortcut Generation
echo [*] Creating application shortcut...
set "TARGET_PATH=%CD%\%DEST_DIR%\Code.exe"
set "WORKING_DIR=%CD%\%DEST_DIR%"
set "SHORTCUT_PATH=%CD%\%SHORTCUT_NAME%"

powershell -NoProfile -Command "$wshell = New-Object -ComObject WScript.Shell; $shortcut = $wshell.CreateShortcut('%SHORTCUT_PATH%'); $shortcut.TargetPath = '%TARGET_PATH%'; $shortcut.WorkingDirectory = '%WORKING_DIR%'; $shortcut.Save()"

echo.
echo Setup complete. Visual Studio Code is ready.
endlocal
pause
exit /b

:: --- Subroutines (Prevents "Unexpected at this time" errors) ---

:DOWNLOAD_AND_EXTRACT
echo [*] Downloading the latest Visual Studio Code (64-bit zip)...
:: Using quotes here outside of an IF block is much safer
curl -L "%DOWNLOAD_URL%" -o "%ZIP_FILE%"

echo [*] Extracting archive...
powershell -NoProfile -Command "Expand-Archive -Path '%ZIP_FILE%' -DestinationPath '%DEST_DIR%' -Force"

echo [*] Cleaning up temporary files...
del "%ZIP_FILE%"
goto :eof
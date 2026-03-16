@echo off
setlocal EnableDelayedExpansion

:: Define variables
set "REPO=grimgravy/USBWebServer"
set "ZIP_FILE=USBWebServer_Latest.zip"
set "DEST_DIR=%CD%"
set "SHORTCUT_NAME=USBWebServer.lnk"

echo [1/4] Querying GitHub API and downloading the latest release...
powershell -NoProfile -Command "$ProgressPreference = 'SilentlyContinue'; $release = Invoke-RestMethod -Uri 'https://api.github.com/repos/%REPO%/releases/latest'; $asset = $release.assets | Where-Object { $_.name -match '\.zip$' } | Select-Object -First 1; if (-not $asset) { throw 'No ZIP file found in the latest release.' }; Write-Host 'Downloading:' $asset.name; Invoke-WebRequest -Uri $asset.browser_download_url -OutFile '%ZIP_FILE%'"

:: Verify download success
if not exist "%ZIP_FILE%" (
    echo [!] Download failed. Please verify your network connection or check GitHub API rate limits.
    pause
    exit /b 1
)

echo [2/4] Extracting archive to the current folder...
powershell -NoProfile -Command "$ProgressPreference = 'SilentlyContinue'; Expand-Archive -Path '%ZIP_FILE%' -DestinationPath '%DEST_DIR%' -Force"

echo [3/4] Locating executable and creating application shortcut...
:: Locate the executable dynamically to bypass unpredictable zip root folder names
set "TARGET_PATH="
for /f "delims=" %%I in ('dir /b /s "%DEST_DIR%\usbwebserver.exe" 2^>nul') do set "TARGET_PATH=%%I"

if defined TARGET_PATH (
    :: Isolate the working directory from the absolute executable path
    for %%F in ("!TARGET_PATH!") do set "WORKING_DIR=%%~dpF"
    set "SHORTCUT_PATH=%CD%\%SHORTCUT_NAME%"

    :: Instantiate COM Object to generate the .lnk file natively
    powershell -NoProfile -Command "$wshell = New-Object -ComObject WScript.Shell; $shortcut = $wshell.CreateShortcut('!SHORTCUT_PATH!'); $shortcut.TargetPath = '!TARGET_PATH!'; $shortcut.WorkingDirectory = '!WORKING_DIR!'; $shortcut.Save()"
    echo      Shortcut '%SHORTCUT_NAME%' created successfully.
) else (
    echo      [!] Executable 'usbwebserver.exe' not found in the extracted files. Shortcut creation skipped.
)

echo [4/4] Cleaning up temporary files...
del "%ZIP_FILE%"

echo.
echo Setup complete. USBWebServer has been successfully extracted and the shortcut is ready.
endlocal
pause
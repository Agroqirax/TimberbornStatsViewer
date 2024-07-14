@echo off
setlocal

:: Check for admin privileges
>nul 2>&1 "%SYSTEMROOT%\system32\cacls.exe" "%SYSTEMROOT%\system32\config\system"

if '%errorlevel%' NEQ '0' (
    echo.
    echo This script requires administrator privileges.
    echo Please run as administrator by selecting install.bat -> Run as administrator.
    pause
    exit /b
)

:: Prompt user to proceed
echo Setup will make the following changes:
echo.
echo 1) Copy .\timber.ico to %USERPROFILE%\icons\timber.ico (or user preferrence) ([31mDO NOT REMOVE THE NEW FILE FROM THIS LOCATION[0m)
echo 2) Add HKCR\.timber to the registry with value timber_auto_file (preperation for next steps)
echo 3) Add HKCR\.timber\DefaultIcon to the registry with value %USERPROFILE%\icons\timber.ico (file icon)
echo 4) Add HKCR\timber_auto_file to the registry with value `Timberborn Saved Game or Map` (or user prefference) (file description)
echo 5) Add HKCR\timber_auto_file\DefaultIcon with value %USERPROFILE%\icons\timber.ico (redundant file icon)
echo.
set /p proceed=Do you want to proceed with the setup? (y/n): 
if /i not "%proceed%"=="y" (
    echo Setup aborted.
    exit /b
)

:: Set default icon path and prompt user for destination
set "defaultIconPath=%USERPROFILE%\icons"
echo.
set /p iconPath=Enter the destination path for timber.ico (leave empty to use default: %defaultIconPath%\timber.ico): 
if "%iconPath%"=="" (
    set "iconPath=%defaultIconPath%"
)

:: Create the destination directory if it doesn't exist
if not exist "%iconPath%" (
    mkdir "%iconPath%"
    attrib +h %iconPath%
)

:: Move timber.ico to the specified location
copy "%~dp0timber.ico" "%iconPath%\timber.ico"
if %errorlevel% neq 0 (
    echo Failed to move timber.ico.
    exit /b
)

:: Set registry entries
set "fileTypeDescription=Timberborn Saved Game or Map"
echo.
set /p fileTypeDesc=Enter the file type description (leave empty to use default: %fileTypeDescription%): 
echo.
if not "%fileTypeDesc%"=="" (
    set "fileTypeDescription=%fileTypeDesc%"
)

:: Add registry entries
reg add "HKCR\.timber" /ve /d "timber_auto_file" /f
reg add "HKCR\.timber\DefaultIcon" /ve /d "%iconPath%\timber.ico" /f
reg add "HKCR\timber_auto_file" /ve /d "%fileTypeDescription%" /f
reg add "HKCR\timber_auto_file\DefaultIcon" /ve /d "%iconPath%\timber.ico" /f

echo.
echo [32mSetup completed successfully.[0m
echo.
echo You can now safely delete install.bat and timber.ico from %~dp0
echo [31mDO NOT REMOVE timber.ico FROM %iconPath%\timber.ico[0m
echo.

pause
endlocal
exit /b

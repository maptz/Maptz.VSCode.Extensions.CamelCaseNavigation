@ECHO OFF
REM You need to make sure you've got an up to date PersonalAccessToken from VSTS 
REM https://dev.azure.com/maptz/maptz-vscode-extensions
REM See https://code.visualstudio.com/api/working-with-extensions/publishing-extension
REM Then go to Security (https://maptz.visualstudio.com/_details/security/tokens)

set location=%cd%
cd /D "%~dp0/../"
echo %cd%

 FOR /F "delims=" %%i in ('menv get VSCodePersonalAccessToken')  do @set accesscode=%%i
echo publishing with accesscode %AccessCode%
vsce publish -p %AccessCode%
cd /D %location%
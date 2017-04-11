@echo off
set loc=%cd%
cd "../src"
npm run-script vscode:prepublish
cd %loc%
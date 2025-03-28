@echo off
cls
echo Cleaning up and restarting server...

:: Kill any running Node.js processes
echo Stopping any running Node.js processes...
taskkill /F /IM node.exe /T 2>nul

:: Remove node_modules
echo Removing node_modules...
rd /s /q node_modules

:: Clean npm cache logs
del /s /q "%LOCALAPPDATA%\npm-cache\_logs\*.*" 2>nul

:: Install dependencies
echo Installing dependencies...
call npm install

:: Start Expo with cleared cache
echo Starting Expo server with cleared cache...
set NODE_ENV=development
npx expo start --clear

pause 
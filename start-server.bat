@echo off
REM Mediro Website Server - Keep Running
REM This script starts both development and production servers

cd /d "%~dp0"

echo.
echo ╔═════════════════════════════════════════════════════════════╗
echo ║        🌐 MEDIRO - WORLDWIDE DEPLOYMENT STARTED 🌐         ║
echo ╚═════════════════════════════════════════════════════════════╝
echo.
echo ✅ Starting Production Server on Port 8000...
echo.
echo 📱 SHARE THIS URL:
echo    http://172.31.133.189:8000
echo.
echo ℹ️  Keep this window open. DO NOT CLOSE IT.
echo.
echo 🔄 Server will restart automatically if it crashes.
echo.

:start_server
cd dist
python -m http.server 8000
echo.
echo ⚠️  Server stopped. Restarting in 5 seconds...
timeout /t 5 /nobreak
cd ..
goto start_server

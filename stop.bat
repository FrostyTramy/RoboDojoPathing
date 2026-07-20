@echo off
echo Stopping dev servers...
for /f "tokens=5" %%a in ('netstat -aon ^| findstr ":5173 "') do taskkill /PID %%a /F >nul 2>&1
for /f "tokens=5" %%a in ('netstat -aon ^| findstr ":5174 "') do taskkill /PID %%a /F >nul 2>&1
echo Done.
pause

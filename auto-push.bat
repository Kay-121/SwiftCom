@echo off
echo 🚀 Starting SwiftCom auto-push watcher...
echo 📁 Watching directory: %CD%
echo 🌐 Remote: origin/main

:check_git
echo 🔍 Checking Git configuration...
git config user.name >nul 2>&1
if %errorlevel% neq 0 (
    echo ⚠️ Git user not configured. Please run:
    echo    git config --global user.name "Your Name"
    echo    git config --global user.email "your.email@example.com"
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('git config user.name') do set GIT_USER=%%i
for /f "tokens=*" %%i in ('git config user.email') do set GIT_EMAIL=%%i
echo 👤 Git user: %GIT_USER% <%GIT_EMAIL%>

:watch_loop
echo.
echo 👀 Monitoring for changes... (Press Ctrl+C to stop)

:check_changes
git status --porcelain >temp_status.txt 2>&1
set /p STATUS=<temp_status.txt
del temp_status.txt

if "%STATUS%"=="" (
    echo ℹ️ No changes detected
) else (
    echo 📝 Changes detected, preparing to commit...
    
    echo 📁 Adding files to staging area...
    git add .
    if %errorlevel% neq 0 (
        echo ❌ Error adding files
        goto wait_loop
    )
    echo ✅ Files added to staging area
    
    echo 📝 Committing changes...
    set COMMIT_MSG=Auto-commit: Website changes detected at %date% %time%
    git commit -m "%COMMIT_MSG%"
    if %errorlevel% neq 0 (
        echo ❌ Error committing changes
        goto wait_loop
    )
    echo ✅ Changes committed successfully
    
    echo 🚀 Pushing to GitHub...
    git push origin main
    if %errorlevel% neq 0 (
        echo ❌ Error pushing to GitHub
        echo 🔐 Please check your GitHub credentials or internet connection
        goto wait_loop
    )
    echo 🚀 Changes pushed to GitHub successfully!
    
    echo 📋 Changed files:
    git status --porcelain
)

:wait_loop
echo ⏳ Waiting 5 seconds before next check...
timeout /t 5 /nobreak >nul
goto check_changes

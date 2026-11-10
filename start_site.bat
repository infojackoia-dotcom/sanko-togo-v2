@echo off
title SANKO TOGO - Serveur Local
cd /d "%~dp0"
echo ===================================================
echo   Demarrage du site SANKO TOGO en local...
echo   Lien : http://localhost:3000/
echo ===================================================
npm.cmd run dev
pause


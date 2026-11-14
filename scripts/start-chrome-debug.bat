@echo off
title Launch Chrome with Remote Debugging (Port 9222)
echo ========================================================
echo   REVWORKS // Chrome Remote Debugging Launcher
echo ========================================================
echo.
echo Pastikan semua window Google Chrome kamu sudah ditutup rapat.
echo Tekan tombol apa saja untuk mulai restart Chrome dengan Remote Debugging...
pause >nul

echo Menutup proses Chrome yang masih nyangkut di background...
taskkill /IM chrome.exe /F >nul 2>&1
timeout /t 1 /nobreak >nul

echo Menjalankan Google Chrome dengan Remote Debugging (Port 9222)...
start "" "C:\Program Files\Google\Chrome\Application\chrome.exe" --remote-debugging-port=9222

echo.
echo ========================================================
echo   BERHASIL! Chrome sudah jalan dengan port debugging.
echo   DevToolsActivePort sekarang sudah aktif otomatis.
echo ========================================================
echo Window ini bisa kamu tutup.
timeout /t 3 >nul

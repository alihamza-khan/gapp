# GAPP Git Setup Script for Windows PowerShell
# Run this after installing Git: https://git-scm.com/download/win

Write-Host "=== GAPP Git Setup ===" -ForegroundColor Green

Write-Host "Configuring Git..." -ForegroundColor Cyan
git config --global user.name "Ali Hamza Khan"
git config --global user.email "ali@example.com"

Write-Host "Initializing repository..." -ForegroundColor Cyan
git init

Write-Host "Adding all files..." -ForegroundColor Cyan
git add .

Write-Host "Creating initial commit..." -ForegroundColor Cyan
git commit -m "Initial commit: Grocery app with Supabase integration and order management system"

Write-Host "Adding GitHub remote..." -ForegroundColor Cyan
git remote add origin https://github.com/alihamza-khan/gapp.git

Write-Host "Switching to main branch..." -ForegroundColor Cyan
git branch -M main

Write-Host "Pushing to GitHub..." -ForegroundColor Cyan
git push -u origin main

Write-Host ""
Write-Host "✓ Repository ready!" -ForegroundColor Green
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Go to https://vercel.com" -ForegroundColor White
Write-Host "2. Import your GitHub repository" -ForegroundColor White
Write-Host "3. Add environment variables:" -ForegroundColor White
Write-Host "   - NEXT_PUBLIC_SUPABASE_URL" -ForegroundColor Gray
Write-Host "   - NEXT_PUBLIC_SUPABASE_ANON_KEY" -ForegroundColor Gray
Write-Host "4. Deploy!" -ForegroundColor White

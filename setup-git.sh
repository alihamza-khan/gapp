#!/bin/bash
# GAPP Git Setup Script - Run this after installing Git

echo "Configuring Git..."
git config --global user.name "Ali Hamza Khan"
git config --global user.email "ali@example.com"

echo "Initializing repository..."
git init

echo "Adding all files..."
git add .

echo "Creating initial commit..."
git commit -m "Initial commit: Grocery app with Supabase integration and order management system"

echo "Adding GitHub remote..."
git remote add origin https://github.com/alihamza-khan/gapp.git

echo "Switching to main branch..."
git branch -M main

echo "Pushing to GitHub..."
git push -u origin main

echo ""
echo "? Repository ready!"
echo "Next steps:"
echo "1. Go to https://vercel.com"
echo "2. Import your GitHub repository"
echo "3. Add environment variables"
echo "4. Deploy!"

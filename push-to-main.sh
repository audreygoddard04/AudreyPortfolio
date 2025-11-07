#!/bin/bash

# Script to push entire portfolio to GitHub main branch
# Run this after resolving the Xcode license issue

cd /Users/audreygoddard/Desktop/All\ Folders/Code/AudreyPortfolio

# Initialize git if not already initialized
if [ ! -d .git ]; then
    git init
fi

# Add remote (or update if it exists)
git remote remove origin 2>/dev/null || true
git remote add origin https://github.com/audreygoddard04/AudreyPortfolio.git

# Add all files
git add .

# Commit changes
git commit -m "Push entire portfolio to main branch" || echo "Nothing to commit or commit failed"

# Check current branch and switch to main if needed
current_branch=$(git branch --show-current 2>/dev/null || echo "")
if [ -z "$current_branch" ]; then
    git checkout -b main 2>/dev/null || git branch -M main
elif [ "$current_branch" != "main" ]; then
    git checkout -b main 2>/dev/null || git branch -M main
fi

# Push to main branch
git push -u origin main --force || git push -u origin main

echo "Push to GitHub completed!"


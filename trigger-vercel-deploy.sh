#!/bin/bash

cd /Users/audreygoddard/Desktop/All\ Folders/Code/AudreyPortfolio

# Push an empty commit to trigger Vercel deployment
git commit --allow-empty -m "Trigger Vercel deployment"
git push

echo "Empty commit pushed to trigger Vercel deployment!"


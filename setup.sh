#!/bin/bash

# Placement Readiness Platform - Setup Script
# This script will help you get the application running

echo "🚀 Setting up Placement Readiness Platform..."
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed."
    echo "📦 Please install Node.js from: https://nodejs.org/"
    echo "   Or use your package manager:"
    echo "   Ubuntu/Debian: sudo apt install nodejs npm"
    echo "   macOS: brew install node"
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo "✅ npm version: $(npm --version)"
echo ""

# Navigate to the placement-app directory
cd "$(dirname "$0")/placement-app"

echo "📦 Installing dependencies..."
npm install

echo ""
echo "✅ Setup complete!"
echo ""
echo "To start the development server, run:"
echo "  cd placement-app"
echo "  npm run dev"
echo ""
echo "The application will be available at: http://localhost:5173"

#!/bin/bash

echo "🚀 Starting Vercel build process..."

# Navigate to the roam-admin directory
cd roam-admin

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Run the build
echo "🔨 Building the application..."
npm run build

echo "✅ Build completed successfully!"

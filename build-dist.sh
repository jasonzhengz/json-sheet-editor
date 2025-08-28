#!/bin/bash

echo "Building JSON Editor for distribution..."

# Clean previous builds
rm -rf dist/
rm -rf build/

echo "Installing dependencies..."
npm install

echo "Building React app..."
npm run build

echo "Building executable for current platform..."
npm run dist

echo "Build complete! Check the 'dist' folder for the executable files."
echo ""
echo "Available files:"
ls -la dist/
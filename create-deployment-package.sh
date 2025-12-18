#!/bin/bash

# AI PM Assessment V2 - Deployment Package Creator
# This script creates a clean deployment package with only necessary files

echo "🚀 Creating deployment package for Vercel..."

# Set the source directory (where this script is located)
SOURCE_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$SOURCE_DIR"

# Create deployment directory name with timestamp
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
DEPLOY_DIR="deployment-package-${TIMESTAMP}"

# Create temporary deployment directory
echo "📁 Creating deployment directory: ${DEPLOY_DIR}"
mkdir -p "$DEPLOY_DIR"

# Copy only the files needed for deployment
echo "📋 Copying deployment files..."

# Essential files
cp index.html "$DEPLOY_DIR/"
cp vercel.json "$DEPLOY_DIR/"
cp .vercelignore "$DEPLOY_DIR/"

# Check if files were copied successfully
if [ -f "$DEPLOY_DIR/index.html" ] && [ -f "$DEPLOY_DIR/vercel.json" ]; then
    echo "✅ Files copied successfully"

    # Create a ZIP file
    ZIP_NAME="ai-pm-assessment-v2-${TIMESTAMP}.zip"
    echo "📦 Creating ZIP file: ${ZIP_NAME}"

    # Create ZIP (compatible with macOS)
    cd "$DEPLOY_DIR"
    zip -r "../${ZIP_NAME}" .
    cd ..

    # Clean up temporary directory
    rm -rf "$DEPLOY_DIR"

    echo ""
    echo "✅ DEPLOYMENT PACKAGE CREATED SUCCESSFULLY!"
    echo ""
    echo "📦 Package: ${ZIP_NAME}"
    echo "📍 Location: ${SOURCE_DIR}/${ZIP_NAME}"
    echo ""
    echo "📋 NEXT STEPS:"
    echo "1. Go to https://vercel.com/new"
    echo "2. Click 'Upload' (not 'Import Git Repository')"
    echo "3. Upload the ZIP file: ${ZIP_NAME}"
    echo "4. Vercel will auto-detect settings from vercel.json"
    echo "5. Click 'Deploy'"
    echo ""
else
    echo "❌ Error: Failed to copy files"
    exit 1
fi

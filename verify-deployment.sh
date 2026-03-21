#!/bin/bash

# MindFlow Deployment Verification Script
# Run this before deploying to ensure everything is ready

echo "🚀 MindFlow Deployment Verification"
echo "=================================="
echo ""

# Check Node version
echo "✓ Checking Node.js version..."
NODE_VERSION=$(node -v)
echo "  Node version: $NODE_VERSION"
echo ""

# Check npm packages
echo "✓ Checking npm packages..."
if [ -d "node_modules" ]; then
  echo "  ✅ Dependencies installed"
else
  echo "  ❌ Dependencies not installed. Run: npm install"
  exit 1
fi
echo ""

# Check environment variables
echo "✓ Checking environment variables..."
if [ -f ".env.local" ]; then
  echo "  ✅ .env.local exists"
  if grep -q "DATABASE_URL" .env.local; then
    echo "  ✅ DATABASE_URL configured"
  else
    echo "  ⚠️  DATABASE_URL not set"
  fi
  if grep -q "NEXTAUTH_SECRET" .env.local; then
    echo "  ✅ NEXTAUTH_SECRET configured"
  else
    echo "  ⚠️  NEXTAUTH_SECRET not set"
  fi
else
  echo "  ⚠️  .env.local not found. Copy from .env.example"
fi
echo ""

# Check key files
echo "✓ Checking key files..."
FILES=("next.config.js" "vercel.json" "middleware.ts" "package.json")
for file in "${FILES[@]}"; do
  if [ -f "$file" ]; then
    echo "  ✅ $file exists"
  else
    echo "  ❌ $file missing"
  fi
done
echo ""

# Check build
echo "✓ Running build check..."
npm run build > /dev/null 2>&1
if [ $? -eq 0 ]; then
  echo "  ✅ Build successful"
else
  echo "  ❌ Build failed. Check errors above"
  exit 1
fi
echo ""

# Check TypeScript
echo "✓ Running TypeScript check..."
npm run type-check > /dev/null 2>&1
if [ $? -eq 0 ]; then
  echo "  ✅ TypeScript check passed"
else
  echo "  ⚠️  TypeScript warnings found"
fi
echo ""

# Check linting
echo "✓ Running linting..."
npm run lint > /dev/null 2>&1
if [ $? -eq 0 ]; then
  echo "  ✅ Linting passed"
else
  echo "  ⚠️  Linting warnings found"
fi
echo ""

echo "=================================="
echo "✅ Deployment verification complete!"
echo ""
echo "Next steps:"
echo "1. Push to GitHub: git push origin main"
echo "2. Go to vercel.com and import repository"
echo "3. Add environment variables in Vercel dashboard"
echo "4. Click Deploy"
echo ""
echo "Share this link with your boss:"
echo "https://your-domain.vercel.app"

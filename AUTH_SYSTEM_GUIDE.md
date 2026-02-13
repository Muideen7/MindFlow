# 🔐 Nexus Authentication System - Complete Implementation Guide

## 📋 Overview

Create a **modern, secure authentication system** for the Nexus SaaS platform with OAuth (Google/Apple), email/password authentication, and a complete user flow including sign-up, login, password recovery, and welcome emails.

---

## 🎯 Requirements Summary

### Core Features
- ✅ **Login Page** - Email/Password, Google OAuth, Apple OAuth
- ✅ **Sign-Up Page** - New user registration
- ✅ **OAuth Integration** - Google & Apple Sign-In
- ✅ **Email Verification** - Using Nodemailer
- ✅ **Welcome Email** - Post-registration
- ✅ **Forgot Password** - Password reset flow
- ✅ **Duplicate Detection** - Check existing accounts
- ✅ **Session Management** - Secure user sessions
- ✅ **Protected Routes** - Authenticated-only pages

### Tech Stack
- **Auth**: NextAuth.js (Auth.js v5)
- **OAuth**: Google & Apple providers
- **Email**: Nodemailer + React Email
- **Database**: Prisma + PostgreSQL (or MongoDB)
- **Validation**: Zod
- **UI**: Tailwind CSS (matching Nexus design)

---

## 📁 File Structure

```
nexus-nextjs/
├── app/
│   ├── (auth)/                      # Auth route group
│   │   ├── layout.tsx               # Auth pages layout
│   │   ├── login/
│   │   │   └── page.tsx             # Login page
│   │   ├── signup/
│   │   │   └── page.tsx             # Sign-up page
│   │   ├── forgot-password/
│   │   │   └── page.tsx             # Forgot password
│   │   ├── reset-password/
│   │   │   └── page.tsx             # Reset password
│   │   └── verify-email/
│   │       └── page.tsx             # Email verification
│   │
│   ├── api/
│   │   ├── auth/
│   │   │   └── [...nextauth]/
│   │   │       └── route.ts         # NextAuth API route
│   │   ├── register/
│   │   │   └── route.ts             # User registration
│   │   ├── verify-email/
│   │   │   └── route.ts             # Email verification
│   │   └── reset-password/
│   │       └── route.ts             # Password reset
│   │
│   └── dashboard/                    # Protected pages
│       └── page.tsx                  # User dashboard
│
├── components/
│   ├── auth/
│   │   ├── login-form.tsx           # Login form component
│   │   ├── signup-form.tsx          # Sign-up form
│   │   ├── oauth-buttons.tsx        # Google/Apple buttons
│   │   ├── forgot-password-form.tsx # Password reset form
│   │   └── auth-error.tsx           # Error display
│   │
│   └── email/
│       ├── welcome-email.tsx        # Welcome email template
│       ├── verification-email.tsx   # Verification email
│       └── reset-password-email.tsx # Password reset email
│
├── lib/
│   ├── auth.ts                      # NextAuth configuration
│   ├── auth-utils.ts                # Auth helper functions
│   ├── email.ts                     # Nodemailer setup
│   ├── prisma.ts                    # Prisma client
│   └── validations/
│       └── auth.ts                  # Zod schemas
│
├── prisma/
│   └── schema.prisma                # Database schema
│
└── types/
    └── auth.ts                      # TypeScript types
```

---

## 🗄️ Database Schema (Prisma)

### prisma/schema.prisma

```prisma
// This is your Prisma schema file

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mongodb"
  url      = env("DATABASE_URL")
}

model User {
  id            String    @id @default(auto()) @map("_id") @db.ObjectId
  name          String?
  email         String    @unique
  emailVerified DateTime?
  image         String?
  password      String?   // Hashed password (null for OAuth users)
  role          Role      @default(USER)
  
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  
  accounts      Account[]
  sessions      Session[]
  
  // Additional fields
  emailVerificationToken String?   @unique
  passwordResetToken     String?   @unique
  passwordResetExpires   DateTime?
  
  @@map("users")
}

model Account {
  id                String  @id @default(auto()) @map("_id") @db.ObjectId
  userId            String  @db.ObjectId
  type              String
  provider          String
  providerAccountId String
  refresh_token     String?
  access_token      String?
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String?
  session_state     String?

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
  @@map("accounts")
}

model Session {
  id           String   @id @default(auto()) @map("_id") @db.ObjectId
  sessionToken String   @unique
  userId       String   @db.ObjectId
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@map("sessions")
}

model VerificationToken {
  id         String   @id @default(auto()) @map("_id") @db.ObjectId
  identifier String
  token      String   @unique
  expires    DateTime

  @@unique([identifier, token])
  @@map("verification_tokens")
}

enum Role {
  USER
  ADMIN
}
```

---

## 🔧 Prisma Setup for MongoDB

### Installation

```bash
# Install Prisma dependencies
npm install @prisma/client
npm install -D prisma
```

### Initialize Prisma (if not already done)

```bash
# Initialize Prisma with MongoDB
npx prisma init
```

### Configure Prisma for MongoDB

The schema above is already configured for MongoDB. Key differences from PostgreSQL:

1. **ID Fields**: Use `@id @default(auto()) @map("_id") @db.ObjectId`
   - MongoDB uses ObjectId instead of UUID/CUID
   - Must map to `_id` (MongoDB's default)

2. **Foreign Keys**: Use `@db.ObjectId` for relation fields
   ```prisma
   userId String @db.ObjectId
   ```

3. **No Text Type**: Remove `@db.Text` - not needed for MongoDB
   ```prisma
   // PostgreSQL
   access_token String? @db.Text
   
   // MongoDB
   access_token String?
   ```

### Generate Prisma Client

```bash
# Generate the Prisma Client
npx prisma generate
```

This creates the Prisma Client in `node_modules/@prisma/client`

### Push Schema to MongoDB

Since MongoDB is schemaless, we use `db push` instead of migrations:

```bash
# Push schema to MongoDB (creates collections and indexes)
npx prisma db push
```

**What this does:**
- Creates collections: `users`, `accounts`, `sessions`, `verification_tokens`
- Creates indexes for `@unique` fields
- Creates indexes for relations

### Prisma Studio (Database GUI)

```bash
# Open Prisma Studio to view/edit data
npx prisma studio
```

This opens a browser-based GUI at `http://localhost:5555`

### Common Prisma Commands

```bash
# Generate Prisma Client
npx prisma generate

# Push schema changes to MongoDB
npx prisma db push

# Reset database (⚠️ deletes all data)
npx prisma db push --force-reset

# Open Prisma Studio
npx prisma studio

# Validate schema
npx prisma validate

# Format schema file
npx prisma format
```

### Troubleshooting

**Error: "Invalid connection string"**
```bash
# Make sure your DATABASE_URL is correct
# Format: mongodb+srv://username:password@cluster.mongodb.net/database_name
```

**Error: "Authentication failed"**
```bash
# Check your MongoDB username and password
# Make sure you're using the database user password, not your MongoDB Atlas account password
```

**Error: "IP not whitelisted"**
```bash
# Go to MongoDB Atlas → Network Access
# Add your IP address or use 0.0.0.0/0 for development
```

**Error: "Database does not exist"**
```bash
# MongoDB creates the database automatically when you push
# Make sure the database name is in your connection string
```

---

## 📦 MongoDB-Specific Prisma Client Setup

### lib/prisma.ts

Create this file to configure the Prisma client:

```typescript
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
```

**Why this pattern?**
- Prevents multiple Prisma instances in development (hot reload)
- Logs queries in development for debugging
- Only logs errors in production

### Using Prisma Client

```typescript
import { prisma } from '@/lib/prisma'

// Create user
const user = await prisma.user.create({
  data: {
    email: 'user@example.com',
    name: 'John Doe',
  },
})

// Find user
const user = await prisma.user.findUnique({
  where: { email: 'user@example.com' },
})

// Update user
const user = await prisma.user.update({
  where: { id: userId },
  data: { emailVerified: new Date() },
})

// Delete user
await prisma.user.delete({
  where: { id: userId },
})
```

### MongoDB-Specific Features

**Full-text search:**
```typescript
// Create text index first in MongoDB Atlas
const users = await prisma.user.findRaw({
  filter: { $text: { $search: 'john' } },
})
```

**Aggregation pipelines:**
```typescript
const result = await prisma.user.aggregateRaw({
  pipeline: [
    { $match: { role: 'USER' } },
    { $group: { _id: '$role', count: { $sum: 1 } } },
  ],
})
```

---

## 🚀 Quick Start Checklist for MongoDB

1. **Create MongoDB Atlas account** ✅
2. **Create cluster and database user** ✅
3. **Whitelist IP address** ✅
4. **Copy connection string to `.env.local`** ✅
5. **Run `npx prisma generate`** ✅
6. **Run `npx prisma db push`** ✅
7. **Open `npx prisma studio` to verify** ✅

You're ready to use Prisma with MongoDB! 🎉

---

## 📦 Dependencies

### package.json additions

```json
{
  "dependencies": {
    "next-auth": "^5.0.0-beta.16",
    "@prisma/client": "^5.10.0",
    "bcryptjs": "^2.4.3",
    "nodemailer": "^6.9.0",
    "@react-email/components": "^0.0.15",
    "react-email": "^2.1.0",
    "zod": "^3.22.0",
    "uuid": "^9.0.1"
  },
  "devDependencies": {
    "prisma": "^5.10.0",
    "@types/bcryptjs": "^2.4.6",
    "@types/nodemailer": "^6.4.14",
    "@types/uuid": "^9.0.8"
  }
}
```

---

## ⚙️ Environment Variables

### .env.local

```bash
# ============================================
# DATABASE - MongoDB
# ============================================
# Get your MongoDB connection string from MongoDB Atlas
# Format: mongodb+srv://username:password@cluster.mongodb.net/database_name
DATABASE_URL="mongodb+srv://your-username:your-password@cluster0.xxxxx.mongodb.net/nexus?retryWrites=true&w=majority"

# ============================================
# NEXTAUTH - Authentication
# ============================================
# For development, use http://localhost:3000
# For production, use your actual domain (e.g., https://nexus.com)
NEXTAUTH_URL="http://localhost:3000"

# Generate a random secret key (use: openssl rand -base64 32)
# IMPORTANT: Change this in production! Never commit this to Git!
NEXTAUTH_SECRET="your-super-secret-key-min-32-characters-long"

# ============================================
# GOOGLE OAUTH
# ============================================
# Get these from: https://console.cloud.google.com
# 1. Create a new project
# 2. Enable Google+ API
# 3. Create OAuth 2.0 credentials
# 4. Add authorized redirect URIs:
#    - http://localhost:3000/api/auth/callback/google (dev)
#    - https://yourdomain.com/api/auth/callback/google (prod)
GOOGLE_CLIENT_ID="your-google-client-id.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# ============================================
# APPLE OAUTH
# ============================================
# Get these from: https://developer.apple.com
# 1. Create an App ID
# 2. Create a Service ID
# 3. Configure Sign in with Apple
# 4. Generate a private key
APPLE_ID="your-apple-service-id"
APPLE_SECRET="your-apple-private-key"

# ============================================
# EMAIL - Nodemailer (Gmail SMTP)
# ============================================
# Using Gmail:
# 1. Enable 2-Factor Authentication on your Google Account
# 2. Generate an App Password:
#    - Go to: https://myaccount.google.com/security
#    - Security → 2-Step Verification → App passwords
#    - Generate a new app password for "Mail"
# 3. Use the 16-character app password below
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your-email@gmail.com"
SMTP_PASSWORD="your-16-character-app-password"
EMAIL_FROM="Nexus <noreply@nexus.com>"

# Alternative Email Services:
# - SendGrid: smtp.sendgrid.net (port 587)
# - AWS SES: email-smtp.region.amazonaws.com (port 587)
# - Postmark: smtp.postmarkapp.com (port 587)

# ============================================
# APP URLS
# ============================================
# Public URL of your application
# Development: http://localhost:3000
# Production: https://yourdomain.com
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

---

## 📝 Environment Variables Setup Guide

### 1. MongoDB Setup (5 minutes)

**Step-by-step:**

1. **Create MongoDB Atlas Account**
   - Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
   - Sign up for free account
   - Create a new cluster (free M0 tier available)

2. **Create Database User**
   - Go to Database Access
   - Click "Add New Database User"
   - Choose "Password" authentication
   - Username: `nexus-admin` (or your choice)
   - Auto-generate secure password
   - Grant "Read and write to any database" permissions
   - Click "Add User"

3. **Whitelist Your IP Address**
   - Go to Network Access
   - Click "Add IP Address"
   - For development: Click "Allow Access from Anywhere" (0.0.0.0/0)
   - For production: Add your server's IP address
   - Click "Confirm"

4. **Get Connection String**
   - Go to Database → Clusters
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Select: Driver: "Node.js", Version: "5.5 or later"
   - Copy the connection string
   - Replace `<username>` with your database username
   - Replace `<password>` with your database user password
   - Replace `<database_name>` with `nexus`
   - Add to `.env.local` as `DATABASE_URL`

**Example:**
```bash
# Original from MongoDB Atlas:
mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority

# After replacing placeholders:
DATABASE_URL="mongodb+srv://nexus-admin:MySecurePassword123@cluster0.abc123.mongodb.net/nexus?retryWrites=true&w=majority"
```

### 2. NextAuth Secret Generation

**Generate secure secret:**

```bash
# Option 1: Using OpenSSL (Mac/Linux)
openssl rand -base64 32

# Option 2: Using Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"

# Option 3: Using online generator
# Visit: https://generate-secret.vercel.app/32
```

**Add to `.env.local`:**
```bash
NEXTAUTH_SECRET="your-generated-secret-here"
```

### 3. Google OAuth Setup (10 minutes)

1. **Go to Google Cloud Console**
   - Visit: [console.cloud.google.com](https://console.cloud.google.com)
   - Sign in with your Google account

2. **Create New Project**
   - Click "Select a project" → "New Project"
   - Project name: "Nexus"
   - Click "Create"

3. **Enable Google+ API**
   - Go to "APIs & Services" → "Library"
   - Search for "Google+ API"
   - Click "Enable"

4. **Create OAuth Credentials**
   - Go to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "OAuth client ID"
   - Application type: "Web application"
   - Name: "Nexus Web App"
   - Authorized redirect URIs:
     - Add: `http://localhost:3000/api/auth/callback/google`
     - Add: `https://yourdomain.com/api/auth/callback/google` (for production)
   - Click "Create"

5. **Copy Credentials**
   - Copy "Client ID" → Add to `.env.local` as `GOOGLE_CLIENT_ID`
   - Copy "Client Secret" → Add to `.env.local` as `GOOGLE_CLIENT_SECRET`

### 4. Apple OAuth Setup (15 minutes)

1. **Apple Developer Account**
   - Visit: [developer.apple.com](https://developer.apple.com)
   - Sign in (requires paid Apple Developer account - $99/year)

2. **Create App ID**
   - Go to Certificates, Identifiers & Profiles
   - Click "Identifiers" → "+" → "App IDs"
   - Description: "Nexus App"
   - Bundle ID: `com.nexus.app`
   - Enable "Sign in with Apple"
   - Click "Continue" → "Register"

3. **Create Service ID**
   - Click "Identifiers" → "+" → "Services IDs"
   - Description: "Nexus Web Service"
   - Identifier: `com.nexus.service`
   - Enable "Sign in with Apple"
   - Click "Configure"
   - Primary App ID: Select your App ID from step 2
   - Domains and Subdomains: `yourdomain.com`
   - Return URLs:
     - Add: `http://localhost:3000/api/auth/callback/apple`
     - Add: `https://yourdomain.com/api/auth/callback/apple`
   - Click "Save" → "Continue" → "Register"

4. **Generate Private Key**
   - Click "Keys" → "+" 
   - Key Name: "Nexus Apple Sign In Key"
   - Enable "Sign in with Apple"
   - Configure → Select your Primary App ID
   - Click "Save" → "Continue" → "Register"
   - Download the key file (AuthKey_XXXXXXXXXX.p8)
   - ⚠️ Save this file securely - you can only download it once!

5. **Add to Environment Variables**
   ```bash
   APPLE_ID="com.nexus.service"
   APPLE_SECRET="-----BEGIN PRIVATE KEY-----\nYour-Private-Key-Content-Here\n-----END PRIVATE KEY-----"
   ```

**Note:** Apple OAuth requires a paid Apple Developer account. For development/testing, you can skip Apple OAuth and just use Google + Email/Password.

### 5. Gmail SMTP Setup (5 minutes)

1. **Enable 2-Factor Authentication**
   - Go to: [myaccount.google.com/security](https://myaccount.google.com/security)
   - Click "2-Step Verification"
   - Follow the setup process

2. **Generate App Password**
   - Go to: [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
   - Select app: "Mail"
   - Select device: "Other" → Type "Nexus"
   - Click "Generate"
   - Copy the 16-character password

3. **Add to `.env.local`**
   ```bash
   SMTP_USER="your-email@gmail.com"
   SMTP_PASSWORD="your-16-char-app-password"
   ```

### Alternative Email Services

**SendGrid (Recommended for Production):**
```bash
SMTP_HOST="smtp.sendgrid.net"
SMTP_PORT="587"
SMTP_USER="apikey"
SMTP_PASSWORD="your-sendgrid-api-key"
```

**AWS SES:**
```bash
SMTP_HOST="email-smtp.us-east-1.amazonaws.com"
SMTP_PORT="587"
SMTP_USER="your-aws-access-key"
SMTP_PASSWORD="your-aws-secret-key"
```

---

## ⚙️ Complete .env.local Template

Create a file named `.env.local` in your project root and add:

```bash
# Copy this template and fill in your actual values

# MongoDB
DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/nexus?retryWrites=true&w=majority"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="generate-using-openssl-rand-base64-32"

# Google OAuth
GOOGLE_CLIENT_ID="your-client-id.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="your-client-secret"

# Apple OAuth (optional - requires paid Apple Developer account)
APPLE_ID="com.nexus.service"
APPLE_SECRET="your-apple-private-key"

# Email (Gmail)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your-email@gmail.com"
SMTP_PASSWORD="your-16-char-app-password"
EMAIL_FROM="Nexus <noreply@nexus.com>"

# App URL
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

---

## 🔒 Security Best Practices for Environment Variables

### Development

1. **Never commit `.env.local` to Git**
   - Already in `.gitignore` by default
   - Double-check: `git status` should not show `.env.local`

2. **Use different credentials for dev and prod**
   - Create separate MongoDB databases
   - Use different OAuth credentials
   - Use different email accounts

3. **Store secrets securely**
   - Use password manager for backup
   - Document where to find credentials

### Production

1. **Use environment variables in hosting platform**
   - Vercel: Project Settings → Environment Variables
   - Netlify: Site Settings → Environment Variables
   - Railway: Variables tab

2. **Use secret management services**
   - AWS Secrets Manager
   - HashiCorp Vault
   - Doppler

3. **Rotate secrets regularly**
   - Change `NEXTAUTH_SECRET` periodically
   - Rotate database passwords
   - Update OAuth credentials

4. **Never log secrets**
   - Avoid `console.log(process.env.NEXTAUTH_SECRET)`
   - Use error tracking that masks secrets (Sentry)

---

## 🔐 NextAuth Configuration

### lib/auth.ts

```typescript
import { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import AppleProvider from "next-auth/providers/apple"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@auth/prisma-adapter"
import bcrypt from "bcryptjs"
import { prisma } from "@/lib/prisma"

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  
  providers: [
    // Google OAuth
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      allowDangerousEmailAccountLinking: true,
    }),
    
    // Apple OAuth
    AppleProvider({
      clientId: process.env.APPLE_ID!,
      clientSecret: process.env.APPLE_SECRET!,
      allowDangerousEmailAccountLinking: true,
    }),
    
    // Email/Password
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials")
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        })

        if (!user || !user.password) {
          throw new Error("Invalid credentials")
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        )

        if (!isPasswordValid) {
          throw new Error("Invalid credentials")
        }

        if (!user.emailVerified) {
          throw new Error("Please verify your email first")
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
        }
      }
    })
  ],

  callbacks: {
    async signIn({ user, account }) {
      // Check if user exists with OAuth
      if (account?.provider !== "credentials") {
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email! },
          include: { accounts: true }
        })

        if (existingUser && existingUser.accounts.length > 0) {
          // User exists with different provider
          const hasThisProvider = existingUser.accounts.some(
            acc => acc.provider === account.provider
          )
          
          if (!hasThisProvider) {
            // Allow linking if same email
            return true
          }
        }
      }
      return true
    },

    async session({ session, token }) {
      if (token) {
        session.user.id = token.id
        session.user.role = token.role
      }
      return session
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = user.role
      }
      return token
    }
  },

  pages: {
    signIn: "/login",
    error: "/login",
  },

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  secret: process.env.NEXTAUTH_SECRET,
}
```

---

## 🎨 Login Page Design

### app/(auth)/login/page.tsx

```typescript
import { Metadata } from "next"
import Link from "next/link"
import { LoginForm } from "@/components/auth/login-form"
import { OAuthButtons } from "@/components/auth/oauth-buttons"

export const metadata: Metadata = {
  title: "Login | Nexus",
  description: "Sign in to your Nexus account",
}

export default function LoginPage() {
  return (
    <div className="min-h-screen flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-light-bg-primary dark:bg-dark-bg-primary">
        <div className="w-full max-w-md space-y-8">
          
          {/* Logo & Header */}
          <div className="text-center">
            <Link href="/" className="inline-block">
              <h1 className="text-4xl font-serif font-bold text-light-text-primary dark:text-dark-text-primary">
                Nexus
              </h1>
            </Link>
            <h2 className="mt-6 text-3xl font-serif font-bold text-light-text-primary dark:text-dark-text-primary">
              Welcome back
            </h2>
            <p className="mt-2 text-light-text-secondary dark:text-dark-text-secondary">
              Sign in to continue to your workspace
            </p>
          </div>

          {/* OAuth Buttons */}
          <OAuthButtons />

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-light-border dark:border-dark-border" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-light-bg-primary dark:bg-dark-bg-primary text-light-text-secondary dark:text-dark-text-secondary">
                Or continue with email
              </span>
            </div>
          </div>

          {/* Login Form */}
          <LoginForm />

          {/* Sign Up Link */}
          <p className="text-center text-sm text-light-text-secondary dark:text-dark-text-secondary">
            Don't have an account?{" "}
            <Link
              href="/signup"
              className="font-semibold text-light-accent-primary dark:text-dark-accent-primary hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>

      {/* Right Side - Image/Branding (Desktop Only) */}
      <div className="hidden lg:flex lg:flex-1 bg-gradient-to-br from-light-accent-primary to-light-accent-secondary dark:from-dark-accent-primary dark:to-dark-accent-secondary">
        <div className="flex items-center justify-center w-full p-12 text-white">
          <div className="max-w-md space-y-6">
            <h3 className="text-4xl font-serif font-bold">
              Build something extraordinary
            </h3>
            <p className="text-xl opacity-90">
              Join 10,000+ teams already working smarter with Nexus.
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-2 gap-6 pt-8">
              <div>
                <div className="text-3xl font-bold">10K+</div>
                <div className="text-sm opacity-80">Active Teams</div>
              </div>
              <div>
                <div className="text-3xl font-bold">99.9%</div>
                <div className="text-sm opacity-80">Uptime</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
```

---

## 📝 Login Form Component

### components/auth/login-form.tsx

```typescript
"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import Link from "next/link"
import { Loader2 } from "lucide-react"

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
})

type LoginFormData = z.infer<typeof loginSchema>

export function LoginForm() {
  const router = useRouter()
  const [error, setError] = useState<string>("")
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true)
    setError("")

    try {
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      })

      if (result?.error) {
        setError(result.error)
        return
      }

      router.push("/dashboard")
      router.refresh()
    } catch (error) {
      setError("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Error Message */}
      {error && (
        <div className="p-4 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
          <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
        </div>
      )}

      {/* Email Field */}
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-light-text-primary dark:text-dark-text-primary mb-2"
        >
          Email address
        </label>
        <input
          {...register("email")}
          type="email"
          id="email"
          autoComplete="email"
          className="w-full px-4 py-3 rounded-lg border border-light-border dark:border-dark-border bg-light-bg-card dark:bg-dark-bg-card text-light-text-primary dark:text-dark-text-primary focus:ring-2 focus:ring-light-accent-primary dark:focus:ring-dark-accent-primary focus:border-transparent transition-all"
          placeholder="you@example.com"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Password Field */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-light-text-primary dark:text-dark-text-primary"
          >
            Password
          </label>
          <Link
            href="/forgot-password"
            className="text-sm font-medium text-light-accent-primary dark:text-dark-accent-primary hover:underline"
          >
            Forgot password?
          </Link>
        </div>
        <input
          {...register("password")}
          type="password"
          id="password"
          autoComplete="current-password"
          className="w-full px-4 py-3 rounded-lg border border-light-border dark:border-dark-border bg-light-bg-card dark:bg-dark-bg-card text-light-text-primary dark:text-dark-text-primary focus:ring-2 focus:ring-light-accent-primary dark:focus:ring-dark-accent-primary focus:border-transparent transition-all"
          placeholder="••••••••"
        />
        {errors.password && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">
            {errors.password.message}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full btn btn-primary btn-lg justify-center disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            Signing in...
          </>
        ) : (
          "Sign in"
        )}
      </button>
    </form>
  )
}
```

---

## 🔘 OAuth Buttons Component

### components/auth/oauth-buttons.tsx

```typescript
"use client"

import { signIn } from "next-auth/react"
import { useState } from "react"
import { Loader2 } from "lucide-react"

export function OAuthButtons() {
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)
  const [isAppleLoading, setIsAppleLoading] = useState(false)

  const handleOAuthSignIn = async (provider: "google" | "apple") => {
    const setLoading = provider === "google" ? setIsGoogleLoading : setIsAppleLoading
    
    setLoading(true)
    try {
      await signIn(provider, { callbackUrl: "/dashboard" })
    } catch (error) {
      console.error(`${provider} sign-in error:`, error)
      setLoading(false)
    }
  }

  return (
    <div className="space-y-3">
      {/* Google Sign In */}
      <button
        type="button"
        onClick={() => handleOAuthSignIn("google")}
        disabled={isGoogleLoading || isAppleLoading}
        className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-light-border dark:border-dark-border rounded-lg bg-white dark:bg-dark-bg-card hover:bg-gray-50 dark:hover:bg-dark-bg-elevated transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isGoogleLoading ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : (
          <svg className="h-5 w-5" viewBox="0 0 24 24">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
        )}
        <span className="text-sm font-medium text-light-text-primary dark:text-dark-text-primary">
          Continue with Google
        </span>
      </button>

      {/* Apple Sign In */}
      <button
        type="button"
        onClick={() => handleOAuthSignIn("apple")}
        disabled={isGoogleLoading || isAppleLoading}
        className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-light-border dark:border-dark-border rounded-lg bg-black hover:bg-gray-900 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isAppleLoading ? (
          <Loader2 className="h-5 w-5 animate-spin text-white" />
        ) : (
          <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
          </svg>
        )}
        <span className="text-sm font-medium text-white">
          Continue with Apple
        </span>
      </button>
    </div>
  )
}
```

---

## 📧 Email Service Setup

### lib/email.ts

```typescript
import nodemailer from "nodemailer"
import { render } from "@react-email/components"

// Create transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
})

export async function sendEmail({
  to,
  subject,
  react,
}: {
  to: string
  subject: string
  react: React.ReactElement
}) {
  const html = render(react)

  const info = await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to,
    subject,
    html,
  })

  console.log("Message sent: %s", info.messageId)
  return info
}

// Send welcome email
export async function sendWelcomeEmail(email: string, name: string) {
  const WelcomeEmail = (await import("@/components/email/welcome-email")).default
  
  await sendEmail({
    to: email,
    subject: "Welcome to Nexus! 🎉",
    react: WelcomeEmail({ name }),
  })
}

// Send verification email
export async function sendVerificationEmail(email: string, token: string) {
  const VerificationEmail = (await import("@/components/email/verification-email")).default
  
  const verificationUrl = `${process.env.NEXT_PUBLIC_APP_URL}/verify-email?token=${token}`
  
  await sendEmail({
    to: email,
    subject: "Verify your email address",
    react: VerificationEmail({ verificationUrl }),
  })
}

// Send password reset email
export async function sendPasswordResetEmail(email: string, token: string) {
  const ResetPasswordEmail = (await import("@/components/email/reset-password-email")).default
  
  const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${token}`
  
  await sendEmail({
    to: email,
    subject: "Reset your password",
    react: ResetPasswordEmail({ resetUrl }),
  })
}
```

---

## 📮 Welcome Email Template

### components/email/welcome-email.tsx

```typescript
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components"

interface WelcomeEmailProps {
  name: string
}

export default function WelcomeEmail({ name }: WelcomeEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Welcome to Nexus - Let's get started!</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Welcome to Nexus! 🎉</Heading>
          
          <Text style={text}>Hi {name},</Text>
          
          <Text style={text}>
            We're thrilled to have you join our community of 10,000+ teams who are
            building something extraordinary together.
          </Text>
          
          <Text style={text}>
            Nexus is designed to help your team collaborate better, move faster, and
            achieve more. Here's what you can do next:
          </Text>
          
          <Section style={section}>
            <Text style={listItem}>✨ Set up your workspace</Text>
            <Text style={listItem}>👥 Invite your team members</Text>
            <Text style={listItem}>🚀 Create your first project</Text>
            <Text style={listItem}>📊 Explore powerful analytics</Text>
          </Section>
          
          <Button
            style={button}
            href={`${process.env.NEXT_PUBLIC_APP_URL}/dashboard`}
          >
            Go to Dashboard
          </Button>
          
          <Text style={text}>
            If you have any questions, our support team is here to help. Just reply
            to this email!
          </Text>
          
          <Text style={footer}>
            Best regards,
            <br />
            The Nexus Team
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

const main = {
  backgroundColor: "#f6f9fc",
  fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
}

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "40px 20px",
  marginBottom: "64px",
  borderRadius: "8px",
  maxWidth: "600px",
}

const h1 = {
  color: "#1a1a1a",
  fontSize: "32px",
  fontWeight: "700",
  margin: "0 0 30px",
  padding: "0",
  lineHeight: "1.2",
  fontFamily: '"Playfair Display", Georgia, serif',
}

const text = {
  color: "#6b7280",
  fontSize: "16px",
  lineHeight: "1.6",
  margin: "16px 0",
}

const section = {
  margin: "32px 0",
}

const listItem = {
  color: "#1a1a1a",
  fontSize: "16px",
  lineHeight: "1.6",
  margin: "12px 0",
}

const button = {
  backgroundColor: "#FF6B35",
  borderRadius: "8px",
  color: "#ffffff",
  fontSize: "16px",
  fontWeight: "600",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  padding: "16px 32px",
  margin: "32px 0",
}

const footer = {
  color: "#9ca3af",
  fontSize: "14px",
  lineHeight: "1.6",
  marginTop: "40px",
}
```

---

## 🔒 Sign-Up API Route

### app/api/register/route.ts

```typescript
import { NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { v4 as uuidv4 } from "uuid"
import { prisma } from "@/lib/prisma"
import { sendVerificationEmail, sendWelcomeEmail } from "@/lib/email"
import { z } from "zod"

const signUpSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, password } = signUpSchema.parse(body)

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
      include: { accounts: true },
    })

    if (existingUser) {
      // Check if user signed up with OAuth
      if (existingUser.accounts.length > 0) {
        const providers = existingUser.accounts.map(acc => acc.provider).join(", ")
        return NextResponse.json(
          {
            error: `An account with this email already exists. You previously signed up with ${providers}. Please use that method to sign in.`,
          },
          { status: 400 }
        )
      }

      // User exists with email/password
      if (existingUser.emailVerified) {
        return NextResponse.json(
          {
            error: "An account with this email already exists. Please sign in instead.",
          },
          { status: 400 }
        )
      } else {
        return NextResponse.json(
          {
            error: "An account with this email exists but is not verified. Please check your email for verification link.",
          },
          { status: 400 }
        )
      }
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Generate verification token
    const verificationToken = uuidv4()

    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        emailVerificationToken: verificationToken,
      },
    })

    // Send verification email
    await sendVerificationEmail(email, verificationToken)

    return NextResponse.json(
      {
        message: "Account created successfully! Please check your email to verify your account.",
        userId: user.id,
      },
      { status: 201 }
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      )
    }

    console.error("Registration error:", error)
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    )
  }
}
```

---

## ✅ Email Verification Route

### app/api/verify-email/route.ts

```typescript
import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { sendWelcomeEmail } from "@/lib/email"

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const token = searchParams.get("token")

  if (!token) {
    return NextResponse.json(
      { error: "Verification token is required" },
      { status: 400 }
    )
  }

  try {
    const user = await prisma.user.findFirst({
      where: { emailVerificationToken: token },
    })

    if (!user) {
      return NextResponse.json(
        { error: "Invalid or expired verification token" },
        { status: 400 }
      )
    }

    // Update user as verified
    await prisma.user.update({
      where: { id: user.id },
      data: {
        emailVerified: new Date(),
        emailVerificationToken: null,
      },
    })

    // Send welcome email
    await sendWelcomeEmail(user.email, user.name || "there")

    return NextResponse.json({
      message: "Email verified successfully! You can now sign in.",
    })
  } catch (error) {
    console.error("Email verification error:", error)
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    )
  }
}
```

---

## 🔐 Forgot Password Page

### app/(auth)/forgot-password/page.tsx

```typescript
"use client"

import { useState } from "react"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Loader2, ArrowLeft } from "lucide-react"

const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
})

type ForgotPasswordData = z.infer<typeof forgotPasswordSchema>

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState("")

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordData>({
    resolver: zodResolver(forgotPasswordSchema),
  })

  const onSubmit = async (data: ForgotPasswordData) => {
    setIsLoading(true)
    setError("")

    try {
      const response = await fetch("/api/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const result = await response.json()
        setError(result.error || "Something went wrong")
        return
      }

      setIsSuccess(true)
    } catch (error) {
      setError("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-light-bg-primary dark:bg-dark-bg-primary">
      <div className="w-full max-w-md space-y-8">
        
        {/* Back to Login */}
        <Link
          href="/login"
          className="inline-flex items-center gap-2 text-light-text-secondary dark:text-dark-text-secondary hover:text-light-accent-primary dark:hover:text-dark-accent-primary transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to login
        </Link>

        {/* Header */}
        <div>
          <h2 className="text-3xl font-serif font-bold text-light-text-primary dark:text-dark-text-primary">
            Forgot password?
          </h2>
          <p className="mt-2 text-light-text-secondary dark:text-dark-text-secondary">
            No worries! Enter your email and we'll send you reset instructions.
          </p>
        </div>

        {isSuccess ? (
          // Success Message
          <div className="p-6 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
            <h3 className="font-semibold text-green-800 dark:text-green-400 mb-2">
              Check your email
            </h3>
            <p className="text-sm text-green-700 dark:text-green-300">
              We've sent password reset instructions to your email address.
              Please check your inbox and follow the link to reset your password.
            </p>
          </div>
        ) : (
          // Form
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {error && (
              <div className="p-4 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
                <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
              </div>
            )}

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-light-text-primary dark:text-dark-text-primary mb-2"
              >
                Email address
              </label>
              <input
                {...register("email")}
                type="email"
                id="email"
                className="w-full px-4 py-3 rounded-lg border border-light-border dark:border-dark-border bg-light-bg-card dark:bg-dark-bg-card text-light-text-primary dark:text-dark-text-primary focus:ring-2 focus:ring-light-accent-primary dark:focus:ring-dark-accent-primary focus:border-transparent transition-all"
                placeholder="you@example.com"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {errors.email.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn btn-primary btn-lg justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Sending...
                </>
              ) : (
                "Send reset link"
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
```

---

## 🛡️ Protected Route Middleware

### middleware.ts (root directory)

```typescript
import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    // Add custom logic here if needed
    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
)

// Protect these routes
export const config = {
  matcher: ["/dashboard/:path*", "/settings/:path*", "/workspace/:path*"],
}
```

---

## 🎨 Update Navigation Component

### components/layout/navigation.tsx (Update)

```typescript
// Add to imports
import { useSession } from "next-auth/react"

// Inside Navigation component
const { data: session } = useSession()

// Update Get Started button
<Link 
  href={session ? "/dashboard" : "/login"} 
  className="btn btn-primary"
>
  {session ? "Dashboard" : "Get Started"}
</Link>
```

---

## 📋 Implementation Checklist

### Phase 1: Setup (Day 1)
- [ ] Install dependencies (`npm install`)
- [ ] Create MongoDB Atlas account
- [ ] Create MongoDB cluster (free M0 tier)
- [ ] Create database user with password
- [ ] Whitelist IP address (0.0.0.0/0 for development)
- [ ] Get MongoDB connection string
- [ ] Create `.env.local` file in project root
- [ ] Add `DATABASE_URL` to `.env.local`
- [ ] Generate `NEXTAUTH_SECRET` using `openssl rand -base64 32`
- [ ] Add `NEXTAUTH_SECRET` to `.env.local`
- [ ] Run `npx prisma generate` to generate Prisma client
- [ ] Run `npx prisma db push` to sync schema with MongoDB
- [ ] Set up Google OAuth credentials (console.cloud.google.com)
- [ ] Add Google OAuth credentials to `.env.local`
- [ ] (Optional) Set up Apple OAuth credentials
- [ ] Configure Gmail SMTP with app password
- [ ] Add email credentials to `.env.local`
- [ ] Test MongoDB connection: `npx prisma studio`

### Phase 2: Authentication (Day 2-3)
- [ ] Implement NextAuth configuration
- [ ] Create login page
- [ ] Create sign-up page
- [ ] Implement OAuth buttons
- [ ] Create forgot password page
- [ ] Create reset password page
- [ ] Create email verification page

### Phase 3: Email System (Day 3-4)
- [ ] Set up Nodemailer
- [ ] Create welcome email template
- [ ] Create verification email template
- [ ] Create password reset email template
- [ ] Test email delivery

### Phase 4: API Routes (Day 4-5)
- [ ] Create registration endpoint
- [ ] Create email verification endpoint
- [ ] Create forgot password endpoint
- [ ] Create reset password endpoint
- [ ] Implement duplicate account detection

### Phase 5: UI/UX (Day 5-6)
- [ ] Style login page (match Nexus design)
- [ ] Style sign-up page
- [ ] Add loading states
- [ ] Add error handling
- [ ] Add success messages
- [ ] Test responsive design
- [ ] Add animations

### Phase 6: Testing (Day 6-7)
- [ ] Test email/password flow
- [ ] Test Google OAuth
- [ ] Test Apple OAuth
- [ ] Test duplicate account detection
- [ ] Test password reset flow
- [ ] Test email verification
- [ ] Test protected routes
- [ ] Cross-browser testing
- [ ] Mobile testing

### Phase 7: Security (Day 7)
- [ ] Rate limiting on auth endpoints
- [ ] CSRF protection
- [ ] Password strength validation
- [ ] Secure session management
- [ ] Environment variable security
- [ ] SQL injection prevention

### Phase 8: Deployment
- [ ] Create production MongoDB cluster (or upgrade to M10+ for better performance)
- [ ] Create production database user with strong password
- [ ] Whitelist production server IP addresses (remove 0.0.0.0/0)
- [ ] Get production MongoDB connection string
- [ ] Set up production environment variables in Vercel/hosting platform
- [ ] Update `NEXTAUTH_URL` to production domain
- [ ] Generate new `NEXTAUTH_SECRET` for production
- [ ] Configure production Google OAuth callbacks
- [ ] Configure production Apple OAuth callbacks (if using)
- [ ] Set up production email service (SendGrid recommended)
- [ ] Test MongoDB connection from production
- [ ] Run `npx prisma generate` in production build
- [ ] Run `npx prisma db push` to production database
- [ ] Deploy to Vercel/production
- [ ] Test production authentication flows
- [ ] Monitor error logs and database performance
- [ ] Set up MongoDB Atlas alerts for performance/errors
- [ ] Configure database backups in MongoDB Atlas

---

## 🔐 Security Best Practices

### Password Requirements
```typescript
const passwordRequirements = {
  minLength: 8,
  requireUppercase: true,
  requireLowercase: true,
  requireNumber: true,
  requireSpecialChar: true,
}
```

### Rate Limiting
```typescript
// Implement rate limiting on auth routes
// Example: Max 5 login attempts per 15 minutes
```

### Session Security
```typescript
// Use secure cookies
// Implement CSRF protection
// Set proper session expiration
```

---

## 💡 MongoDB Atlas Tips & Best Practices

### Free Tier (M0) Limitations
- **Storage**: 512 MB (enough for 10,000+ users)
- **RAM**: Shared
- **Connections**: 500 concurrent
- **Backup**: Not included (manual exports only)

**Good for:**
- Development and testing
- Small projects (<10,000 users)
- MVP and prototypes

**Upgrade to M10+ when you need:**
- Automated backups
- Better performance
- More storage
- Production workloads

### Monitoring Your Database

**MongoDB Atlas Dashboard:**
1. **Metrics** - View real-time performance
   - Operations per second
   - Memory usage
   - Network traffic

2. **Performance Advisor** - Get optimization suggestions
   - Slow queries
   - Index recommendations

3. **Alerts** - Set up notifications
   - High CPU usage
   - Storage limit reached
   - Connection limit reached

### Creating Indexes for Performance

MongoDB Atlas auto-creates indexes for `@unique` fields, but you can add more:

```javascript
// In MongoDB Atlas → Collections → Indexes

// Index for faster email lookups (already created by @unique)
{ "email": 1 }

// Compound index for faster session queries
{ "userId": 1, "expires": 1 }

// Index for faster account lookups
{ "provider": 1, "providerAccountId": 1 }
```

### Backup Strategies

**Free Tier (M0):**
- Manual exports via `mongodump`
- Use Prisma to export data periodically

**Paid Tier (M10+):**
- Automated continuous backups
- Point-in-time recovery
- Backup retention policies

**Manual Backup:**
```bash
# Export all collections
npx prisma db pull

# Or use mongodump (requires MongoDB tools)
mongodump --uri="your-connection-string"
```

### Database Maintenance

**Regular Tasks:**
1. **Monitor storage usage** - Check before hitting 512 MB limit
2. **Review slow queries** - Use Performance Advisor
3. **Clean up test data** - Delete old verification tokens
4. **Update indexes** - Based on query patterns

**Clean up expired tokens:**
```typescript
// Run periodically (e.g., daily cron job)
await prisma.verificationToken.deleteMany({
  where: {
    expires: {
      lt: new Date(),
    },
  },
})

await prisma.user.updateMany({
  where: {
    passwordResetExpires: {
      lt: new Date(),
    },
  },
  data: {
    passwordResetToken: null,
    passwordResetExpires: null,
  },
})
```

### Security Best Practices

1. **Use strong database passwords**
   - Minimum 16 characters
   - Mix of letters, numbers, symbols
   - Use password generator

2. **Limit IP access**
   - Development: 0.0.0.0/0 is OK
   - Production: Specific IP addresses only

3. **Use read-only users for analytics**
   - Create separate user with read-only access
   - Use for reporting tools

4. **Enable audit logs (M10+)**
   - Track database access
   - Monitor suspicious activity

5. **Rotate database passwords regularly**
   - Every 90 days
   - Update in all environments

### Connection String Best Practices

**Good:**
```bash
mongodb+srv://user:pass@cluster.mongodb.net/nexus?retryWrites=true&w=majority&appName=Nexus
```

**Better (with options):**
```bash
mongodb+srv://user:pass@cluster.mongodb.net/nexus?retryWrites=true&w=majority&maxPoolSize=10&minPoolSize=2&maxIdleTimeMS=60000
```

**Connection options explained:**
- `retryWrites=true` - Retry failed writes
- `w=majority` - Write concern (wait for replication)
- `maxPoolSize=10` - Max concurrent connections
- `minPoolSize=2` - Keep connections warm
- `maxIdleTimeMS=60000` - Close idle connections after 60s

### Troubleshooting Common Issues

**"Too many connections"**
```typescript
// Solution: Reuse Prisma client (already in lib/prisma.ts)
// Don't create new PrismaClient() in API routes
```

**"Slow queries"**
```bash
# Check Performance Advisor in MongoDB Atlas
# Add indexes for frequently queried fields
```

**"Storage limit reached"**
```bash
# Clean up old data
# Upgrade to paid tier
# Use aggregation to analyze what's using space
```

**"Connection timeout"**
```bash
# Check IP whitelist
# Check if cluster is paused (auto-pauses after 60 days of inactivity on M0)
# Verify network connectivity
```

---

## 🚀 OAuth Setup Instructions

### Google OAuth
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create new project "Nexus"
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google`
   - `https://yourdomain.com/api/auth/callback/google`
6. Copy Client ID and Client Secret to `.env.local`

### Apple OAuth
1. Go to [Apple Developer](https://developer.apple.com)
2. Create App ID
3. Create Service ID
4. Configure Sign in with Apple
5. Add return URLs:
   - `http://localhost:3000/api/auth/callback/apple`
   - `https://yourdomain.com/api/auth/callback/apple`
6. Generate private key
7. Copy credentials to `.env.local`

---

## 📧 Email Service Setup (Gmail)

### Using Gmail SMTP
1. Enable 2-Factor Authentication
2. Generate App Password:
   - Go to Google Account Settings
   - Security → 2-Step Verification
   - App passwords → Generate
3. Use app password in `.env.local`:
```bash
SMTP_USER="your-email@gmail.com"
SMTP_PASSWORD="your-app-password"
```

### Alternative Services
- **SendGrid**: Better for production
- **AWS SES**: Scalable and cheap
- **Postmark**: Transactional emails
- **Resend**: Modern email API

---

## 🎨 Design System Alignment

All auth pages follow Nexus design system:

### Colors
- Background: `bg-light-bg-primary dark:bg-dark-bg-primary`
- Cards: `bg-light-bg-card dark:bg-dark-bg-card`
- Accent: `text-light-accent-primary dark:text-dark-accent-primary`
- Border: `border-light-border dark:border-dark-border`

### Typography
- Headings: `font-serif` (Playfair Display)
- Body: `font-sans` (Inter)

### Components
- Buttons: Use existing `.btn` classes
- Inputs: Rounded, with focus rings
- Forms: Clean, spacious layouts

---

## 🧪 Testing Scenarios

### Manual Testing
1. Sign up with email
2. Verify email
3. Sign in with email
4. Sign out
5. Sign in with Google
6. Sign in with Apple
7. Try duplicate email (should fail)
8. Test forgot password
9. Reset password
10. Sign in with new password

### Edge Cases
- Invalid email format
- Weak password
- Network errors
- Expired tokens
- Already verified email
- Non-existent user password reset

---

## 📝 User Flow Diagrams

### Sign-Up Flow
```
User → Sign Up Page → Enter Details → Submit
  ↓
Check if email exists
  ↓ No
Create account → Send verification email
  ↓
User clicks link in email → Verify email
  ↓
Send welcome email → Redirect to login
```

### Login Flow
```
User → Login Page → Choose method
  ↓
Email/Password OR OAuth (Google/Apple)
  ↓
Authenticate → Create session
  ↓
Redirect to Dashboard
```

### Password Reset Flow
```
User → Forgot Password → Enter email
  ↓
Generate token → Send reset email
  ↓
User clicks link → Reset Password Page
  ↓
Enter new password → Update password
  ↓
Redirect to login
```

---

## 🎯 Success Criteria

### User Experience
- [ ] Smooth, intuitive authentication flow
- [ ] Clear error messages
- [ ] Fast page loads (<2s)
- [ ] Mobile-friendly design
- [ ] Accessible to screen readers

### Security
- [ ] Passwords hashed with bcrypt
- [ ] Secure session management
- [ ] CSRF protection enabled
- [ ] Rate limiting implemented
- [ ] OAuth properly configured

### Functionality
- [ ] Email/password auth works
- [ ] Google OAuth works
- [ ] Apple OAuth works
- [ ] Email verification works
- [ ] Password reset works
- [ ] Duplicate detection works
- [ ] Protected routes work

---

## 💡 Pro Tips

1. **Test with real email addresses** during development
2. **Use environment-specific OAuth callbacks**
3. **Implement proper error logging** (Sentry, LogRocket)
4. **Add analytics** to track auth funnel
5. **Monitor email deliverability**
6. **Keep secret keys secure** (never commit to Git)
7. **Use TypeScript** for type safety
8. **Write tests** for auth flows
9. **Document API endpoints**
10. **Plan for scaling** (consider Redis for sessions)

---

## 🚀 Ready to Implement!

This comprehensive guide provides everything needed to build a **production-ready authentication system** for Nexus. The system includes:

✅ Modern, secure authentication
✅ Multiple sign-in options
✅ Beautiful, branded UI
✅ Complete email system
✅ Robust error handling
✅ TypeScript type safety
✅ Follows Nexus design system

**Start with Phase 1 and work through each phase systematically!** 🔐✨

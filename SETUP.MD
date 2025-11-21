# Complete Monorepo Setup Guide - All Commands

A complete reference of every command run to set up a Next.js + Express + tRPC + Better Auth monorepo.

---

## Prerequisites

Make sure you have these installed:

- Node.js (v18 or higher)
- pnpm (`npm install -g pnpm`)

---

## Step-by-Step Setup Commands

### 1. Initialize Root Monorepo

```bash
# Create project directory
mkdir my-monorepo && cd my-monorepo

# Initialize root package.json
pnpm init

# Create workspace configuration
touch pnpm-workspace.yaml
```

**Create `pnpm-workspace.yaml`:**

```yaml
packages:
  - "apps/*"
  - "packages/*"
```

**Update root `package.json`:**

```json
{
  "name": "my-monorepo",
  "private": true,
  "scripts": {
    "dev": "pnpm -r --parallel dev",
    "build": "pnpm -r build",
    "server": "pnpm --filter server dev",
    "web": "pnpm --filter web dev"
  }
}
```

---

### 2. Setup Shared API Package (`packages/api`)

```bash
# Create directories
mkdir -p packages/api/src

# Navigate to api package
cd packages/api

# Initialize package.json
pnpm init

# Install dependencies
pnpm add @trpc/server zod

# Install dev dependencies
pnpm add -D typescript @types/node @types/express

# Create tsconfig.json
touch tsconfig.json
```

**Create `packages/api/tsconfig.json`:**

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "declaration": true,
    "declarationMap": true,
    "outDir": "./dist"
  },
  "include": ["src"]
}
```

**Update `packages/api/package.json`:**

```json
{
  "name": "@my-app/api",
  "version": "1.0.0",
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "scripts": {
    "build": "tsc",
    "dev": "tsc --watch"
  },
  "dependencies": {
    "@trpc/server": "^10.45.0",
    "zod": "^3.22.4",
    "better-auth": "^1.0.0"
  },
  "devDependencies": {
    "typescript": "^5.3.3",
    "@types/node": "^20.10.0",
    "@types/express": "^4.17.21"
  }
}
```

**Create folder structure:**

```bash
# In packages/api/src/
mkdir -p routers controllers services schemas types
touch src/index.ts src/trpc.ts
```

---

### 3. Setup Express Server (`apps/server`)

```bash
# Go back to root
cd ../../

# Create server directories
mkdir -p apps/server/src

# Navigate to server
cd apps/server

# Initialize package.json
pnpm init

# Install dependencies
pnpm add express @trpc/server cors better-auth drizzle-orm postgres dotenv

# Install dev dependencies
pnpm add -D typescript @types/node @types/express @types/cors tsx drizzle-kit

# Add workspace dependency
pnpm add "@my-app/api@workspace:*"

# Create tsconfig.json
touch tsconfig.json

# Create .env file
touch .env .env.example
```

**Create `apps/server/tsconfig.json`:**

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "lib": ["ES2020"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "moduleResolution": "node"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules"]
}
```

**Update `apps/server/package.json`:**

```json
{
  "name": "server",
  "version": "1.0.0",
  "scripts": {
    "dev": "tsx watch src/index.ts",
    "build": "tsc",
    "start": "node dist/index.js",
    "db:push": "drizzle-kit push",
    "db:generate": "drizzle-kit generate"
  },
  "dependencies": {
    "express": "^4.18.2",
    "@trpc/server": "^10.45.0",
    "cors": "^2.8.5",
    "better-auth": "^1.0.0",
    "drizzle-orm": "^0.29.0",
    "postgres": "^3.4.3",
    "dotenv": "^16.3.1",
    "bcrypt": "^5.1.1",
    "jsonwebtoken": "^9.0.2",
    "@my-app/api": "workspace:*"
  },
  "devDependencies": {
    "typescript": "^5.3.3",
    "@types/express": "^4.17.21",
    "@types/cors": "^2.8.17",
    "@types/node": "^20.10.0",
    "@types/bcrypt": "^5.0.2",
    "@types/jsonwebtoken": "^9.0.5",
    "tsx": "^4.7.0",
    "drizzle-kit": "^0.20.0"
  }
}
```

**Create `apps/server/.env`:**

```bash
DATABASE_URL="postgresql://user:password@localhost:5432/mydb"
BETTER_AUTH_SECRET="your-super-secret-key-min-32-chars"
BETTER_AUTH_URL="http://localhost:5000"
JWT_SECRET="your-jwt-secret"
PORT=5000
NODE_ENV="development"
```

**Create folder structure:**

```bash
# In apps/server/src/
mkdir -p db lib middleware
touch src/index.ts src/context.ts
touch src/db/index.ts src/db/schema.ts
touch src/lib/auth.ts
```

**Create `apps/server/drizzle.config.ts`:**

```typescript
import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";

dotenv.config();

export default {
  schema: "./src/db/schema.ts",
  out: "./src/db/migrations",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.DATABASE_URL!,
  },
} satisfies Config;
```

---

### 4. Setup Next.js Client (`apps/web`)

```bash
# Go back to root
cd ../../

# Create Next.js app
cd apps
pnpx create-next-app@latest web --typescript --tailwind --app

# Navigate to web
cd web

# Install tRPC and React Query
pnpm add @trpc/client @trpc/react-query @tanstack/react-query

# Install Better Auth
pnpm add better-auth

# Add workspace dependency
pnpm add "@my-app/api@workspace:*"

# Install additional UI libraries (optional)
pnpm add lucide-react

# Create .env.local
touch .env.local
```

**Create `apps/web/.env.local`:**

```bash
NEXT_PUBLIC_API_URL="http://localhost:5000"
```

**Create folder structure:**

```bash
# In apps/web/src/
mkdir -p utils lib components hooks
touch src/utils/trpc.ts src/utils/providers.tsx
touch src/lib/auth-client.ts
```

---

## 📦 Final Installation Commands Summary

### Root

```bash
cd my-monorepo
pnpm init
```

### packages/api

```bash
cd packages/api
pnpm init
pnpm add @trpc/server zod better-auth
pnpm add -D typescript @types/node @types/express
```

### apps/server

```bash
cd apps/server
pnpm init
pnpm add express @trpc/server cors better-auth drizzle-orm postgres dotenv bcrypt jsonwebtoken
pnpm add -D typescript @types/node @types/express @types/cors tsx drizzle-kit @types/bcrypt @types/jsonwebtoken
pnpm add "@my-app/api@workspace:*"
```

### apps/web

```bash
cd apps/web
pnpx create-next-app@latest . --typescript --tailwind --app
pnpm add @trpc/client @trpc/react-query @tanstack/react-query better-auth lucide-react
pnpm add "@my-app/api@workspace:*"
```

---

## Complete Final Folder Structure

```
my-monorepo/
├── .gitignore
├── package.json
├── pnpm-workspace.yaml
├── README.md
│
├── apps/
│   ├── server/                                    # Express Backend
│   │   ├── src/
│   │   │   ├── index.ts                          # Express app entry
│   │   │   ├── context.ts                        # tRPC context creator
│   │   │   │
│   │   │   ├── db/
│   │   │   │   ├── index.ts                      # Drizzle ORM instance
│   │   │   │   ├── schema.ts                     # Database schema
│   │   │   │   └── migrations/                   # SQL migrations
│   │   │   │
│   │   │   ├── lib/
│   │   │   │   ├── auth.ts                       # Better Auth instance
│   │   │   │   └── utils.ts                      # Server utilities
│   │   │   │
│   │   │   └── middleware/
│   │   │       ├── cors.ts                       # CORS config
│   │   │       ├── error.ts                      # Error handling
│   │   │       └── logger.ts                     # Request logging
│   │   │
│   │   ├── .env
│   │   ├── .env.example
│   │   ├── .gitignore
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── drizzle.config.ts
│   │
│   └── web/                                       # Next.js Frontend
│       ├── src/
│       │   ├── app/
│       │   │   ├── layout.tsx                    # Root layout
│       │   │   ├── page.tsx                      # Home page
│       │   │   │
│       │   │   ├── login/
│       │   │   │   └── page.tsx
│       │   │   ├── signup/
│       │   │   │   └── page.tsx
│       │   │   └── dashboard/
│       │   │       └── page.tsx
│       │   │
│       │   ├── components/
│       │   │   ├── ui/                           # UI components
│       │   │   │   ├── button.tsx
│       │   │   │   ├── input.tsx
│       │   │   │   └── card.tsx
│       │   │   └── auth/
│       │   │       ├── login-form.tsx
│       │   │       └── signup-form.tsx
│       │   │
│       │   ├── lib/
│       │   │   ├── auth-client.ts                # Better Auth client
│       │   │   └── utils.ts
│       │   │
│       │   ├── hooks/
│       │   │   ├── use-auth.ts
│       │   │   └── use-toast.ts
│       │   │
│       │   └── utils/
│       │       ├── trpc.ts                       # tRPC React setup
│       │       └── providers.tsx                 # React Query + tRPC
│       │
│       ├── public/
│       │   └── images/
│       ├── .env.local
│       ├── .env.example
│       ├── .gitignore
│       ├── next.config.js
│       ├── package.json
│       ├── tsconfig.json
│       └── tailwind.config.ts
│
└── packages/
    └── api/                                       # Shared tRPC API
        ├── src/
        │   ├── index.ts                          # Main router export
        │   ├── trpc.ts                           # tRPC init & procedures
        │   │
        │   ├── routers/                          # Route definitions
        │   │   ├── auth.router.ts
        │   │   ├── user.router.ts
        │   │   ├── post.router.ts
        │   │   └── index.ts
        │   │
        │   ├── controllers/                      # Request handlers
        │   │   ├── auth/
        │   │   │   ├── signup.controller.ts
        │   │   │   ├── login.controller.ts
        │   │   │   └── signout.controller.ts
        │   │   ├── user/
        │   │   │   ├── get-profile.controller.ts
        │   │   │   └── update-profile.controller.ts
        │   │   └── post/
        │   │       ├── create-post.controller.ts
        │   │       ├── get-posts.controller.ts
        │   │       └── delete-post.controller.ts
        │   │
        │   ├── services/                         # Business logic
        │   │   ├── auth/
        │   │   │   ├── signup.service.ts
        │   │   │   ├── login.service.ts
        │   │   │   ├── signout.service.ts
        │   │   │   └── jwt.service.ts
        │   │   ├── user/
        │   │   │   └── user.service.ts
        │   │   └── post/
        │   │       └── post.service.ts
        │   │
        │   ├── schemas/                          # Zod schemas
        │   │   ├── auth.schema.ts
        │   │   ├── user.schema.ts
        │   │   └── post.schema.ts
        │   │
        │   └── types/                            # TypeScript types
        │       ├── auth.types.ts
        │       ├── user.types.ts
        │       ├── post.types.ts
        │       └── response.types.ts
        │
        ├── package.json
        └── tsconfig.json
```

---

## Common Commands

### Install All Dependencies

```bash
# From root
pnpm install
```

### Development Mode

```bash
# Run everything in parallel
pnpm dev

# Run only server
pnpm server
# or
pnpm --filter server dev

# Run only web
pnpm web
# or
pnpm --filter web dev
```

### Build

```bash
# Build all packages
pnpm build

# Build specific package
pnpm --filter server build
pnpm --filter web build
pnpm --filter @my-app/api build
```

### Database Commands

```bash
# Push schema to database
cd apps/server
pnpm db:push

# Generate migrations
pnpm db:generate
```

### Add Dependencies

```bash
# Add to server
pnpm add <package> --filter server

# Add to web
pnpm add <package> --filter web

# Add to api
pnpm add <package> --filter @my-app/api

# Add dev dependency
pnpm add -D <package> --filter server
```

---

## Important Files Reference

### Root Files

**`pnpm-workspace.yaml`:**

```yaml
packages:
  - "apps/*"
  - "packages/*"
```

**`.gitignore`:**

```
node_modules/
dist/
.next/
.env
.env.local
.env*.local
.turbo/
*.log
.DS_Store
```

---

## Running the Project

1. **Install dependencies:**

   ```bash
   pnpm install
   ```

2. **Setup environment variables:**

   - Copy `.env.example` to `.env` in `apps/server`
   - Copy `.env.example` to `.env.local` in `apps/web`
   - Fill in your actual values

3. **Setup database:**

   ```bash
   cd apps/server
   pnpm db:push
   ```

4. **Run development servers:**

   ```bash
   # From root
   pnpm dev
   ```

5. **Open in browser:**
   - Frontend: `http://localhost:3000`
   - Backend: `http://localhost:5000`
   - tRPC: `http://localhost:5000/trpc`
   - Auth API: `http://localhost:5000/api/auth`

---

## Tech Stack Summary

| Technology       | Purpose            | Where Used                |
| ---------------- | ------------------ | ------------------------- |
| **pnpm**         | Package manager    | Monorepo management       |
| **TypeScript**   | Type safety        | All packages              |
| **Next.js 16**   | Frontend framework | `apps/web`                |
| **Express**      | Backend server     | `apps/server`             |
| **tRPC**         | Type-safe API      | All packages              |
| **Better Auth**  | Authentication     | `apps/server`, `apps/web` |
| **Drizzle ORM**  | Database ORM       | `apps/server`             |
| **PostgreSQL**   | Database           | `apps/server`             |
| **Zod**          | Validation         | `packages/api`            |
| **React Query**  | Data fetching      | `apps/web`                |
| **Tailwind CSS** | Styling            | `apps/web`                |

---

## Checklist

- [ ] Root monorepo initialized with pnpm workspace
- [ ] `packages/api` created with tRPC setup
- [ ] `apps/server` created with Express + Better Auth
- [ ] `apps/web` created with Next.js
- [ ] All dependencies installed
- [ ] Environment variables configured
- [ ] Database schema created and pushed
- [ ] tRPC client configured with credentials
- [ ] CORS enabled on server
- [ ] Development servers running

---

# Complete Monorepo Folder Structure

## Full Project Structure

```
my-monorepo/
├── .gitignore
├── package.json
├── pnpm-workspace.yaml
├── turbo.json (optional)
├── README.md
├── .env.example
│
├── apps/
│   ├── server/                          # Express Backend Server
│   │   ├── src/
│   │   │   ├── index.ts                 # Main Express app entry
│   │   │   ├── context.ts               # tRPC context creation
│   │   │   ├── db/
│   │   │   │   ├── index.ts             # Drizzle ORM instance
│   │   │   │   ├── schema.ts            # Database schema definitions
│   │   │   │   └── migrations/          # SQL migrations
│   │   │   ├── auth/
│   │   │   │   └── index.ts             # Better Auth setup
│   │   │   ├── lib/
│   │   │   │   ├── redis.ts             # Redis client (optional)
│   │   │   │   └── utils.ts             # Server utilities
│   │   │   └── middleware/
│   │   │       ├── cors.ts              # CORS configuration
│   │   │       ├── error.ts             # Error handling
│   │   │       └── logger.ts            # Request logging
│   │   ├── .env
│   │   ├── .env.example
│   │   ├── .gitignore
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── drizzle.config.ts
│   │
│   └── web/                             # Next.js Frontend App
│       ├── src/
│       │   ├── app/                     # App Router
│       │   │   ├── layout.tsx           # Root layout with Providers
│       │   │   ├── page.tsx             # Home page
│       │   │   ├── login/
│       │   │   │   └── page.tsx         # Login page
│       │   │   ├── signup/
│       │   │   │   └── page.tsx         # Signup page
│       │   │   └── dashboard/
│       │   │       └── page.tsx         # Protected dashboard
│       │   ├── components/
│       │   │   ├── ui/                  # Reusable UI components
│       │   │   │   ├── button.tsx
│       │   │   │   ├── input.tsx
│       │   │   │   └── card.tsx
│       │   │   └── auth/
│       │   │       ├── login-form.tsx
│       │   │       └── signup-form.tsx
│       │   ├── lib/
│       │   │   ├── auth-client.ts       # Better Auth client
│       │   │   └── utils.ts             # Client utilities
│       │   ├── hooks/
│       │   │   ├── use-auth.ts          # Custom auth hooks
│       │   │   └── use-toast.ts         # Toast notifications
│       │   └── utils/
│       │       ├── trpc.ts              # tRPC React client setup
│       │       └── providers.tsx        # React Query + tRPC providers
│       ├── public/
│       │   ├── favicon.ico
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
    └── api/                             # Shared tRPC API Package
        ├── src/
        │   ├── index.ts                 # Main router export + types
        │   ├── trpc.ts                  # tRPC initialization & procedures
        │   │
        │   ├── routers/                 # tRPC Route Definitions
        │   │   ├── auth.router.ts       # Auth routes (signup, login)
        │   │   ├── user.router.ts       # User routes (profile, update)
        │   │   ├── post.router.ts       # Post routes (CRUD)
        │   │   └── index.ts             # Export all routers
        │   │
        │   ├── controllers/             # Request Handlers (Orchestration)
        │   │   ├── auth/
        │   │   │   ├── signup.controller.ts
        │   │   │   ├── login.controller.ts
        │   │   │   └── logout.controller.ts
        │   │   ├── user/
        │   │   │   ├── get-profile.controller.ts
        │   │   │   └── update-profile.controller.ts
        │   │   └── post/
        │   │       ├── create-post.controller.ts
        │   │       ├── get-posts.controller.ts
        │   │       └── delete-post.controller.ts
        │   │
        │   ├── services/                # Business Logic Layer
        │   │   ├── auth/
        │   │   │   ├── signup.service.ts
        │   │   │   ├── login.service.ts
        │   │   │   └── jwt.service.ts
        │   │   ├── user/
        │   │   │   ├── user.service.ts
        │   │   │   └── validation.service.ts
        │   │   └── post/
        │   │       └── post.service.ts
        │   │
        │   ├── types/                   # Shared TypeScript Types
        │   │   ├── user.types.ts
        │   │   ├── post.types.ts
        │   │   └── auth.types.ts
        │   │
        │   └── schemas/                 # Zod Validation Schemas
        │       ├── auth.schema.ts
        │       ├── user.schema.ts
        │       └── post.schema.ts
        │
        ├── package.json
        └── tsconfig.json
```

---

## Detailed Explanation

### Root Level Files

#### `pnpm-workspace.yaml`

Defines the monorepo workspace structure for pnpm.

```yaml
packages:
  - "apps/*"
  - "packages/*"
```

#### `package.json` (Root)

Contains scripts to run all apps and shared dependencies.

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

#### `.gitignore`

Ignores common files and sensitive data.

```
node_modules/
dist/
.env
.env.local
.turbo/
*.log
```

---

## `apps/server/` - Express Backend

### Purpose

The Express.js server that runs your backend API, handles tRPC requests, manages database connections, and serves authentication endpoints.

### Key Files

#### `src/index.ts`

**What it does:** Main entry point for Express server. Sets up middleware, mounts tRPC and Better Auth routes.

```typescript
import express from "express";
import cors from "cors";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { appRouter } from "@my-app/api";
import { createContext } from "./context";
import { auth } from "./auth";

const app = express();

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());

// Better Auth API
app.all("/api/auth/*", (req, res) => auth.handler(req, res));

// tRPC API
app.use(
  "/trpc",
  createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

app.listen(4000, () => console.log("🚀 Server on :4000"));
```

#### `src/context.ts`

**What it does:** Creates the context object for every tRPC request. Extracts user session, provides database access, and passes dependencies.

```typescript
import { CreateExpressContextOptions } from "@trpc/server/adapters/express";
import { auth } from "./auth";
import { db } from "./db";

export const createContext = async ({
  req,
  res,
}: CreateExpressContextOptions) => {
  const session = await auth.api.getSession({ headers: req.headers });

  return {
    req,
    res,
    session,
    userId: session?.user?.id,
    db,
  };
};

export type Context = Awaited<ReturnType<typeof createContext>>;
```

#### `src/db/index.ts`

**What it does:** Initializes Drizzle ORM connection to PostgreSQL.

```typescript
import "dotenv/config";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

const client = postgres(process.env.DATABASE_URL!);
export const db = drizzle(client, { schema });
```

#### `src/db/schema.ts`

**What it does:** Defines your database tables using Drizzle ORM.

```typescript
import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: text("email").notNull().unique(),
  name: text("name").notNull(),
  password: text("password"),
  createdAt: timestamp("created_at").defaultNow(),
});
```

#### `src/auth/index.ts`

**What it does:** Configures Better Auth for authentication.

```typescript
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../db";

export const auth = betterAuth({
  database: drizzleAdapter(db, { provider: "pg" }),
  emailAndPassword: { enabled: true },
});
```

#### `.env`

**What it contains:** Server-side environment variables.

```bash
DATABASE_URL="postgresql://user:pass@localhost:5432/mydb"
JWT_SECRET="your-secret-key"
BETTER_AUTH_SECRET="auth-secret"
PORT=4000
```

---

## `apps/web/` - Next.js Frontend

### Purpose

The Next.js application that users interact with. Uses App Router, consumes tRPC API, and handles client-side authentication.

### Key Files

#### `src/app/layout.tsx`

**What it does:** Root layout that wraps entire app with providers (tRPC, React Query, Auth).

```typescript
import { Providers } from "@/utils/providers";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
```

#### `src/utils/providers.tsx`

**What it does:** Sets up tRPC client and React Query provider.

```typescript
"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { useState } from "react";
import { trpc } from "./trpc";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [httpBatchLink({ url: "http://localhost:4000/trpc" })],
    })
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  );
}
```

#### `src/utils/trpc.ts`

**What it does:** Creates type-safe tRPC React hooks.

```typescript
import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "@my-app/api";

export const trpc = createTRPCReact<AppRouter>();
```

#### `src/lib/auth-client.ts`

**What it does:** Sets up Better Auth client for authentication.

```typescript
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: "http://localhost:4000",
});

export const { useSession, signIn, signUp, signOut } = authClient;
```

#### `src/app/page.tsx`

**What it does:** Example page using tRPC.

```typescript
"use client";

import { trpc } from "@/utils/trpc";

export default function Home() {
  const { data, isLoading } = trpc.user.getProfile.useQuery();

  if (isLoading) return <div>Loading...</div>;

  return <div>Welcome, {data?.name}!</div>;
}
```

#### `.env.local`

**What it contains:** Client-side environment variables (only `NEXT_PUBLIC_*` exposed to browser).

```bash
NEXT_PUBLIC_API_URL="http://localhost:4000"
```

---

## `packages/api/` - Shared tRPC API

### Purpose

The heart of your type-safe API. Contains all tRPC routers, controllers, services, and business logic. Runs on the server but provides types to the client.

### Key Files

#### `src/index.ts`

**What it does:** Main router that combines all sub-routers and exports the AppRouter type.

```typescript
import { router } from "./trpc";
import { authRouter } from "./routers/auth.router";
import { userRouter } from "./routers/user.router";
import { postRouter } from "./routers/post.router";

export const appRouter = router({
  auth: authRouter,
  user: userRouter,
  post: postRouter,
});

export type AppRouter = typeof appRouter;
export type { Context } from "../../apps/server/src/context";
```

#### `src/trpc.ts`

**What it does:** Initializes tRPC and defines base procedures (public, protected).

```typescript
import { initTRPC, TRPCError } from "@trpc/server";
import type { Context } from "../../apps/server/src/context";

const t = initTRPC.context<Context>().create();

export const router = t.router;
export const publicProcedure = t.procedure;

export const protectedProcedure = t.procedure.use(({ ctx, next }) => {
  if (!ctx.userId) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return next({ ctx: { ...ctx, userId: ctx.userId } });
});
```

---

### `src/routers/` - Route Definitions

#### Purpose

Defines tRPC procedures (queries and mutations) and connects them to controllers.

#### Example: `auth.router.ts`

```typescript
import { router, publicProcedure } from "../trpc";
import {
  handleSignup,
  signupSchema,
} from "../controllers/auth/signup.controller";
import { handleLogin, loginSchema } from "../controllers/auth/login.controller";

export const authRouter = router({
  signup: publicProcedure
    .input(signupSchema)
    .mutation(({ input, ctx }) => handleSignup(input, ctx)),

  login: publicProcedure
    .input(loginSchema)
    .mutation(({ input, ctx }) => handleLogin(input, ctx)),
});
```

**What goes here:**

- Route definitions
- Input validation with Zod schemas
- Linking procedures to controllers
- Public vs protected procedure selection

---

### 🎮 `src/controllers/` - Request Handlers

#### Purpose

Orchestrates the request flow. Handles logging, error handling, and calls services.

#### Example: `auth/signup.controller.ts`

```typescript
import { signupUser, signupSchema } from "../../services/auth/signup.service";
import { TRPCError } from "@trpc/server";
import type { Context } from "../../../../apps/server/src/context";
import { z } from "zod";

export { signupSchema };

export async function handleSignup(
  input: z.infer<typeof signupSchema>,
  ctx: Context
) {
  try {
    console.log(`[AUTH] Signup attempt: ${input.email}`);

    const result = await signupUser(input, ctx);

    console.log(`[AUTH] Signup successful: ${result.user.id}`);
    return result;
  } catch (error) {
    if (error.code === "EMAIL_EXISTS") {
      throw new TRPCError({
        code: "CONFLICT",
        message: "Email already in use",
      });
    }
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Signup failed",
    });
  }
}
```

**What goes here:**

- Request logging
- Error handling and transformation
- Input destructuring
- Calling service layer
- Response formatting

---

### `src/services/` - Business Logic

#### Purpose

Contains core business logic, database operations, external API calls, and data transformations.

#### Example: `auth/signup.service.ts`

```typescript
import { z } from "zod";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { users } from "../../../../apps/server/src/db/schema";
import type { Context } from "../../../../apps/server/src/context";

export const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string(),
});

export async function signupUser(
  input: z.infer<typeof signupSchema>,
  ctx: Context
) {
  // Check if user exists
  const existing = await ctx.db.query.users.findFirst({
    where: (users, { eq }) => eq(users.email, input.email),
  });

  if (existing) {
    throw { code: "EMAIL_EXISTS" };
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(input.password, 10);

  // Create user
  const [user] = await ctx.db
    .insert(users)
    .values({
      email: input.email,
      name: input.name,
      password: hashedPassword,
    })
    .returning();

  // Generate token
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!);

  return {
    user: { id: user.id, email: user.email, name: user.name },
    token,
  };
}
```

**What goes here:**

- Database queries (Drizzle ORM)
- Business rules and validation
- Data transformations
- Third-party API calls
- Pure functions with no HTTP concerns

---

### `src/schemas/` - Validation Schemas

#### Purpose

Centralized Zod schemas for input validation, reusable across controllers.

#### Example: `auth.schema.ts`

```typescript
import { z } from "zod";

export const signupSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  name: z.string().min(2, "Name must be at least 2 characters"),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});
```

---

### `src/types/` - TypeScript Types

#### Purpose

Shared TypeScript types and interfaces used across the application.

#### Example: `user.types.ts`

```typescript
export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
}

export interface UserProfile extends User {
  bio?: string;
  avatar?: string;
}

export type CreateUserInput = Omit<User, "id" | "createdAt">;
```

---

## Data Flow Example

### User Signup Flow

```
1. User fills signup form in Next.js
   → apps/web/src/app/signup/page.tsx

2. Calls tRPC mutation
   → const signup = trpc.auth.signup.useMutation()

3. HTTP request to Express server
   → POST http://localhost:4000/trpc/auth.signup

4. Express receives request
   → apps/server/src/index.ts

5. Creates context (session, db)
   → apps/server/src/context.ts

6. tRPC router handles request
   → packages/api/src/routers/auth.router.ts

7. Calls controller
   → packages/api/src/controllers/auth/signup.controller.ts
   - Logs request
   - Validates input
   - Error handling

8. Controller calls service
   → packages/api/src/services/auth/signup.service.ts
   - Checks if email exists
   - Hashes password
   - Creates user in DB
   - Generates JWT

9. Response flows back
   → Service → Controller → Router → Express → Next.js

10. Next.js updates UI
    → User sees success message
```

---

## Dependencies

### `apps/server/package.json`

```json
{
  "dependencies": {
    "express": "^4.18.2",
    "@trpc/server": "^10.45.0",
    "better-auth": "^1.0.0",
    "drizzle-orm": "^0.29.0",
    "postgres": "^3.4.3",
    "bcrypt": "^5.1.1",
    "jsonwebtoken": "^9.0.2",
    "cors": "^2.8.5",
    "dotenv": "^16.3.1",
    "@my-app/api": "workspace:*"
  },
  "devDependencies": {
    "typescript": "^5.3.3",
    "@types/express": "^4.17.21",
    "@types/node": "^20.10.0",
    "tsx": "^4.7.0",
    "drizzle-kit": "^0.20.0"
  }
}
```

### `apps/web/package.json`

```json
{
  "dependencies": {
    "next": "14.0.4",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "@trpc/client": "^10.45.0",
    "@trpc/react-query": "^10.45.0",
    "@tanstack/react-query": "^5.17.0",
    "better-auth": "^1.0.0",
    "@my-app/api": "workspace:*"
  },
  "devDependencies": {
    "typescript": "^5.3.3",
    "@types/react": "^18.2.45",
    "tailwindcss": "^3.4.0",
    "autoprefixer": "^10.4.16",
    "postcss": "^8.4.32"
  }
}
```

### `packages/api/package.json`

```json
{
  "name": "@my-app/api",
  "dependencies": {
    "@trpc/server": "^10.45.0",
    "zod": "^3.22.4"
  },
  "devDependencies": {
    "typescript": "^5.3.3",
    "@types/node": "^20.10.0"
  }
}
```

---

## Common Commands

```bash
# Install all dependencies
pnpm install

# Run everything in dev mode
pnpm dev

# Run only server
pnpm --filter server dev

# Run only web
pnpm --filter web dev

# Build everything
pnpm build

# Add package to server
pnpm add <package> --filter server

# Add package to web
pnpm add <package> --filter web

# Add package to api
pnpm add <package> --filter @my-app/api

# Run database migrations
cd apps/server
pnpm drizzle-kit push

# Generate migration
pnpm drizzle-kit generate
```

---

## Best Practices

### 1. **Separation of Concerns**

- **Routers:** Route definitions only
- **Controllers:** Request handling, logging, error transformation
- **Services:** Pure business logic, no HTTP concerns

### 2. **Type Safety**

- Use Zod for runtime validation
- Export types from `packages/api`
- Never use `any` type

### 3. **Environment Variables**

- Keep `.env` in `.gitignore`
- Always provide `.env.example`
- Use `NEXT_PUBLIC_*` for client-side vars

### 4. **Error Handling**

- Controllers catch and transform errors
- Use TRPCError for consistent error responses
- Log errors appropriately

### 5. **Security**

- Hash passwords (bcrypt)
- Use JWT or Better Auth sessions
- Validate all inputs with Zod
- Use CORS properly
- Never expose secrets to client

---

## Quick Reference

| Layer          | Purpose          | Example                                            |
| -------------- | ---------------- | -------------------------------------------------- |
| **Router**     | Define routes    | `signup: publicProcedure.input(...).mutation(...)` |
| **Controller** | Handle request   | Logging, error handling, call service              |
| **Service**    | Business logic   | DB queries, auth logic, external APIs              |
| **Schema**     | Validation       | Zod schemas for input validation                   |
| **Types**      | Type definitions | Interfaces, types for data structures              |

---

## Additional Resources

- [tRPC Documentation](https://trpc.io)
- [Next.js App Router](https://nextjs.org/docs/app)
- [Drizzle ORM](https://orm.drizzle.team)
- [Better Auth](https://better-auth.com)
- [Zod Validation](https://zod.dev)

---

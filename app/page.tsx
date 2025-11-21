"use client";
import type React from "react";
import { useState } from "react";
import { Copy, Check, ChevronDown, ChevronRight, BookOpen } from "lucide-react";

const CodeBlock = ({
  code,
  language = "bash",
}: {
  code: string;
  language?: string;
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group">
      <button
        onClick={handleCopy}
        className="absolute right-3 top-3 p-2 rounded-md bg-muted hover:bg-muted/80 transition-colors opacity-0 group-hover:opacity-100 z-10"
        title="Copy code"
      >
        {copied ? (
          <Check size={16} className="text-green-500" />
        ) : (
          <Copy size={16} className="text-muted-foreground" />
        )}
      </button>
      <pre className="bg-muted text-foreground p-4 rounded-lg overflow-x-auto text-sm font-mono border border-border">
        <code>{code}</code>
      </pre>
    </div>
  );
};

const Section = ({
  title,
  children,
  defaultOpen = false,
  icon = "📦",
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  icon?: string;
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border border-border rounded-lg overflow-hidden hover:border-border/80 transition-colors">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 bg-card hover:bg-card/80 transition-colors"
      >
        <div className="flex items-center gap-3">
          <span className="text-xl">{icon}</span>
          <h3 className="text-base font-semibold text-foreground">{title}</h3>
        </div>
        <div className="text-muted-foreground group-hover:text-foreground transition-colors">
          {isOpen ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
        </div>
      </button>
      {isOpen && (
        <div className="p-5 bg-background border-t border-border space-y-4">
          {children}
        </div>
      )}
    </div>
  );
};

const InfoBox = ({
  type = "info",
  title,
  children,
}: {
  type?: "info" | "warning" | "success";
  title: string;
  children: React.ReactNode;
}) => {
  const styles = {
    info: "bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800/50 text-blue-900 dark:text-blue-100",
    warning:
      "bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800/50 text-amber-900 dark:text-amber-100",
    success:
      "bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800/50 text-green-900 dark:text-green-100",
  };

  return (
    <div className={`border rounded-lg p-4 ${styles[type]}`}>
      <p className="font-semibold mb-2">{title}</p>
      <div className="text-sm opacity-90">{children}</div>
    </div>
  );
};

export default function MonorepoGuide() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="border-b bg-black border-border bg-card sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center gap-3">
          <BookOpen size={24} className="text-primary" />
          <h1 className="text-xl font-bold">Monorepo Setup Guide</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Hero */}
        <div className="mb-12">
          <h2 className="text-4xl font-bold mb-4 text-balance">
            Next.js + Express + tRPC Monorepo
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            A complete, copy-paste setup guide for building a modern monorepo
            with Next.js frontend, Express backend, and shared tRPC APIs.
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-4">
          <Section title="Project Structure" defaultOpen={true} icon="📁">
            <CodeBlock
              code={`my-monorepo/
├── apps/
│   ├── web/          # Next.js frontend
│   └── server/       # Express backend
├── packages/
│   └── api/          # Shared tRPC router definitions
├── package.json
├── turbo.json        # Optional
└── pnpm-workspace.yaml`}
              language="text"
            />
          </Section>

          <Section title="Initialize Monorepo" icon="1️⃣">
            <p className="text-foreground/80 mb-4">
              Create the root project and workspace configuration:
            </p>
            <CodeBlock
              code={`mkdir my-monorepo && cd my-monorepo
pnpm init`}
            />

            <p className="text-foreground/80 mt-6 mb-3">
              Create{" "}
              <code className="bg-muted px-2 py-1 rounded text-sm font-mono">
                pnpm-workspace.yaml
              </code>
              :
            </p>
            <CodeBlock
              code={`packages:
  - 'apps/*'
  - 'packages/*'`}
              language="yaml"
            />
          </Section>

          <Section title="Setup Shared API Package" icon="🔗">
            <p className="text-foreground/80 mb-4">
              Create the shared tRPC API package:
            </p>
            <CodeBlock
              code={`mkdir -p packages/api
cd packages/api
pnpm init
pnpm add @trpc/server zod
pnpm add -D typescript @types/express @types/node`}
            />

            <p className="text-foreground/80 mt-6 mb-3">
              Create{" "}
              <code className="bg-muted px-2 py-1 rounded text-sm font-mono">
                packages/api/tsconfig.json
              </code>
              :
            </p>
            <CodeBlock
              code={`{
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
}`}
              language="json"
            />

            <p className="text-foreground/80 mt-6 mb-3">
              Create{" "}
              <code className="bg-muted px-2 py-1 rounded text-sm font-mono">
                packages/api/src/index.ts
              </code>
              :
            </p>
            <CodeBlock
              code={`import { initTRPC } from '@trpc/server';
import { z } from 'zod';

const t = initTRPC.create();

export const appRouter = t.router({
  greeting: t.procedure
    .input(z.object({ name: z.string() }))
    .query(({ input }) => {
      return { message: \`Hello, \${input.name}!\` };
    }),
  
  createUser: t.procedure
    .input(z.object({
      email: z.string().email(),
      name: z.string(),
    }))
    .mutation(({ input }) => {
      return { id: 1, ...input };
    }),
});

export type AppRouter = typeof appRouter;`}
              language="typescript"
            />

            <p className="text-foreground/80 mt-6 mb-3">
              Update{" "}
              <code className="bg-muted px-2 py-1 rounded text-sm font-mono">
                packages/api/package.json
              </code>
              :
            </p>
            <CodeBlock
              code={`{
  "name": "@my-app/api",
  "version": "1.0.0",
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "scripts": {
    "build": "tsc",
    "dev": "tsc --watch"
  }
}`}
              language="json"
            />
          </Section>

          <Section title="Setup Express Server" icon="⚙️">
            <CodeBlock
              code={`cd ../../
mkdir -p apps/server
cd apps/server
pnpm init
pnpm add express @trpc/server cors
pnpm add -D typescript @types/node @types/express @types/cors tsx
pnpm add "@my-app/api@workspace:*"`}
            />

            <InfoBox type="warning" title="⚠️ Important">
              Replace{" "}
              <code className="bg-current/20 px-1 rounded">@my-app/api</code>{" "}
              with the actual name from your{" "}
              <code className="bg-current/20 px-1 rounded">
                packages/api/package.json
              </code>
              . Always use quotes in zsh!
            </InfoBox>

            <p className="text-foreground/80 mt-6 mb-3">
              Create{" "}
              <code className="bg-muted px-2 py-1 rounded text-sm font-mono">
                apps/server/src/index.ts
              </code>
              :
            </p>
            <CodeBlock
              code={`import express from 'express';
import cors from 'cors';
import { createExpressMiddleware } from '@trpc/server/adapters/express';
import { appRouter } from '@my-app/api';

const app = express();

app.use(cors());
app.use(express.json());

app.use(
  '/trpc',
  createExpressMiddleware({
    router: appRouter,
    createContext: () => ({}),
  })
);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(\`Server running on http://localhost:\${PORT}\`);
});`}
              language="typescript"
            />

            <p className="text-foreground/80 mt-6 mb-3">
              Update{" "}
              <code className="bg-muted px-2 py-1 rounded text-sm font-mono">
                apps/server/package.json
              </code>{" "}
              scripts:
            </p>
            <CodeBlock
              code={`{
  "scripts": {
    "dev": "tsx watch src/index.ts",
    "build": "tsc",
    "start": "node dist/index.js"
  }
}`}
              language="json"
            />
          </Section>

          <Section title="Setup Next.js Client" icon="🎨">
            <CodeBlock
              code={`cd ../
pnpm dlx create-next-app@latest web --typescript --tailwind --app
cd web
pnpm add @trpc/client @trpc/react-query @tanstack/react-query
pnpm add "@my-app/api@workspace:*"`}
            />

            <p className="text-foreground/80 mt-6 mb-3">
              Create{" "}
              <code className="bg-muted px-2 py-1 rounded text-sm font-mono">
                apps/web/src/utils/trpc.ts
              </code>
              :
            </p>
            <CodeBlock
              code={`import { createTRPCReact } from '@trpc/react-query';
import type { AppRouter } from '@my-app/api';

export const trpc = createTRPCReact<AppRouter>();`}
              language="typescript"
            />

            <p className="text-foreground/80 mt-6 mb-3">
              Create{" "}
              <code className="bg-muted px-2 py-1 rounded text-sm font-mono">
                apps/web/src/app/providers.tsx
              </code>
              :
            </p>
            <CodeBlock
              code={`'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';
import { useState } from 'react';
import { trpc } from '@/utils/trpc';

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: 'http://localhost:4000/trpc',
        }),
      ],
    })
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </trpc.Provider>
  );
}`}
              language="typescript"
            />

            <p className="text-foreground/80 mt-6 mb-3">
              Update{" "}
              <code className="bg-muted px-2 py-1 rounded text-sm font-mono">
                apps/web/src/app/layout.tsx
              </code>
              :
            </p>
            <CodeBlock
              code={`import { Providers } from './providers';

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
}`}
              language="typescript"
            />

            <p className="text-foreground/80 mt-6 mb-3">
              Create{" "}
              <code className="bg-muted px-2 py-1 rounded text-sm font-mono">
                apps/web/src/app/page.tsx
              </code>
              :
            </p>
            <CodeBlock
              code={`'use client';

import { trpc } from '@/utils/trpc';

export default function Home() {
  const greeting = trpc.greeting.useQuery({ name: 'World' });
  const createUser = trpc.createUser.useMutation();

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">tRPC Demo</h1>
      {greeting.data && <p className="mb-4">{greeting.data.message}</p>}
      
      <button
        className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:opacity-90 transition-opacity"
        onClick={() => {
          createUser.mutate({ 
            email: 'test@example.com', 
            name: 'John' 
          });
        }}
      >
        Create User
      </button>
    </div>
  );
}`}
              language="typescript"
            />
          </Section>

          <Section title="Root Configuration" icon="⚡">
            <p className="text-foreground/80 mb-3">
              Add scripts to root{" "}
              <code className="bg-muted px-2 py-1 rounded text-sm font-mono">
                package.json
              </code>
              :
            </p>
            <CodeBlock
              code={`{
  "scripts": {
    "dev": "pnpm -r --parallel dev",
    "build": "pnpm -r build"
  }
}`}
              language="json"
            />
          </Section>

          <Section title="Run Everything" icon="🚀" defaultOpen={true}>
            <p className="text-foreground/80 mb-4">Start all services:</p>
            <CodeBlock
              code={`cd ../../  # Back to root
pnpm dev`}
            />

            <InfoBox type="success" title="✅ Your apps should now be running:">
              <div className="space-y-2">
                <div>
                  Express Server:{" "}
                  <code className="bg-current/20 px-2 py-1 rounded text-sm font-mono">
                    http://localhost:4000
                  </code>
                </div>
                <div>
                  Next.js App:{" "}
                  <code className="bg-current/20 px-2 py-1 rounded text-sm font-mono">
                    http://localhost:3000
                  </code>
                </div>
              </div>
            </InfoBox>
          </Section>

          <Section title="Pro Tips" icon="💡">
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-foreground mb-3">
                  Check package name:
                </h4>
                <CodeBlock
                  code={`cat packages/api/package.json | grep "name"`}
                />
              </div>

              <div>
                <h4 className="font-semibold text-foreground mb-3">
                  Install dependencies for all workspaces:
                </h4>
                <CodeBlock code={`pnpm install`} />
              </div>

              <div>
                <h4 className="font-semibold text-foreground mb-3">
                  Add dependency to specific workspace:
                </h4>
                <CodeBlock
                  code={`pnpm add <package> --filter <workspace-name>
# Example: pnpm add lodash --filter web`}
                />
              </div>

              <div>
                <h4 className="font-semibold text-foreground mb-3">
                  Run command in specific workspace:
                </h4>
                <CodeBlock
                  code={`pnpm --filter server dev
pnpm --filter web dev`}
                />
              </div>

              <InfoBox type="info" title="💡 Remember">
                Always use quotes when adding workspace dependencies in zsh:{" "}
                <code className="bg-current/20 px-2 py-1 rounded text-sm font-mono">
                  &quot;&lt;package&gt;@workspace:*&quot;
                </code>
              </InfoBox>
            </div>
          </Section>
        </div>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-border text-center text-muted-foreground text-sm">
          <p>Built with Next.js, Express, tRPC, and pnpm workspaces.</p>
        </footer>
      </div>
    </div>
  );
}

"use client";
import React, { useState, useEffect } from "react";
import {
  Copy,
  Check,
  Menu,
  X,
  BookOpen,
  Folder,
  Settings,
  Palette,
  Zap,
  Rocket,
  Lightbulb,
} from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";

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
    <div className="relative group my-4">
      <button
        onClick={handleCopy}
        className="absolute right-3 top-3 p-2 rounded-md bg-gray-800 hover:bg-gray-700 transition-colors opacity-0 group-hover:opacity-100 z-10"
        title="Copy code"
      >
        {copied ? (
          <Check size={16} className="text-green-400" />
        ) : (
          <Copy size={16} className="text-gray-400" />
        )}
      </button>
      <pre className="bg-gray-950 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm font-mono border border-gray-800">
        <code>{code}</code>
      </pre>
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
    info: "bg-blue-50 dark:bg-blue-950/50 border-blue-200 dark:border-blue-800 text-blue-900 dark:text-blue-100",
    warning:
      "bg-amber-50 dark:bg-amber-950/50 border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-100",
    success:
      "bg-green-50 dark:bg-green-950/50 border-green-200 dark:border-green-800 text-green-900 dark:text-green-100",
  };

  return (
    <div className={`border rounded-lg p-4 my-4 ${styles[type]}`}>
      <p className="font-semibold mb-2">{title}</p>
      <div className="text-sm opacity-90">{children}</div>
    </div>
  );
};

export default function MonorepoGuide() {
  const [activeSection, setActiveSection] = useState("intro");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    { id: "intro", label: "Introduction", icon: BookOpen },
    { id: "structure", label: "Project Structure", icon: Folder },
    { id: "initialize", label: "Initialize Monorepo", icon: Settings },
    { id: "api", label: "Shared API Package", icon: Zap },
    { id: "server", label: "Express Server", icon: Settings },
    { id: "client", label: "Next.js Client", icon: Palette },
    { id: "config", label: "Root Configuration", icon: Zap },
    { id: "run", label: "Run Everything", icon: Rocket },
    { id: "tips", label: "Pro Tips", icon: Lightbulb },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = navigation.map((nav) => document.getElementById(nav.id));
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navigation[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({ top: elementPosition, behavior: "smooth" });
      setActiveSection(id);
      setMobileMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 z-50">
        <div className="h-full px-4 flex items-center justify-between max-w-screen-2xl mx-auto">
          <div className="flex items-center gap-3">
            <BookOpen className="text-blue-600" size={24} />
            <h1 className="text-lg font-bold text-gray-900 dark:text-white">
              Monorepo Setup Guide
            </h1>
          </div>
          <ModeToggle />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-16 left-0 bottom-0 w-64 bg-white dark:bg-gray-950 border-r border-gray-200 dark:border-gray-800 overflow-y-auto z-40 transition-transform duration-300 ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <nav className="p-4 space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeSection === item.id
                    ? "bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-900"
                }`}
              >
                <Icon size={18} />
                {item.label}
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="pt-16 lg:pl-64">
        <div className="max-w-4xl mx-auto px-6 py-12">
          {/* Introduction */}
          <section id="intro" className="mb-16 scroll-mt-20">
            <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              Next.js + Express + tRPC Monorepo
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              A complete, copy-paste setup guide for building a modern monorepo
              with Next.js frontend, Express backend, and shared tRPC APIs using
              pnpm workspaces.
            </p>
          </section>

          {/* Project Structure */}
          <section id="structure" className="mb-16 scroll-mt-20">
            <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
              Project Structure
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              This is the directory structure we&apos;ll be creating:
            </p>
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
            />
          </section>

          {/* Initialize Monorepo */}
          <section id="initialize" className="mb-16 scroll-mt-20">
            <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
              Initialize Monorepo
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Create the root project and workspace configuration:
            </p>
            <CodeBlock
              code={`mkdir my-monorepo && cd my-monorepo
pnpm init`}
            />

            <h3 className="text-xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">
              Create Workspace Configuration
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Create{" "}
              <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-sm">
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
          </section>

          {/* Setup Shared API Package */}
          <section id="api" className="mb-16 scroll-mt-20">
            <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
              Setup Shared API Package
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Create the shared tRPC API package that will be used by both
              frontend and backend:
            </p>
            <CodeBlock
              code={`mkdir -p packages/api
cd packages/api
pnpm init
pnpm add @trpc/server zod
pnpm add -D typescript @types/express @types/node`}
            />

            <h3 className="text-xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">
              TypeScript Configuration
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Create{" "}
              <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-sm">
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

            <h3 className="text-xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">
              Define tRPC Router
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Create{" "}
              <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-sm">
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

            <h3 className="text-xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">
              Package Configuration
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Update{" "}
              <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-sm">
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
          </section>

          {/* Setup Express Server */}
          <section id="server" className="mb-16 scroll-mt-20">
            <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
              Setup Express Server
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Create the Express backend that will serve the tRPC API:
            </p>
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
              <code className="bg-amber-900/20 px-1 rounded">@my-app/api</code>{" "}
              with the actual name from your{" "}
              <code className="bg-amber-900/20 px-1 rounded">
                packages/api/package.json
              </code>
              . Always use quotes in zsh!
            </InfoBox>

            <h3 className="text-xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">
              Server Entry Point
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Create{" "}
              <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-sm">
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

            <h3 className="text-xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">
              Package Scripts
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Update{" "}
              <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-sm">
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
          </section>

          {/* Setup Next.js Client */}
          <section id="client" className="mb-16 scroll-mt-20">
            <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
              Setup Next.js Client
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Create the Next.js frontend with tRPC integration:
            </p>
            <CodeBlock
              code={`cd ../
pnpm dlx create-next-app@latest web --typescript --tailwind --app
cd web
pnpm add @trpc/client @trpc/react-query @tanstack/react-query
pnpm add "@my-app/api@workspace:*"`}
            />

            <h3 className="text-xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">
              tRPC Client Setup
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Create{" "}
              <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-sm">
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

            <h3 className="text-xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">
              Provider Setup
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Create{" "}
              <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-sm">
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

            <h3 className="text-xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">
              Root Layout
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Update{" "}
              <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-sm">
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

            <h3 className="text-xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">
              Demo Page
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Create{" "}
              <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-sm">
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
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
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
          </section>

          {/* Root Configuration */}
          <section id="config" className="mb-16 scroll-mt-20">
            <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
              Root Configuration
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Add scripts to root{" "}
              <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-sm">
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
          </section>

          {/* Run Everything */}
          <section id="run" className="mb-16 scroll-mt-20">
            <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
              Run Everything
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Start all services with a single command:
            </p>
            <CodeBlock
              code={`cd ../../  # Back to root
pnpm dev`}
            />

            <InfoBox type="success" title="✅ Your apps should now be running:">
              <div className="space-y-2">
                <div>
                  Express Server:{" "}
                  <code className="bg-green-900/20 px-2 py-1 rounded text-sm font-mono">
                    http://localhost:4000
                  </code>
                </div>
                <div>
                  Next.js App:{" "}
                  <code className="bg-green-900/20 px-2 py-1 rounded text-sm font-mono">
                    http://localhost:3000
                  </code>
                </div>
              </div>
            </InfoBox>
          </section>

          {/* Pro Tips */}
          <section id="tips" className="mb-16 scroll-mt-20">
            <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
              Pro Tips
            </h2>

            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                  Check package name
                </h3>
                <CodeBlock
                  code={`cat packages/api/package.json | grep "name"`}
                />
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                  Install dependencies for all workspaces
                </h3>
                <CodeBlock code={`pnpm install`} />
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                  Add dependency to specific workspace
                </h3>
                <CodeBlock
                  code={`pnpm add <package> --filter <workspace-name>
# Example: pnpm add lodash --filter web`}
                />
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                  Run command in specific workspace
                </h3>
                <CodeBlock
                  code={`pnpm --filter server dev
pnpm --filter web dev`}
                />
              </div>

              <InfoBox type="info" title="💡 Remember">
                Always use quotes when adding workspace dependencies in zsh:{" "}
                <code className="bg-blue-900/20 px-2 py-1 rounded text-sm font-mono">
                  &quot;&lt;package&gt;@workspace:*&quot;
                </code>
              </InfoBox>
            </div>
          </section>

          {/* Footer */}
          <footer className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800 text-center text-gray-600 dark:text-gray-400 text-sm">
            <p>Built with Next.js, Express, tRPC, and pnpm workspaces.</p>
          </footer>
        </div>
      </main>
    </div>
  );
}

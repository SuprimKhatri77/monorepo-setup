import { CodeBlock } from "@/components/code-block";

export function NextJSClientSetup() {
  return (
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
  );
}

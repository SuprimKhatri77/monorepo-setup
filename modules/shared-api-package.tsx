import { CodeBlock } from "@/components/code-block";

export function SharedAPIPackage() {
  return (
    <section id="api" className="mb-16 scroll-mt-20">
      <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
        Setup Shared API Package
      </h2>
      <p className="text-gray-600 dark:text-gray-400 mb-4">
        Create the shared tRPC API package that will be used by both frontend
        and backend:
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
  );
}

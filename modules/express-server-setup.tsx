import { CodeBlock } from "@/components/code-block";
import { InfoBox } from "@/components/info-block";

export function ExpressServerSetup() {
  return (
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
        <code className="bg-amber-900/20 px-1 rounded">@my-app/api</code> with
        the actual name from your{" "}
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
  );
}

import { CodeBlock } from "@/components/code-block";

export function InitializeMonorepo() {
  return (
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
  );
}

import { CodeBlock } from "@/components/code-block";

export function ProjectStructure() {
  return (
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
  );
}

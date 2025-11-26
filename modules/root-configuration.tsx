import { CodeBlock } from "@/components/code-block";

export function RootConfiguration() {
  return (
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
  );
}

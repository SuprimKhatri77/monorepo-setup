import { CodeBlock } from "@/components/code-block";
import { InfoBox } from "@/components/info-block";

export function ProTips() {
  return (
    <section id="tips" className="mb-16 scroll-mt-20">
      <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
        Pro Tips
      </h2>

      <div className="space-y-8">
        <div>
          <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
            Check package name
          </h3>
          <CodeBlock code={`cat packages/api/package.json | grep "name"`} />
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
  );
}

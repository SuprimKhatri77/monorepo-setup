import { CodeBlock } from "@/components/code-block";
import { InfoBox } from "@/components/info-block";

export function RunEverything() {
  return (
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
  );
}

export function IntroductionSection() {
  return (
    <section id="intro" className="mb-16 scroll-mt-20">
      <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
        Next.js + Express + tRPC Monorepo
      </h2>
      <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
        A complete, copy-paste setup guide for building a modern monorepo with
        Next.js frontend, Express backend, and shared tRPC APIs using pnpm
        workspaces.
      </p>
    </section>
  );
}

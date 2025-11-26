"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";

export const CodeBlock = ({
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

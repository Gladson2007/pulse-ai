"use client";

import { useState } from "react";

type Result = {
  success: boolean;
  question?: string;
  generated_sql?: string;
  chart_type?: string;
  rows?: Record<string, string | number>[];
  insight?: string;
  message?: string;
};

export default function AIAnalyst() {
  const [question, setQuestion] = useState("");
  const [result, setResult] = useState<Result | null>(null);
  const [loading, setLoading] = useState(false);

  async function askAI() {
    if (!question.trim()) return;

    setLoading(true);
    setResult(null);

    try {
      const response = await 
      fetch(
  `${process.env.NEXT_PUBLIC_API_URL}/ai-query`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: question,
          }),
        }
      );

      const data = await response.json();

      setResult(data);

    } catch {
      setResult({
        success: false,
        message: "Could not connect to PULSE AI backend.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-2xl border border-[#1b222c] bg-[#0b0f14] p-6">

      <div>
        <p className="text-xs uppercase tracking-wider text-[#18e0b5]">
          AI Analyst
        </p>

        <h2 className="mt-1 text-xl font-semibold">
          Ask your data
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Ask a business question in natural language.
        </p>
      </div>

      <div className="mt-5 flex gap-3">

        <input
          value={question}
          onChange={(event) =>
            setQuestion(event.target.value)
          }
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              askAI();
            }
          }}
          placeholder="e.g. Which product made the most profit?"
          className="flex-1 rounded-xl border border-[#27313c] bg-[#080b0f] px-4 py-3 text-sm text-white outline-none placeholder:text-gray-600 focus:border-[#18e0b5]/60"
        />

        <button
          onClick={askAI}
          disabled={loading}
          className="rounded-xl bg-[#18e0b5] px-5 py-3 text-sm font-semibold text-black transition hover:opacity-90 disabled:opacity-50"
        >
          {loading ? "Analyzing..." : "Analyze"}
        </button>

      </div>

      {result?.success && (
        <div className="mt-6 space-y-4">

          <div className="rounded-xl border border-[#18e0b5]/20 bg-[#0b1714] p-4">

            <p className="text-xs uppercase tracking-wider text-gray-500">
              AI Insight
            </p>

            <p className="mt-2 text-sm leading-6 text-gray-200">
              {result.insight}
            </p>

          </div>

          <div className="rounded-xl border border-[#1b222c] bg-[#080b0f] p-4">

            <p className="text-xs uppercase tracking-wider text-gray-500">
              Generated SQL
            </p>

            <pre className="mt-3 overflow-x-auto text-xs text-[#18e0b5]">
              {result.generated_sql}
            </pre>

          </div>

        </div>
      )}

      {result && !result.success && (
        <div className="mt-5 rounded-xl border border-red-500/20 bg-red-500/5 p-4">
          <p className="text-sm text-red-400">
            {result.message}
          </p>
        </div>
      )}

    </div>
  );
}
"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type ChartRow = {
  [key: string]: string | number;
};

type AIChartProps = {
  data: ChartRow[];
};

export default function AIChart({ data }: AIChartProps) {
  if (!data.length) {
    return (
      <div className="rounded-2xl border border-[#1b222c] bg-[#0b0f14] p-6">
        <p className="text-sm text-gray-500">
          No data available.
        </p>
      </div>
    );
  }

  const keys = Object.keys(data[0]);

  const categoryKey = keys[0];
  const valueKey = keys[1];

  return (
    <div className="rounded-2xl border border-[#1b222c] bg-[#0b0f14] p-6">
      <div className="mb-5">
        <p className="text-xs uppercase tracking-wider text-[#18e0b5]">
          AI Visualization
        </p>

        <h2 className="mt-1 text-lg font-semibold">
          Data Insight
        </h2>
      </div>

      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis
              dataKey={categoryKey}
              stroke="#6b7280"
            />

            <YAxis stroke="#6b7280" />

            <Tooltip />

            <Bar
              dataKey={valueKey}
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
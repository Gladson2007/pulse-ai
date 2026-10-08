type KpiCardProps = {
  title: string;
  value: string;
  change: string;
};

export default function KpiCard({
  title,
  value,
  change,
}: KpiCardProps) {
  return (
    <div className="group rounded-2xl border border-[#1b222c] bg-[#0b0f14] p-5 transition duration-300 hover:-translate-y-1 hover:border-[#18e0b5]/40 hover:bg-[#0d1319]">

      <div className="flex items-start justify-between">
        <p className="text-sm text-gray-500">
          {title}
        </p>

        <span className="text-gray-600 transition group-hover:text-[#18e0b5]">
          ↗
        </span>
      </div>

      <h2 className="mt-4 text-3xl font-semibold tracking-tight">
        {value}
      </h2>

      <div className="mt-3 flex items-center gap-2">
        <span className="rounded-md bg-[#10251f] px-2 py-1 text-xs font-medium text-[#18e0b5]">
          {change}
        </span>

        <span className="text-xs text-gray-600">
          vs last month
        </span>
      </div>

    </div>
  );
}
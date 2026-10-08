import AIAnalyst from "@/components/dashboard/AIAnalyst";
import BackendStatus from "@/components/dashboard/BackendStatus";
import UploadDataset from "@/components/dashboard/UploadDataset";
import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";
import KpiCard from "@/components/dashboard/KpiCard";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#05070a] text-white">

      <Sidebar />

      <div className="md:ml-64">

        <Topbar />

        <div className="p-6 lg:p-8">

          {/* Welcome */}
          <section className="mb-8">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-semibold tracking-tight">
                Good morning, Gladson.
              </h2>

              <p className="mt-2 text-gray-500">
                Your data has a story. Let&apos;s find it.
              </p>
            </div>
          </section>

          {/* KPI Cards */}
          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

            <KpiCard
              title="Revenue"
              value="₹24.8M"
              change="+12.4%"
            />

            <KpiCard
              title="Orders"
              value="12,480"
              change="+8.2%"
            />

            <KpiCard
              title="Customers"
              value="8,921"
              change="+5.7%"
            />

            <KpiCard
              title="Average Order"
              value="₹1,986"
              change="+3.1%"
            />

          </section>
          <AIAnalyst />
{/* Upload Dataset */}
<div className="mt-6">
  <UploadDataset />
</div>
          {/* Main Analytics */}
          <section className="mt-6 grid gap-6 lg:grid-cols-3">

            {/* Chart placeholder */}
            <div className="rounded-2xl border border-[#1b222c] bg-[#0b0f14] p-6 lg:col-span-2">

              <div className="flex items-center justify-between">

                <div>
                  <p className="text-sm text-gray-500">
                    Performance
                  </p>

                  <h3 className="mt-1 text-xl font-semibold">
                    Revenue Overview
                  </h3>
                </div>

                <button className="rounded-lg border border-[#1b222c] px-3 py-2 text-xs text-gray-400 hover:text-white">
                  Last 30 days
                </button>

              </div>

              <div className="mt-8 flex h-64 items-center justify-center rounded-xl border border-dashed border-[#1b222c]">

                <div className="text-center">

                  <div className="text-4xl">
                    📈
                  </div>

                  <p className="mt-3 text-sm text-gray-500">
                    Revenue visualization will appear here
                  </p>

                  <p className="mt-1 text-xs text-gray-700">
                    Connected to your dataset
                  </p>

                </div>

              </div>

            </div>

            {/* AI Insights */}
            <div className="rounded-2xl border border-[#1b222c] bg-[#0b0f14] p-6">

              <div className="flex items-center justify-between">

                <div>
                  <p className="text-sm text-[#18e0b5]">
                    AI Intelligence
                  </p>

                  <h3 className="mt-1 text-xl font-semibold">
                    Insights
                  </h3>
                </div>

                <span className="rounded-full bg-[#10251f] px-2 py-1 text-xs text-[#18e0b5]">
                  5 new
                </span>

              </div>

              <div className="mt-6 space-y-3">

                <div className="rounded-xl border border-[#1b222c] p-4">
                  <p className="text-sm font-medium">
                    Revenue is trending upward
                  </p>

                  <p className="mt-1 text-xs leading-5 text-gray-500">
                    Revenue increased 12.4% compared with the previous period.
                  </p>
                </div>

                <div className="rounded-xl border border-[#1b222c] p-4">
                  <p className="text-sm font-medium">
                    Kerala needs attention
                  </p>

                  <p className="mt-1 text-xs leading-5 text-gray-500">
                    Regional performance shows a possible decline.
                  </p>
                </div>

                <div className="rounded-xl border border-[#1b222c] p-4">
                  <p className="text-sm font-medium">
                    Product demand changed
                  </p>

                  <p className="mt-1 text-xs leading-5 text-gray-500">
                    AI detected a significant product-level movement.
                  </p>
                </div>

              </div>

            </div>

          </section>

        </div>

      </div>
<BackendStatus />
    </main>
  );
}
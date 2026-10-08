export default function Topbar() {
  return (
    <header className="flex items-center justify-between border-b border-[#1b222c] px-6 py-5 lg:px-8">

      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-[#18e0b5]">
          Workspace
        </p>

        <h1 className="mt-1 text-2xl font-semibold">
          Overview
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Understand what is happening in your data.
        </p>
      </div>

      <div className="flex items-center gap-4">

        <button className="rounded-xl border border-[#1b222c] bg-[#0b0f14] px-4 py-2 text-sm text-gray-300 transition hover:border-[#18e0b5] hover:text-white">
          + Upload Data
        </button>

        <button className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#1b222c] bg-[#0b0f14] text-gray-400 hover:text-white">
          🔔
        </button>

        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#18e0b5] font-semibold text-black">
            G
          </div>

          <span className="hidden text-sm text-gray-300 sm:block">
            Gladson
          </span>
        </div>

      </div>
    </header>
  );
}
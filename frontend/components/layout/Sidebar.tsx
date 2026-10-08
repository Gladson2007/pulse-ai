const menuItems = [
  { icon: "⌂", label: "Overview" },
  { icon: "◈", label: "Sales" },
  { icon: "▦", label: "Products" },
  { icon: "◎", label: "Customers" },
  { icon: "◉", label: "Regions" },
  { icon: "✦", label: "AI Chat" },
  { icon: "⚠", label: "Anomalies" },
  { icon: "↗", label: "Forecast" },
  { icon: "▤", label: "Reports" },
];

export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 hidden h-screen w-64 border-r border-[#1b222c] bg-[#070a0e] md:block">
      <div className="flex h-full flex-col">

        {/* Logo */}
        <div className="border-b border-[#1b222c] px-6 py-6">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#18e0b5] font-bold text-black">
              P
            </div>

            <div>
              <h1 className="text-lg font-bold tracking-tight">
                PULSE AI
              </h1>

              <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500">
                Data Intelligence
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-5">
          <p className="px-3 pb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-600">
            Workspace
          </p>

          <div className="space-y-1">
            {menuItems.map((item, index) => (
              <button
                key={item.label}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm transition ${
                  index === 0
                    ? "bg-[#10251f] text-[#18e0b5]"
                    : "text-gray-400 hover:bg-[#0d1319] hover:text-white"
                }`}
              >
                <span className="w-5 text-center">
                  {item.icon}
                </span>

                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </nav>

        {/* Bottom */}
        <div className="border-t border-[#1b222c] p-4">
          <div className="rounded-xl border border-[#1b222c] bg-[#0b0f14] p-3">
            <p className="text-xs text-gray-500">
              AI Engine
            </p>

            <div className="mt-2 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#18e0b5]" />

              <span className="text-xs text-gray-300">
                Online
              </span>
            </div>
          </div>
        </div>

      </div>
    </aside>
  );
}
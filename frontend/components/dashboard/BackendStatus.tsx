"use client";

import { useEffect, useState } from "react";

export default function BackendStatus() {
  const [status, setStatus] = useState("Checking backend...");

  useEffect(() => {fetch(`${process.env.NEXT_PUBLIC_API_URL}/health`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Backend request failed");
        }

        return response.json();
      })
      .then((data) => {
        setStatus(`● ${data.service} backend is ${data.status}`);
      })
      .catch(() => {
        setStatus("● Backend offline");
      });
  }, []);

  return (
    <div className="mt-6 rounded-2xl border border-[#1b222c] bg-[#0b0f14] p-5">
      <p className="text-xs uppercase tracking-wider text-gray-500">
        System Connection
      </p>

      <p className="mt-2 text-sm text-[#18e0b5]">
        {status}
      </p>
    </div>
  );
}
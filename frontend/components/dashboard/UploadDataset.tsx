"use client";

import { useState } from "react";

export default function UploadDataset() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState<{
    success: boolean;
    filename?: string;
    rows?: number;
    columns?: number;
    column_names?: string[];
    message?: string;
  } | null>(null);

  async function handleUpload(selectedFile: File) {
    if (!selectedFile.name.toLowerCase().endsWith(".csv")) {
      alert("Please select a CSV file.");
      return;
    }

    setFile(selectedFile);
    setResult(null);
    setUploading(true);

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/upload`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      setResult(data);
    } catch (error) {
      setResult({
        success: false,
        message: "Could not connect to PULSE AI backend.",
      });
    } finally {
      setUploading(false);
    }
  }

  function handleFileChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const selectedFile = event.target.files?.[0];

    if (!selectedFile) {
      return;
    }

    handleUpload(selectedFile);
  }

  function removeFile() {
    setFile(null);
    setResult(null);
  }

  return (
    <div className="rounded-2xl border border-[#1b222c] bg-[#0b0f14] p-6">
      <div className="mb-5">
        <p className="text-sm text-[#18e0b5]">Data Source</p>

        <h2 className="mt-1 text-xl font-semibold">
          Upload Dataset
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Upload a CSV file and let PULSE AI understand your data.
        </p>
      </div>

      <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-[#27313c] bg-[#080b0f] px-6 py-12 text-center transition hover:border-[#18e0b5]/60 hover:bg-[#0b1214]">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#10251f] text-2xl">
          📁
        </div>

        <h3 className="mt-4 text-sm font-medium text-white">
          {file ? file.name : "Drop your CSV here"}
        </h3>

        <p className="mt-2 text-xs text-gray-500">
          {uploading
            ? "Uploading dataset..."
            : file
            ? "Dataset selected successfully."
            : "or click to choose a file"}
        </p>

        <input
          type="file"
          accept=".csv,text/csv"
          onChange={handleFileChange}
          className="hidden"
        />
      </label>

      {file && (
        <div className="mt-4 rounded-xl border border-[#1b222c] bg-[#080b0f] p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">
                {file.name}
              </p>

              <p className="mt-1 text-xs text-gray-500">
                {(file.size / 1024).toFixed(1)} KB
              </p>
            </div>

            <button
              onClick={removeFile}
              className="rounded-lg px-3 py-2 text-xs text-gray-500 hover:bg-[#151a20] hover:text-white"
            >
              Remove
            </button>
          </div>
        </div>
      )}

      {result?.success && (
        <div className="mt-4 rounded-xl border border-[#18e0b5]/20 bg-[#0b1714] p-4">
          <p className="text-sm font-semibold text-[#18e0b5]">
            ✓ Dataset analyzed successfully
          </p>

          <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
            <div>
              <p className="text-xs text-gray-500">Rows</p>
              <p className="mt-1 text-lg font-semibold">
                {result.rows}
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-500">Columns</p>
              <p className="mt-1 text-lg font-semibold">
                {result.columns}
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-500">File</p>
              <p className="mt-1 truncate text-sm font-medium">
                {result.filename}
              </p>
            </div>
          </div>

          <div className="mt-4">
            <p className="text-xs text-gray-500">
              Detected columns
            </p>

            <div className="mt-2 flex flex-wrap gap-2">
              {result.column_names?.map((column) => (
                <span
                  key={column}
                  className="rounded-full border border-[#1b222c] bg-[#080b0f] px-3 py-1 text-xs text-gray-300"
                >
                  {column}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {result && !result.success && (
        <div className="mt-4 rounded-xl border border-red-500/20 bg-red-500/5 p-4">
          <p className="text-sm text-red-400">
            ✕ {result.message}
          </p>
        </div>
      )}
    </div>
  );
}
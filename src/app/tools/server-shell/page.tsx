'use client';

import { useState } from "react";
import dynamic from "next/dynamic";

const XTerminal = dynamic(() => import("@/components/terminal"), { ssr: false });

export default function Page() {
  const [status, setStatus] = useState<"disconnected" | "connected">("disconnected");

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">
          <span className="text-green-600">$</span> Server Shell
        </h1>

        <div className="mb-4">
          {status === "disconnected" ? (
            <button
              onClick={() => setStatus("connected")}
              className="px-6 py-3 bg-green-600 text-white rounded-md"
            >
              Connect to Server
            </button>
          ) : (
            <button
              onClick={() => setStatus("disconnected")}
              className="px-6 py-3 bg-red-600 text-white rounded-md"
            >
              Disconnect
            </button>
          )}
        </div>

        <div className="bg-black border border-gray-700 rounded-md overflow-hidden" style={{ height: "70vh" }}>
          {status === "connected" && <XTerminal />}
        </div>
      </div>
    </div>
  );
}
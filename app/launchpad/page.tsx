"use client";

import { NavBar } from "@/components/custom/NavBar";
import { TokenCard } from "@/components/custom/TokenCard";

export default function LaunchpadPage() {
  return (
    <div>
      <NavBar />
      <div className="p-8">
        <div className="flex flex-row justify-between">
          <h1 className="text-3xl font-semibold">LAUNCHPAD</h1>
          <a href="/launch" className="flex items-center space-x-2 bg-gray-200 px-4 py-2 rounded-sm border border-gray-400 hover:bg-gray-300">
            LAUNCH
          </a>
        </div>
        <div className="mt-4">
          <h2 className="text-lg font-semibold">🔥 Trending</h2>
          <div className="grid grid-cols-4 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            <TokenCard />
            <TokenCard />
            <TokenCard />
            <TokenCard />
            <TokenCard />
            <TokenCard />
          </div>
        </div>
        <div className="mt-4">
          <h2 className="text-lg font-semibold">New</h2>
          <div className="grid grid-cols-4 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            <TokenCard />
            <TokenCard />
            <TokenCard />
            <TokenCard />
            <TokenCard />
            <TokenCard />
          </div>
        </div>
      </div>
    </div>
  );
}

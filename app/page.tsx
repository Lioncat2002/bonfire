"use client";

import { DataPage } from "@/components/custom/DataPage";
import { NavBar } from "@/components/custom/NavBar";
import { Metaplex } from "@metaplex-foundation/js";
import { Connection, PublicKey } from "@solana/web3.js";

export default function Home() {
  return (
    <div className="p-8">
      <NavBar />
      <DataPage />
    </div>
  );
}
